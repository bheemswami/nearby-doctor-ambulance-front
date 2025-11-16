
# 🚑 Emergency Nearby Search – React Frontend

### React + TypeScript + Vite + Tailwind + Redux Toolkit + Leaflet

This is the **frontend** of the Emergency Nearby Search application.
It is built using:

- **React (TypeScript)**
- **Vite**
- **TailwindCSS**
- **Leaflet Map + Marker Clustering**
- **Redux Toolkit + Redux Saga**
- **Axios API Services**
- **Modular Pages & Components**

The app displays **doctors**, **ambulances**, and **nearby providers** on a map, supports **search**, **filtering**, and **GPS-based location access**.

---

# ⚡ React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)

### React Compiler

React Compiler is disabled for performance. To enable it, follow the official guide:
https://react.dev/learn/react-compiler/installation

---

# 🛠 ESLint Configuration (Recommended)

If this project is used in production, enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You may also add these:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
```

---

# 📦 Project Features (Frontend)

## ✔ Doctors Module
- List all doctors
- Add, edit, delete
- Pagination (10 per page)

## ✔ Ambulances Module
- List ambulances
- CRUD operations
- Pagination

## ✔ Nearby Map Search (Leaflet)
- Auto-detect GPS location
- Show *all providers* (for demo)
- Filter: Doctor, Ambulance, All
- Search by name
- Click marker → Show info
- Fetch route using OSRM
- Marker clustering
- Smooth map fly animation
- Loading indicators for search & route

## ✔ Dashboard
- Total doctors
- Total ambulances
- Nearby providers count
- Auto-fetch based on location

## ✔ Seed Button (Interview Feature)
A special UI button:

```
Run Demo Seed
```

This calls backend API and repopulates sample data.

---

# 🚀 Local Development Setup

## 1️⃣ Install Dependencies
```
npm install
```

## 2️⃣ Run Development Server
```
npm run dev
```

App runs at:
```
http://localhost:5173
```

Backend expected at:
```
http://localhost:4000
```

---

# 🧪 Production Build

To build:
```
npm run build
```

To preview:
```
npm run preview
```

---

# 🌍 Nearby Map Notes

UI shows a hint:

```
Note: For testing purposes, all doctor and ambulance records are displayed.
```

Production version filters based on:
- User GPS location
- Radius (default 5km)
- Backend geo-query

---

# 💡 Folder Structure

```
src/
│── components/
│── pages/
│   ├── Doctors
│   ├── Ambulance
│   ├── NearbyMap.tsx
│── store/
│── config/
│   └── Endpoints.ts
│── services/
│   ├── AxiosService.ts
│── layout/
│── common/
│── App.tsx
```

---

# 🔌 API Configuration (src/config/Endpoints.ts)
Typed endpoint management with functions for dynamic parameters.

---

# 🧭 Key Pages

### ✔ HomePage
Dashboard + seed button

### ✔ DoctorsPage
CRUD UI

### ✔ AmbulancePage
CRUD UI

### ✔ NearbyMap.tsx
Full Leaflet map integration

---
