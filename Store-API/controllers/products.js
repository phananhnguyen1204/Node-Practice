const { eventNames } = require("../models/product");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({}).sort("name").select("name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.feature = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  //get all products
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1; //if user does not pass any value
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
