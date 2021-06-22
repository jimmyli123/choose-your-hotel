const express = require('express')
const router = express.Router()
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
        hotels
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


module.exports = router