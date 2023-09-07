import cartSchema from  "../../models/mongoose/cartSchema.js"

class cartMongooseRepository{

    async getCarts(){
        try{    
            const cartsDocument = await cartSchema.find();   
            return cartsDocument.map(document=>({
                id: document._id,
                products: document.products            
            })) //como quier devolver un objeto lo tengo que poner entre parentesis (). Si dejo las llaves {} solas interpreta que esta abriendo una funcion.
        }
        catch(error){
            console.error(error);
        }
    }

    async getCartById(cid){

        try{
            const cartDocument = await cartSchema.findOne({_id: cid});
            //const cartDocument = await cartSchema.findOne({_id: cid}).populate(['products']);
            //console.log("cartDocument");
            //console.log(cartDocument);
            
            return {
                id: cartDocument._id,
                products: cartDocument.products
            } 
        }
        catch(error){
            console.error(error);
        }

    }

    async addCart(cart){
        try{  
            const cartDocument = await cartSchema.create(cart);

            return {
                id: cartDocument._id,
                products: cartDocument.products
            } 
        }
        catch(error){
            console.log(error);
        }
    }

    async updateCart(idCart, newCart){

        try{
            return cartSchema.updateOne({_id: idCart}, newCart);
        }
        catch(error){
            console.error(error);
        }
    }
    
}

export default cartMongooseRepository;
