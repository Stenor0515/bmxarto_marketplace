const mongoose = require("mongoose");

const NftSchema = mongoose.Schema({
  tokenId: {
    type: Number,
    required:true,
    index: {
      unique:true
    }
  },
  tokenUri: {
    type: String,
    required:true
  },
  price: Number,
  currentOwner: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  forSale: {
    type: String,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model("Nft", NftSchema);