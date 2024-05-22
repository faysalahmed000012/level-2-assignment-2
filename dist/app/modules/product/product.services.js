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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const getProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = null) {
    let response;
    if (query) {
        response = yield product_model_1.Product.find({ $text: { $search: query } });
    }
    else {
        response = yield product_model_1.Product.find().lean();
    }
    return response;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.Product.findOne({ _id: id });
    return response;
    // if (response) {
    //   return response;
    // } else {
    //   return null;
    // }
});
const createNewProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.Product.create(product);
    return response;
});
const updateExistingProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.Product.findOneAndUpdate({ _id: id }, product, {
        new: true,
    });
    return response;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.Product.deleteOne({ _id: id });
    return response;
});
exports.ProductServices = {
    getProducts,
    createNewProduct,
    getProductById,
    updateExistingProduct,
    deleteProduct,
};
