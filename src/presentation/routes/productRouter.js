import { Router } from "express";
import { deleteOne, getOne, listLimit, save, update } from "../../presentation/controllers/productController.js";

const productRouter = Router();

//GET TODOS LOS PRODUCTOS O LIMIT
productRouter.get('/', listLimit);

//GET CON ID
productRouter.get('/:pid', getOne);

//POST
productRouter.post('/', save);

//PUT
productRouter.put('/:pid',update);

//DELETE
productRouter.delete('/:pid',deleteOne);

export default productRouter;