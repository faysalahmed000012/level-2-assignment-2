import cors from "cors";
import express, { Application, Request, Response } from "express";
import { ProductRoutes } from "./app/modules/product/product.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// root route
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developer!");
});

export default app;
