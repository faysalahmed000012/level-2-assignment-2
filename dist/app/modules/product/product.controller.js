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
exports.ProductControllers = void 0;
const product_services_1 = require("./product.services");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.searchTerm;
        let response;
        if (query) {
            response = yield product_services_1.ProductServices.getProducts(query);
            if (response.length === 0) {
                res.status(500).json({
                    success: false,
                    message: `could not find product with query ${query}`,
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term ${query} fetched successfully!`,
                    data: response,
                });
            }
        }
        else {
            response = yield product_services_1.ProductServices.getProducts();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: response,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching products",
            error: error,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const response = yield product_services_1.ProductServices.getProductById(id);
        if (!response) {
            res.status(500).json({
                success: false,
                message: `Product with ${id} does not exists`,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: response,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching product",
            error: error,
        });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // validate using zod
        const zodParsedData = product_zod_validation_1.default.parse(product);
        const result = yield product_services_1.ProductServices.createNewProduct(zodParsedData);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot create product, something went wrong",
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.params.productId;
        // validate using zod
        const zodParsedData = product_zod_validation_1.default.parse(data);
        const result = yield product_services_1.ProductServices.updateExistingProduct(id, zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot update product, something went wrong",
            error: error,
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_services_1.ProductServices.deleteProduct(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot delete product, something went wrong",
            error: error,
        });
    }
});
exports.ProductControllers = {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProductById,
};
