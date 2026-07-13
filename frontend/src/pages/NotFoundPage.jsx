import { Link } from 'react-router-dom';
import { EmptyState } from '../components/shared/EmptyState.jsx';

export const NotFoundPage = () => (
  <EmptyState message="La página que buscas no existe.">
    <Link to="/">Volver al inicio</Link>
  </EmptyState>
);
