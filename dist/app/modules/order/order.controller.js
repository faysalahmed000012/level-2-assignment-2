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
exports.OrderControllers = void 0;
const order_services_1 = require("./order.services");
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const order = req.body;
        // zod validation
        const zodValidation = order_zod_validation_1.default.parse(order);
        const response = yield order_services_1.OrderServices.createNewOrder(zodValidation);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Something went wrong while creating order",
            error: error,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const response = yield order_services_1.OrderServices.getOrders(email);
        if (response.length === 0) {
            res.status(500).json({
                success: false,
                message: `could not find order with email`,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Order fetched successfully for user email`,
                data: response,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while getting order",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createNewOrder,
    getOrders,
};
