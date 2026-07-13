import { Router } from 'express';
import { artworksRouter } from './artworks.routes.js';
import { ordersRouter } from './orders.routes.js';

export const apiRouter = Router();

apiRouter.use('/artworks', artworksRouter);
apiRouter.use('/orders', ordersRouter);
