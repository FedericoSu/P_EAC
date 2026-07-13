import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuantitySelector } from '../components/artwork/QuantitySelector.jsx';
import { LoadingSpinner } from '../components/shared/LoadingSpinner.jsx';
import { ErrorMessage } from '../components/shared/ErrorMessage.jsx';
import { useArtwork } from '../hooks/useArtwork.js';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';
import styles from './ArtworkDetailPage.module.css';

export const ArtworkDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { artwork, isLoading, error } = useArtwork(Number(id));
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  if (isLoading) return <LoadingSpinner label="Cargando obra..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => navigate(0)} />;
  if (!artwork) return null;

  const outOfStock = artwork.stock === 0;

  const handleAddToCart = () => {
    addItem(artwork, quantity);
    setAddedMessage(`Se agregaron ${quantity} unidad(es) al carrito.`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.imageWrapper}>
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>

      <div className={styles.details}>
        <span className={styles.category}>{artwork.category}</span>
        <h1>{artwork.title}</h1>
        <p className={styles.artist}>
          {artwork.artist} · {artwork.year}
        </p>
        <p className={styles.price}>{formatCurrency(artwork.price)}</p>

        <dl className={styles.specs}>
          <div>
            <dt>Técnica</dt>
            <dd>{artwork.technique}</dd>
          </div>
          <div>
            <dt>Dimensiones</dt>
            <dd>{artwork.dimensions}</dd>
          </div>
          <div>
            <dt>Stock disponible</dt>
            <dd>{artwork.stock}</dd>
          </div>
        </dl>

        <p className={styles.description}>{artwork.description}</p>

        {outOfStock ? (
          <p className={styles.outOfStock}>Este cuadro no tiene stock disponible por el momento.</p>
        ) : (
          <div className={styles.purchaseRow}>
            <QuantitySelector quantity={quantity} max={artwork.stock} onChange={setQuantity} />
            <button type="button" className={styles.addButton} onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        )}

        {addedMessage && <p className={styles.confirmation}>{addedMessage}</p>}
      </div>
    </div>
  );
};
