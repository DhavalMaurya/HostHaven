const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: [true, 'Property ID is required']
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Guest ID is required']
    },
    check_in: {
        type: Date,
        required: [true, 'Check-in date is required']
    },
    check_out: {
        type: Date,
        required: [true, 'Check-out date is required'],
        validate: {
            validator: function (value) {
                return value > this.check_in;
            },
            message: 'Check-out date must be after check-in date'
        }
    },
    total_price: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative']
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
        required: true
    },
    booking_status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Update the `updated_at` field before saving
bookingSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;