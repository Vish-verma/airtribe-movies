const Movie = require("./movies");
const MovieTheatreMapping = require("./movieTheatreMappings");
const Theatre = require("./theatres");

const { sequalize } = require("../configs/mysqldb");

//TO sync all at once
sequalize
  .sync()
  .then(() => {
    console.log("Models synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });
