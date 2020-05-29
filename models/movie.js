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
    description: String,
    mainCaste: [ String ],
    pricePerMovie: {
        type: Number,
        default: 50
    },
    stockLength: {
        type: Number,
        default: 0
    }
});

movie_schema.methods.getGenres = function(genres) {
    return genres.filter((genre) => {
        return !this.genres.includes(genre);
    });
}

const Movie = mongoose.model('Movie', movie_schema);

module.exports = {
    Movie
};