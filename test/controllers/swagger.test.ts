import { describe, expect, it } from 'bun:test';
import { app } from '../../src/index'

describe('Swagger API Tests', () => {
  it('Swagger UI is available', async () => {
    const response = await app
      .handle(new Request('http://localhost:3000/swagger'))
      .then((res) => res.text());

    expect(response).toContain('swagger');
  });

  it('Swagger JSON is available', async () => {
    const response = await app
      .handle(new Request('http://localhost:3000/swagger/json'))
      .then((res) => res.json());

    expect(response).toBeObject();
  });

  it('Swagger JSON contains info object', async () => {
    const response = await app
      .handle(new Request('http://localhost:3000/swagger/json'))
      .then((res) => res.json());

    expect(response).toHaveProperty('info');
    expect(response.info).toHaveProperty('title');
    expect(response.info).toHaveProperty('version');
  });

  it('Swagger JSON contains paths object', async () => {
    const response = await app
      .handle(new Request('http://localhost:3000/swagger/json'))
      .then((res) => res.json());

    expect(response).toHaveProperty('paths');
    expect(response.paths).toBeObject();
  });
});