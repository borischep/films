var express = require('express');
const Film = require('../models/film');
const User = require('../models/user');
const UserFilm = require('../models/user-film');
var router = express.Router();

router.get('/', async (req, res) => {
  return res.json(await User.find());
});

router.delete('/', async (req, res) => {
  await Film.deleteMany();
  await UserFilm.deleteMany();
  await User.deleteMany();
})

router.post('/', async (req, res) => {
  const resp = await User.findOneAndUpdate(
    { username: req.body.username},
    { $set: {
      username: req.body.username,
      email: req.body.email,
      birthday: req.body.birthday,
      gender: req.body.gender,
      genre: req.body.genre,
      filmsAmount: req.body.filmsAmount,
    }},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return resp;
})

module.exports = router;
