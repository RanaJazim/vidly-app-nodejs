const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    movieInfo: [
        {
            movies: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            },
            isPurchased: {
                type: Boolean,
                default: true
            }
        }
    ]
});

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = {
    Checkout
}