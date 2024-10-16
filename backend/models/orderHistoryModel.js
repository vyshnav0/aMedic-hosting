const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    stockAtOrder: {
        type: Number,
        required: true
    }
}, { collection: 'orderHistory' }); // Explicit collection name
// normal way wont work cz Mongoose will look for a collection named orderhistories (lowercased and pluralized).


const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
module.exports = OrderHistory;