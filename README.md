# 📦 InventoryPro - Diario de Desarrollo (Entrega 3)

Este repositorio contiene la implementación parcial de **InventoryPro**, centrada en la transición de un diseño técnico a una aplicación funcional Full Stack.

---

## 🚀 1. Resumen del Progreso
En esta fase se ha transformado el diseño técnico de la Entrega 2 en una aplicación funcional. El objetivo ha sido cumplir con los requisitos de la **tercera entrega**:
* **Backend:** Configurado con conexión a base de datos funcional.
* **Endpoints:** Implementación de rutas funcionales para la gestión de datos.
* **Frontend:** Interfaz con pantallas navegables y un CRUD básico operativo.
* **Repositorio:** [Acceso al código en GitHub](https://github.com/Angelmmoran/InventoryPro)

---

## 🛠️ 2. Decisiones Técnicas y Arquitectura
Siguiendo el diseño inicial, se han consolidado las siguientes tecnologías:

* **Persistencia de Datos:** Implementación del modelo lógico en **MySQL**, con las tablas `Usuarios`, `Productos` y `Movimientos` integradas según el diagrama E-R.
* **Backend (Node.js + Express):** Uso de la librería `mysql2/promise` para gestionar conexiones asíncronas mediante un *pool*, optimizando la eficiencia de las consultas SQL.
* **Frontend (React + Tailwind CSS):** Uso de **Vite** para un desarrollo ágil y **React Router Dom** para la navegación entre *Login*, *Dashboard* e *Inventario*.
* **Identidad Visual:** Aplicación de la paleta de colores corporativa:
    * `Slate-800`: Marca y navegación.
    * `Blue-600`: Acciones principales.
    * `Red-500`: Alertas de stock bajo.

---

## 📝 3. Log de Desarrollo: Incidencias y Soluciones

Durante la conexión de las capas de la aplicación, se resolvieron los siguientes retos técnicos:

### Fase 1: Configuración del Entorno y Base de Datos
* **Dificultad:** Acceso denegado a MySQL debido a credenciales por defecto en el entorno local de XAMPP.
* **Solución:** Verificación del archivo `config.inc.php` en phpMyAdmin, confirmando el usuario `root` sin contraseña y ajustando el objeto de conexión en el servidor.

### Fase 2: Estructura del Proyecto y Vite
* **Dificultad:** Error `Missing script: "dev"` al intentar arrancar el frontend.
* **Causa:** Archivos de React ubicados fuera del motor de compilación de Vite por una estructura de carpetas desorganizada.
* **Solución:** Inicialización de un proyecto limpio en la carpeta `/frontend`, migración de componentes a `src/components` y limpieza de dependencias redundantes.

### Fase 3: Conflictos de Librerías (React Hooks)
* **Dificultad:** Error `Invalid hook call` y pantalla blanca.
* **Causa:** Presencia de "Double React" (múltiples copias de la librería) por instalaciones cruzadas entre la raíz y la carpeta frontend.
* **Solución:** Limpieza total de `node_modules` y reinstalación de dependencias (`react-router-dom`, `tailwindcss`) exclusivamente dentro de la carpeta frontend.

### Fase 4: Migración a Tailwind CSS v4
* **Dificultad:** Error de compilación en PostCSS (Tailwind no detectado como plugin).
* **Causa:** Incompatibilidad de configuración con la nueva versión v4.0 de Tailwind instalada por defecto.
* **Solución:** Instalación del paquete `@tailwindcss/vite`, configuración del plugin en `vite.config.js` y actualización de la directiva de estilos a `@import "tailwindcss";` en `index.css`.

---

## 🏁 4. Conclusiones
La implementación parcial ha permitido validar la integridad del modelo de datos diseñado en la entrega anterior. Actualmente, la aplicación es capaz de:
1. Conectarse y listar productos desde **MySQL**.
2. Gestionar la navegación fluida entre vistas principales.
3. Mantener la coherencia visual definida en la guía de estilo.

---
