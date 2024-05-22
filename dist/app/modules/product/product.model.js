"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name of Product is required"],
        maxlength: [30, "Name can not be more than 30 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add Product description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please add Product price"],
        min: [0, "Product price can not be 0 or negative"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    tags: {
        type: [String],
        required: [true, "Please add some keywords related to product"],
    },
    variants: [
        {
            type: {
                type: String,
                required: [true, "Provide Type of variant"],
            },
            value: {
                type: String,
                required: [true, "Provide the specific Value of variant"],
            },
        },
    ],
    inventory: {
        quantity: {
            type: Number,
            required: [true, "Provide available quantity of the product"],
        },
        inStock: { type: Boolean },
    },
});
ProductSchema.pre("save", function (next) {
    if (this.inventory.quantity === 0) {
        this.inventory.inStock = false;
    }
    next();
});
exports.Product = (0, mongoose_1.model)("products", ProductSchema);
