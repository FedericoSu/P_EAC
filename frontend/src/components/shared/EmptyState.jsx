import styles from './EmptyState.module.css';

export const EmptyState = ({ message = 'No hay elementos para mostrar.', children }) => (
  <div className={styles.wrapper}>
    <p>{message}</p>
    {children}
  </div>
);
