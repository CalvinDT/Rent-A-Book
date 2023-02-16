const { Book } = require("../../models");
const booksController = require("../../controllers/booksController");
const router = require("express").Router();

// Matches with "/api/books"
router.route("/").get(booksController.findAll).post(booksController.create);

// Matches with "api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove)
  
router.put("/renting/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let book = await Book.findByIdAndUpdate(req.params.id, {
      currentRenter: req.body.currentRenter,
    });
    console.log(book);
    res.json(book);
  } catch (ex) {
    res.json(ex);
  }
});


module.exports = router;