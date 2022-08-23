var express = require('express');
const jwt = require('jsonwebtoken');
const GoogleAuth = require('google-auth-library');

const User = require('../models/user');
const withAuth = require('../middlewares/accessTokenAuth');

var router = express.Router();

const googleClient = new GoogleAuth.OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

router.get('/getAllUsers', withAuth, async (req, res) => {
  return res.json(await User.find());
});

router.get('/getUser', withAuth, async (req, res) => {
  return res.json(await User.findOne({login: req.tokenUser.login}));
});

router.delete('/delete', withAuth, async (req, res) => {
  await UserFilm.deleteMany({userLogin: req.tokenUser.login});
  await User.deleteOne({login: req.tokenUser.login});
})

router.post('/register', async (req, res) => {
  const oldUser = await User.findOne({login: req.body.login})
  if (oldUser) {
    return res.status(500).send({status: 'ERROR', error: 'Something is wrong'})
  }

  const user = await User.create(
    {
      login: req.body.login,
      email: req.body.email,
      gender: req.body.gender,
      genre: req.body.genre,
      filmsAmount: req.body.filmsAmount,
      password: req.body.password,
    }
  );
  const accessToken = jwt.sign(
    { user_id: user._id, login: req.body.login },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3h",
    }
  );

  user.accessToken = accessToken;

  return res.json({status: 'SUCCESS', user: user })
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({login: req.body.login, password: req.body.password})
    if (!user) {
      return res.send({status: 'ERROR', error: 'Login or password are incorrect'})
    }

    const accessToken = jwt.sign({ user_id: user._id, login: req.body.login },
      process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5h'
    })
  
    user.accessToken = accessToken
    user.save()
  
    return res.send({status: 'SUCCESS', user})
  } catch(err) {
    return res.status(500).send(err);
  }
})

router.post('/login/google', async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audient: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = ticket.getPayload();

    const user = await User.findOne({ login: payload?.email });

    if (!user) {
      user = await User.create({
        email: payload?.email,
        login: payload?.email,
        gender: '',
        genre: '',
        filmsAmount: 0,
        password: '',
      });
    }

    const accessToken = jwt.sign({ user_id: user._id, login: payload?.email },
      process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5h'
    })

    user.accessToken = accessToken
    user.save()

    res.json({ status: 'SUCCESS', user });
  } catch(err) {
    return res.status(500).send({ status: 'ERROR', error: err });
  }
})

router.post('/edit', withAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { login: req.tokenUser.login },
      {
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        genre: req.body.genre,
        filmsAmount: req.body.filmsAmount,
        password: req.body.password,
      },
    );
  
    return res.send({status: 'SUCCESS', user: user});
  } catch (err) {
    return res.status(500).send({status: 'ERROR', error: 'Something is wrong'})
  }
})

module.exports = router;
