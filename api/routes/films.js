var express = require('express');
const fetch = require('node-fetch');
const Film = require('../models/film');
const UserFilm = require('../models/user-film');

var router = express.Router();

router.get('/', async (req, res) => {
  return res.json(await Film.find());
})

router.get('/pages/:page', async (req, res) => {
  await fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${process.env.FILMS_API_KEY}&page=${req.params.page}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then(async (result) => {
      await result.results.forEach(async film => {
        await Film.findOneAndUpdate(
          { id: film.id },
          { $set: {
            ...film,
            page: req.params.page,
          }},
          { upsert: true, new: true }
        );
      });
    })
    .catch(async(err) => {
      console.error(err);
    })

  const films = await Film.find({page: req.params.page})
  const userFilms = await UserFilm.find({ userLogin: req.tokenUser.login });

  const resFilms = await films.map((film) => {
    const marks = userFilms.find((uFilm) => uFilm.id === film.id)

    return {
      ...film._doc,
      liked: marks?.liked || false,
      toWatch: marks?.toWatch || false,
      watched: marks?.watched || false,
    }
  });
  
  return res.json(resFilms);
})

router.get('/movies/:id', async (req, res) => {
  let film = {};
  let resFilm = {}
  film = await Film.findOne({id: req.params.id});
  const userFilm = await UserFilm.findOne({ userLogin: req.tokenUser.login, id: req.params.id });

  if (film) {
    resFilm = {
      ...film._doc,
      liked: userFilm?.liked || false,
      toWatch: userFilm?.toWatch || false,
      watched: userFilm?.watched || false,
    }

    return res.send(resFilm);
  }

  await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.FILMS_API_KEY}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then(async (result) => {
      film = await Film.create(result);
    })

  resFilm = {
    ...film._doc,
    liked: userFilm?.liked || false,
    toWatch: userFilm?.toWatch || false,
    watched: userFilm?.watched || false,
  }

  return res.json(film);
});

router.get('/userfilms', async (req, res) => {
  const films = await Film.find()
  const userFilms = await UserFilm.find({ userLogin: req.tokenUser.login });

  const resFilms = await userFilms.map((userFilm) => {
    const filmData = films.find((uFilm) => uFilm.id === userFilm.id)

    return {
      ...filmData._doc,
      liked: userFilm?.liked || false,
      toWatch: userFilm?.toWatch || false,
      watched: userFilm?.watched || false,
    }
  });

  return res.json(resFilms);
})

router.get('/userfilms/liked', async (req, res) => {
  const films = await Film.find({page: req.params.page})
  const userFilms = await UserFilm.find({ userLogin: req.tokenUser.login, liked: true });

  const resFilms = await films.map((film) => {
    const marks = userFilms.find((uFilm) => uFilm.id === film.id)

    return {
      ...film._doc,
      liked: marks?.toWatch || false,
      toWatch: marks?.toWatch || false,
      watched: marks?.watched || false,
    }
  });
  return res.json(resFilms);
});

router.get('/userfilms/watched', async (req, res) => {
  const films = await Film.find({page: req.params.page})
  const userFilms = await UserFilm.find({ userLogin: req.tokenUser.login, watched: true });

  const resFilms = await films.map((film) => {
    const marks = userFilms.find((uFilm) => uFilm.id === film.id)

    return {
      ...film._doc,
      liked: marks?.toWatch || false,
      toWatch: marks?.toWatch || false,
      watched: marks?.watched || false,
    }
  });
  return res.json(resFilms);
})

router.get('/userfilms/toWatch', async (req, res) => {
  const films = await Film.find({page: req.params.page})
  const userFilms = await UserFilm.find({ userLogin: req.tokenUser.login, toWatch: true });

  const resFilms = await films.map((film) => {
    const marks = userFilms.find((uFilm) => uFilm.id === film.id)

    return {
      ...film._doc,
      liked: marks?.toWatch || false,
      toWatch: marks?.toWatch || false,
      watched: marks?.watched || false,
    }
  });
  return res.json(resFilms);
})

router.post('/userfilms', async (req, res) => {
  if (req.body.liked || req.body.watched || req.body.toWatch) {
    await UserFilm.findOneAndUpdate(
      { userLogin: req.tokenUser.login, id: req.body.id },
      { $set: {
        liked: req.body.liked,
        watched: req.body.watched,
        toWatch: req.body.toWatch,
        userLogin: req.tokenUser.login
      }},
      { upsert: true, new: true }
    );
  } else {
    await UserFilm.findOneAndRemove({ userLogin: req.tokenUser.login, id: req.body.id });
  }

  const film = await Film.findOne({id: req.body.id});
  const userFilm = await UserFilm.findOne({ userLogin: req.tokenUser.login, id: req.body.id });

  const resFilm = {
    ...film._doc,
    liked: userFilm?.liked || false,
    toWatch: userFilm?.toWatch || false,
    watched: userFilm?.watched || false,
  }

  return res.send(resFilm);
})

module.exports = router;
