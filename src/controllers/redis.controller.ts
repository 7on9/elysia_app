import { Elysia } from 'elysia'
import { RedisService } from '../services'

export const RedisController = new Elysia()
  .decorate({
    Service: new RedisService(),
  })
  .post('/redis', async ({ Service, body }) => {
    const { key, value, options } = body
    try {
      await Service.set(key, value, options)
      return { message: 'Key set successfully' }
    } catch (error) {
      return { message: 'Internal Server Error' }
    }
  })
  .get('/redis/:key', async ({ Service, body, params }) => {
    const { key } = params
    const value = await Service.get(key)
    return { key, value }
  })
  .get('/redis/keys/:pattern', async ({ Service, body, params }) => {
    const { pattern } = params
    const keys = await Service.getKeys(pattern)
    return keys
  })
