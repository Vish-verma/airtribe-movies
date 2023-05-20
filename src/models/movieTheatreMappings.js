const { sequalize } = require("../configs/mysqldb");
const DataTypes = require("sequelize");
const Theatre = require("./theatres");
const Movie = require("./movies");

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const MovieTheatreMapping = sequalize.define("movieTheatreMapping", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  theatreId: {
    type: DataTypes.BIGINT,
    references: {
      model: Theatre,
      key: "id",
    },
  },
  movieId: {
    type: DataTypes.BIGINT,
    references: {
      model: Movie,
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATEONLY
  },
  time : {
    type: DataTypes.TIME
  }
});

// Execute the sync command to run migrations
// sequalize.sync()

module.exports = MovieTheatreMapping;
