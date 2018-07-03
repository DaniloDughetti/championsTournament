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
    const validationResult = validatePlayer(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details[0].message});
    }

    Player.findOne().where({ fiscalCode: req.body.fiscalCode})
    .then(result => {
        if(result)
            return res.status(500).json({message: 'Player already registered'});

        const player = new Player({
            _id: new mongoose.Types.ObjectId(),
            fiscalCode: req.body.fiscalCode,
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
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
};

exports.get = function(req, res){
    const playerId = req.params.playerId;
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
    const playerId = req.params.playerId;
    const updateOptions = {};
    for(const option of req.body){
        updateOptions[option.propName] = option.value;
    }

    Player.findByIdAndUpdate({_id: playerId}, { $set:updateOptions})
    .exec()
    .then(result => {    
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
};

exports.delete = function(req, res){
    const playerId = req.params.playerId;
    Player.findOneAndRemove({_id: playerId})
    .exec()
    .then(result => {
        console.log(result);
        if(result)
            return res.status(200).json({result: `Player ${playerId} deleted`});
        else
            return res.status(404).json({result: `Player ${playerId} not found`});
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
};


function validatePlayer(player){
    const schema = {
        fiscalCode: Joi.string().min(14).required(),
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        shirtNumber: Joi.number().required(),
        birthday: Joi.date()
    }
    return Joi.validate(player, schema);
}

function getPlayerByFiscalCode(fiscalCode){
    return Player.find().where({ 'fiscalCode': fiscalCode});
}
