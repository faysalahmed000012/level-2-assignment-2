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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    productId: {
        type: String,
        required: [true, "Product id is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price can not be 0 or negative"],
    },
    quantity: {
        type: Number,
        required: [true, "Order quantity is required"],
        min: [0, "Order quantity can not be 0 or negative"],
    },
});
// middleware for do not let order more than quantity
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_model_1.Product.findOne({
                _id: this.productId,
            });
            if ((product === null || product === void 0 ? void 0 : product.inventory.quantity) < this.quantity) {
                next(new Error("You can not place order more than available quantity"));
            }
            else {
                next();
            }
        }
        catch (error) {
            next(new Error(`Could not find any product with id ${this.productId}`));
        }
    });
});
// // post middleware for updating product
OrderSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateProduct = yield product_model_1.Product.findOneAndUpdate({ _id: doc.productId }, { $inc: { "inventory.quantity": -doc.quantity } }, { new: true });
        if ((updateProduct === null || updateProduct === void 0 ? void 0 : updateProduct.inventory.quantity) === 0) {
            const updateInStock = yield product_model_1.Product.findOneAndUpdate({ _id: doc.productId }, { "inventory.inStock": false }, { new: true });
        }
        next();
    });
});
exports.Order = (0, mongoose_1.model)("orders", OrderSchema);
