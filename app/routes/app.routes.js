module.exports = (app) => {

  const App = require("../controllers/app.controller");
  const Nft = require("../controllers/nft.controller")
  const Author = require("../controllers/author.controller")

  /**
   * @access public
   * @description Contact to the admin.
   */
  app.post("/create", App.create);

  app.get("/get-all", App.findAll);

  app.get("/message/:messageId", App.findOne);

  app.put("/message/:messageId", App.update);

  app.delete("/message/:messageId", App.delete);

  /**
   * @access public
   * @returns NFT details
   */
  app.post("/nft/create", Nft.create)

  app.get("/nft/get-one/:tokenId", Nft.findOne)

  app.get("/nft/get-all", Nft.findAll)

  app.get("/nft/get-owned/:currentOwner", Nft.findOwnedNft)

  app.get("/nft/get-created/:creator", Nft.findCreatedNft)

  app.put("/nft/update/:tokenId", Nft.updateNft)

  /**
   * @access public
   * @returns Author details
   */
  app.post("/author/create", Author.create)

  app.get("/author/get-all", Author.findAll)

  app.get("/author/get-one/:_id", Author.findOne)

  app.get("/author/get-current/:walletAddress", Author.findCurrentAuthor)

  app.put("/author/update/:walletAddress", Author.updateAuthor)

  app.put("/author/add-price/:walletAddress", Author.addPrice)
};
