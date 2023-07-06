require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //just making sure to delete all products on database
    await Product.deleteMany();
    //we can pass an array to create() function
    await Product.create(jsonProducts);
    console.log("SUCCESS!!!!!!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
