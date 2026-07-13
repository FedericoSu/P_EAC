import { useState } from 'react';
import { ArtworkForm } from '../components/admin/ArtworkForm.jsx';
import { ArtworkTable } from '../components/admin/ArtworkTable.jsx';
import { LoadingSpinner } from '../components/shared/LoadingSpinner.jsx';
import { ErrorMessage } from '../components/shared/ErrorMessage.jsx';
import { EmptyState } from '../components/shared/EmptyState.jsx';
import { useArtworks } from '../hooks/useArtworks.js';
import { artworksApi } from '../services/artworksApi.js';
import styles from './AdminPage.module.css';

export const AdminPage = () => {
  const { artworks, isLoading, error, setArtworks } = useArtworks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);

  const openCreateForm = () => {
    setEditingArtwork(null);
    setIsFormOpen(true);
    setActionError(null);
  };

  const openEditForm = (artwork) => {
    setEditingArtwork(artwork);
    setIsFormOpen(true);
    setActionError(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingArtwork(null);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setActionError(null);

    try {
      if (editingArtwork) {
        const updated = await artworksApi.update(editingArtwork.id, values);
        setArtworks((current) => current.map((artwork) => (artwork.id === updated.id ? updated : artwork)));
      } else {
        const created = await artworksApi.create(values);
        setArtworks((current) => [...current, created]);
      }
      closeForm();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (artwork) => {
    const confirmed = window.confirm(`¿Eliminar "${artwork.title}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    try {
      await artworksApi.remove(artwork.id);
      setArtworks((current) => current.filter((item) => item.id !== artwork.id));
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Administración de cuadros</h1>
        {!isFormOpen && (
          <button type="button" className={styles.addButton} onClick={openCreateForm}>
            Agregar cuadro
          </button>
        )}
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {isFormOpen && (
        <ArtworkForm
          initialArtwork={editingArtwork}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isSubmitting={isSubmitting}
        />
      )}

      {isLoading && <LoadingSpinner label="Cargando cuadros..." />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && artworks.length === 0 && <EmptyState message="No hay cuadros cargados todavía." />}
      {!isLoading && !error && artworks.length > 0 && (
        <ArtworkTable artworks={artworks} onEdit={openEditForm} onDelete={handleDelete} />
      )}
    </div>
  );
};
