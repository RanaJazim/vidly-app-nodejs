const { Movie } = require('../models/movie');

const service = {
    fetchMovie: async function(genreId) {
        if (genreId.length == 0) return await Movie.find();
        return await Movie.find({ genres: genreId });
    },
    fetchSingleMovie: async function(mId) {
        return await Movie.findById(mId);
    },
    createMovie: async function(movie) {
        const created_movie = new Movie(movie);
        return await created_movie.save();
    },
    addGenres: async function(genre, movieId) {
        const movie = await Movie.findById(movieId);
        movie.genres.push(genre);
        return await movie.save();
    }
};


module.exports = service;