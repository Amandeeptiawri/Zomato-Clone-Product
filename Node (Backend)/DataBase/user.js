const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: Number
    }
})

module.exports = mongoose.model('userConnect', userSchema, 'user');