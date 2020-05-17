const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(
        'mongodb://localhost:27017/vidly_app', 
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
        .then((res) => console.log("Successfully connected to the database.."))
        .catch((err) => console.log("There is some error while connecting to the database"));
}