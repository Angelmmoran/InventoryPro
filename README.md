# 📦 InventoryPro - Diario de Desarrollo

Este repositorio contiene la implementación de **InventoryPro**, centrada en la transición de un diseño técnico a una aplicación funcional Full Stack.

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

## 🏁 4. Conclusiones y Cierra del Proyecto
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

## 🏁 4. Conclusiones y Cierre del Proyecto

Con el desarrollo de **InventoryPro** he logrado transformar un diseño técnico inicial en una aplicación Full Stack robusta, segura y completamente funcional. He cumplido los requisitos establecidos y se han realizado pruebas que avalan su estabilidad.

### 🧠 Lecciones Aprendidas

Durante el ciclo de desarrollo, he consolidado conocimientos vitales para la ingeniería de software:

* **La criticidad del Modelo de Datos:** Se evidenció que un diseño sólido de la base de datos es el pilar de la aplicación. Incidencias resueltas en vivo, como la normalización de la columna `stock` o la adaptación del campo `email` para la autenticación, demostraron cómo el backend y el frontend dependen estrictamente de la estructura de persistencia.
* **Seguridad y Flujo de Autenticación:** La implementación de JSON Web Tokens (JWT) ha sido fundamental para comprender cómo se protegen las rutas en una arquitectura cliente-servidor (API REST) y cómo el navegador debe gestionar y enviar estos "pases" de forma segura en las cabeceras HTTP.
* **Sincronización de Entornos y Resolución de Errores:** El trabajo simultáneo con Vite y Node/Express reforzó mi capacidad de lectura de logs de consola y el manejo de peticiones asíncronas, solucionando problemas clásicos de CORS, puertos no disponibles y módulos faltantes.

### 🚀 Mejoras Posibles a Futuro

Aunque el sistema actual cumple su propósito como Producto Mínimo Viable (MVP), la arquitectura diseñada permite una alta escalabilidad. Algunas mejoras planteadas para iteraciones futuras son:

* **🛡️ Roles y Permisos Avanzados:** Restringir ciertas acciones administrativas (como dar de alta nuevos productos o usuarios) exclusivamente al rol `admin`, limitando a los empleados estándar únicamente al registro de movimientos de entrada/salida.
* **🔍 Paginación y Filtros de Búsqueda:** Implementar un sistema de búsqueda en tiempo real en la vista de Inventario para mantener un rendimiento óptimo de carga cuando la base de datos crezca en volumen de artículos.
* **📊 Generación de Reportes Exportables:** Añadir la capacidad de descargar el estado actual del inventario o el historial del registro de movimientos a formatos PDF o Excel para facilitar auditorías físicas del almacén.
Añadir la capacidad de descargar el estado actual del inventario o el historial del registro de movimientos a formatos PDF o Excel para facilitar auditorías físicas del almacén.

---
