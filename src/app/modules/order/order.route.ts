import { Router } from "express";
import { OrderControllers } from "./order.controller";

const route = Router();

route.post("/", OrderControllers.createNewOrder);
route.get("/", OrderControllers.getOrders);

export const OrderRoutes = route;
