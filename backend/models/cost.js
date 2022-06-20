const mongoose = require('mongoose');


const costSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Clothing", "Entertainment", "Transportation", "Other..."],
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("cost", costSchema);;
