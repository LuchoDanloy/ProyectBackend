import mongoose, { Schema } from "mongoose"

const cartCollection = 'carts'

const CartModel = new Schema({
    products:{
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Schema.Types.Number, 
                    require: true
                },
                _id: false 
            }
        ]
    }
});

CartModel.pre('find', function(){
    this.populate(['products.product']);
});

CartModel.pre('findOne', function(){
    this.populate(['products.product']);
});

export default mongoose.model(cartCollection, CartModel);