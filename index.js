const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User  = require('./models/User');


// require routing 
const productRoute = require('./routes/product');
const reviewRoute = require('./routes/review');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const likeRoute = require('./routes/api/productlike');
const { serialize } = require('v8');



// mongoose connect
mongoose.connect('mongodb://127.0.0.1:27017/project')
.then(()=>{
    console.log("DB is Connected Successfully");
})
.catch((err)=>{
    console.log("DB is Failed to connect");
    console.log(err);
})


// to set a engine for ejs to use extra methods
app.engine('ejs' , ejsMate);

// this is for ejs files
app.set('view engine','ejs');
app.set('views' , path.join(__dirname , "views"));

// for set public folder
app.use(express.static(path.join(__dirname , 'public')));

// for setting post request middleware
app.use(express.urlencoded({extended : true}));

// to override the post request into patch prequest
app.use(methodOverride('_method'));

// for set up session middleware 
let connect = {
    secret: 'My personal Secret key',
    resave: false,
    saveUninitialized: true,
    // here i comment out the cookie part because i did not require cookie parser middle ware 
    // cookie: { secure: true }
    // if i dont comment it then my flash does not able to retrieve the data from the flash
  }
app.use(session(connect));


// for set up a flash to show the message while on doing some perticular task
app.use(flash());
// app.use((req,res,next) =>{
//     res.locals.success = req.flash('success');

// })


// setup four middleware for passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// last middleware for passport  user authentication
passport.use(new LocalStrategy(User.authenticate()));



// now i created a middleware for flash to save the data in direct our locals storage so that it will run on all upcoming request to save our time to directly found in locals storage
app.use((req,res,next) =>{
    res.locals.currentuser = req.user;
    // console.log(req.user);
    res.locals.success = req.flash('success');
    next();
})

// to save dummy data
// seedDB();


// routing for product
app.use(productRoute);

// routing for review
app.use(reviewRoute);

// routing for authentication
app.use(authRoute);

// cart routing
app.use(cartRoute);

// like routing
app.use(likeRoute);



const port = 8000;
app.listen(port , ()=>{
    console.log(`Server is Connected at port no http://localhost:${port}`);
})