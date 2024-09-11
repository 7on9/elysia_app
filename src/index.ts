import { Elysia } from 'elysia'
import { PingController, RedisController } from './controllers'
import { swagger } from '@elysiajs/swagger'

export const app = new Elysia()

app.use(PingController)
app.use(RedisController)
app.use(swagger())

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
