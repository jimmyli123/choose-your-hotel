const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest, (req, res) => {
    console.log(req.user)
    res.render('login', {
        layout: 'loginLayout'
    })
})

router.get('/dashboard', ensureAuth, (req,res)=> {
    res.render('dashboard')
})


module.exports = router