import { Hero } from '../components/home/Hero.jsx';
import { FeaturedArtworks } from '../components/home/FeaturedArtworks.jsx';
import { useArtworks } from '../hooks/useArtworks.js';

export const HomePage = () => {
  const { artworks, isLoading, error } = useArtworks();

  return (
    <>
      <Hero />
      <FeaturedArtworks artworks={artworks} isLoading={isLoading} error={error} />
    </>
  );
};
