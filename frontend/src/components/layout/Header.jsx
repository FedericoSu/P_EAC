import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import styles from './Header.module.css';

const navLinkClass = ({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          Galería de Arte
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={navLinkClass} end>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={navLinkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Administración
          </NavLink>
          <NavLink to="/carrito" className={navLinkClass}>
            Carrito{itemCount > 0 ? ` (${itemCount})` : ''}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
