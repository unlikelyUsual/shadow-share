export const connectionUrl = `postgres://${process.env.POSTGRES_USER!}:${process
  .env.POSTGRES_PASSWORD!}@${process.env.POSTGRES_HOST!}:5432/${process.env
  .POSTGRES_DB!}`;
