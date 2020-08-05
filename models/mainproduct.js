const mongoose = require('mongoose');
const ProductMainSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    specification: String
});
module.exports = mongoose.model('product', ProductMainSchema);
