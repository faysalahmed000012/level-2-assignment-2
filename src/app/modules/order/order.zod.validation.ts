import { z } from "zod";

const OrderValidation = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email("Please enter a valid email address"),
  productId: z.string({ required_error: "Product id is required" }).trim(),
  price: z
    .number({ required_error: "Product price is required" })
    .positive("Product price can not be 0 or negative"),
  quantity: z
    .number({ required_error: "Order quantity is required" })
    .positive("Order quantity can not be 0 or negative"),
});

export default OrderValidation;
