const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating : {
        type : Number,
        required : true,
        min :0,
        max : 5
    },
    comment : {
        type : String,
        required:true,
        trim : true
    }
});


let Review = mongoose.model('Review',reviewSchema);

module.exports = Review;


