import { model, Schema } from "mongoose";

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price can not be 0 or negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Order quantity is required"],
    min: [0, "Order quantity can not be 0 or negative"],
  },
});

export const Order = model<TOrder>("orders", OrderSchema);
