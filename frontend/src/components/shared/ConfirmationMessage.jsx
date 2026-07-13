import styles from './ConfirmationMessage.module.css';

export const ConfirmationMessage = ({ title, message, children }) => (
  <div className={styles.wrapper} role="status">
    <div className={styles.icon}>✓</div>
    <h2>{title}</h2>
    <p>{message}</p>
    {children}
  </div>
);
