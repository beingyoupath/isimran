import https from 'https';
import fs from 'fs';

const files = [
  'src/pages/Services.tsx',
  'src/pages/Home.tsx',
  'src/pages/About.tsx',
  'src/pages/Resources.tsx',
  'src/pages/Contact.tsx',
  'src/pages/Workshops.tsx'
];

let urls = new Set<string>();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^\s'"]*/g);
  if (matches) {
    matches.forEach(m => urls.add(m));
  }
});

Array.from(urls).forEach(url => {
  https.get(url, (res) => {
    if (res.statusCode !== 200) console.log(url, res.statusCode);
  }).on('error', (e) => {
    console.error(url, e.message);
  });
});
