import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import OrderValidation from "./order.zod.validation";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // zod validation
    const zodValidation = OrderValidation.parse(order);
    const response = await OrderServices.createNewOrder(zodValidation);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message ?? "Something went wrong while creating order",
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const response = await OrderServices.getOrders(email);
    if (response.length === 0) {
      res.status(500).json({
        success: false,
        message: `could not find order with email`,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Order fetched successfully for user email`,
        data: response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting order",
      error: error,
    });
  }
};

export const OrderControllers = {
  createNewOrder,
  getOrders,
};
