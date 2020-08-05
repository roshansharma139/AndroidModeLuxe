const express = require('express');
const router = express.Router();
const MainProductRoute = require('../models/mainproduct');
router.post('/addmainproducts', (req, res, next) => {
    MainProductRoute.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        specification: req.body.specification
    }).then((mainproduct) => {
        res.json({ status: "Product Added!" });
    }).catch(next);
});
router.get('/getmainproduct', (req, res, next) => {
    MainProductRoute.find()
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

router.delete('/deletemainproduct/:id', function (req, res, next) {
    MainProductRoute.findByIdAndDelete(req.params.id).then(response => {
        console.log("Product detleted of" + req.params.id)
    })
})
router.get('/:id', function (req, res) {
    MainProductRoute.findById(req.params.id)
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
})

router.put('/updatemainproduct/:id', (req, res, next) => {
    MainProductRoute.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        specification: req.body.specification,
        price: req.body.price
    }, { new: true })
});

router.get('/getproductc', (req, res, next) => {

    MainProductRoute
        .find()
        .sort('-_id')
        .populate('category')
        .exec(function (error, results) {
            res.send(results);
        });
})

module.exports = router;