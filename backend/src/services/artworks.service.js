import { artworksRepository } from '../repositories/artworks.repository.js';
import { ApiError } from '../utils/ApiError.js';

const applyFilters = (artworks, { artist, category, search, sortBy } = {}) => {
  let result = artworks;

  if (artist) {
    result = result.filter((artwork) => artwork.artist.toLowerCase() === artist.toLowerCase());
  }

  if (category) {
    result = result.filter((artwork) => artwork.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(term) || artwork.artist.toLowerCase().includes(term)
    );
  }

  if (sortBy === 'price_asc') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
};

export const artworksService = {
  async getArtworks(filters) {
    const artworks = await artworksRepository.findAll();
    return applyFilters(artworks, filters);
  },

  async getArtworkById(id) {
    const artwork = await artworksRepository.findById(id);
    if (!artwork) {
      throw ApiError.notFound(`No se encontró el cuadro con id ${id}`);
    }
    return artwork;
  },

  async createArtwork(data) {
    return artworksRepository.create(data);
  },

  async updateArtwork(id, data) {
    const updated = await artworksRepository.update(id, data);
    if (!updated) {
      throw ApiError.notFound(`No se encontró el cuadro con id ${id}`);
    }
    return updated;
  },

  async deleteArtwork(id) {
    const removed = await artworksRepository.remove(id);
    if (!removed) {
      throw ApiError.notFound(`No se encontró el cuadro con id ${id}`);
    }
  },
};
