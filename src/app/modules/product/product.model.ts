import mongoose, { model } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new mongoose.Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Name of Product is required"],
    maxlength: [30, "Name can not be more than 30 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add Product description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please add Product price"],
    min: [0, "Product price can not be 0 or negative"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Please add some keywords related to product"],
  },
  variants: [
    {
      type: {
        type: String,
        required: [true, "Provide Type of variant"],
      },
      value: {
        type: String,
        required: [true, "Provide the specific Value of variant"],
      },
    },
  ],
  inventory: {
    quantity: {
      type: Number,
      required: [true, "Provide available quantity of the product"],
    },
    inStock: { type: Boolean },
  },
});

ProductSchema.pre("save", function (next) {
  if (this.inventory.quantity === 0) {
    this.inventory.inStock = false;
  }
  next();
});

export const Product = model<TProduct>("products", ProductSchema);
