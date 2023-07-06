require("dotenv").config();

//async errors

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//MIDDLEWARE
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

//products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI, console.log("database connected"));
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
