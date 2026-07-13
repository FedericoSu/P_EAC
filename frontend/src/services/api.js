const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Wrapper mínimo sobre fetch que centraliza el manejo de errores de la API:
 * lee el mensaje del backend cuando la respuesta no es exitosa y lo
 * convierte en un Error legible por la UI.
 */
export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const isNoContent = response.status === 204;
  const body = isNoContent ? null : await response.json();

  if (!response.ok) {
    const message = body?.error?.message || 'Ocurrió un error al comunicarse con el servidor';
    throw new Error(message);
  }

  return body?.data;
};
