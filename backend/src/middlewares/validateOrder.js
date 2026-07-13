import { ApiError } from '../utils/ApiError.js';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateOrder = (req, res, next) => {
  const { customerName, customerEmail, address, items } = req.body;
  const errors = [];

  if (!isNonEmptyString(customerName)) {
    errors.push('El campo "customerName" es obligatorio');
  }

  if (!isNonEmptyString(customerEmail) || !EMAIL_REGEX.test(customerEmail)) {
    errors.push('El campo "customerEmail" debe ser un email válido');
  }

  if (!isNonEmptyString(address)) {
    errors.push('El campo "address" es obligatorio');
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('El pedido debe incluir al menos un elemento en "items"');
  } else {
    items.forEach((item, index) => {
      if (!Number.isInteger(item.artworkId)) {
        errors.push(`items[${index}].artworkId debe ser un número entero`);
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`items[${index}].quantity debe ser un número entero mayor a 0`);
      }
    });
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Datos de pedido inválidos', errors));
  }

  next();
};
