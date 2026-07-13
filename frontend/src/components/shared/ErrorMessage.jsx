import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ message = 'Ocurrió un error inesperado.', onRetry }) => (
  <div className={styles.wrapper} role="alert">
    <p>{message}</p>
    {onRetry && (
      <button type="button" className={styles.retryButton} onClick={onRetry}>
        Reintentar
      </button>
    )}
  </div>
);
