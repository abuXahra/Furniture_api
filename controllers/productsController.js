const Product = require("../models/Products");

exports.createProduct = async (req, res) => {
  const { title, supplier, price, imgUrl, description, product_location } =
    req.body;
  try {
    const newProduct = Product({
      title,
      supplier,
      price,
      imgUrl,
      description,
      product_location,
    });
    await newProduct.save();
    res.status(200).json("Product created successfully");
  } catch (err) {
    res.status(500).json("fail to create the  Product");
    // console.log(err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("fail to get the  Products");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("fail to get the  Product");
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "furniture",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("fail to get the  Products\n", error);
  }
};