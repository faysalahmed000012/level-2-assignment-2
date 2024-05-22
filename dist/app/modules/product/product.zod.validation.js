"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantValidation = zod_1.z.object({
    type: zod_1.z.string().trim().min(1, { message: "Variant Type is required" }),
    value: zod_1.z.string().trim().min(1, { message: "Variant Value is required" }),
});
const inventoryValidation = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .positive({ message: "Product quantity can not be 0 or negative" }),
    inStock: zod_1.z.boolean(),
});
const productValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .max(30, { message: "Product name cannot exceed 30 characters" }),
    description: zod_1.z.string().trim(),
    price: zod_1.z
        .number()
        .positive({ message: "Product price can not be 0 or negative" }),
    category: zod_1.z.string().trim(),
    tags: zod_1.z
        .array(zod_1.z.string().trim())
        .min(1, { message: "At least one tag is required" }),
    variants: zod_1.z
        .array(variantValidation)
        .min(1, { message: "At least one variant is required" }),
    inventory: inventoryValidation,
});
exports.default = productValidation;
