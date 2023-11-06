const mongoose = require('mongoose');

const Schema = mongoose.Schema;     // Object describing the schema or the data type of each element

const locationSchema = new Schema({
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sample', locationSchema, 'location');