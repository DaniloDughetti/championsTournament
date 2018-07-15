const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.create = function (req, res) {
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }

        bcrypt.hash(req.body.password, salt, null, (error, hash) => {
            if (error) {
                return res.status(500).json({
                    error: error
                });
            }
            else {
                
                let user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    tokens: []
                });
                user.save()
                    .then(() => {
                        return user.generateAuthToken();
                    })
                    .then((token) => {
                        res.status(200).header('x-auth', token).send(user.toJson());
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
            }
        });
    });
};