const { sequalize } = require("../configs/mysqldb");
const DataTypes = require("sequelize");

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Movie = sequalize.define("movie", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(20),
    defaultValue: "2D",
  },
  certificate: {
    type: DataTypes.STRING(20),
  },
});

// Execute the sync command to run migrations
// sequalize.sync()

module.exports = Movie;
