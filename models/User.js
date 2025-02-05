const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
    },
    profile_picture: {
        type: String,
        default: 'https://example.com/default-profile-picture.jpg'
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    }],
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'guest',
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    token : {
        type: String,
    },
    reset_password_expiry : {
        type : Date,
    }
});

// Update the `updated_at` field before saving
userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;