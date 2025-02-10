# REST Products 

Este proyecto es un backend para la gestión de productos, desarrollado con Node.js, Express y TypeScript. Incluye pruebas utilizando Jest y SuperTest.

## Características

- **Servidor**: Implementado con Express y TypeScript.
- **Arquitectura**: Basada en manejadores de eventos (Handlers Events).
- **Validación**: Utiliza express-validator para la validación de datos.
- **Base de Datos**: PostgreSQL manejado a través de Sequelize.
- **Pruebas**: Configurado con Jest y SuperTest para pruebas unitarias e integrales.

## Requisitos Previos

- Node.js (versión 14 o superior)
- PostgreSQL
- pnpm (gestor de paquetes)

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/brizusan/rest-products-test.git
   cd rest-products-test
   ```

2. **Instalar dependencias**:

   ```bash
   pnpm install
   ```

3. **Configurar la base de datos**:

   - Asegúrate de tener PostgreSQL en funcionamiento.
   - Crea una base de datos para el proyecto.
   - Configura las credenciales de la base de datos en el archivo `config/database.js` o mediante variables de entorno.

4. **Ejecutar migraciones**:

   ```bash
   pnpm sequelize db:migrate
   ```

## Uso

Para iniciar el servidor en modo de desarrollo:

```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas:

```bash
pnpm test
```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
  - **controllers/**: Manejadores de las rutas.
  - **models/**: Definiciones de los modelos de Sequelize.
  - **routes/**: Definición de las rutas de la API.
  - **middlewares/**: Middlewares personalizados.
  - **utils/**: Funciones y utilidades auxiliares.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejoras o correcciones.

## Licencia

Este proyecto está bajo la Licencia MIT.
