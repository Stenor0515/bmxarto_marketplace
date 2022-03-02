const Author = require("../models/author.model")

// Create and Save a new author
exports.create = (req, res) => {
  const author = new Author(req.body)
  author
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        error:
          error.message || "Some error occurred while creating the Author"
      })
    })
}

// Retrieve all authors from the database.
exports.findAll = (req, res) => {
  Author.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        error:
          error.message || "Some error occurred while retrieving authors.",
      });
    });
};

// Find one author with a _id
exports.findOne = (req, res) => {
  Author.findById(req.params._id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "The Author not found with the _id " + req.params._id
        })
      }
      res.send(data)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The Author not found with the _id " + req.params._id
        });
      }
      return res.status(500).send({
        error: "Error retrieving Author with _id " + req.params._id,
      });
    });
}

// Find current author by the current wallet address
exports.findCurrentAuthor = (req, res) => {
  Author.findOne({ "walletAddress": req.params.walletAddress })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "The current Author not found with the current author " + req.params.walletAddress
        })
      }
      res.send(data)
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The current Author not found with the current author " + req.params.walletAddress
        });
      }
      return res.status(500).send({
        error: "Error retrieving current Author with the current author " + req.params.walletAddress,
      });
    });
}

// Update a author identified by the current wallet address in the request
exports.updateAuthor = (req, res) => {
  const update = { ...req.body }
  Author.findOneAndUpdate(
    { "walletAddress": req.params.walletAddress },
    update,
    {
      new: true,
      upsert: true
    }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          error: "Author not found with walletAddress " + req.params.walletAddress,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "Author not found with walletAddress " + req.params.walletAddress,
        });
      }
      return res.status(500).send({
        error: "Error updating Author with walletAddress " + req.params.walletAddress,
      });
    });
};

// Update a author's total transaction price by the current wallet address in the request
exports.addPrice = (req, res) => {
  Author.findOne({ "walletAddress": req.params.walletAddress })
    .then((data1) => {
      if (!data1) {
        return res.status(404).send({
          error: "The current Author not found with the current author " + req.params.walletAddress
        })
      }
      const update = { "transactionPrice": parseFloat(req.body.price) + parseFloat(data1.transactionPrice) }
      Author.findOneAndUpdate(
        { "walletAddress": req.params.walletAddress },
        update,
        {
          new: true,
          upsert: true
        }
      )
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              error: "Author not found with walletAddress " + req.params.walletAddress,
            });
          }
          res.send(data);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              error: "Author not found with walletAddress " + req.params.walletAddress,
            });
          }
          return res.status(500).send({
            error: "Error updating Author with walletAddress " + req.params.walletAddress,
          });
        });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          error: "The current Author not found with the current author " + req.params.walletAddress
        });
      }
      return res.status(500).send({
        error: "Error retrieving current Author with the current author " + req.params.walletAddress,
      });
    });
};