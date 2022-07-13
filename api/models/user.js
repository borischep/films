const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: {type: String, default: ''},
    email: {type: String, default: ''},
    birthday: {type: String, default: ''},
    gender: {type: String, default: ''},
    genre: {type: String, default: ''},
    filmsAmount: {type: Number, default: 0},
})

module.exports = mongoose.model('User', userSchema);