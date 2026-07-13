import { ApiError } from '../utils/ApiError.js';

const REQUIRED_STRING_FIELDS = [
  'title',
  'artist',
  'description',
  'imageUrl',
  'category',
  'technique',
  'dimensions',
];

/**
 * Valida el cuerpo de creación/edición de un cuadro. Se usa en POST y PUT;
 * en PUT los campos ausentes se ignoran (actualización parcial permitida).
 */
export const validateArtwork = (options = {}) => (req, res, next) => {
  const { partial = false } = options;
  const body = req.body;
  const errors = [];

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = body[field];
    if (value === undefined && partial) continue;
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`El campo "${field}" es obligatorio y debe ser un texto no vacío`);
    }
  }

  if (body.year === undefined && partial) {
    // sin cambios
  } else if (!Number.isInteger(body.year) || body.year < 0) {
    errors.push('El campo "year" debe ser un número entero válido');
  }

  if (body.price === undefined && partial) {
    // sin cambios
  } else if (typeof body.price !== 'number' || body.price < 0) {
    errors.push('El campo "price" debe ser un número mayor o igual a 0');
  }

  if (body.stock === undefined && partial) {
    // sin cambios
  } else if (!Number.isInteger(body.stock) || body.stock < 0) {
    errors.push('El campo "stock" debe ser un número entero mayor o igual a 0');
  }

  if (body.featured !== undefined && typeof body.featured !== 'boolean') {
    errors.push('El campo "featured" debe ser booleano');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Datos de cuadro inválidos', errors));
  }

  next();
};
