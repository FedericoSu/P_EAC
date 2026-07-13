import { useMemo, useState } from 'react';
import { ArtworkCard } from '../components/catalog/ArtworkCard.jsx';
import { ArtworkFilters } from '../components/catalog/ArtworkFilters.jsx';
import { SearchBar } from '../components/catalog/SearchBar.jsx';
import { SortSelector } from '../components/catalog/SortSelector.jsx';
import { LoadingSpinner } from '../components/shared/LoadingSpinner.jsx';
import { ErrorMessage } from '../components/shared/ErrorMessage.jsx';
import { EmptyState } from '../components/shared/EmptyState.jsx';
import { useArtworks } from '../hooks/useArtworks.js';
import styles from './CatalogPage.module.css';

const initialFilters = { artist: '', category: '', search: '', sortBy: '' };

export const CatalogPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const { artworks: allArtworks } = useArtworks();
  const { artworks, isLoading, error } = useArtworks(filters);

  const artists = useMemo(
    () => [...new Set(allArtworks.map((artwork) => artwork.artist))].sort(),
    [allArtworks]
  );
  const categories = useMemo(
    () => [...new Set(allArtworks.map((artwork) => artwork.category))].sort(),
    [allArtworks]
  );

  return (
    <div className={styles.page}>
      <h1>Catálogo de cuadros</h1>

      <div className={styles.toolbar}>
        <SearchBar value={filters.search} onChange={(search) => setFilters({ ...filters, search })} />
        <ArtworkFilters artists={artists} categories={categories} filters={filters} onChange={setFilters} />
        <SortSelector value={filters.sortBy} onChange={(sortBy) => setFilters({ ...filters, sortBy })} />
      </div>

      {isLoading && <LoadingSpinner label="Cargando catálogo..." />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && artworks.length === 0 && (
        <EmptyState message="No se encontraron cuadros con esos filtros." />
      )}
      {!isLoading && !error && artworks.length > 0 && (
        <div className={styles.grid}>
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
};
