import { describe, expect, it } from 'bun:test'
import { PingController } from '../../src/controllers/ping.controller'

describe('Elysia server ping test', () => {
  it('return a pong response', async () => {
    const response = await PingController
      .handle(new Request('http://localhost:3000/ping'))
      .then((res) => res.text())

    expect(response).toContain('pong')
  })

  it('handles 404 for unknown routes', async () => {
    const response = await PingController
      .handle(new Request('http://localhost:3000/unknown'))
      .then((res) => res.status)

    expect(response).toBe(404)
  })

  it('returns JSON response', async () => {
    const response = await PingController
      .handle(new Request('http://localhost:3000/json'))
      .then((res) => res.json())

    expect(response).toBeObject()
  })
})