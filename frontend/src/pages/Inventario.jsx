import { useState, useEffect } from 'react';

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ referencia: '', nombre: '', descripcion: '', categoria: '', stock_minimo: 0 });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:3000/api/productos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        } else {
          console.error("Error al obtener productos, ¿token inválido?");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    const res = await fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      const newProduct = { ...formData, id: Date.now() };
      setProductos([...productos, newProduct]);
      setFormData({ referencia: '', nombre: '', descripcion: '', categoria: '', stock_minimo: 0 }); 
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Gestión de Inventario</h1>
      
      {}
      <div className="bg-white p-6 rounded shadow-sm mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Añadir Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="referencia" value={formData.referencia} onChange={handleChange} placeholder="Referencia (SKU)" className="border p-2 rounded" required />
          <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre del Producto" className="border p-2 rounded" required />
          <input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" className="border p-2 rounded" />
          <input name="stock_minimo" type="number" value={formData.stock_minimo} onChange={handleChange} placeholder="Stock Mínimo" className="border p-2 rounded" />
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción..." className="border p-2 rounded col-span-2"></textarea>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded col-span-2 transition">Registrar Producto</button>
        </form>
      </div>

      {}
      <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">Ref</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Stock Mínimo</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.referencia}</td>
                <td className="p-3 font-medium">{p.nombre}</td>
                <td className="p-3 text-gray-600">{p.categoria}</td>
                <td className="p-3 text-red-500">{p.stock_minimo}</td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">No hay productos en la base de datos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}