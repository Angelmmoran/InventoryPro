import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken'; 

const app = express();
app.use(cors());
app.use(express.json());


const SECRET_KEY = 'tu_super_secreto_inventorypro_2026';


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventory_pro'
};

let pool;
async function initDb() {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log('✅ Conectado a MySQL');
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
  }
}
initDb();


const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) return res.status(403).json({ mensaje: 'No hay token, acceso denegado' });

  
  const tokenLimpio = token.split(' ')[1];

  jwt.verify(tokenLimpio, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    req.usuario = decoded; 
    next(); 
  });
};


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body; 
  try {
 
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE email = ? AND contraseña = ?', [username, password]);
    
    if (rows.length > 0) {
      const usuario = rows[0];
      const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ success: true, mensaje: 'Login correcto', token: token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
    } else {
      res.status(401).json({ success: false, mensaje: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/api/productos', verificarToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo productos' });
  }
});



app.post('/api/movimientos', verificarToken, async (req, res) => {
  const { producto_id, tipo, cantidad } = req.body;
  const usuario_id = req.usuario.id; 
  
  
  const cantidadReal = parseInt(cantidad, 10);

  try {
    
    await pool.query(
      'INSERT INTO Movimientos (producto_id, usuario_id, tipo, cantidad) VALUES (?, ?, ?, ?)',
      [producto_id, usuario_id, tipo, cantidadReal]
    );

    
    if (tipo === 'entrada') {
      await pool.query('UPDATE Productos SET stock = stock + ? WHERE id = ?', [cantidadReal, producto_id]);
    } else if (tipo === 'salida') {
      await pool.query('UPDATE Productos SET stock = stock - ? WHERE id = ?', [cantidadReal, producto_id]);
    }

    res.json({ success: true, mensaje: 'Movimiento registrado y stock actualizado' });
  } catch (error) {
    console.error('Error en el movimiento:', error);
    res.status(500).json({ error: 'Error al registrar el movimiento' });
  }
});

// 4. ENDPOINT PROTEGIDO: Crear Nuevo Producto
app.post('/api/productos', verificarToken, async (req, res) => {
  const { referencia, nombre, descripcion, categoria, stock_minimo } = req.body;
  
  try {
    
    const [result] = await pool.query(
      'INSERT INTO Productos (referencia, nombre, descripcion, categoria, stock_minimo, stock) VALUES (?, ?, ?, ?, ?, 0)',
      [referencia, nombre, descripcion, categoria, stock_minimo]
    );

    res.status(201).json({ success: true, mensaje: 'Producto creado', id: result.insertId });
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    res.status(500).json({ error: 'Error interno de la base de datos' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});