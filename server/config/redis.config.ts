import { Request } from "express";
import { createClient } from "redis";

class Redis {
  private static client: any;
  constructor() {}

  static async connect() {
    const client = await createClient({
      url: `redis://${process.env.REDIS_HOST!}:6379`,
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    console.log(`Connected to redis ✅`);
    this.client = client;
  }

  static async get(key: string): Promise<string | null> {
    try {
      const val = await this.client.get(key);
      return JSON.parse(val);
    } catch (err) {
      console.error("Error getting the value from redis", err);
      return null;
    }
  }

  static async set(key: string, value: unknown): Promise<string | null> {
    try {
      return await this.client.set(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error getting the value from redis", err);
      return null;
    }
  }

  static async close() {
    if (this.client) {
      await this.client.quit();
      console.debug("Connection terminated 🔴");
    }
  }

  static getKey(req: Request) {
    const url = req.url;
    const app = req.baseUrl.split("/");
    return `${app[app.length - 1]}:${url}`;
  }
}

export default Redis;
