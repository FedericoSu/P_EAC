import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = ({ label = 'Cargando...' }) => (
  <div className={styles.wrapper} role="status">
    <div className={styles.spinner} />
    <span>{label}</span>
  </div>
);
