const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fiscalCode: String,
    name: String,
    surname: String,
    birthday: DateOnly,
    shirtNumber: Number
});

module.exports = mongoose.model('Player', playerSchema);