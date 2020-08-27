const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orders");
router.post("/addorder", (req, res, next) => {
  console.log(req.body);
  Order.create({
    userid: req.body.userid,
    billingaddress: req.body.billingaddress,
    billingnumber: req.body.billingnumber,
    price: req.body.price,
    name: req.body.name,
    ordernumber: req.body.ordernumber,
    dispatched: "no",
    quantity: req.body.quantity
  })
    .then(order => {
      res.json({ status: "Product Added!" });
    })
    .catch(next);
});
router.post("/addorder1", (req, res, next) => {
  console.log(req.body);
  Order.create({
    userid: req.body.userid,
    billingaddress: req.body.billingaddress,
    billingnumber: req.body.billingnumber,
    price: req.body.product.price,
    name: req.body.product.name,
    ordernumber: req.body.ordernumber,
    dispatched: "no",
    quantity: req.body.quantity
  })
    .then(order => {
      res.json({ status: "Product Added!" });
    })
    .catch(next);
});
router.get("/checkorder/:id", (req, res, next) => {
  Order.find({ userid: req.params.id })
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
router.get("/getorder", (req, res, next) => {
  Order.find()
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
router.get("/orderget/:id", function(req, res, next) {
  console.log(req.params.id);

  Order.findOne({ billingnumber: req.params.id })
    .then(order => {
      if (order.dispatched == "yes") {
        res.send({ status: "Successfully Dispatched" });
      } else if (order.dispatched == "") {
        res.send({ status: "Not Found" });
      } else {
        res.send({ status: "Not Dispatched" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.put("/updatestatus/:id", function(req, res, next) {
  var id = req.params.id;
  Order.findOne({ _id: id }, function(err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.dispatched) {
          foundObject.dispatched = req.body.dispatched;
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

module.exports = router;
