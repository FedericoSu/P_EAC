import { useState } from 'react';
import styles from './CheckoutForm.module.css';

const initialValues = { customerName: '', customerEmail: '', address: '' };

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.customerName.trim()) nextErrors.customerName = 'Ingresa tu nombre completo';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.customerEmail)) {
      nextErrors.customerEmail = 'Ingresa un email válido';
    }
    if (!values.address.trim()) nextErrors.address = 'Ingresa una dirección de envío';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>Datos del comprador</h2>

      <label className={styles.field}>
        <span>Nombre completo</span>
        <input type="text" value={values.customerName} onChange={handleChange('customerName')} />
        {errors.customerName && <small className={styles.error}>{errors.customerName}</small>}
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input type="email" value={values.customerEmail} onChange={handleChange('customerEmail')} />
        {errors.customerEmail && <small className={styles.error}>{errors.customerEmail}</small>}
      </label>

      <label className={styles.field}>
        <span>Dirección de envío</span>
        <textarea rows={3} value={values.address} onChange={handleChange('address')} />
        {errors.address && <small className={styles.error}>{errors.address}</small>}
      </label>

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando pedido...' : 'Confirmar compra'}
      </button>
    </form>
  );
};
