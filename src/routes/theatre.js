const express = require("express");
require("../models/index");
const Theatre = require("../models/theatres");
const MovieTheatreMapping = require("../models/movieTheatreMappings");
const router = express.Router();

//get All theatres or based on city
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    let theatres = [];
    if (city) {
      theatres = await Theatre.find({
        where: {
          city: city,
        },
      });
    } else {
      theatres = await Theatre.findAll();
    }
    if (theatres.length == 0) {
      return res.status(404).json({ message: "No Result Found." });
    }
    return res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
});

router.get("/:theatreId", async (req, res) => {
  try {
    const { theatreId } = req.params;
    const { date } = req.query;
    let theatreMovies = await MovieTheatreMapping.findAll({
      where: {
        theatreId: theatreId,
        date: new Date(date),
      },
      include: [
        {
          model: Movie,
          attributes: ["movieName"],
        },
      ],
      attributes: ["date", "time"],
    });
    if (theatreMovies.length == 0) {
      return res.status(404).json({ message: "No Result Found." });
    } else {
      let movies = {};
      for (const theatreMovie of theatreMovies) {
        if (movies[theatreMovie.id]) {
          movies[theatreMovie.id].timing.push({
            date: theatreMovie.date,
            time: theatreMovie.time,
          });
        } else {
          movies[theatreMovie.id] = {
            movieDetails: { ...theatreMovie.movie },
            timing: [{ date: theatreMovie.date, time: theatreMovie.time }],
          };
        }
      }
      return res.status(200).json(movies);
    }
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
});

module.exports = router;
