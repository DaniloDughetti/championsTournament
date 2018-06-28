const Player = require('../models/player');
const mongoose = require('mongoose');
const Joi = require('joi');

exports.list = function(req, res){
    res.send(' ');
};

exports.create = function(req, res){
    const validationResult = validatePlayer(req.body);
    
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }

    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        shirtNumber: parseInt(req.body.shirtNumber),
        birthday: new Date(req.body.birthday).getDate()
    });

    player.save()
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        res.send(error);
    });
};

exports.getById = function(req, res){
    const playerId = req.params.playerId;
    Player.findById(playerId)
    .then(result => {
        if(!result)
            return res.status(404).send('Player not found');
        res.send(result);
    })
    .catch(error => {
        res.send(error);
    })
};

function validatePlayer(player){
    const schema = {
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        shirtNumber: Joi.number().required(),
        birthday: Joi.date()
    }
    return Joi.validate(player, schema);
}