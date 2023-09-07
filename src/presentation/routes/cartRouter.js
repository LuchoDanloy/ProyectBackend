import { Router } from "express";
import { list, getOne, saveCart, saveProductCart, deleteProductCart, deleteAllProductsCart, updateProductsCart, updateProductQuantity, checkout } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";

const cartRouter = Router();

//GET DE TODOS LOS CARTS
cartRouter.get('/', list);

//GET CON ID
cartRouter.get('/:cid', getOne);

//POST CART
cartRouter.post('/', saveCart);

//POST PRODUCT CART
cartRouter.post('/:cid/product/:pid', saveProductCart);

//DELETE PRODUCT CART
cartRouter.delete('/:cid/products/:pid', deleteProductCart);

//DELETE ALL PRODUCTS CART
cartRouter.delete('/:cid', deleteAllProductsCart);

//PUT PRODUCTS CART
cartRouter.put('/:cid', updateProductsCart);

//PUT PRODUCT QUANTITY
cartRouter.put('/:cid/products/:pid', updateProductQuantity);

//POST PURCHASE
cartRouter.post('/:cid/purchase', auth, checkout);

export default cartRouter;