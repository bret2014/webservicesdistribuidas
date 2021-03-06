"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//LLAMAR A LOS MODELOS CREADOS
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
class Producto {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    getProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productoBD = yield producto_1.default.find({}).sort('nombre').exec();
                categoria_1.default.populate(productoBD, { path: "categoria", select: 'nombre' });
                let conteo = yield producto_1.default.countDocuments();
                res.json({
                    productos: productoBD,
                    conteo: conteo
                });
            }
            catch (error) {
                return res.json({
                    dato: error
                });
            }
        });
    }
    getProductoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let productoBD = yield producto_1.default.findById(idurl);
                res.json({
                    ok: true,
                    producto: productoBD
                });
            }
            catch (error) {
                return res.json({
                    ok: false,
                    dato: "Producto no encontrado",
                    message: error
                });
            }
        });
    }
    postProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bodycabecera = req.body;
                console.log(req.body);
                let producto = new producto_1.default({
                    nombre: bodycabecera.nombre,
                    precioUni: bodycabecera.precioUni,
                    descripcion: bodycabecera.descripcion,
                    categoria: bodycabecera.categoria,
                });
                let productoBD = yield producto.save();
                res.json({
                    producto: productoBD
                });
            }
            catch (error) {
                return res.json({
                    dato: error
                });
            }
        });
    }
    putProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let bodycabecera = req.body;
                let productoBD = yield producto_1.default.findByIdAndUpdate(idurl, bodycabecera, { new: true, runValidators: true, context: 'query' });
                res.json({
                    producto: productoBD
                });
            }
            catch (error) {
                return res.json({
                    ok: "ERROR",
                    dato: error
                });
            }
        });
    }
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idurl = req.params.id;
                let productoBD = yield producto_1.default.findByIdAndRemove(idurl);
                res.json({
                    mensaje: "PRODUCTO ELIMINADO",
                    producto: productoBD
                });
            }
            catch (error) {
                return res.json({
                    message: "PRODUCTO NO ENCONTRADO",
                    dato: error
                });
            }
        });
    }
    exponerRutas() {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
}
const producto = new Producto();
exports.default = producto.router;
