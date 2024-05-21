import { z } from "zod";

const variantValidation = z.object({
  type: z.string().trim().min(1, { message: "Variant Type is required" }),
  value: z.string().trim().min(1, { message: "Variant Value is required" }),
});

const inventoryValidation = z.object({
  quantity: z
    .number()
    .positive({ message: "Product quantity can not be 0 or negative" }),
  inStock: z.boolean(),
});

const productValidation = z.object({
  name: z
    .string()
    .trim()
    .max(30, { message: "Product name cannot exceed 30 characters" }),
  description: z.string().trim(),
  price: z
    .number()
    .positive({ message: "Product price can not be 0 or negative" }),
  category: z.string().trim(),
  tags: z
    .array(z.string().trim())
    .min(1, { message: "At least one tag is required" }),
  variants: z
    .array(variantValidation)
    .min(1, { message: "At least one variant is required" }),
  inventory: inventoryValidation,
});

export default productValidation;
