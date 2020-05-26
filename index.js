const express = require('express');
const body_parser = require('body-parser');
require('./db_connection')();
const genres = require('./routes/genre');
const movies = require('./routes/movie');
const user = require('./routes/user');


const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/auth', user);
app.use('/', (req, res) => res.send("Home page..."));

const PORT = 3000;
app.listen(PORT, () => console.log(`App is listening on the port ${PORT}....`));