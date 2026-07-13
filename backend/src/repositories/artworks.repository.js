import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { nextId } from '../utils/idGenerator.js';

const dataFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/artworks.data.json');
const seedArtworks = JSON.parse(readFileSync(dataFilePath, 'utf-8'));

/**
 * Repositorio de cuadros. Expone una interfaz async CRUD independiente
 * de la fuente de datos concreta. Hoy trabaja sobre un array en memoria
 * (sembrado desde un JSON); mañana esta misma interfaz puede reimplementarse
 * con consultas SQL sin que services/controllers/routes cambien.
 */
let artworks = seedArtworks.map((artwork) => ({ ...artwork }));

const clone = (artwork) => ({ ...artwork });

export const artworksRepository = {
  async findAll() {
    return artworks.map(clone);
  },

  async findById(id) {
    const artwork = artworks.find((item) => item.id === id);
    return artwork ? clone(artwork) : null;
  },

  async create(data) {
    const artwork = { id: nextId(artworks), ...data };
    artworks.push(artwork);
    return clone(artwork);
  },

  async update(id, data) {
    const index = artworks.findIndex((item) => item.id === id);
    if (index === -1) return null;
    artworks[index] = { ...artworks[index], ...data, id };
    return clone(artworks[index]);
  },

  async remove(id) {
    const index = artworks.findIndex((item) => item.id === id);
    if (index === -1) return false;
    artworks.splice(index, 1);
    return true;
  },

  async decrementStock(id, quantity) {
    const index = artworks.findIndex((item) => item.id === id);
    if (index === -1) return null;
    artworks[index] = { ...artworks[index], stock: artworks[index].stock - quantity };
    return clone(artworks[index]);
  },
};
