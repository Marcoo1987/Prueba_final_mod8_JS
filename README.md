# Proyecto Final- Módulo 8 (Tienda estilo Cyberpunk)

Esta aplicación es un sistema construido con Node.js, Express, y Sequelize, diseñado para gestionar autenticación, base de datos relacional (PostgreSQL) y carga de archivos

## Tecnologías Utilizadas

- Core: JavaScript (Node.js)
- Framework Web: Express
- ORM: Sequelize (PostgreSQL)
- Motor de Plantillas: EJS
- Seguridad: JSON Web Tokens (JWT) y bcryptjs
- Middleware: Multer (Carga de archivos)

## Guía de Autenticación (Postman)

Para interactuar con las rutas protegidas, hay dar estos pasos:

1. Registro: Envía un POST a /api/auth/register con name, email, password y role.
2. Login: Envía un POST a /api/auth/login con tus credenciales. Recibirás un token.
3. Autorización: En Postman, ir a la pestaña Auth, selecciona Bearer Token y pegar el token recibido.

---

## Endpoints Principales

| Recurso               | Método | Endpoint               | Acceso    |
| :-------------------- | :------ | :--------------------- | :-------- |
| **Auth**        | POST    | `/api/auth/register` | Público  |
| **Auth**        | POST    | `/api/auth/login`    | Público  |
| **Productos**   | GET     | `/api/products`      | Público  |
| **Productos**   | POST    | `/api/products`      | Admin     |
| **Categorías** | GET     | `/api/categories`    | Público  |
| **Upload**      | POST    | `/api/upload`        | Protegido |


## Justificacion Técnica

### 1. Separación de Rutas y Controladores

He decidido utilizar el patrón MVC para separar las responsabilidades. Las rutas solo definen los caminos y middlewares, mientras que los controladores gestionan la lógica de negocio. Esto permite que el código sea escalable y fácil de mantener a medida que la tienda crece.

### 2. Validaciones de Datos

Antes de cada inserción o modificación (POST/PUT), el sistema:

- Verifica la existencia de campos obligatorios.
- Valida tipos de datos (ej. stock como entero, precio como decimal).
- Comprueba si el email ya existe en el registro de usuarios.
- Asegura que el archivo subido sea una imagen mediante el fileFilter de Multer.

### 3. Seguridad y JWT

Las rutas de escritura (POST, PUT, DELETE) están protegidas con el middleware protect para asegurar que solo usuarios autenticados realicen cambios. Además, se usa restrictTo('admin') en la gestión de inventario para que solo administradores puedan alterar el stock. El token se maneja en el encabezado Authorization: Bearer <token>, garantizando una comunicación perfecta para APIs.

---

## Instalación y Uso

1. Instalar: npm install
2. Variables: Configurar .env
3. (Ver requirements.txt).
4. Ejecutar: npm run dev

---

    *Bootcamp Javascript Full Stack trainne - 2026*
