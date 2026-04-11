import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Inventario from './pages/Inventario';
import Dashboard from './pages/Dashboard';
import Movimientos from './pages/Movimientos'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="movimientos" element={<Movimientos />} /> {}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;