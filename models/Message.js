const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender ID is required']
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver ID is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    is_read: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});


const Message = mongoose.model('message', messageSchema);
module.exports = Message;