import { Link } from 'react-router-dom';
import { QuantitySelector } from '../artwork/QuantitySelector.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import styles from './CartItemRow.module.css';

export const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => (
  <div className={styles.row}>
    <img src={item.imageUrl} alt={item.title} className={styles.thumbnail} />
    <div className={styles.info}>
      <Link to={`/cuadros/${item.artworkId}`} className={styles.title}>
        {item.title}
      </Link>
      <p className={styles.artist}>{item.artist}</p>
      <p className={styles.unitPrice}>{formatCurrency(item.unitPrice)} c/u</p>
    </div>
    <QuantitySelector
      quantity={item.quantity}
      max={item.stock}
      onChange={(quantity) => onUpdateQuantity(item.artworkId, quantity)}
    />
    <p className={styles.subtotal}>{formatCurrency(item.unitPrice * item.quantity)}</p>
    <button
      type="button"
      className={styles.remove}
      onClick={() => onRemove(item.artworkId)}
      aria-label={`Quitar ${item.title} del carrito`}
    >
      Quitar
    </button>
  </div>
);
