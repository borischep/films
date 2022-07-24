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
        const userFilm = await UserFilm.findOne({ userLogin: req.tokenUser.login, id: film.id });
        await Film.findOneAndUpdate(
          { id: film.id },
          { $set: {
            ...film,
            page: req.params.page,
            liked: userFilm?.liked || false,
            toWatch: userFilm?.toWatch || false,
            watched: userFilm?.watched || false,
          }},
          { upsert: true, new: true }
        );
      });
    })
    .catch(async(err) => {
      console.log(err);
    })
  
  return res.json(await Film.find({page: req.params.page}));
})

router.get('/movies/:id', async (req, res) => {
  let film = {};
  let fetchedFilm = {};
  film = await Film.findOne({id: req.params.id});
  if (film) {
    return res.send(film);
  }

  await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.FILMS_API_KEY}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then(async (result) => {
      const userFilm = await UserFilm.find({ userLogin: req.tokenUser.login, id: result.id });
      fetchedFilm = {
        ...result,
        liked: userFilm.liked,
        toWatch: userFilm.toWatch,
        watched: userFilm.watched
      };
    })

  await Film.create(fetchedFilm);
  film = await Film.find({id: req.params.id});
  return res.json(film);
});

router.get('/userfilms', async (req, res) => {
  return res.json(await Film.find({$or:[{liked: true},{watched: true}, {toWatch: true}]}));
})

router.get('/userfilms/liked', async (req, res) => {
  return res.json(await Film.find({liked: true}));
});

router.get('/userfilms/watched', async (req, res) => {
  return res.json(await Film.find({watched: true}));
})

router.get('/userfilms/toWatch', async (req, res) => {
  return res.json(await Film.find({toWatch: true}));
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

  await Film.findOneAndUpdate({ id: req.body.id }, {
    liked: req.body.liked,
    watched: req.body.watched,
    toWatch: req.body.toWatch,
  });

  return res.send(await Film.findOne({ id: req.body.id }));
})

module.exports = router;
