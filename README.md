# Galería de Arte — Tienda de cuadros

Proyecto full stack en JavaScript que simula una tienda online de cuadros inspirados en artistas
famosos. **Es un proyecto ficticio con fines educativos**: las obras son reinterpretaciones, no
reproducciones oficiales, y no hay ninguna venta real involucrada.

Esta es la **primera etapa** del proyecto: los datos se almacenan en memoria (sembrados desde un
archivo JSON) dentro del backend, sin base de datos. La arquitectura del backend está preparada
para incorporar una base de datos SQL en una segunda etapa sin tener que rediseñar controladores
ni rutas.

## Estructura del monorepo

```
P_EAC/
├── backend/     # API REST con Express (Node.js, ESM)
└── frontend/    # SPA con React + Vite
```

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

Cada subproyecto tiene su propio `package.json` y debe instalarse por separado.

```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend (en otra terminal, desde la raíz del repo)
cd frontend
npm install
cp .env.example .env
```

## Ejecución en desarrollo

```bash
# Terminal 1 — backend (http://localhost:3001)
cd backend
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm run dev
```

Con ambos servidores corriendo, abre `http://localhost:5173` en el navegador. El frontend consume
la API del backend a través de la variable `VITE_API_URL` (por defecto `http://localhost:3001/api`).

### Scripts disponibles

**Backend** (`backend/package.json`)
| Script | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor con recarga automática (`node --watch`) |
| `npm start` | Levanta el servidor en modo producción |

**Frontend** (`frontend/package.json`)
| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Compila la aplicación para producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

## Arquitectura

### Backend (`backend/`)

API REST construida con Express 4 y módulos ES, organizada en capas:

```
src/
├── app.js              # Configuración de Express (CORS, JSON, rutas, manejo de errores)
├── server.js            # Punto de entrada, arranca el servidor HTTP
├── config/env.js        # Lectura de variables de entorno
├── routes/               # Definición de endpoints, delega en controladores
├── controllers/          # Reciben req/res, llaman a los servicios, dan forma a la respuesta
├── services/             # Lógica de negocio (validaciones de dominio, cálculo de totales, etc.)
├── repositories/         # Acceso a datos — única capa que conoce el almacenamiento real
├── data/                 # Datos semilla en JSON (artworks.data.json)
├── middlewares/          # Validación de entrada y manejo centralizado de errores
└── utils/                # ApiError, asyncHandler, generador de ids
```

Flujo de una petición: `routes → controllers → services → repositories`. Cada capa solo conoce a
la inmediatamente inferior.

### Frontend (`frontend/`)

SPA en React 18 + Vite, sin TypeScript, con enrutamiento por `react-router-dom` y estilos con CSS
Modules.

```
src/
├── main.jsx              # Punto de entrada: BrowserRouter + CartProvider
├── App.jsx                # Definición de rutas y layout general (Header/Footer)
├── pages/                 # Una página por ruta (Home, Catálogo, Detalle, Carrito, Checkout, Admin)
├── components/            # Componentes reutilizables agrupados por dominio (catalog, cart, admin...)
├── context/CartContext.jsx  # Estado global del carrito, persistido en localStorage
├── hooks/                  # useArtworks / useArtwork — encapsulan el fetching y sus estados
├── services/                # Cliente HTTP (api.js) + funciones por recurso (artworksApi, ordersApi)
└── utils/                   # Formato de moneda, etc.
```

Páginas y rutas:

| Ruta | Página |
|---|---|
| `/` | Inicio (hero + obras destacadas) |
| `/catalogo` | Catálogo con búsqueda, filtros y orden por precio |
| `/cuadros/:id` | Detalle de un cuadro |
| `/carrito` | Carrito de compras |
| `/finalizar-compra` | Formulario de datos del comprador y confirmación |
| `/admin` | Listado, alta, edición y baja de cuadros |

El carrito vive en `CartContext` y se persiste en `localStorage`, por lo que sobrevive a
recargas de página. El backend nunca confía en los precios/totales que llegan desde el carrito:
siempre recalcula todo contra el catálogo real al crear un pedido.

## API REST

Base URL: `http://localhost:3001/api`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/artworks` | Lista cuadros. Soporta `?artist=`, `?category=`, `?search=`, `?sortBy=price_asc\|price_desc` |
| `GET` | `/artworks/:id` | Detalle de un cuadro |
| `POST` | `/artworks` | Crea un cuadro |
| `PUT` | `/artworks/:id` | Actualiza un cuadro (parcial) |
| `DELETE` | `/artworks/:id` | Elimina un cuadro |
| `POST` | `/orders` | Crea un pedido (valida stock, calcula el total en el servidor y descuenta stock) |
| `GET` | `/orders` | Lista los pedidos registrados |

Respuestas de éxito: `{ "data": ... }`. Respuestas de error: `{ "error": { "message": "...", "details": [...] } }`.

## Notas

- Los datos son temporales: se reinician cada vez que se reinicia el backend (están en memoria).
- No hay autenticación real en esta primera versión, tal como lo pide el alcance del proyecto.
- Es un proyecto ficticio con fines educativos: los cuadros están inspirados en obras y artistas
  reales, pero no son reproducciones oficiales ni se venden realmente.
