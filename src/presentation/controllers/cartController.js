import CartManager from "../../domine/managers/CartManager.js";

export const list = async (req, res)=>{
    const manager = new CartManager();

    const carts = await manager.getCarts();

    res.send({status: 'success', carts })
};

export const getOne = async (req, res)=>{

    const { cid }= req.params;

    const manager = new CartManager();
    
    const cart = await manager.getCartById(cid);
    res.send({status: 'success', cart })
};

export const saveCart = async (req, res)=>{

    const manager = new CartManager();

    const cart = await manager.addCart(req.body)
    res.send({status: 'success', cart, message: 'Cart created.' })
};

export const saveProductCart = async (req, res)=>{
    const { cid }= req.params;
    const { pid }= req.params;

    const manager = new CartManager();

    const cart = await manager.addProduct(cid, pid)
    res.send({status: 'success', cart, message: 'Cart created.' })
};

export const deleteProductCart = async (req, res)=>{
    const { cid }= req.params;
    const { pid }= req.params;

    const manager = new CartManager();

    const cart = await manager.deleteProductCart(cid, pid)
    res.send({status: 'success', cart, message: 'Product delated.' })
};

export const deleteAllProductsCart = async (req, res)=>{
    const { cid }= req.params;

    const manager = new CartManager();

    const cart = await manager.deleteAllProductsCart(cid)
    res.send({status: 'success', cart, message: 'Empty Cart.' })
};

export const updateProductsCart = async (req, res)=>{
    const { cid }= req.params;

    const manager = new CartManager();

    const cart = await manager.updateProductsCart(cid, req.body)
    res.send({status: 'success', cart, message: 'Cart-Products updated.' })
};

export const updateProductQuantity = async (req, res)=>{
    const { cid }= req.params;
    const { pid }= req.params;

    const manager = new CartManager();

    const cart = await manager.updateProductQuantity(cid, pid, req.body.quantity)
    res.send({status: 'success', cart, message: 'Cart-Quantity-Product updated.' })
};

export const checkout = async (req, res)=>{

    const { cid }= req.params;
    
    const manager = new CartManager();

    const ticket = await manager.checkout(cid, req.user)
    res.send({status: 'success', message: ticket })
};