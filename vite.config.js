const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { resolve } = require('path');
const { globSync } = require('glob');

const entries = Object.fromEntries(
  globSync('./qo_*.tsx').map(file => [
    file.slice(2, file.length - '.tsx'.length),
    resolve(__dirname, file)
  ])
);

module.exports = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...entries
      }
    }
  }
});
