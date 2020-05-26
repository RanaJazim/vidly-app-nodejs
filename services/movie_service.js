const { Movie } = require('../models/movie');

const service = {
    createMovie: async function(movie) {
        const created_movie = new Movie(movie);
        return await created_movie.save();
    }
};


module.exports = service;