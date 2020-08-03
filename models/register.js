const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Register = new mongoose.Schema(
    {
        fname: {
            type: String
        },
        lname: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        number: {
            type: String
        }
    });

module.exports = mongoose.model('register', Register);