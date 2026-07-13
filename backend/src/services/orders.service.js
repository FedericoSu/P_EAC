import { ordersRepository } from '../repositories/orders.repository.js';
import { artworksRepository } from '../repositories/artworks.repository.js';
import { ApiError } from '../utils/ApiError.js';

const ORDER_STATUS = {
  PENDING: 'pending',
};

/**
 * Valida el pedido contra el catálogo real y construye sus líneas de detalle.
 * El precio unitario y el total siempre se calculan aquí, nunca se confía
 * en los valores que pudiera enviar el cliente.
 */
const buildOrderItems = async (requestedItems) => {
  const orderItems = [];

  for (const requestedItem of requestedItems) {
    const artwork = await artworksRepository.findById(requestedItem.artworkId);

    if (!artwork) {
      throw ApiError.badRequest(`El cuadro con id ${requestedItem.artworkId} no existe`);
    }

    if (artwork.stock < requestedItem.quantity) {
      throw ApiError.conflict(
        `Stock insuficiente para "${artwork.title}". Disponible: ${artwork.stock}, solicitado: ${requestedItem.quantity}`
      );
    }

    orderItems.push({
      artworkId: artwork.id,
      title: artwork.title,
      quantity: requestedItem.quantity,
      unitPrice: artwork.price,
      subtotal: Number((artwork.price * requestedItem.quantity).toFixed(2)),
    });
  }

  return orderItems;
};

export const ordersService = {
  async createOrder({ customerName, customerEmail, address, items }) {
    const orderItems = await buildOrderItems(items);
    const total = Number(orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));

    for (const item of orderItems) {
      await artworksRepository.decrementStock(item.artworkId, item.quantity);
    }

    return ordersRepository.create({
      customerName,
      customerEmail,
      address,
      items: orderItems,
      total,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    });
  },

  async getOrders() {
    return ordersRepository.findAll();
  },
};
