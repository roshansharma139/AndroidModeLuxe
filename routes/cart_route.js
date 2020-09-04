const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const router = new express.Router();
const bodyParser = require('body-parser');
var app = express();
const Product = require('../models/products');
const auth = require('../auth')
router.get('/', function (req, res) {
    Cart.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post('/addcart', (req, res, next) => {
    console.log(req.body.productid);
    console.log("This is name" + req.body.name)
    Cart.create({
        productid: req.body.productid,
        userid: req.body.userid,
        price: req.body.price,
        name: req.body.name,
        description: req.body.description,
        specification: req.body.specification
    }).then((cart) => {
        console.log(req.body);
        res.json({ status: "Cart Added!" });
    }).catch(next);
});
router.post('/addcart1', (req, res, next) => {
    console.log(req.body.productid);
    console.log("This is name" + req.body.name)
    Cart.create({
        productid: req.body.productid,
        userid: req.body.userid,
        price: req.body.product.price,
        name: req.body.product.name,
        description: req.body.product.description,
        specification: req.body.product.specification
    }).then((cart) => {
        console.log(req.body);
        res.json({ status: "Cart Added!" });
    }).catch(next);
});

router.delete('/deletecart/:id', function (req, res) {
    Cart.findByIdAndDelete(req.params.id, req.body, function (err, register) {
        if (err) return next(err);
        res.json(register);
    });
});
router.post("/checkcart", function (req, res) {
    console.log(req.body.productid + "is prodict id ");
    console.log(req.body.userid + "is user id ")
    const pp = Cart.find({ productid: req.body.productid, userid: req.body.userid }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "addhere" });
        }
        else {
            res.send({ status: "cantadd" });
        }
    })
})



router.post("/checkcart90", function (req, res) {
    const pp = Cart.find({ productid: req.body.productid, userid: req.body.userid }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "addhere" });
        }
        else {
            res.send({ status: "cantadd" });
        }
    })
})



router.get("/checkcart1/:id", auth.verifyUser, function (req, res) {
    console.log(req.params.id);
    console.log(register._id)
    const pp = Cart.find({ productid: req.params.id, userid: req.register._id }).countDocuments().then(function (count) {
        if (count == 0) {
            res.send({ status: "addhere" });
        }
        else {
            res.send({ status: "cantadd" });
        }
    })
})

router.get('/check/:id', (req, res, next) => {
    Cart.find({ userid: req.params.id }).then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

// .put((req, res, next) => {
//     Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         .then((task) => {
//             res.json(task);
//         }).catch(next);
// })
// .delete((req, res, next) => {
//     Task.findByIdAndDelete(req.params.id)
//         .then((task) => {
//             res.json(task);
//         }).catch(next);

router.route('/cartsitem')
    .get((req, res, next) => {
        Cart.find({ userid: req.cart.userid })
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })

module.exports = router;
