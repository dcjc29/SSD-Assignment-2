const express = require("express");
const router = express.Router();

const { getBook, getBooks, addBook,getDigitalCopy} = require("../controllers/books.js");

router.route("/").post(addBook);
router.route("/").get(getBooks);
router.route("/getDigitalCopy").post(getDigitalCopy);
router.route("/:id").get(getBook);

module.exports = router;
