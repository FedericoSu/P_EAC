import { formatCurrency } from '../../utils/formatCurrency.js';
import styles from './ArtworkTable.module.css';

export const ArtworkTable = ({ artworks, onEdit, onDelete }) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Artista</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Destacada</th>
          <th aria-label="Acciones" />
        </tr>
      </thead>
      <tbody>
        {artworks.map((artwork) => (
          <tr key={artwork.id}>
            <td>{artwork.title}</td>
            <td>{artwork.artist}</td>
            <td>{artwork.category}</td>
            <td>{formatCurrency(artwork.price)}</td>
            <td>{artwork.stock}</td>
            <td>{artwork.featured ? 'Sí' : 'No'}</td>
            <td className={styles.actions}>
              <button type="button" onClick={() => onEdit(artwork)}>
                Editar
              </button>
              <button type="button" className={styles.deleteButton} onClick={() => onDelete(artwork)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
