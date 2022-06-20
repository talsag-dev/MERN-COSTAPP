const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../utils/checkObjectId");


router.post(
  "/newUser",
  check("firstName", "Name is required").notEmpty(),
  check("lastName", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        birthday: req.body.birthday,
        maritalStatus: req.body.maritalStatus,
      });

      const result = await newUser.save();
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

  }
);

router.get(
  "/:id",
  checkObjectId('id'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
      }
  }
);


// router.post('/create', function (req, res) {
//     isValidUserID(req.body.userId, function (result) {
//         if (!result) {
//             const user = req.body;
//             const userName = `${user.firstName} ${user.lastName}`;
//             User.create(user)
//                 .then(function (doc) {
//                     res.json(myResponse(true, `${userName} has been created successfully!`))})
//                 .catch(function (result) {
//                     res.json(myResponse(false, 'There was an error in creating the user. Try again!'))})
//         } else {
//             res.json(myResponse(false, `The ID (${req.body.userId}) is already in use`));
//         }
// })})




module.exports = router

