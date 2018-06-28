const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    shirtNumber: Number
});

module.exports = mongoose.model('Player', playerSchema);