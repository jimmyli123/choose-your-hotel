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
    image: {
        type: [String],
        require: false,
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
    },
    hasPool: {
        type: Boolean,
        require: true,
    }, 
    cloudinaryId: {
        type: String,
        require: false,
      },

})

module.exports = mongoose.model('Hotel', HotelSchema)