const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
// const { route } = require('./product');



router.get('/register' , (req,res)=>{
    res.render('auth/signup');
});

router.post('/register' ,async (req,res) => {
    let {username,email,password,role} = req.body;
    const user = new User({username , email,role});
    const newUser = await User.register(user , password);
    req.login(newUser, function(err) {
        if (err) { return next(err); }
        return res.redirect('/products');
    })
})


router.get('/login' , (req,res)=>{
    res.render('auth/login');
})

router.post('/login' , 
    passport.authenticate('local' , {
        failureRedirect: '/login', 
        failureMessage: true 
    }), 
    (req,res) =>{
        req.flash('success' , "Hey Welcome back");
        res.redirect('/products');
    }
)

router.get('/logout' ,(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , "successfully logout");
    res.redirect('/login');
})



module.exports = router;