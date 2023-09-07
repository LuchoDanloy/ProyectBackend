import productSchema from "../../models/mongoose/productSchema.js";
import Product from '../../../domine/entities/product.js';

class productMongooseRepository{

    async getProducts(limit, query, sort){
        try{    
              
            const filtro = eval("({" + query + "})");

            const productDocument = await productSchema.aggregate([
                {
                    $limit: parseInt(limit)
                },
                {
                    $sort: {
                        price: sort
                    }
                },
                {
                    $match: filtro
                },
            ]);

            
            const products = productDocument.map(document => new Product({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail               
            })); 
      
            return{
                products
            }

        }
        catch(error){
            console.error(error);
        }
    }

    async addProduct(product){
        try{
            const productDocument = await productSchema.create(product);
            return new Product({
                id: productDocument?.id,
                title: productDocument?.title,
                description: productDocument?.description,
                code: productDocument?.code,
                price : productDocument?.price,
                status: productDocument?.status,
                stock: productDocument?.stock,
                category : productDocument?.category,
                thumbnail : productDocument?.thumbnail
            }); 
        }
        catch(error){
            console.log(error);
        }
    }

    async getProductById(pid){

        try{
            const productDocument= await productSchema.findOne({_id: pid});

            return new Product({
                id: productDocument?.id,
                title: productDocument?.title,
                description: productDocument?.description,
                code: productDocument?.code,
                price : productDocument?.price,
                status: productDocument?.status,
                stock: productDocument?.stock,
                category : productDocument?.category,
                thumbnail : productDocument?.thumbnail
            }); 
        }
        catch(error){
            console.error(error);
        }

    }

    async updateProduct(pid, newProduct){
        
        try{
            const productDocument = await productSchema.updateOne({_id: pid}, newProduct);

            if(!productDocument)
            {
              throw new Error('Product dont exist.');
            }

            return new Product({
                id: productDocument?.id,
                title: productDocument?.title,
                description: productDocument?.description,
                code: productDocument?.code,
                price : productDocument?.price,
                status: productDocument?.status,
                stock: productDocument?.stock,
                category : productDocument?.category,
                thumbnail : productDocument?.thumbnail
            }); 
        }
        catch(error){
            console.error(error);
        }
    }


    async deleteProduct(pid){
        try{
            return productSchema.deleteOne({_id: pid});
        }
        catch(error){
            console.error(error);
        }       
    }
}

export default productMongooseRepository;
