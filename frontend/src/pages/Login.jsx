import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de login para la Entrega 3
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-slate-800">
        📦 InventoryPro
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Usuario" 
            className="border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-600"
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-600"
            required 
          />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded mt-2 hover:bg-blue-700 transition font-medium">
            Ingresar
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}