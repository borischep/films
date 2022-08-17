const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: String,
    overview: {type: String, default: ''},
    page: Number,
    id: Number,
    poster_path: {type: String, default: ''},
})

module.exports = mongoose.model('Film', filmSchema);