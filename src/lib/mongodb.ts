import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;
let isConnecting = false;

// Singleton connection pattern
export async function connectToDatabase() {
  // Nếu đã có connection, return ngay
  if (db && client) {
    try {
      // Test connection bằng cách ping
      await client.db("admin").command({ ping: 1 });
      return { client, db };
    } catch (error) {
      // Connection bị lỗi, reset để tạo connection mới
      console.log("Existing connection failed, creating new one...");
      client = null as any;
      db = null as any;
    }
  }

  // Nếu đang connecting, đợi một chút rồi retry
  if (isConnecting) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return connectToDatabase();
  }

  isConnecting = true;

  try {
    if (client) {
      try {
        await client.close();
      } catch (error) {
        console.log("Error closing existing connection:", error);
      }
    }

    const options = {
      retryWrites: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      maxPoolSize: 10,
      minPoolSize: 0,
      heartbeatFrequencyMS: 10000,
      monitorCommands: false,
    };

    client = new MongoClient(process.env.MONGODB_URI!, options);
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    db = client.db();

    console.log("Connected to MongoDB successfully");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

// Cleanup function
export async function disconnectFromDatabase() {
  if (client) {
    await client.close();
    client = null as any;
    db = null as any;
  }
}

export { db };

