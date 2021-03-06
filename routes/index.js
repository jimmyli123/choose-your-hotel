const express = require('express')
const router = express.Router()
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Hotel = require('../models/Hotel');
const User = require('../models/User');

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'loginLayout'
    })
})


// @desc    Shows the list of hotels that user has selected
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req,res)=> {
    try {
        let userArray = req.user.myHotels
        const hotels = await Hotel.find({_id: { $in: userArray}}).lean()
        res.render('dashboard', {
        hotels
    })

    } catch (error) {
        console.log(`Error happened at get/dashboard: ${error}`)
    }
    
})

// @desc    Shows the list of hotels that user has selected
// @route   GET /dashboard
router.put('/remove', ensureAuth, async (req,res)=> {
    try {
        // console.log(req.user)
        await User.findByIdAndUpdate(req.user._id, {$pull: {myHotels: req.body.idToRemove}})
        res.json('Remove completed')
    }
    catch (error) {
        console.log(`Error happened at put/remove: ${error}`)
    }
    
})


// @desc    Compares hotels the user has selected
// @route   GET /compare
router.get('/compare', async (req,res)=> {

    try {
        let currentUser = await User.findById({ _id: req.user._id})
        let selectedHotels = await Hotel.find({_id: { $in: currentUser.myHotels}}).lean()
        
        console.log(`GET /compare`)
        res.render('comparePage', {hotels: selectedHotels} )
        
    } catch (error) {
        console.log(`Error happened at get/compare: ${error}`)
    }
    
})

// @desc    Shows the list of all hotels
// @route   GET /hotelList
router.get('/hotelList', ensureAuth, async (req,res)=> {
    try {
        let hotels = await Hotel.find().lean()
        res.render('hotelList', {
        hotels,
    })

    } catch (error) {
        console.log(`Error happened at get/hotelList: ${error}`)
    }
    
})

// @desc    Renders the page to add new hotels to our database.
// @route   GET /hotels/add
router.get('/hotels/add', ensureAuth, async(req,res) => {
    try {
        res.render('hotels/add')
    } catch (error) {
        
    }
})

// @desc    Renders the individual hotel page
// @route   GET /hotels/id
router.get('/hotels/:id', ensureAuth, async(req,res) => {
    try {
        let thisHotel = await Hotel.findById({_id: req.params.id}).lean()
        console.log(thisHotel)
        res.render('hotels/hotel', thisHotel)
    } catch (error) {
        
    }
})

// @desc    Add a hotel to user list.
// @route   GET /hotels/addTo/List
router.get('/hotels/addToList/:id', ensureAuth, async (req,res) => {
    try {
        console.log(req.user)
        let currentUser = await User.findOneAndUpdate({_id: req.user}, {
            $push: { myHotels: req.params.id}
        })
        res.redirect('/hotelList')
    } catch (error) {
        console.log(error)
        return res.render('error/500')
    }
})

// @desc    Process add form
// @route   POST /stories
router.post('/hotels/add', ensureAuth, upload.array("file",5), async (req, res) => {
    // Upload image to cloudinary
    
    try{
        console.log(req.body)
        console.log(req.files) // This gives us an array of each image uploaded.
        let imgUrls = []
        for (const eachFile of req.files) {
            const result = await cloudinary.uploader.upload(eachFile.path);
            imgUrls.push(result.secure_url)
        }

        // const result = await cloudinary.uploader.upload(req.files[0].path);
        // const result2 = await cloudinary.uploader.upload(req.files[1].path);
        // console.log(result)
    
        // await Hotel.create(req.body)
        await Hotel.create({
            hotelName: req.body.hotelName,
            hotelAddress: req.body.hotelAddress,
            hotelCity: req.body.hotelCity,
            hotelState: req.body.hotelState,
            country: req.body.country,
            priceRange: req.body.price,
            hasPool: req.body.pool,
            // image: result.secure_url,
            image: imgUrls,
            // cloudinaryId: result.public_id,
        })

        

        res.redirect('/hotelList')
    } catch(err) { 
        console.log(err)
        res.render('error/500')
    }
})


// @desc    Add a hotel to user list.
// @route   GET /hotels/addTo/List
router.delete('/hotels/:id', ensureAuth, async (req,res) => {
    try {
        await Hotel.deleteOne({ _id: req.params.id})
        res.redirect('/hotelList')
    } catch (error) {
        console.log(error)
        return res.render('error/500')
    }
})

module.exports = router