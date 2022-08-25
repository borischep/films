const userAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwNjYwMTMxZTAzNzU4NTZkMTgyZmIxIiwibG9naW4iOiJ0ZXN0VXNlciIsImlhdCI6MTY2MTM2MjE5NX0.NfJTYBlIRKfl6UM_h4CCjcQUc46jCN8ngWCofXvkc9w'

module.exports.userAccessToken = userAccessToken; 

module.exports.userData = {
  __v: 0,
  _id: '630661048dc3152b727bff97',
  login: "testUser",
  email: "user@test.com",
  password: "Test1234",
  gender: 'male',
  genre: 'action',
  filmsAmount: 1,
  accessToken: userAccessToken,
};

module.exports.userResponse = {
  __v: 0,
  login: "testUser",
  email: "user@test.com",
  password: "Test1234",
  gender: 'male',
  genre: 'action',
  filmsAmount: 1,
};

module.exports.filmData = {
  id: 999234,
  overview: '',
  page: 1,
  poster_path: '',
  title: 'Test',
  __v: 0,
  _id: "62fa7dbcd1ade922538cf4ad",
};

module.exports.filmResponse = {
  id: 999234,
  overview: '',
  page: 1,
  poster_path: '',
  title: 'Test',
  __v: 0,
  _id: "62fa7dbcd1ade922538cf4ad",
  liked: false,
  toWatch: false,
  watched: false,
}

module.exports.userfilmData = {
  id: 999234,
  overview: '',
  page: 1,
  poster_path: '',
  title: 'Test',
  __v: 0,
  _id: "62fa7dbcd1ade922538cf4ad",
  liked: true,
  toWatch: true,
  watched: true,
  userLogin: 'testUser',
}

module.exports.userfilmResponse = {
  id: 999234,
  overview: '',
  page: 1,
  poster_path: '',
  title: 'Test',
  __v: 0,
  _id: "62fa7dbcd1ade922538cf4ad",
  liked: true,
  toWatch: true,
  watched: true,
}

