import ProductManager from "../../domine/managers/ProductManager.js";

export const listLimit = async (req, res)=>{

    let {limit, query, sort} = req.query;

    const manager = new ProductManager();

    const products = await manager.getProducts(limit, query, sort);
    console.log(products);

    res.send({status: 'success', products })
};

export const getOne = async (req, res)=>{

    const { pid }= req.params;

    const manager = new ProductManager();
    
    const product = await manager.getProductById(pid);
    res.send({status: 'success', product })
};

export const save = async (req, res)=>{

    const manager = new ProductManager();

    const product = await manager.addProduct(req.body)
    res.send({status: 'success', product, message: 'Product created.' })
};

export const update = async (req, res)=>{
    const { pid }= req.params;

    const manager = new ProductManager();

    const product = await manager.updateProduct(pid, req.body);
    res.send({status: 'success', product, message: 'Product modified.' })
};

export const deleteOne = async (req, res)=>{
    const { pid }= req.params;
    
    const manager = new ProductManager();

    const product = await manager.deleteProduct(pid);
    res.send({status: 'success', message: 'Product deleted.' })
};