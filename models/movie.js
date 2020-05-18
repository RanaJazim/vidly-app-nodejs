const mongoose = require('mongoose');

const movie_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre"
        }
    ],
    mainCaste: [
        {
            name: String,
            imgUrl: String
        }
    ],
    pricePerMovie: {
        type: Number,
        required: true
    },
    noInStocks: {
        type: Number,
        default: 0
    }
});

const Movie = mongoose.model('Movie', movie_schema);

module.exports = {
    Movie
};