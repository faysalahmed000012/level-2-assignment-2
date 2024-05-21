import { model, Schema } from "mongoose";
import { Product } from "../product/product.model";

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

// middleware for do not let order more than quantity
OrderSchema.pre("save", async function (next) {
  try {
    const product = await Product.findOne({
      _id: this.productId,
    });
    if ((product?.inventory.quantity as number) < this.quantity) {
      next(new Error("You can not place order more than available quantity"));
    } else {
      next();
    }
  } catch (error) {
    next(new Error(`Could not find any product with id ${this.productId}`));
  }
});
// // post middleware for updating product
OrderSchema.post("save", async function (doc, next) {
  const updateProduct = await Product.findOneAndUpdate(
    { _id: doc.productId },
    { $inc: { "inventory.quantity": -doc.quantity } },
    { new: true }
  );
  if (updateProduct?.inventory.quantity === 0) {
    const updateInStock = await Product.findOneAndUpdate(
      { _id: doc.productId },
      { "inventory.inStock": false },
      { new: true }
    );
  }
  next();
});

export const Order = model<TOrder>("orders", OrderSchema);
