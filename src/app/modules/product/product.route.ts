import { Router } from "express";
import { ProductControllers } from "./product.controller";

const route = Router();

route.get("/", ProductControllers.getProducts);
route.post("/", ProductControllers.addProduct);
route.get("/:productId", ProductControllers.getProductById);

export const ProductRoutes = route;
