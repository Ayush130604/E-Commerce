const express = require('express');
const Product = require('../models/Product'); 
const Review = require('../models/Review');
const router = express.Router();
const {isLoggedIn , isSeller , isAuthor} = require('../middleware');


// to show all the product
router.get('/products' , isLoggedIn,async (req,res)=>{
    let allproducts = await Product.find({});
    res.render('products/index' , {allproducts});
})


// to render on new product page
router.get('/product/new' , isLoggedIn, isSeller , (req,res)=>{
    res.render('products/new');
})


// to add a new product and redirect to the products page
router.post('/products' ,isLoggedIn, isSeller , async (req,res) =>{
    let {name , img, price , desc} = req.body;
    await Product.create({name , img, price , desc , author:req.user._id});
    req.flash('success' , 'the product is added successfully');
    res.redirect('/products');
})


//  to show the one products
router.get('/products/:someid' ,isLoggedIn, async (req,res) =>{
    let {someid} = req.params;
    let foundProduct =await Product.findById(someid).populate('reviews'); //here 'reviews' is the name of that array that is form in the product schema with same name 'reviews'
    
    // let msg = req.flash('success');
    // req.flash() retrieve data only one time after that if you call req.flash() again then it will give you an empty array;
    // let success = req.flash('success');
    res.render('products/show' , {foundProduct});
})

// to edit a perticular product
router.get('/products/:id/edit' , isLoggedIn , isSeller ,  async (req,res)=>{
    let {id} = req.params;
    let foundProduct =await Product.findById(id);
    res.render('products/edit' , {foundProduct});
})

// to show editide product
router.patch('/products/:id' ,isLoggedIn, isSeller , async (req,res)=>{
    let {id} = req.params;
    let {name , img, price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img, price , desc});
    req.flash('success' , 'the product edit successfully');
    res.redirect(`/products/${id}`);
})


// to delete a product
router.delete('/products/:id', isLoggedIn , isAuthor , async (req,res) =>{
    let {id} = req.params;
    let foundProduct =await Product.findById(id);
    for(let id of foundProduct.reviews){
        await Review.findByIdAndDelete(id);
    }
    await Product.findByIdAndDelete(id);
    req.flash('success' , 'the product deleted successfully');
    res.redirect('/products')
})

module.exports = router;