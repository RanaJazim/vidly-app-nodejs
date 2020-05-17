const express = require('express');
const { Genre } = require('../models/genre');
const { createGenre, genreList } = require('../services/genre_service');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await genreList();

    res.json(genres);
});

router.post('/create', async (req, res) => {
    const genre = await createGenre(req.body.name, req.body.imgUrl);

    res.json(genre);
});

module.exports = router;