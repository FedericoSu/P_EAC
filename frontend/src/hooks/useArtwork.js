import { useEffect, useState } from 'react';
import { artworksApi } from '../services/artworksApi.js';

export const useArtwork = (id) => {
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(null);

    artworksApi
      .getById(id)
      .then((data) => {
        if (!isCancelled) setArtwork(data);
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
  }, [id]);

  return { artwork, isLoading, error };
};
