const request = require('supertest');
const express = require('express');
const router = require('../routes/users');
const db = require("./db");
const User = require('../models/user');
const bodyParser = require('body-parser');
const { userData, userResponse } = require('./data');

const app = new express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', router);

beforeAll(async () => {
  process.env.ACCESS_TOKEN_SECRET = 'key'
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('User Routes', function () {
  it('should response to GET /getAllUsers', async () => {
    const user = await User.create(userData);

    const res = await request(app).get(`/getAllUsers?accessToken=${user.accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([userData]);
  });

  it('should response to GET /getUser', async () => {
    const user = await User.create(userData);

    const res = await request(app).get(`/getUser?accessToken=${user.accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual(userData);
  });

  it('should response to DELETE /delete', async () => {
    const user = await User.create(userData);

    const res = await request(app)
      .delete(`/delete?accessToken=${user.accessToken}`)

    expect(res.statusCode).toBe(200);
  });

  it('should response to POST /register', async () => {
    const res = await request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send(userData)

    expect(res.statusCode).toBe(200);
    expect(res._body.user).toMatchObject(userResponse);
  });

  it('should response to POST /login', async () => {
    await User.create(userData);

    const res = await request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send(userData)

    expect(res.statusCode).toBe(200);
    expect(res._body.user).toMatchObject(userResponse);
  });

  it('should response to POST /edit', async () => {
    await User.create(userData);

    const res = await request(app)
      .post('/edit')
      .set('Content-Type', 'application/json')
      .send(userData)

    expect(res.statusCode).toBe(200);
    expect(res._body.user).toMatchObject(userResponse);
  });
})