import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
  spyOn,
} from 'bun:test'
import { RedisService } from '@src/services/redis'
import { RedisClientType } from 'redis'

describe('RedisService', () => {
  let redisService: RedisService
  let mockClient: RedisClientType

  beforeEach(() => {
    redisService = new RedisService()
    mockClient = redisService.client
    spyOn(mockClient, 'connect').mockImplementation(
      () => Promise.resolve() as unknown as Promise<RedisClientType>,
    )
    spyOn(mockClient, 'set').mockImplementation(
      (): Promise<any> => Promise.resolve('OK'),
    )
    spyOn(mockClient, 'get').mockImplementation(
      (): Promise<any> => Promise.resolve('value'),
    )
    spyOn(mockClient, 'keys').mockImplementation(
      (): Promise<any> => Promise.resolve(['key1', 'key2']),
    )
    spyOn(mockClient, 'del').mockImplementation(
      (): Promise<any> => Promise.resolve(1),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set a value in Redis', async () => {
    const result = await redisService.set('key', 'value', { EX: 60 * 60 * 24 })
    expect(result).toBe('OK')
  })

  it('should get a value from Redis', async () => {
    const result = await redisService.get('key')
    expect(result).toBe('value')
  })

  it('should get keys from Redis', async () => {
    const result = await redisService.getKeys('key*')
    expect(result).toEqual(['key1', 'key2'])
  })

  it('should delete a key from Redis', async () => {
    const result = await redisService.del('key*')
    expect(result).toBe(1)
  })

  it('should throw an error if REDIS_URL is not set', () => {
    delete process.env.REDIS_URL
    expect(() => new RedisService()).toThrow('Redis URL is required')
  })
})
