import { Router } from 'express';
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} from '../controllers/artworks.controller.js';
import { validateArtwork } from '../middlewares/validateArtwork.js';

export const artworksRouter = Router();

artworksRouter.get('/', getArtworks);
artworksRouter.get('/:id', getArtworkById);
artworksRouter.post('/', validateArtwork(), createArtwork);
artworksRouter.put('/:id', validateArtwork({ partial: true }), updateArtwork);
artworksRouter.delete('/:id', deleteArtwork);
