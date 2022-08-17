const mongoose = require('mongoose');

const userFilmSchema = new mongoose.Schema({
    id: Number,
    liked: {type: Boolean, default: false},
    watched: {type: Boolean, default: false},
    toWatch: {type: Boolean, default: false},
    userLogin: {type: String, required: true},
})

module.exports = mongoose.model('UserFilm', userFilmSchema);