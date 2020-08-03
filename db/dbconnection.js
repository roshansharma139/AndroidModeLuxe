const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ecommerce:1234567890@cluster0.ccaxc.mongodb.net/ecommerce', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));