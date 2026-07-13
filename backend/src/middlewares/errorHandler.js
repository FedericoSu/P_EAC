import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware centralizado de errores. Cualquier ApiError lanzado en
 * services/controllers termina aquí con su código HTTP correspondiente;
 * cualquier otro error inesperado se responde como 500.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error(err);
  res.status(500).json({
    error: {
      message: 'Error interno del servidor',
    },
  });
};
