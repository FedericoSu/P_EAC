/**
 * Envuelve un controlador async para reenviar cualquier excepción
 * al middleware de errores en lugar de requerir try/catch repetido.
 */
export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
