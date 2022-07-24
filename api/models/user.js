const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, default: '', required: true},
    email: {type: String, default: '', required: true},
    gender: {type: String, default: '', required: true},
    genre: {type: String, default: '', required: true},
    filmsAmount: {type: Number, default: 0, required: true},
    accessToken: String,
})

module.exports = mongoose.model('User', userSchema);