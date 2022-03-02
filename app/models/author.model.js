const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  authorName: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  walletAddress: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  authorAvatar: {
    type: String,
    default: "https://bafybeib2b5otdmemc23wn4dbopvevgeel3fj3ahon5r27c4yxikqqi27cy.ipfs.infura-ipfs.io/"
  },
  authorBio: String,
  location: String,
  phoneNumber: String,
  email: String,
  facebook: String,
  instagram: String,
  twitter: String,
  transactionPrice: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("Author", AuthorSchema)