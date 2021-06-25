const express = require('express')
const router = express.Router()
const cloudinary = require("../middleware/cloudinary");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Hotel = require('../models/Hotel')

router.get('/', ensureGuest, (req, res) => {
    console.log(req.user)
    res.render('login', {
        layout: 'loginLayout'
    })
})

router.get('/dashboard', ensureAuth, async (req,res)=> {
    try {
        let hotels = await Hotel.find().lean()
        res.render('dashboard', {
        hotels,
    })

    } catch (error) {
        console.log(`Error happened at get/dashboard: ${error}`)
    }
    
})

router.get('/hotels/add', ensureAuth, async(req,res) => {
    try {
        res.render('hotels/add')
    } catch (error) {
        
    }
})

// @desc    Process add form
// @route   POST /stories
router.post('/hotels/add', ensureAuth, upload.single("file"), async (req, res) => {
    // Upload image to cloudinary
    
    try{
        console.log(req.body)
        const result = await cloudinary.uploader.upload(req.file.path);
        // await Hotel.create(req.body)
        await Hotel.create({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            price: req.body.price,
            image: result.secure_url,
            cloudinaryId: result.public_id,
        })
        res.redirect('/dashboard')
    } catch(err) { 
        console.log(err)
        res.render('error/500')
    }
})

module.exports = router