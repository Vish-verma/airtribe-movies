const Sequalize = require("sequelize");
const { ingestData } = require("./elasticSearchConfig");

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
    //     console.log("Synced..");
    //   })
    //   .catch((err) => console.log(err));
      let movies = await sequalize.query("Select * from movies");
      ingestData(movies);

  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequalize, connectToDB };
