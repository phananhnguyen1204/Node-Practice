const { eventNames } = require("../models/product");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  //numericFiters
  if (numericFilters) {
    console.log(numericFilters);
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    //price-$gt-40,rating-$gte-4
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        // console.log(value);
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  //get all products
  console.log(queryObject);
  let result = Product.find(queryObject);
  console.log(result);
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

  //Pagination
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
