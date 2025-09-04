import { globSync } from 'glob';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

interface PageMeta {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

const files = globSync('./qo_*.tsx');
const manifest: PageMeta[] = [];

for (const file of files) {
  const id = basename(file, '.tsx');
  const route = `/${id}.html`;
  let title = id.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  let summary = 'A sample page for Viatable.';
  let tags: string[] = [];

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

// Sort the manifest by title
manifest.sort((a, b) => a.title.localeCompare(b.title));

const outputDir = resolve(__dirname, '..', '.generated');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
writeFileSync(resolve(outputDir, 'pages.manifest.json'), JSON.stringify(manifest, null, 2));

console.log('Successfully generated pages.manifest.json');
