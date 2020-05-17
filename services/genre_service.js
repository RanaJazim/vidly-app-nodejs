const { Genre } = require('../models/genre');

async function genreList() {
    return await Genre.find().sort({ name: 1 });
}

async function createGenre(name, imgUrl) {
    const genre = new Genre({ name, imgUrl });
    return await genre.save();
}

module.exports = {
    createGenre,
    genreList
}