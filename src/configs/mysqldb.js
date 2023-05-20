const Sequalize = require("sequelize");

require("dotenv").config();

const DBNAME = process.env.DBNAME;
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const sequalize = new Sequalize(DBNAME, USER_NAME, PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

const connectToDB = async () => {
  try {
    await sequalize.authenticate();

    console.log("Successfully connected to the database.");

    // sequalize
    //   .sync()
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequalize, connectToDB };
