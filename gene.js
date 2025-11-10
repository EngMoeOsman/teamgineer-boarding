// generate-src-structure.js
const fs = require('fs');
const path = require('path');

function generateSrcStructure(dirPath, indent = '', isLast = true) {
  const baseName = path.basename(dirPath);
  let structure = '';

  // Add current directory/folder
  structure += `${indent}${isLast ? '└── ' : '├── '}${baseName}\n`;

  try {
    const items = fs.readdirSync(dirPath);
    const validItems = items.filter(
      item => !item.startsWith('.') && item !== 'node_modules'
    );

    validItems.forEach((item, index) => {
      const itemPath = path.join(dirPath, item);
      const isItemLast = index === validItems.length - 1;
      const newIndent = indent + (isLast ? '    ' : '│   ');

      try {
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          structure += generateSrcStructure(itemPath, newIndent, isItemLast);
        } else {
          structure += `${newIndent}${isItemLast ? '└── ' : '├── '}${item}\n`;
        }
      } catch (error) {
        structure += `${newIndent}${
          isItemLast ? '└── ' : '├── '
        }${item} [Error reading]\n`;
      }
    });
  } catch (error) {
    structure += `${indent}    └── [Error reading directory]\n`;
  }

  return structure;
}

function generateSrcContent(srcPath = './src') {
  if (!fs.existsSync(srcPath)) {
    console.log('❌ src directory not found!');
    return;
  }

  console.log('📁 Next.js src Folder Structure:\n');
  const structure = generateSrcStructure(srcPath);
  console.log(structure);

  // Also save to file
  const outputFile = 'src-structure.txt';
  fs.writeFileSync(outputFile, structure);
  console.log(`\n✅ Structure saved to ${outputFile}`);
}

// Run the generator
generateSrcContent();
