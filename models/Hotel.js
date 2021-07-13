const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        require: true,
    },
    hotelAddress: {
        type: String,
        require: true,
    },
    image: {
        type: [String],
        require: false,
      },
    hotelState: {
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
        type: String,
        enum: ["Yes", "No"],
        require: true,
    }, 
    cloudinaryId: {
        type: String,
        require: false,
      },

})

module.exports = mongoose.model('Hotel', HotelSchema)