/**
 * Genera ids numéricos autoincrementales a partir de una colección existente,
 * imitando el comportamiento de una columna SERIAL/BIGSERIAL en SQL.
 * Esto facilita que, al migrar a una base de datos real, el resto del
 * código no dependa de cómo se generan los ids.
 */
export const nextId = (items) => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
};
