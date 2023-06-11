const express = require("express");
const { connectToDB } = require("./src/configs/mysqldb");
require("./src/models/index");
const theatreRoutes = require("./src/routes/theatre");
const bookingRoutes = require("./src/routes/booking");
const movieRoutes = require("./src/routes/movie");
const searchRoutes = require("./src/routes/search");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/theatre", theatreRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, async () => {
  console.log("Server is running on PORT: ", PORT);
  await connectToDB();
});
