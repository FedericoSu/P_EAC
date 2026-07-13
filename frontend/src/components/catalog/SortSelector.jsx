import styles from './SortSelector.module.css';

export const SortSelector = ({ value, onChange }) => (
  <label className={styles.field}>
    <span>Ordenar por</span>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Relevancia</option>
      <option value="price_asc">Precio: menor a mayor</option>
      <option value="price_desc">Precio: mayor a menor</option>
    </select>
  </label>
);
