import { createClient, RedisClientType, SetOptions } from "redis";
export class RedisService {
  public client: RedisClientType;

  constructor() {
    console.log("Init RedisService");

    if (!process.env.REDIS_URL) {
      throw new Error("Redis URL is required");
    }

    // example: redis://localhost:6379
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.connect();

    // Handle Redis connection errors
    this.client.on("error", (error) => {
      console.error("Error connecting to Redis:", error);
    });
  }

  public set(key: string, value: string, options: SetOptions): Promise<any> {
    // { EX: 60 * 60 * 24 } = 24 hours expiration
    return this.client.set(key, value, options);
  }

  public get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public getKeys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }
  public del(key: string): Promise<number> {
    return this.client.del(key);
  }
}
