import { createClient } from "redis";

const connectRedis = async () => {
  return await createClient({ url: `redis://${process.env.REDIS_HOST!}:6379` })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
};

export default connectRedis;
