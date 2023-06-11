const express = require("express");
const { sequalize } = require("../configs/mysqldb");
const {
    getAllMovies,
    getMovieById,
    getMovieRatings
} = require("../controllers/movie");
const router = express.Router();

router.get("/", getAllMovies);
router.get("/:movieId", getMovieById);
router.get("/:movieId/ratings", getMovieRatings);

module.exports = router;
