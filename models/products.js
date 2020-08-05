const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    specification: String

});
module.exports = mongoose.model('global_product', productSchema);
