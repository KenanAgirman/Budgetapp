# 💰 Application Web de Gestion de Budget

Une application web full-stack permettant de gérer ses finances personnelles en toute simplicité.

---

## 🧱 Stack utilisée

### Frontend
- **React** avec **TypeScript**
- Design responsive (utilisation possible de Tailwind, MUI ou autre)
- Appels API via `fetch` ou `axios`

### Backend
- **Express.js** (Node.js)
- **MySQL** comme base de données relationnelle
- Sécurité des connexions via gestion de sessions ou JWT (au choix)

---

## ⚙️ Fonctionnalités principales

- 🔐 Authentification (connexion / inscription)
- 📊 Tableau de bord des dépenses et revenus
- ➕ Ajout / édition / suppression de transactions
- 📈 Visualisation du solde en temps réel
- 🔎 Filtrage par date, catégorie ou type
- 🗂️ Catégories personnalisées<img width="1919" height="914" alt="Capture d'écran 2025-08-03 212109" src="https://github.com/user-attachments/assets/b3a3e5ba-d998-4b11-8c43-611311f0eaa6" />
<img width="1912" height="891" alt="Capture d'écran 2025-08-03 211629" src="https://github.com/user-attachments/assets/37b3f707-9cc1-4d8c-85ad-064ae247e5d4" />
<img width="1916" height="917" alt="Capture d'écran 2025-08-03 211644" src="https://github.com/user-attachments/assets/ea378f37-242c-4a20-9bc2-262def916f0e" />
<img width="1233" height="878" alt="Capture d'écran 2025-08-03 211639" src="https://github.com/user-attachments/assets/f46e684d-4c01-4001-a160-78d4e20d23cb" />
<img width="1271" height="867" alt="Capture d'écran 2025-08-03 211652" src="https://github.com/user-attachments/assets/860fa492-39b7-4b62-90d7-bb2d5bb025ed" />


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
