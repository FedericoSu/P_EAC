import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orders.controller.js';
import { validateOrder } from '../middlewares/validateOrder.js';

export const ordersRouter = Router();

ordersRouter.post('/', validateOrder, createOrder);
ordersRouter.get('/', getOrders);
