const express = require('express');
const route = express.Router();
const User = require('../../models/User');
const Product = require('../../models/Product');
const {isLoggedIn} = require('../../middleware')

route.post('/product/:id/like' ,isLoggedIn ,async (req,res)=>{
    let {id} = req.params;
    let user = req.user;
    // let prod = await Product.findById(id);
    let contain = user.wishlist.includes(id);
    // console.log(prod);
    // if(!contain){
    //     user.wishlist.push(prod);
    //     user.save();
    // }
    if(contain){
        await User.findByIdAndUpdate(user._id, {$pull : {wishlist : id}});
    }
    else{
        await User.findByIdAndUpdate(user._id, {$addToSet : {wishlist : id}});
    }
    res.send('Like Button Hits');
})

module.exports = route;