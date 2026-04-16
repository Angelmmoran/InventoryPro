import { expect, test } from 'vitest';
import { calcularTotalStock } from './calculos.js';

test('Calcula correctamente la suma total del stock', () => {
  const inventarioFalso = [
    { id: 1, nombre: 'Producto A', stock: 10 },
    { id: 2, nombre: 'Producto B', stock: 5 }
  ];
  const total = calcularTotalStock(inventarioFalso);
  expect(total).toBe(15);
});

test('Devuelve 0 si el inventario está vacío', () => {
  expect(calcularTotalStock([])).toBe(0);
});