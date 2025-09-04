const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const { resolve, basename } = require('path');
const { globSync } = require('glob');
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');

// --- Start of manifest generation logic ---
function generateManifest() {
  const files = globSync('./src/pages/samples/qo_*.tsx');
  const manifest = [];

  for (const file of files) {
    const id = basename(file, '.tsx');
    const route = `/${id}.html`;
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

  const outputDir = resolve(__dirname, '.generated');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  writeFileSync(resolve(outputDir, 'pages.manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Successfully generated pages.manifest.json in vite.config.js');
}

generateManifest();
// --- End of manifest generation logic ---


const entries = Object.fromEntries(
  globSync('./src/pages/samples/qo_*.tsx').map(file => [
    basename(file, '.tsx'),
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
