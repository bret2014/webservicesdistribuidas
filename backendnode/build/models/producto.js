"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let productSchema = new mongoose_1.Schema({
    nombre: {
        type: String, required: [true, 'El nombre requerido']
    },
    precioUni: {
        type: Number, required: [true, 'El precio requerido']
    },
    descripcion: {
        type: String, required: [false]
    },
    disponible: {
        type: Boolean, required: true, default: true
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Categoria'
    }
});
//EXPORTAR EL MODELO PARA SER USADO EN TODO EL PROYECTO
exports.default = mongoose_1.model('Producto', productSchema);
