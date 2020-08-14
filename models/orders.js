const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userid: String,
    name: String,
    price: Number,
    billingaddress: String,
    billingnumber: String,
    ordernumber: String,
    dispatched: String,
    quantity: Number
});
module.exports = mongoose.model('Order', orderSchema);