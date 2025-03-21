const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

router.get('/cart' , isLoggedIn ,async (req,res)=>{
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart' , {user});
})

router.post('/cart/:id' , isLoggedIn, async (req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    let user = await User.findById(req.user._id);
    if(user.cart.includes(product._id)){
        req.flash('success' , 'Product already in cart');
        res.redirect(`/products/${id}`);
    }
    else{
        user.cart.push(product._id);
        user.save();
        res.redirect('/cart');
    }
})


module.exports = router;