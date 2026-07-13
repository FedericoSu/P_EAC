export const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'USD' }).format(amount);
