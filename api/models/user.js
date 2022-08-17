const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, default: ''},
    email: {type: String, default: ''},
    gender: {type: String, default: ''},
    genre: {type: String, default: ''},
    filmsAmount: {type: Number, default: 0},
    accessToken: String,
})

module.exports = mongoose.model('User', userSchema);