const express = require("express");
const { connectToDB } = require("./src/configs/mysqldb");
const theatreRoutes = require("./src/routes/theatre");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/theatre", theatreRoutes);
app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, async () => {
  console.log("Server is running on PORT: ", PORT);
  await connectToDB();
});
