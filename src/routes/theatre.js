const express = require("express");
const router = express.Router();
const {
  getAllTheatres,
  getTheatreShows,
} = require("../controllers/theatre.js");

//get All theatres or based on city
router.get("/", getAllTheatres);

router.get("/:theatreId", getTheatreShows);

module.exports = router;
