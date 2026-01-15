const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/@3d-dice/dice-box/dist/assets');
const destDir = path.join(__dirname, '../public/assets/dice-box');

// Create destination directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, '../public/assets'))) {
  fs.mkdirSync(path.join(__dirname, '../public/assets'), { recursive: true });
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(sourceDir)) {
  console.log('Copying dice-box assets...');
  copyRecursiveSync(sourceDir, destDir);
  console.log('✅ Dice-box assets copied successfully!');
} else {
  console.error('❌ Source directory not found:', sourceDir);
  console.error('Please run "npm install" first.');
  process.exit(1);
}

