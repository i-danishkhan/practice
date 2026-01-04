const mongoose = require('mongoose');

// define the menu schema
const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['appetizer', 'main course', 'dessert', 'beverage'],
        required: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;