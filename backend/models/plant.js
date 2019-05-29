const mongoose = require("mongoose");
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

const Plant = mongoose.model('Plant', new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    species: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    photoPath: {
        type: String,
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

exports.Plant = Plant;