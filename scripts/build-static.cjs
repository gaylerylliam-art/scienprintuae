const fs = require('fs');
const path = require('path');

const root = process.cwd();
const targets = ['out', '.next'];
const entries = ['index.html', 'styles.css', 'app.js', 'laser-gallery-guide.png', 'assets'];

function copyEntry(source, destination) {
  if (!fs.existsSync(source)) return;
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const child of fs.readdirSync(source)) {
      copyEntry(path.join(source, child), path.join(destination, child));
    }
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

for (const target of targets) {
  const targetDir = path.join(root, target);
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of entries) {
    copyEntry(path.join(root, entry), path.join(targetDir, entry));
  }
}

console.log('Static site built to out and .next');