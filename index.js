const express = require("express");
const { connection } = require("./configs/db");

require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Masai Job App API");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.port}`);
});
