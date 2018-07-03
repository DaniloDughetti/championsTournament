const Player = require('../models/player');
const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);
const Joi = require('joi');

exports.list = function(req, res){
    Player.find()
    .then(result => {
        if(!result || result.length < 1)
            return res.status(404).send('Players list empty');
        res.status(200).send(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
};

exports.create = function(req, res){

    console.log(new Date(req.body.birthday).getDate());
    const validationResult = validatePlayer(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message});
    }

    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        shirtNumber: parseInt(req.body.shirtNumber),
        birthday: new DateOnly(req.body.birthday)
    });

    player.save()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
};

exports.get = function(req, res){

    const playerId = req.params.id;
    Player.findById(playerId)
    .then(result => {
        if(!result)
            return res.status(404).json({message: 'Player not found'});
        res.json(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error.message
        });
    })
};

exports.update = function(req, res){

    const playerId = req.params.id;
    Player.findById(playerId)
    .then(player => {
    
        if(!player)
            return res.status(404).send('Player not found');
            
        validatePlayer(req.body);
        player.name = req.body.name;
        player.surname = req.body.surname;
        player.shirtNumber = req.body.shirtNumber;
        player.birthday = req.body.birthday;

        player.save();

        res.send(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
};

exports.delete = function(req, res){
    const playerId = req.params.id;
    Player.findOneAndRemove({_id: playerId})
    .exec()
    .then(result => {
        res.status(200).json({result: `Player ${playerId} deleted`});
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
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