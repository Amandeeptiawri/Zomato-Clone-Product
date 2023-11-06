const mongoose = require('mongoose');

const Schema = mongoose.Schema;     // Object describing the schema or the data type of each element

const itemSchema = new Schema({
    name: {
        type: String
    },
    restaurantId: {
        type: String
    }
})

module.exports = mongoose.model('menuConnection', itemSchema, 'menu');