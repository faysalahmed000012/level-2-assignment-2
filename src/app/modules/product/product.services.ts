import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const getProducts = async (query: any = null) => {
  let response;
  if (query) {
    response = await Product.find({ $text: { $search: query } });
  } else {
    response = await Product.find().lean();
  }
  return response;
};

const getProductById = async (id: string) => {
  const response = await Product.findOne({ _id: id });
  return response;
  // if (response) {
  //   return response;
  // } else {
  //   return null;
  // }
};

const createNewProduct = async (product: TProduct) => {
  const response = await Product.create(product);
  return response;
};

const updateExistingProduct = async (id: string, product: TProduct) => {
  const response = await Product.findOneAndUpdate({ _id: id }, product, {
    new: true,
  });
  return response;
};

const deleteProduct = async (id: string) => {
  const response = await Product.deleteOne({ _id: id });
  return response;
};

export const ProductServices = {
  getProducts,
  createNewProduct,
  getProductById,
  updateExistingProduct,
  deleteProduct,
};
