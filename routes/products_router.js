const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/products");

router.post("/addproducts", (req, res, next) => {
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    specification: req.body.specification,
    categoryid: req.body.categoryid
  })
    .then(product => {
      res.json({ status: "Product Added!" });
    })
    .catch(next);
});

router.get("/getproduct", (req, res, next) => {
  Product.find()
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

router.delete("/deleteproduct/:id", function(req, res, next) {
  Product.findByIdAndDelete(req.params.id).then(response => {
    console.log("Product detleted of" + req.params.id);
  });
});

router.get("/:id", function(req, res) {
  Product.findById(req.params.id)
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

router.put("/updateproduct/:id", function(req, res, next) {
  var id = req.params.id;
  Product.findOne({ _id: id }, function(err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.name) {
          foundObject.name = req.body.name;
        }
        if (req.body.price) {
          foundObject.price = req.body.price;
        }
        if (req.body.description) {
          foundObject.description = req.body.description;
        }

        foundObject.save(function(err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
});

router.get("/getproductc", (req, res, next) => {
  Product.find()
    .sort("-_id")
    .populate("category")
    .exec(function(error, results) {
      res.send(results);
    });
});

module.exports = router;
