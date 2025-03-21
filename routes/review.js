const Product = require('../models/Product');
const Review = require('../models/Review');
const express = require('express');
const { route } = require('./product');
const router = express.Router();


// add a comment on specific path
router.post('/products/:id/review',async (req,res)=>{
    let {id} = req.params;
    let {rating , comment} = req.body;
    let review = new Review({rating , comment});
    let product =await Product.findById(id)
    product.reviews.push(review._id);
    await review.save();
    await product.save();
    req.flash('success' , 'the review successfully added');
    res.redirect(`/products/${id}`);
})

module.exports = router;
