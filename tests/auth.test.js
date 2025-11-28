// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('Auth', () => {
  let server;
  beforeAll(() => { server = app.listen(4001); });
  afterAll(async () => { await db.pool.end(); server.close(); });

  test('Register and login user', async () => {
    // create user
    const userPayload = { firstName: 'Test', lastName: 'User', email: 'test@example.com', password: '123456' };
    const createRes = await request(app).post('/users').send(userPayload);
    expect(createRes.statusCode).toBe(201);
    // login
    const loginRes = await request(app).post('/auth/login').send({ email: userPayload.email, password: userPayload.password });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});
