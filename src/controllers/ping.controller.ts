import { Elysia } from "elysia";

export const PingController = new Elysia()
.get("/ping", () => {
  return {
    message: "pong",
    timeStamp: new Date().toISOString(),
  }
})
.get("/json", () => {
  return {
    status: 200,
    timeStamp: new Date().toISOString(),
  }
})