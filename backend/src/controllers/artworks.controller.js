import { artworksService } from '../services/artworks.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getArtworks = asyncHandler(async (req, res) => {
  const { artist, category, search, sortBy } = req.query;
  const artworks = await artworksService.getArtworks({ artist, category, search, sortBy });
  res.status(200).json({ data: artworks });
});

export const getArtworkById = asyncHandler(async (req, res) => {
  const artwork = await artworksService.getArtworkById(Number(req.params.id));
  res.status(200).json({ data: artwork });
});

export const createArtwork = asyncHandler(async (req, res) => {
  const artwork = await artworksService.createArtwork(req.body);
  res.status(201).json({ data: artwork });
});

export const updateArtwork = asyncHandler(async (req, res) => {
  const artwork = await artworksService.updateArtwork(Number(req.params.id), req.body);
  res.status(200).json({ data: artwork });
});

export const deleteArtwork = asyncHandler(async (req, res) => {
  await artworksService.deleteArtwork(Number(req.params.id));
  res.status(204).send();
});
