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
    plantCommonName:{
        type:String,
    },
    plantMinTemperature: {
        type: Number,
    },
    plantShadeTolerance: {
        type: String,
    },
    plantPrecipitationMax: {
        type: Number,
    },
    plantPrecipitationMin: {
        type: Number,
    }
}));

exports.Plant = Plant;