import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Topbar */}
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2 text-xl font-bold">
          📦 InventoryPro
        </div>
        <div className="flex items-center gap-4">
          <span>👤 Usuario</span>
          <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-48 bg-white border-r p-4 flex flex-col gap-4 shadow-sm">
          <Link to="/" className="bg-blue-600 text-white text-center py-2 rounded shadow transition hover:bg-blue-700">Inicio</Link>
          <Link to="/inventario" className="bg-slate-800 text-white text-center py-2 rounded shadow transition hover:bg-slate-700">Inventario</Link>
          <Link to="/movimientos" className="bg-slate-800 text-white text-center py-2 rounded shadow transition hover:bg-slate-700">Movimientos</Link>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}