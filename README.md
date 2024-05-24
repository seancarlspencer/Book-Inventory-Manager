# Book Inventory Manager

An app that allows users to manage and rate books.  It takes an ISBN input, references Library APIs, and displays books in a user-friendly way.

It is build using Vite, a lightweight React framework with built-in Typescript support.  It includes SASS/SCSS styling, and is deployed using Netlify.

## Starting the Project

To run the project in dev mode, download the reposity and run the following commands:

```bash
cd Book-Inventory-Manager

npm install
npm run dev
```

## Building and Deploying the Project

When production-ready, build the project by running the following command:

```bash
npm run build
```

This will create or modify the folder `dist`.  You may upload this folder to any deployment website such as Netlify.

## File Structure

```bash
├── src
│   ├── assets
│   ├── components
│   │   ├── BookInventoryManager.tsx
│   │   ├── BookSearch.tsx
│   │   ├── BookDisplay.tsx
│   ├── styling
│   │   ├── fonts/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
├── dist (or build)
├── node_modules
├── README.md
├── package.json
├── index.html
└── .gitignore
...
```

`src/assets` contains all image assets used throughout the project.
`src/components` contains all Book Components used for main functionality.
`src/styling` contains fonts and all stylesheets.
`src/types` contains type information for main Book Types.

Currently, there is no routing structure necessary, so all components are referenced via App.tsx.
