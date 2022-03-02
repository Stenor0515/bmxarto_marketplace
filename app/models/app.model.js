const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  sender:{
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  },
  createdAt: {
    type:Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model("App", AppSchema);