const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: String,
    overview: {type: String, default: ''},
    page: Number,
    id: Number,
    liked: {type: Boolean, default: false},
    watched: {type: Boolean, default: false},
    toWatch: {type: Boolean, default: false},
    poster_path: {type: String, default: ''},
})

module.exports = mongoose.model('Film', filmSchema);