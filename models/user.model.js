const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const environment = require('../utils/environment.utils');

var UserScheme = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {
       type: String,
       required: true,
       trim: true,
       minlength: 1,
       unique: true,
       validate:{
           validator: validator.isEmail,
           message: '{VALUE} is not a valid email'
       }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserScheme.methods.toJson = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserScheme.methods.generateAuthToken = function() {
    let user = this;
    const access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, environment.hashingSecret.toString()).toString();
    
    user.tokens.push({access, token});

    return user.save()
        .then(()=>{
            return token;
        })
        .catch((error) => {
            return error;
        });
}


UserScheme.statics.findByToken = function(token) {
    let user = this;
    let decodedId;

    try {
        decodedId = jwt.verify(token, environment.hashingSecret);
    } catch (error) {
        throw error.message;
    }

    return user.findOne({
        '_id': decodedId._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

module.exports =  mongoose.model('User', UserScheme);