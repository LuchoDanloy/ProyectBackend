/* import { Router } from "express";
import ProductManager from "./ProductManager.js";

const product1 = new ProductManager("./productos.json");
const homeRouter = Router();


homeRouter.get('/', async (req,res)=>{

    try{
        //obtengo el contenido
        const products = await product1.getProducts();
        res.render('home',{title:'Prodcutos', products})
    }catch(error){
        res.status(404).send(error);
    }

 })

 homeRouter.get('/realtimeproducts', async (req,res)=>{

    try{
        //obtengo el contenido
        const products = await product1.getProducts();
        res.render('realTimeProducts',{title:'Prodcutos', products})
    }catch(error){
        res.status(404).send(error);
    }

 })

 export default homeRouter; */