import styles from './QuantitySelector.module.css';

export const QuantitySelector = ({ quantity, max, onChange }) => {
  const decrease = () => onChange(Math.max(1, quantity - 1));
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={decrease} disabled={quantity <= 1} aria-label="Disminuir cantidad">
        −
      </button>
      <span className={styles.value}>{quantity}</span>
      <button type="button" onClick={increase} disabled={quantity >= max} aria-label="Aumentar cantidad">
        +
      </button>
    </div>
  );
};
