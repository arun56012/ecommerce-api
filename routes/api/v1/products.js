const express = require('express');
const Router = express.Router();
const productController = require('../../../controller/ProductsController');

 Router.post('/create', productController.create);

 Router.get('/products',productController.getAllProducts);

 Router.put('/products/:id/update_quantity', productController.updateProduct);

 Router.delete('/products/:id', productController.deleteProduct);


module.exports = Router;
