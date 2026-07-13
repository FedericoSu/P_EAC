import { nextId } from '../utils/idGenerator.js';

/**
 * Repositorio de pedidos. Igual que artworksRepository, expone una
 * interfaz async CRUD desacoplada del almacenamiento en memoria actual,
 * pensada para poder sustituirse por una tabla SQL más adelante.
 */
let orders = [];

const clone = (order) => ({ ...order, items: order.items.map((item) => ({ ...item })) });

export const ordersRepository = {
  async findAll() {
    return orders.map(clone);
  },

  async findById(id) {
    const order = orders.find((item) => item.id === id);
    return order ? clone(order) : null;
  },

  async create(data) {
    const order = { id: nextId(orders), ...data };
    orders.push(order);
    return clone(order);
  },
};
