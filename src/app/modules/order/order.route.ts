import { Router } from "express";
import { OrderControllers } from "./order.controller";

const route = Router();

route.post("/", OrderControllers.createNewOrder);

export const OrderRoutes = route;
