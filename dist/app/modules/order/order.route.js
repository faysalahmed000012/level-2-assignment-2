"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const route = (0, express_1.Router)();
route.post("/", order_controller_1.OrderControllers.createNewOrder);
route.get("/", order_controller_1.OrderControllers.getOrders);
exports.OrderRoutes = route;
