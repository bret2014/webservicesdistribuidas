import {Schema, model} from 'mongoose';

let productSchema = new Schema({
    nombre :
    {
        type:String, required:[true,'El nombre requerido']
    },
    precioUni :
    {
        type:Number, required:[true,'El precio requerido']
    },
    descripcion :
    {
        type:String, required:[false]
    },
    disponible :
    {
        type:Boolean, required:true,default:true
    },
    categoria:
    {
        type:Schema.Types.ObjectId, required:true,ref:'Categoria'
    }
})

//EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO
export default model('Producto',productSchema);