const mongoose = require('mongoose');
const Category = mongoose.Schema(
    {
        categoryName: {
            type: String
        }
    })
module.exports = mongoose.model('category', Category);
