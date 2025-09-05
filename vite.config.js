const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { resolve, basename } = require('path');
const { globSync } = require('glob');
const { readFileSync } = require('fs');

// --- Start of manifest generation logic ---
function getManifestData() {
  const files = globSync('./src/pages/samples/qo_*.tsx');
  const manifest = [];

  for (const file of files) {
    const id = basename(file, '.tsx');
    const route = `/samples/${id}`; // New route format for the SPA
    let title = id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    let summary = 'A sample page for Viatable.';
    let tags = [];

    const content = readFileSync(file, 'utf-8');
    const match = /export const __pageMeta = (\{[\s\S]*?\})/.exec(content);

    if (match && match[1]) {
      try {
        const pageMeta = new Function(`return ${match[1]}`)();
        if (pageMeta.title) title = pageMeta.title;
        if (pageMeta.summary) summary = pageMeta.summary;
        if (pageMeta.tags) tags = pageMeta.tags;
      } catch (e) {
        console.error(`Error parsing __pageMeta from ${file}:`, e);
      }
    }
    manifest.push({ id, route, title, summary, tags });
  }

  manifest.sort((a, b) => a.title.localeCompare(b.title));
  return manifest;
}

const manifestData = getManifestData();
// --- End of manifest generation logic ---

module.exports = defineConfig({
  plugins: [react()],
  define: {
    '__PAGES_MANIFEST__': JSON.stringify(manifestData)
  },
  build: {
    rollupOptions: {
      // Single entry point for an SPA
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
});
