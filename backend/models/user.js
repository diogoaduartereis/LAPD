const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateUser(user) {
    const schema = {
        username: Joi.string().alphanum().min(5).max(20).required(),
        password: Joi.string().min(5).max(500).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;