const { sequalize } = require("../configs/mysqldb");
const DataTypes = require("sequelize");

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Theatre = sequalize.define("theatre", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

// Execute the sync command to run migrations
// sequalize.sync()

module.exports = Theatre;
