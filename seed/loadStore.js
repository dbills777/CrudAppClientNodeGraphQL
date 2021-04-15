import axios from 'axios';
import { Store } from '../models/store.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const seedMongo = async () => {
  await mongoose.connect(`${process.env.DGM4790_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const options = {
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
  };
  try {
    const response = await axios.request(options);
    console.log(response.data[0]);
    // await postAddProduct(response.data[0]);
    await addProducts(response.data);
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

const postAddProduct = async (oneItem) => {
  console.log('This is the oneItem', oneItem);
  const product = new Store({
    id: oneItem.id,
    title: oneItem.title,
    price: oneItem.price,
    description: oneItem.description,
    category: oneItem.category,
    image: oneItem.image,
  });
  //   console.log(product);
  await product.save();
  console.log('added one item to the db');
};
const addProducts = async (productList) => {
  for (let product of productList) {
    await postAddProduct(product);
  }
};
seedMongo();
