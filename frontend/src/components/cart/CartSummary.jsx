import { formatCurrency } from '../../utils/formatCurrency.js';
import styles from './CartSummary.module.css';

export const CartSummary = ({ total, itemCount, children }) => (
  <div className={styles.summary}>
    <h2>Resumen de compra</h2>
    <div className={styles.line}>
      <span>Artículos</span>
      <span>{itemCount}</span>
    </div>
    <div className={styles.line}>
      <span>Total</span>
      <span className={styles.total}>{formatCurrency(total)}</span>
    </div>
    {children}
  </div>
);
