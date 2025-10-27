import { createClient } from "redis";
import EventModel from "../models/event.js";
import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: { tls: true },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

const safeDate = (raw) => {
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
};

const splitEventsByDate = (allEvents) => {
  const now = new Date();
  const upcoming = [];
  const past = [];
  const bad = [];
  for (const ev of allEvents) {
    const parsed = safeDate(ev.date);
    if (!parsed) {
      bad.push({ id: ev._id, date: ev.date });
      continue;
    }
    if (parsed >= now) upcoming.push({ ...ev, date: parsed });
    else past.push({ ...ev, date: parsed });
  }
  return { upcoming, past, bad };
};

let cacheLock = false;
let preloadedOnce = false;

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis Connected!");
  }
};

export const fetchAndCacheEvents = async (force = false) => {
  if (cacheLock && !force) {
    console.log("⚠️ fetchAndCacheEvents skipped (cache locked)");
    // try returning existing cache if present
    try {
      const cached = await getCachedEvents();
      return cached;
    } catch {
      return null;
    }
  }
  cacheLock = true;
  try {
    const allEvents = await EventModel.find({})
      .select(
        "name description date location maxVolunteers photo status scope slug related_images"
      )
      .lean();

    const { upcoming, past, bad } = splitEventsByDate(allEvents);
    if (bad.length)
      console.warn("⚠️ Events with invalid dates found during fetch:", bad);

    console.log(
      `📊 Fetched: ${upcoming.length} upcoming, ${past.length} past events`
    );

    const cacheData = {
      upcomingEvents: upcoming.sort((a, b) => a.date - b.date),
      pastEvents: past.sort((a, b) => b.date - a.date),
    };

    // set TTL to avoid permanent divergence
    await redisClient.set("events:all", JSON.stringify(cacheData), {
      EX: 7200,
    });
    return cacheData;
  } catch (error) {
    console.error("Error in fetchAndCacheEvents:", error);
    throw error;
  } finally {
    cacheLock = false;
  }
};

export const preloadCache = async (force = false) => {
  if (cacheLock) {
    console.log("⚠️ Cache preload skipped (already running)");
    return;
  }
  if (preloadedOnce && !force) {
    console.log("ℹ️ Cache already preloaded once, skipping automatic preload");
    return;
  }

  if (mongoose.connection.readyState !== 1) {
    console.log("⚠️ MongoDB not ready, skipping cache preload");
    return;
  }

  cacheLock = true;
  try {
    console.log("🚀 Preloading cache...");
    // fetch+cache
    const cacheData = await fetchAndCacheEvents(true);
    console.log(
      `✅ Cache preloaded: ${cacheData.upcomingEvents.length} upcoming, ${cacheData.pastEvents.length} past events`
    );
    preloadedOnce = true;
  } catch (err) {
    console.error("⚠️ Error preloading cache:", err);
  } finally {
    cacheLock = false;
  }
};

export const getCachedEvents = async () => {
  try {
    const cachedData = await redisClient.get("events:all");
    const cacheAge = await redisClient.ttl("events:all");
    if (cachedData) {
      if (cacheAge > 0 && cacheAge < 3600) {
        console.log("🔄 Refreshing cache in background...");
        setImmediate(async () => {
          try {
            await fetchAndCacheEvents();
          } catch (error) {
            console.error("Background cache refresh failed:", error);
          }
        });
      }
      return JSON.parse(cachedData);
    }
    return await fetchAndCacheEvents();
  } catch (error) {
    console.error("Cache retrieval error:", error);
    return await fetchAndCacheEvents();
  }
};

export const clearCache = async () => {
  try {
    await redisClient.del("events:all");
    console.log("🗑️ Cache cleared manually");
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
  }
};

export const warmCache = async () => {
  try {
    console.log("🔥 Warming cache...");
    await fetchAndCacheEvents();
    console.log("✅ Cache warmed successfully");
  } catch (error) {
    console.error("❌ Error warming cache:", error);
  }
};
