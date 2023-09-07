import express from 'express';
import cookieParser from "cookie-parser";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import productRouter from '../routes/productRouter.js'
import cartRouter from '../routes/cartRouter.js';
import sessionRouter from '../routes/sessionRouter.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes/roleRouter.js'
import errorHandler from '../middlewares/errorHandler.js';

class AppExpress
{
    init()
    {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(cookieParser());

        const swaggerOptions = {
            definition:{
                openapi: '3.0.1',
               info:{
                    title: "Documentacion API Wine",
                    description: "API para Wine e-commerce"
                }
            },
            apis: [`./src/docs/**/*.yaml`]
            
      }
      const specs = swaggerJsdoc(swaggerOptions);
      this.app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs)) 

    }

    build()
    {
        this.app.use('/api/products', productRouter);
        this.app.use('/api/carts', cartRouter);
    
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/roles', roleRouter);
    
        this.app.use(errorHandler);
    }

    listen()
    {
        this.app.listen(process.env.NODE_PORT, () => {
            console.log(`Servidor escuchando en el puerto: ${process.env.NODE_PORT}` );
        });
    }

}

export default AppExpress;