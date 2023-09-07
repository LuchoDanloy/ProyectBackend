import container from "../../container.js";

class ProductManager{

    constructor(){
        this.productRepository =  container.resolve('ProductRepository');
    }

    async getProducts(limit, query, sort){
        try{
            //LIMIT
            if (!limit){
                limit=10
            }
            //SORT
            if (!sort){
                sort = 1
            }else{
                if(sort=="asc" || sort=="desc"){
                    sort = sort == "asc" ? 1 : -1
                }else{
                    sort = 1
                }
            }

            return this.productRepository.getProducts(limit, query, sort);    //van sin await en caso de retornar directamente porque ya va a estar el await en el Controller cuando sea invocado.
        }
        catch(error){
            console.error(error);
        }
    }

    async addProduct(product){

        try{
            return this.productRepository.addProduct(product);
        }
        catch(error){
            console.log(error);
        }
    }

    async getProductById(pid){

        try{
            return this.productRepository.getProductById(pid);
        }
        catch(error){
            console.error(error);
        }

    }

    async updateProduct(pid, newProduct){
        
        try{
            return this.productRepository.updateProduct(pid, newProduct);
        }
        catch(error){
            console.error(error);
        }
    }


    async deleteProduct(pid){
        try{
            return this.productRepository.deleteProduct(pid);
        }
        catch(error){
            console.error(error);
        }       
    }

    async chekStockProduct(pid, quantity){
        try{
            //obtengo el producto
            const product = await this.productRepository.getProductById(pid);

            //valido el stock
            if (quantity <= product.stock){
                return true;
            } 

            return false;

        }
        catch(error){
            console.error(error);
        }        
    }

    async subStockProduct(pid, quantity){
        try{
            //obtengo el producto
            const product =  await this.productRepository.getProductById(pid);

            //modifico el stock
            product.stock = product.stock - quantity

            //grabo el nuevo stock en el producto
            await this.productRepository.updateProduct(pid, product);

        }
        catch(error){
            console.error(error);
        }        
    }
}

export default ProductManager;
