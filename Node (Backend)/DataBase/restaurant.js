const mongoose = require('mongoose');

const Schema = mongoose.Schema;     // Object describing the schema or the data type of each element

const restaurantSchema = new Schema({
    city: {
        type: Number
    }
})

module.exports = mongoose.model('sample123', restaurantSchema, 'restaurant');