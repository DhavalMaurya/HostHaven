const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    price_per_night: {
        type: Number,
        required: [true, 'Price per night is required'],
        min: [0, 'Price cannot be negative']
    },
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Host ID is required']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (coords) {
                    return coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]);
                },
                message: 'Coordinates must be an array of two numbers [longitude, latitude]'
            }
        }
    },
    images: [{
        type: String,
        validate: {
            validator: function (url) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
            },
            message: 'Please provide a valid image URL'
        }
    }],
    category: {
        type: String,
        enum: ['Apartment', 'Farmhouse', 'Villa' , 'Others'],
        required: [true, 'Category ID is required']
    },
    amenities: [{
        type: String,
        trim: true
    }],
    house_rules: [{
        type: String,
        trim: true
    }],
    approval : {
        type : Boolean,
        default : false
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Index for geospatial queries
propertySchema.index({ location: '2dsphere' });

// Update the `updated_at` field before saving
propertySchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Property = mongoose.model('property', propertySchema);
module.exports = Property;