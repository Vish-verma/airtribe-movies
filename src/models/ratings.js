const { sequalize } = require("../configs/mysqldb");
const DataTypes = require("sequelize");
const Movie = require("./movies");

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Rating = sequalize.define("rating", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING(300),
  },
  movieId: {
    type: DataTypes.BIGINT,
    references: {
      model: Movie,
      key: "id",
    },
  },
});

// Execute the sync command to run migrations
// sequalize.sync()

module.exports = Rating;
