import { Link, useNavigate } from 'react-router-dom';
import { CartItemRow } from '../components/cart/CartItemRow.jsx';
import { CartSummary } from '../components/cart/CartSummary.jsx';
import { EmptyState } from '../components/shared/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <EmptyState message="Tu carrito está vacío.">
          <Link to="/catalogo" className={styles.browseLink}>
            Explorar catálogo
          </Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Carrito de compras</h1>
      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItemRow
              key={item.artworkId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
        <CartSummary total={total} itemCount={itemCount}>
          <button type="button" className={styles.checkoutButton} onClick={() => navigate('/finalizar-compra')}>
            Finalizar compra
          </button>
        </CartSummary>
      </div>
    </div>
  );
};
