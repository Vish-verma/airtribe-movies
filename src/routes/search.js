const express = require("express");
const { searchMovie } = require("../controllers/search");
const router = express.Router();

router.get("/", searchMovie);

module.exports = router;
