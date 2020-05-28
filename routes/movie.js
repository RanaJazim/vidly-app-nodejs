const express = require('express');
const _ = require('underscore');
const movie_service = require('../services/movie_service');

const router = express.Router();

router.get('/', async (req, res) => {
    const queryParam = req.query.genreId;
    const genreId = queryParam == null ? "" : queryParam;

    const movies = await movie_service.fetchMovie(genreId);
    res.json(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await movie_service.fetchSingleMovie(req.params.id);
    res.json(movie);
});

router.post('/create', async (req, res) => {
    const extracted_movie = _.pick(
        req.body, 
        'name', 
        'imgUrl', 
        'mainCaste', 
        'pricePerMovie'
    );
    extracted_movie.mainCaste = _splitStringToList(extracted_movie.mainCaste);

    const movie = await movie_service.createMovie(extracted_movie);
    res.json(movie);
});

router.patch('/add-genres/:id', async (req, res) => {
    console.log(req.body.genre);
    const movie = await movie_service.addGenres(req.body.genre, req.params.id);

    res.json(movie);
});

function _splitStringToList(movie_caste) {
    let movie_caste_list = movie_caste.split(",");
    return movie_caste_list.map(_trimSpaceFromStart);
}

function _trimSpaceFromStart(str) {
    if(!str) return str;
    return str.replace(/^\s+/g, '');
}

module.exports = router;