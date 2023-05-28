const Theatre = require("../models/theatres");
const MovieTheatreMapping = require("../models/movieTheatreMappings");
const { setCache, getCache } = require("../configs/cacheConfig");

const getAllTheatres = async (req, res) => {
  try {
    const { city } = req.query;
    let theatres = [];
    if (city) {
      let cachedData = await getCache(`theater_${city}`);
      if (cachedData) {
        return res.status(200).json({ theatres:cachedData.theatres, isCachedData: true });
      }
      theatres = await Theatre.find({
        where: {
          city: city,
        },
      });
      setCache(`theater_${city}`, { theatres: theatres });
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
};
const getTheatreShows = async (req, res) => {
  try {
    const { theatreId } = req.params;
    const { date } = req.query;

    let cachedData = await getCache(`shows_${theatreId}_${date}`);
    if (cachedData) {
      return res.status(200).json({ movies:cachedData.movies, isCachedData: true });
    }


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
      setCache(`shows_${theatreId}_${date}`, { movies: movies });
      return res.status(200).json(movies);
    }
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

module.exports = {
  getAllTheatres,
  getTheatreShows,
};
