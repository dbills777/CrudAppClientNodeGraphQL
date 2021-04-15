//imports
import { Router } from 'express';

// use product.conroller for exporting functions
import {
  postAddProduct,
  getAllProducts,
  deleteProductByID,
  getProductByID,
  putUpdateOneProduct,
} from '../controllers/store.controller.js';

//export appRouter instances
export const storeRouter = Router();
// Post Product
storeRouter.post('/', postAddProduct);
// Get products single and all
// extra example of other method of getting products.
// storeRouter.get('/then', getProductsThen);
storeRouter.get('/', getAllProducts);
storeRouter.get('/getone', getProductByID);
// Update Products
storeRouter.put('/updateone', putUpdateOneProduct);
// Delete one product
storeRouter.delete('/', deleteProductByID);
