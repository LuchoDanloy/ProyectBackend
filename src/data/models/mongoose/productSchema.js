import mongoose, { Schema } from "mongoose"

const productCollection = 'products'

const ProductModel = new Schema({
    title: {type: Schema.Types.String, require: true},
    description: {type: Schema.Types.String, require: true},
    code: {type: Schema.Types.String, require: true} ,
    price: {type: Schema.Types.Number, require: true},
    status: {type: Schema.Types.String, require: true},
    stock: {type: Schema.Types.Number, require: true},
    category: {type: Schema.Types.String, require: true},
    thumbnail: [{type: Schema.Types.String, require: false}]
    //aqui podemos agregar un campo enable para activar o desactivar en caso de eliminar
})

export default mongoose.model(productCollection, ProductModel);