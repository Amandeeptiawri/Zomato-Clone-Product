const mongoose = require('mongoose');

const Schema = mongoose.Schema;     // Object describing the schema or the data type of each element

const mealtypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('connection', mealtypeSchema, 'mealtype');