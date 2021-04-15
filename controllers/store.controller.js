import { Store } from '../models/store.js';

export const postAddProduct = (req, res) => {
  const product = new Store({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  });
  console.log(product);
  product.save();
  res.json(product);
};
// Example of other method for making requests
export const getProductsThen = (req, res) => {
  Store.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => log(err));
};
export const getAllProducts = async (req, res) => {
  const products = await Store.find();
  res.json(products);
};

export const getProductByID = async (req, res) => {
  const productID = req.body.productID;
  try {
    const product = await Product.findById(productID);
    if (!product) return res.status(400).json({ Message: 'Item with that productID is not found' });
    // console.log(`Product id: ${productID}`);
    res.json(product);
  } catch (error) {
    res.status(400).json({ Message: `Can't find Product ${err}` });
  }
};
export const putUpdateOneProduct = async (req, res) => {
  const productID = req.body.productID;
  const newItemInfo = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imgURL: req.body.imgURL,
  };
  try {
    try {
      const product = await Product.findByIdAndUpdate(productID, newItemInfo, { new: true });
      res.json(product);
    } catch (err) {
      res.status(400).json({ Message: `Could not update: ${err}` });
    }
  } catch (error) {
    res.status(400).json({ Message: `Invalid Product ${err}` });
  }
};

export const deleteProductByID = async (req, res) => {
  const productID = req.body.productID;
  try {
    const deleteProduct = await Product.findByIdAndRemove(productID);
    if (!deleteProduct) {
      return res.status(400)({ Message: `Item with that ${productID} is not found` });
    }
    console.log(`Deleted: ${deleteProduct}`);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ Message: `Invalid ProductID ${error}` });
  }
};
