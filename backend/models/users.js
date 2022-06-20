const mongoose = require('mongoose');
const Costs = require('./cost')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, "First name can not be more than 20 characters"],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [20, "Last name can not be more than 20 characters"],
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  maritalStatus: String,
  totalCost: {
    type: Number,
    default: 0,
  },
  
});

userSchema.methods.updateTotalCost = async function () {
  const costs = await Costs.find({ user: this._id });
  let totalCost = 0;
  costs.forEach((cost) => {
    totalCost += cost.amount;
  });

  await this.updateOne({ totalCost: totalCost });
};

module.exports = mongoose.model("users", userSchema);
