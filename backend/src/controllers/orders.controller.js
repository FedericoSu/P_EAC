import { ordersService } from '../services/orders.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.createOrder(req.body);
  res.status(201).json({ data: order });
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await ordersService.getOrders();
  res.status(200).json({ data: orders });
});
