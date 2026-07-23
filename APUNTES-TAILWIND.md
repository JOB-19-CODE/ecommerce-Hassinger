# APUNTES REACT + VITE + TAILWIND CSS

## Comandos Básicos

### Crear proyecto React

```bash
npm create vite@latest
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar proyecto

```bash
npm run dev
```

### Detener servidor

```text
Ctrl + C
```

---

# Instalación de Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

Archivos creados:

```text
tailwind.config.js
postcss.config.js
```

---

# Configuración de Tailwind

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

# Estructura del Proyecto

```text
src/
├── assets/
├── components/
├── pages/
├── context/
├── App.jsx
├── main.jsx
└── index.css
```

---

# Crear un Componente

```jsx
const Header = () => {
  return (
    <h1>Mi Proyecto</h1>
  );
}

export default Header;
```

---

# Importar un Componente

```jsx
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
    </>
  );
}
```

---

# Importar una Imagen

```jsx
import logo from "../assets/logo.png";

<img src={logo} alt="Logo" />
```

---

# Tailwind Más Utilizado

## Colores

```text
bg-red-500
bg-blue-500
bg-green-500
bg-yellow-500

text-white
text-black
text-gray-700
```

## Texto

```text
text-sm
text-lg
text-xl
text-2xl
text-3xl
text-4xl
text-5xl
```

## Negrita

```text
font-bold
font-semibold
```

## Márgenes

```text
m-2
m-4
m-6

mt-4
mb-4
ml-4
mr-4
```

## Espaciado Interno

```text
p-2
p-4
p-6
p-8
```

## Bordes Redondeados

```text
rounded
rounded-lg
rounded-xl
rounded-full
```

## Sombras

```text
shadow
shadow-lg
shadow-xl
```

## Flexbox

```text
flex
justify-center
items-center
gap-2
gap-4
gap-6
```

## Grid

```text
grid
grid-cols-2
grid-cols-3
grid-cols-4
gap-4
```

