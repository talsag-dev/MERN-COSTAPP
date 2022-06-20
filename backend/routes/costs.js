
const User = require('../models/users');
const Cost = require("../models/cost");
const express = require('express');
const { check, validationResult } = require('express-validator');
const checkObjectId = require("../utils/checkObjectId");


const router = express.Router();

// const isValidUserID = require('./routes/users').isValidUserID;

// router.post('/create', function (req, res) {
//     isValidUserID(req.body.userId, function(user) {
//         if (user){
//             const userName = `${user.firstName} ${user.lastName}`;
//             Cost.create(req.body)
//                 .then(function (result) {

//                     const prevCost = user.totalCosts.get(req.body.monthAndYear);
//                     User.updateOne({userId: req.body.userId}
//                         , { $set: { [`totalCosts.${req.body.monthAndYear}`] : parseInt(req.body.sum) + (prevCost ? prevCost:0)}})
//                         .then( ()=> {
//                             res.json(myResponse(true,`Cost has been added to ${userName} (ID:${user.userId})`));})
//                         .catch( () =>{
//                             res.json(myResponse(false, `Error in updating the cost for ${user.userId}`));
//                         })
//                 })
//                 .catch(function (result) {
//                     console.log(result);
//                     res.json(myResponse(false, 'There was an error creating the cost'));
//                 })


//         } else {
//             res.json(myResponse(false, 'ID not found!'));
//         }
//     })

// });





// @route    POST api/create
// @desc     Create a cost
// @access   Public
router.post('/newCost',check('user').notEmpty(),check('category').notEmpty(),check('amount').notEmpty(),async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
              return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findOne({_id: req.body.user});

        const newCost = new Cost({
            user: req.body.user,
            category: req.body.category,
            description: req.body.description,
            amount: req.body.amount,
            date: req.body.date
        })

        const result = await newCost.save();
        user.updateTotalCost();
        res.json(result)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET api/costs/:id
// @desc     Get cost by ID
// @access   Public
router.get('/getSpesificCost/:id', checkObjectId('id'), async (req, res) => {
  try {
    const cost = await Cost.findById(req.params.id);

    if (!cost) {
      return res.status(404).json({ msg: "Cost not found" });
    }

    res.json(cost);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/costs/getCostsbyMonthandYear
// @params   userId: user id, month: month, year: year
// @desc     Get costs of user in spesific year and month 
// @access   Public
router.get("/getcostsbymonthandyear/", async (req, res) => {
  try {
    checkObjectId(req.query.userId);
    const cost = await Cost.find({user:req.query.userId});

    if (!cost) {
      return res.status(404).json({ msg: "Cost not found" });
    }
    if (req.query.date) {
        const date = new Date(req.query.date);
        const filteredCost = cost.filter(cost => {
            return (
              cost.date.getMonth() ===
                date.getMonth() &&
              cost.date.getFullYear() === date.getFullYear()
            );
        })
        res.json(filteredCost);
    }
    else{
        return res.status(404).json({ msg: "no month and year were given or no costs found" });
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// router.get('/get', function (req, res) {
//     isValidUserID(req.query.userId, async function (user){
//         if (user) {
//             const cost = user.totalCosts.get(req.query.monthAndYear)
//             if (cost){
//                 res.json(myResponse(true, null, cost));
//             } else {
//                 res.json(myResponse(false, 'Cost not found'))
//             }

//         } else {
//             res.json(myResponse(false, 'ID not found'))
//         }
//     })
//     //JSON.stringify()

// })



// function myResponse(state, message, body){
//     return (
//         {
//             state: state,
//             message: message,
//             body: body
//         }
//     )
// }


module.exports = router;
