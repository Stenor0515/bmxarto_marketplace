const Nft = require("../models/nft.model")

// Create and Save a new nft
exports.create = (req, res) => {
  const nft = new Nft({
    tokenId: req.body.tokenId,
    tokenUri: req.body.tokenUri,
    price: req.body.price,
    currentOwner: req.body.currentOwner,
    creator: req.body.creator,
    forSale: req.body.forSale,
    createdAt: Date.now(),
  })
  nft
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        error:
          error.message || "Some error occurred while creating the NFT"
      })
    })
}

// Retrieve all nfts from the database.
exports.findAll = (req, res) => {
  Nft.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        error:
          error.message || "Some error occurred while retrieving nfts.",
      });
    });
};

// Find a single Nft with a tokenId
exports.findOne = (req, res) => {
  Nft.findOne({ "tokenId": req.params.tokenId })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "The Nft not found with the tokenId " + req.params.tokenId
        })
      }
      res.send(data)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The Nft not found with the tokenId " + req.params.tokenId
        });
      }
      return res.status(500).send({
        error: "Error retrieving Nft with tokenId " + req.params.tokenId,
      });
    });
}

// Find Nfts by the userAddress(owner)
exports.findOwnedNft = (req, res) => {
  Nft.find({ "currentOwner": req.params.currentOwner })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "The Nfts not found with the owner " + req.params.currentOwner
        })
      }
      res.send(data)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The Nfts not found with the owner " + req.params.owner
        });
      }
      return res.status(500).send({
        error: "Error retrieving Nfts with the owner " + req.params.owner,
      });
    });
}

// Find Nfts by the userAddress(creator)
exports.findCreatedNft = (req, res) => {
  Nft.find({ "creator": req.params.creator })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "The Nfts not found with the creator " + req.params.creator
        })
      }
      res.send(data)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The Nfts not found with the creator " + req.params.creator
        });
      }
      return res.status(500).send({
        error: "Error retrieving Nfts with the creator " + req.params.creator,
      });
    });
}

// Update a Nft identified by the tokenId in the request
exports.updateNft = (req, res) => {
  const update = {...req.body, updatedAt: Date.now()}
  Nft.findOneAndUpdate(
    { "tokenId": req.params.tokenId },
    update,
    {
      new: true,
      upsert: true
    }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "Nft not found with tokenId " + req.params.tokenId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "Nft not found with tokenId " + req.params.tokenId,
        });
      }
      return res.status(500).send({
        error: "Error updating Nft with tokenId " + req.params.tokenId,
      });
    });
};