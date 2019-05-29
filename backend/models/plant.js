const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const Plant = mongoose.model('Plant', new Schema({
    species: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    idealTemp: {
        type: Number,
        required: true,
    },
    idealHumid: {
        type: Number,
        required: true,
    },
}));

exports.User = User;
exports.validate = validateUser;