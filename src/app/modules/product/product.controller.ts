import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import productValidation from "./product.zod.validation";

const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await ProductServices.getProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.issues[0].message ||
        "Something went wrong while fetching products",
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const response = await ProductServices.getProductById(id);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.issues[0].message ||
        "Something went wrong while fetching product",
      error: error,
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // validate using zod
    const zodParsedData = productValidation.parse(product);
    const result = await ProductServices.createNewProduct(zodParsedData);

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.issues[0].message ||
        "Cannot create product, something went wrong",
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    // validate using zod
    const zodParsedData = productValidation.parse(data);
    const result = await ProductServices.updateExistingProduct(
      id,
      zodParsedData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.issues[0].message ||
        "Cannot update product, something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
};
