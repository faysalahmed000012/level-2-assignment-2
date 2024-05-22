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
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const createNewOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield order_model_1.Order.create(order);
    return response;
});
const getOrders = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (query = null) {
    let response;
    if (query) {
        response = yield order_model_1.Order.find({ email: query });
    }
    else {
        response = yield order_model_1.Order.find();
    }
    return response;
});
exports.OrderServices = {
    createNewOrder,
    getOrders,
};
