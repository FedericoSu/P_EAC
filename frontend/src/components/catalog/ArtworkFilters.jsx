import styles from './ArtworkFilters.module.css';

export const ArtworkFilters = ({ artists, categories, filters, onChange }) => (
  <div className={styles.filters}>
    <label className={styles.field}>
      <span>Artista</span>
      <select
        value={filters.artist}
        onChange={(event) => onChange({ ...filters, artist: event.target.value })}
      >
        <option value="">Todos</option>
        {artists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>
    </label>

    <label className={styles.field}>
      <span>Categoría</span>
      <select
        value={filters.category}
        onChange={(event) => onChange({ ...filters, category: event.target.value })}
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  </div>
);
