const Player = require('../models/player');
const mongoose = require('mongoose');

exports.list = function(req, res){
    res.send(' ');
};

exports.create = function(req, res){
    
    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name: 'Danilo',
        shirtNumber:7
    });
    
    player.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
    res.send(' ');
};