import express from "express";
import { createServer } from "http";
import ConnectMongoDb from "./config/connection.js";
import env from "dotenv";
import cors from "cors";
import compression from "compression";
import cron from "node-cron";
import adminRouter from "./routes/adminR.js";
import volunteerRouter from "./routes/volunteerR.js";
import eventRouter from "./routes/eventR.js";
import announcementRouter from "./routes/announcementR.js";
import contactRouter from "./routes/contactR.js";
import mongoose from "mongoose";
import EventModel from "./models/event.js";
import { createClient } from "redis";

env.config();
const PORT = process.env.Port;
const URL = process.env.Connect_URI;
const app = express();

await ConnectMongoDb(URL);

// Redis client configuration for caching
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: { tls: true },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connected!");
});

await redisClient.connect();

// Cache preloading function for better performance
const preloadCache = async () => {
  try {
    console.log("🚀 Preloading cache...");

    // Wait longer for stable connections
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️ MongoDB not ready, skipping cache preload");
      return;
    }

    const [upcomingEvents, pastEvents] = await Promise.all([
      EventModel.find({
        status: "Upcoming",
        date: { $gte: new Date() },
      })
        .sort({ date: 1 })
        .limit(50)
        .select(
          "name description date location maxVolunteers photo status scope slug" // <-- Added slug here
        )
        .lean(),

      EventModel.find({
        status: "Past",
        date: { $lt: new Date() },
      })
        .sort({ date: -1 })
        .limit(20)
        .select(
          "name description date location maxVolunteers photo status scope slug" // <-- Added slug here
        )
        .lean(),
    ]);

    const cacheData = { upcomingEvents, pastEvents };
    await redisClient.setEx("events:all", 14400, JSON.stringify(cacheData)); // 4 hours - consistent with adminC.js

    console.log(
      `✅ Cache preloaded: ${upcomingEvents.length} upcoming, ${pastEvents.length} past events`
    );
  } catch (error) {
    console.error("⚠️ Error preloading cache:", error.message);
  }
};

// Add safer preload execution
setTimeout(async () => {
  await preloadCache();
}, 3000); // Wait 3 seconds instead of immediate execution

// Compression middleware for better performance
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (
        req.headers["content-type"] &&
        req.headers["content-type"].includes("image/")
      ) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// Security and performance headers
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "public, max-age=600",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  });
  next();
});

app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Route configurations
app.use("/admin", adminRouter);
app.use("/volunteer", volunteerRouter);
app.use("/events", eventRouter);
app.use("/announcement", announcementRouter);
app.use("/contact", contactRouter);

// Health check endpoint for monitoring
app.get("/health", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    let redisStatus = "disconnected";
    try {
      if (redisClient && redisClient.isOpen) {
        redisStatus = "connected";
      }
    } catch (error) {
      redisStatus = "error";
    }

    res.status(200).json({
      status: "healthy",
      database: dbStatus,
      redis: redisStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        total:
          Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Automated event status updates every hour
cron.schedule("0 * * * *", async () => {
  try {
    console.log("🔄 Running hourly event status update...");
    const now = new Date();

    const result = await EventModel.updateMany(
      { status: "Upcoming", date: { $lt: now } },
      { status: "Past" }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Updated ${result.modifiedCount} events to Past status`);
      await redisClient.del("events:all");
      console.log("🗑️ Cache cleared after status update");

      // Preload fresh cache immediately after clearing
      setTimeout(preloadCache, 1000);
    }
  } catch (error) {
    console.error("❌ Status update job failed:", error);
  }
});

// HTTP server with performance optimizations
const server = createServer(app);
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(PORT, () => {
  console.log(`🚀 Server connected at PORT ${PORT}`);
  console.log("⏰ Cron job scheduled: Event status updates every hour");
  console.log("🔧 Server optimized with Keep-Alive connections");
});
