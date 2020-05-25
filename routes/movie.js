const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Fetching movies for this genre id ${req.query.genreId}`);
});

router.post('/create', (req, res) => {
    res.json(req.body);
});

module.exports = router;