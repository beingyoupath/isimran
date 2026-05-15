import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/pages', function(filepath: string) {
  if (filepath.endsWith('.tsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(/py-24/g, 'py-12');
    content = content.replace(/pt-32/g, 'pt-16');
    content = content.replace(/pb-40/g, 'pb-20');
    content = content.replace(/pb-24/g, 'pb-12');
    content = content.replace(/pt-24/g, 'pt-12');
    content = content.replace(/py-32/g, 'py-16');
    content = content.replace(/mt-24/g, 'mt-12');
    content = content.replace(/mb-24/g, 'mb-12');
    content = content.replace(/mt-32/g, 'mt-16');
    content = content.replace(/mb-32/g, 'mb-16');
    content = content.replace(/gap-12/g, 'gap-8');
    content = content.replace(/gap-16/g, 'gap-10');
    content = content.replace(/gap-24/g, 'gap-12');
    content = content.replace(/pt-20/g, 'pt-12');
    fs.writeFileSync(filepath, content, 'utf8');
  }
});
