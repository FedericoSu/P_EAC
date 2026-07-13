import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.content}>
      <h1>Obras maestras, reinterpretadas para tu hogar</h1>
      <p>
        Explora una colección curada de cuadros inspirados en los artistas más influyentes de la
        historia del arte.
      </p>
      <Link to="/catalogo" className={styles.cta}>
        Ver catálogo
      </Link>
    </div>
  </section>
);
