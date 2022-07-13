const mongoose = require('mongoose');

const userFilmSchema = new mongoose.Schema({
    id: Number,
    liked: {type: Boolean, default: false},
    watched: {type: Boolean, default: false},
    toWatch: {type: Boolean, default: false},
})

module.exports = mongoose.model('UserFilm', userFilmSchema);