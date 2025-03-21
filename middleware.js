const Product = require('./models/Product');

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
       return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('success' , 'please first sign in with your specific role');
        return res.redirect('/login');
    }
    else if(req.user.role !== 'seller'){
        req.flash('success' , 'your role is as a buyer you are not able to add or edit any product');
        return res.redirect('/products');
    }
    next();
}

const isAuthor = async (req,res,next)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('success' , 'you are not the authorised User');
        return res.redirect('/products');
    }
    next();
}


module.exports = {isLoggedIn , isSeller , isAuthor};