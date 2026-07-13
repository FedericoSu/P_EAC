import { useState } from 'react';
import styles from './ArtworkForm.module.css';

const emptyArtwork = {
  title: '',
  artist: '',
  year: new Date().getFullYear(),
  description: '',
  price: 0,
  stock: 0,
  imageUrl: '',
  category: '',
  technique: '',
  dimensions: '',
  featured: false,
};

const NUMBER_FIELDS = new Set(['year', 'price', 'stock']);

export const ArtworkForm = ({ initialArtwork, onSubmit, onCancel, isSubmitting }) => {
  const [values, setValues] = useState(initialArtwork ?? emptyArtwork);

  const handleChange = (field) => (event) => {
    const { type, checked, value } = event.target;
    let nextValue = value;
    if (type === 'checkbox') nextValue = checked;
    else if (NUMBER_FIELDS.has(field)) nextValue = Number(value);
    setValues((current) => ({ ...current, [field]: nextValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Título</span>
          <input type="text" required value={values.title} onChange={handleChange('title')} />
        </label>

        <label className={styles.field}>
          <span>Artista</span>
          <input type="text" required value={values.artist} onChange={handleChange('artist')} />
        </label>

        <label className={styles.field}>
          <span>Año</span>
          <input type="number" required value={values.year} onChange={handleChange('year')} />
        </label>

        <label className={styles.field}>
          <span>Categoría</span>
          <input type="text" required value={values.category} onChange={handleChange('category')} />
        </label>

        <label className={styles.field}>
          <span>Técnica</span>
          <input type="text" required value={values.technique} onChange={handleChange('technique')} />
        </label>

        <label className={styles.field}>
          <span>Dimensiones</span>
          <input type="text" required value={values.dimensions} onChange={handleChange('dimensions')} />
        </label>

        <label className={styles.field}>
          <span>Precio (USD)</span>
          <input type="number" min="0" step="0.01" required value={values.price} onChange={handleChange('price')} />
        </label>

        <label className={styles.field}>
          <span>Stock</span>
          <input type="number" min="0" step="1" required value={values.stock} onChange={handleChange('stock')} />
        </label>

        <label className={styles.field}>
          <span>URL de imagen</span>
          <input type="url" required value={values.imageUrl} onChange={handleChange('imageUrl')} />
        </label>

        <label className={styles.checkboxField}>
          <input type="checkbox" checked={values.featured} onChange={handleChange('featured')} />
          <span>Obra destacada</span>
        </label>
      </div>

      <label className={styles.field}>
        <span>Descripción</span>
        <textarea rows={3} required value={values.description} onChange={handleChange('description')} />
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar cuadro'}
        </button>
      </div>
    </form>
  );
};
