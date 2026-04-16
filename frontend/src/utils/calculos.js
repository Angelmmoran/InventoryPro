export const calcularTotalStock = (productos) => {
  if (!productos || productos.length === 0) return 0;
  return productos.reduce((total, producto) => total + producto.stock, 0);
};