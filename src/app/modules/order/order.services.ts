import { Order } from "./order.model";

const createNewOrder = async (order: TOrder) => {
  const response = await Order.create(order);
  return response;
};

const getOrders = async (query: any = null) => {
  let response;
  if (query) {
    response = await Order.find({ email: query });
  } else {
    response = await Order.find();
  }
  return response;
};

export const OrderServices = {
  createNewOrder,
  getOrders,
};
