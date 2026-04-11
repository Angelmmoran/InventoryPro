CREATE DATABASE IF NOT EXISTS inventory_pro;
USE inventory_pro;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'empleado') NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referencia VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    stock_minimo INT DEFAULT 0
);


INSERT INTO Usuarios (nombre, email, contraseña, rol) VALUES ('Admin User', 'admin@inventorypro.com', '123456', 'admin');