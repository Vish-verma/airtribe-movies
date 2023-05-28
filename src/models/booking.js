const { sequalize } = require("../configs/mysqldb");
const DataTypes = require("sequelize");
const MovieTheatreMapping = require("./movieTheatreMappings");

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Booking = sequalize.define(
  "booking",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    movieTheatreMappingId: {
      type: DataTypes.BIGINT,
      references: {
        model: MovieTheatreMapping,
        key: "id",
      },
    },
    seats: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    indexes: [{ fields: ["movieTheatreMappingId"] }],
  }
);

// Execute the sync command to run migrations
// sequalize.sync()

module.exports = Booking;
