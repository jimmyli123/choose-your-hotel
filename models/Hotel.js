const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    priceRange: {
        type: String,
        enum: ['$','$$','$$$','$$$$'],
        require: true
    }

})

module.exports = mongoose.model('Hotel', HotelSchema)