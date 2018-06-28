const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    birthday: mongoose.Schema.Types.Date,
    shirtNumber: Number
});

module.exports = mongoose.model('Player', playerSchema);