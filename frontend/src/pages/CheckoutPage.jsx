import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../components/checkout/CheckoutForm.jsx';
import { CartSummary } from '../components/cart/CartSummary.jsx';
import { ErrorMessage } from '../components/shared/ErrorMessage.jsx';
import { ConfirmationMessage } from '../components/shared/ConfirmationMessage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ordersApi } from '../services/ordersApi.js';
import styles from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to="/carrito" replace />;
  }

  const handleSubmit = async (buyerData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const order = await ordersApi.create({
        ...buyerData,
        items: items.map((item) => ({ artworkId: item.artworkId, quantity: item.quantity })),
      });
      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className={styles.page}>
        <ConfirmationMessage
          title="¡Pedido confirmado!"
          message={`Gracias, ${confirmedOrder.customerName}. Tu pedido #${confirmedOrder.id} fue registrado correctamente.`}
        >
          <button type="button" className={styles.continueButton} onClick={() => navigate('/catalogo')}>
            Seguir explorando
          </button>
        </ConfirmationMessage>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Finalizar compra</h1>
      <div className={styles.layout}>
        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        <CartSummary total={total} itemCount={itemCount}>
          {error && <ErrorMessage message={error} />}
        </CartSummary>
      </div>
    </div>
  );
};
