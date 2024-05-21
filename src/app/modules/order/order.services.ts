import { Order } from "./order.model";

const createNewOrder = async (order: TOrder) => {
  const response = await Order.create(order);
  return response;
};

const getOrders = async (query: any = null) => {
  let response;
  if (query) {
    response = await Order.find({ $text: { $search: query } });
  } else {
    response = await Order.find();
  }
};

export const OrderServices = {
  createNewOrder,
  getOrders,
};
