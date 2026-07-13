import { ArtworkCard } from '../catalog/ArtworkCard.jsx';
import { LoadingSpinner } from '../shared/LoadingSpinner.jsx';
import { ErrorMessage } from '../shared/ErrorMessage.jsx';
import { EmptyState } from '../shared/EmptyState.jsx';
import styles from './FeaturedArtworks.module.css';

export const FeaturedArtworks = ({ artworks, isLoading, error }) => {
  const featured = artworks.filter((artwork) => artwork.featured);

  return (
    <section className={styles.section}>
      <h2>Obras destacadas</h2>
      {isLoading && <LoadingSpinner label="Cargando obras destacadas..." />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && featured.length === 0 && (
        <EmptyState message="No hay obras destacadas por el momento." />
      )}
      {!isLoading && !error && featured.length > 0 && (
        <div className={styles.grid}>
          {featured.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </section>
  );
};
