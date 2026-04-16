import { useState, useEffect } from 'react';

export default function Movimientos() {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({
    producto_id: '',
    tipo: 'entrada',
    cantidad: 1
  });
  const [mensaje, setMensaje] = useState(null);

  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/productos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/movimientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formulario)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje({ tipo: 'exito', texto: '¡Stock actualizado correctamente!' });
       
        setFormulario({ ...formulario, cantidad: 1 }); 
      } else {
        setMensaje({ tipo: 'error', texto: data.error || 'Error al actualizar' });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Registrar Movimiento</h1>
      
      {mensaje && (
        <div className={`p-4 mb-6 rounded ${mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
          <select 
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            value={formulario.producto_id}
            onChange={(e) => setFormulario({...formulario, producto_id: e.target.value})}
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} (Stock actual: {p.stock})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de movimiento</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={formulario.tipo}
              onChange={(e) => setFormulario({...formulario, tipo: e.target.value})}
            >
              <option value="entrada">Entrada (Sumar stock)</option>
              <option value="salida">Salida (Restar stock)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input 
              type="number" 
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={formulario.cantidad}
              onChange={(e) => setFormulario({...formulario, cantidad: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition"
        >
          Registrar Operación
        </button>
      </form>
    </div>
  );
}