import mongoose from "mongoose";

async function ConnectMongoDb(URL) {
  try {
    const conn = await mongoose.connect(URL, {
      // Connection Pool Settings
      maxPoolSize: 10, // Max 10 concurrent connections
      minPoolSize: 2, // Always keep 2 connections ready

      // Timeout Settings
      serverSelectionTimeoutMS: 8000, // 8 seconds (increased for stability)
      socketTimeoutMS: 45000, // 45 seconds for operations
      connectTimeoutMS: 10000, // 10 seconds to establish connection

      // Buffering Settings
      bufferCommands: false, // Fail fast instead of buffering

      // Heartbeat Settings
      heartbeatFrequencyMS: 10000, // Check connection every 10 seconds

      // Retry Settings
      retryWrites: true, // Retry failed writes
      retryReads: true, // Retry failed reads
    });

    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);

    // Connection event listeners for monitoring
    mongoose.connection.on("connected", () => {
      console.log("🔗 Mongoose connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("🔌 Mongoose disconnected from MongoDB");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🛑 MongoDB connection closed through app termination");
      process.exit(0);
    });

    return conn; // Return the connection
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if cannot connect to database
  }
}

export default ConnectMongoDb;
