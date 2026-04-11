const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'inventory_pro'
});

// Endpoint 1: Obtener todos los productos (GET /api/productos)
app.get('/api/productos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Endpoint 2: Crear un nuevo producto (POST /api/productos)
app.post('/api/productos', async (req, res) => {
    const { referencia, nombre, descripcion, categoria, stock_minimo } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Productos (referencia, nombre, descripcion, categoria, stock_minimo) VALUES (?, ?, ?, ?, ?)',
            [referencia, nombre, descripcion, categoria, stock_minimo]
        );
        res.status(201).json({ id: result.insertId, mensaje: 'Producto creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});