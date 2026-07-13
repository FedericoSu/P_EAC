import styles from './SearchBar.module.css';

export const SearchBar = ({ value, onChange }) => (
  <input
    type="search"
    className={styles.input}
    placeholder="Buscar por título o artista..."
    value={value}
    onChange={(event) => onChange(event.target.value)}
    aria-label="Buscar cuadros"
  />
);
