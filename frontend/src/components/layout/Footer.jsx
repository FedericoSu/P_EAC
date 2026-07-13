import { DisclaimerBanner } from '../shared/DisclaimerBanner.jsx';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <DisclaimerBanner />
    <p className={styles.copy}>Galería de Arte — Proyecto educativo, {new Date().getFullYear()}.</p>
  </footer>
);
