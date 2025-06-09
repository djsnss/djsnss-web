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
import mongoose from "mongoose";

// Import your models
import EventModel from "./models/event.js";
import { createClient } from "redis";

env.config();
const PORT = process.env.Port;
const URL = process.env.Connect_URI;
const app = express();

// Connect to MongoDB first and wait for it to complete
await ConnectMongoDb(URL);

// Redis client setup
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

// Preload cache function
const preloadCache = async () => {
  try {
    console.log("🚀 Preloading cache...");

    // Wait a bit more to ensure connection is stable
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if connection is ready
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
          "name description date location maxVolunteers registeredVolunteers photo status"
        )
        .lean(),

      EventModel.find({
        status: "Past",
        date: { $lt: new Date() },
      })
        .sort({ date: -1 })
        .limit(20)
        .select(
          "name description date location maxVolunteers registeredVolunteers photo status"
        )
        .lean(),
    ]);

    const cacheData = { upcomingEvents, pastEvents };
    await redisClient.setEx("events:all", 600, JSON.stringify(cacheData));

    console.log(
      `✅ Cache preloaded: ${upcomingEvents.length} upcoming, ${pastEvents.length} past events`
    );
  } catch (error) {
    console.error("⚠️ Error preloading cache:", error.message);
  }
};

// Preload cache after connections are established
await preloadCache();

// Add compression middleware FIRST (before other middleware)
app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      // Don't compress images (they're already compressed)
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

// Add performance and security headers
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "public, max-age=600", // 10 minutes cache
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  });
  next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/admin", adminRouter);
app.use("/volunteer", volunteerRouter);
app.use("/events", eventRouter);

// Add health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Check database connection
    const dbStatus =
      mongoose.connection.readyState === 1 ? "connected" : "disconnected";

    // Check Redis connection
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

// Add cron job AFTER database connection
cron.schedule("0 * * * *", async () => {
  try {
    console.log("🔄 Running hourly event status update...");
    const now = new Date();

    // Update upcoming events that have passed to "Past"
    const result = await EventModel.updateMany(
      {
        status: "Upcoming",
        date: { $lt: now },
      },
      {
        status: "Past",
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Updated ${result.modifiedCount} events to Past status`);

      // Clear cache after status updates
      await redisClient.del("events:all");
      console.log("🗑️ Cache cleared after status update");
    }
  } catch (error) {
    console.error("❌ Status update job failed:", error);
  }
});

// Create HTTP server with performance optimizations
const server = createServer(app);

// Configure server for better performance
server.keepAliveTimeout = 65000; // Keep connections alive for 65 seconds
server.headersTimeout = 66000; // Wait 66 seconds for headers

// Start server with optimized configuration
server.listen(PORT, () => {
  console.log(`🚀 Server connected at PORT ${PORT}`);
  console.log("⏰ Cron job scheduled: Event status updates every hour");
  console.log("🔧 Server optimized with Keep-Alive connections");
});
