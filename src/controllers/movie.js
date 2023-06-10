const Movie = require("../models/movies");
const { setCache, getCache } = require("../configs/cacheConfig");
const Rating = require("../models/ratings");

const getAllMovies = async (req, res) => {
  try {
    let movies = await Movie.findAll();
    if (movies.length == 0) {
      return res.status(404).json({ message: "No Result Found" });
    }
    return res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const getMovieById = async (req, res) => {
  try {
    let { movieId } = req.params;
    let cachedData = await getCache(`movie_${movieId}`);
    if (cachedData) {
      return res
        .status(200)
        .json({ movieDetails: cachedData.movie, isCachedData: true });
    }
    let movie = await Movie.find({
      where: {
        id: movieId,
      },
    });
    if (movie) {
      setCache(`movie_${movieId}`, { movie: movie });
      res.status(200).json({ movieDetails: movie });
    } else {
      return res.status(404).json({ message: "No Result Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const getMovieRatings = async (req,res) => {
    let { movieId } = req.params;
    let cachedData = await getCache(`movie_${movieId}_ratings`);
    if (cachedData) {
      return res
        .status(200)
        .json({ ratings: cachedData.ratings, isCachedData: true });
    }
    let ratings = await Rating.find({
        where: {
            movieId: movieId,
        },
      });
    if(ratings){
        setCache(`movie_${movieId}_ratings`, { ratings: ratings });
        res.status(200).json({ ratings: ratings });
    }else {
      return res.status(404).json({ message: "No Result Found" });
    }
}

module.exports = {
  getAllMovies,
  getMovieById,
};
