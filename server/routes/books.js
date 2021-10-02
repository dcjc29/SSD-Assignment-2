const express = require("express");
const router = express.Router();

const { getBook, getBooks, addBook } = require("../controllers/books.js");

router.route("/").post(addBook);
router.route("/").get(getBooks);
router.route("/:id").get(getBook);

module.exports = router;
