const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("../models/register");
const router = express.Router();
const auth = require("../auth");

//used for registering user
router.post("/register_user", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Register.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      number: req.body.number
    })
      .then(register => {
        let token = jwt.sign({ _id: register._id }, process.env.SECRET);
        res.json({ status: "Signup success!", token: token });
      })
      .catch(next);
  });
});

//forgot password
router.post("/forgotpassword", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Register.findOne({
      email: req.body.email,
      number: req.body.number
    })
      .then(register => {
        password: hash;
      })
      .catch(next);
  });
});

//login user
router.post("/login_user", (req, res, next) => {
  console.log(req.body);
  Register.findOne({ email: req.body.email })
    .then(register => {
      if (register == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, register.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }

            let token = jwt.sign({ _id: register._id }, process.env.SECRET);
            console.log(token);
            res.json({ status: "Login success!", token: token });
          })
          .catch(next);
      }
    })
    .catch(next);
});

//mydetails
router.get("/me", auth.verifyUser, (req, res, next) => {
  let password = req.Register.password;
  bcrypt.hash(password, 10);
  res.json({
    _id: req.Register._id,
    fname: req.Register.fname,
    lname: req.Register.lname,
    email: req.Register.email,
    address: req.Register.address,
    number: req.Register.number
  });
});

//updating my detail
router.put("/me", auth.verifyUser, (req, res, next) => {
  Register.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
    .then(register => {
      res.json({
        fname: register.fname,
        lname: register.lname,
        address: register.address
      });
    })
    .catch(err => {
      res.status(400);
    });
});

router.put("/updateuserr/:id", function(req, res, next) {
	var id = req.params.id;
	Register.findOne({ _id: id }, function(err, foundObject) {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else {
			if (!foundObject) {
				res.status(404).send();
			} else {
				if (req.body.fname) {
					foundObject.fname = req.body.fname;
				}
				if (req.body.lname) {
					foundObject.lname = req.body.lname;
				}
				if (req.body.address) {
					foundObject.address = req.body.address;
				}
				if (req.body.number) {
					foundObject.number = req.body.number;
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


//getting all users for admin panel
router.get("/getusers", (req, res, next) => {
  Register.find()
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

//deleting users
router.delete("/deleteuser/:id", function(req, res, next) {
  Register.findByIdAndDelete(req.params.id).then(response => {
    console.log("User detleted of" + req.params.id);
  });
});

//exporting current route
module.exports = router;
