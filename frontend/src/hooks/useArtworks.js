import { useEffect, useState } from 'react';
import { artworksApi } from '../services/artworksApi.js';

/**
 * Carga el listado de cuadros aplicando filtros. Se re-ejecuta cada vez
 * que cambia el objeto de filtros (artista, categoría, búsqueda, orden).
 */
export const useArtworks = (filters) => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    artworksApi
      .getAll(filters)
      .then((data) => {
        if (!isCancelled) setArtworks(data);
      })
      .catch((err) => {
        if (!isCancelled) setError(err.message);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [JSON.stringify(filters)]);

  return { artworks, isLoading, error, setArtworks };
};
