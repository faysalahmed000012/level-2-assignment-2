"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_route_1 = require("./app/modules/order/order.route");
const product_route_1 = require("./app/modules/product/product.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// root route
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Hello Developer!");
});
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
