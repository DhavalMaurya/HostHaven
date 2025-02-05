const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    guest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require : true,
    },
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'property',
        require : true,
    },
    review : {
        type : String,
        require : [true , "Review cant be empty"],
    },
    rating : {
        type : Number,
        require : [true , "rating cant be empty"],
        min : 1,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

const Review = mongoose.model("review" , reviewSchema);
module.exports = Review;
