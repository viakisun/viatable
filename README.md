# Viatable - QR Order Component Gallery

This project is a component gallery and development environment for Viatable, a QR-based ordering application. It provides a central dashboard to view and interact with all the individual UI components and pages of the application.

## Project Structure

The project is organized to keep the codebase clean and maintainable:

-   **/public**: Contains static assets that are served directly.
-   **/src**: Contains all the source code for the application.
    -   **/src/app**: The main dashboard application page (`page.tsx`).
    -   **/src/components**: Shared React components used across the application (e.g., `PageCard.tsx`).
    -   **/src/pages/samples**: The individual sample pages and components of the Viatable application (all `qo_*.tsx` files).
    -   `main.tsx`: The main entry point for the React application.
    -   `index.css`: Global styles and Tailwind CSS directives.
-   **/.generated**: Contains automatically generated files.
    -   `pages.manifest.json`: A manifest of all sample pages, generated at build time.
-   `index.html`: The main HTML entry point for the application.
-   `vite.config.js`: The configuration file for Vite, which handles the build process.
-   `package.json`: Defines the project's dependencies and scripts.
-   `tailwind.config.js`, `postcss.config.js`: Configuration for Tailwind CSS.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository to your local machine.
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server, run the following command. The dashboard will be available at `http://localhost:5173` (or the next available port).

```bash
npm run dev
```

The `vite.config.js` will automatically generate the `pages.manifest.json` file when the dev server starts.

### Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This command will generate the static files for the dashboard and all sample pages in the `dist/` directory.

### Previewing the Production Build

After building the project, you can preview the production application locally with:

```bash
npm run start
```