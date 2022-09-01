const request = require('supertest');
const express = require('express');
const router = require('../routes/films');
const db = require("./db");
const Film = require('../models/film');
const UserFilm = require('../models/user-film');
const bodyParser = require('body-parser');
const withAuth = require('../middlewares/accessTokenAuth');
const { filmData, filmResponse, userfilmData, userfilmResponse, userAccessToken } = require('./data');

const app = new express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', withAuth, router);

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

describe('Films Routes', function () {
  it('should response to GET /', async () => {
    await Film.create(filmData);

    const res = await request(app).get(`/?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([filmData]);
  });

  it('should response to GET /pages/:page', async () => {
    await Film.create(filmData);

    const res = await request(app).get(`/pages/1?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([filmResponse]);
  });

  it('should response to GET /movies/:id', async () => {
    await Film.create(filmData);

    const res = await request(app).get(`/movies/${filmData.id}?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual({...filmData, liked: false, toWatch: false, watched: false});
  });

  it('should response to GET /userfilms', async () => {
    await Film.create(filmData);
    await UserFilm.create(userfilmData);

    const res = await request(app).get(`/userfilms?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([userfilmResponse]);
  });

  it('should response to GET /userfilms/liked', async () => {
    await Film.create(filmData);
    await UserFilm.create(userfilmData);

    const res = await request(app).get(`/userfilms/liked?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([userfilmResponse]);
  });

  it('should response to GET /userfilms/watched', async () => {
    await Film.create(filmData);
    await UserFilm.create(userfilmData);

    const res = await request(app).get(`/userfilms/watched?accessToken=${userAccessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual([userfilmResponse]);
  });

  it('should response to POST /userfilms', async () => {
    await Film.create(filmData);
    await UserFilm.create(userfilmData);

    const res = await request(app)
      .post(`/userfilms?accessToken=${userAccessToken}`)
      .send(userfilmData)

    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual(userfilmResponse);
  });
})
