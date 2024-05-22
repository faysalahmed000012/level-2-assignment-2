"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidation = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "email is required" })
        .trim()
        .email("Please enter a valid email address"),
    productId: zod_1.z.string({ required_error: "Product id is required" }).trim(),
    price: zod_1.z
        .number({ required_error: "Product price is required" })
        .positive("Product price can not be 0 or negative"),
    quantity: zod_1.z
        .number({ required_error: "Order quantity is required" })
        .positive("Order quantity can not be 0 or negative"),
});
exports.default = OrderValidation;
