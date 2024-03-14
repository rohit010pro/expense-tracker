const mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemCost: {
        type: Number,
        required: true
    },
    itemCategory: [String],
    paymentMode: Number,
    shopDetails: {
        shopName: String,
        shopAddress: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
})

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;