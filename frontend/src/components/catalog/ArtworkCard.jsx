import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency.js';
import styles from './ArtworkCard.module.css';

export const ArtworkCard = ({ artwork }) => (
  <Link to={`/cuadros/${artwork.id}`} className={styles.card}>
    <div className={styles.imageWrapper}>
      <img src={artwork.imageUrl} alt={artwork.title} loading="lazy" />
      {artwork.stock === 0 && <span className={styles.soldOut}>Sin stock</span>}
    </div>
    <div className={styles.body}>
      <span className={styles.category}>{artwork.category}</span>
      <h3 className={styles.title}>{artwork.title}</h3>
      <p className={styles.artist}>{artwork.artist}</p>
      <p className={styles.price}>{formatCurrency(artwork.price)}</p>
    </div>
  </Link>
);
