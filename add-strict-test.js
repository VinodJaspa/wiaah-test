const fs = require('fs');
const path = require('path');

// Function to traverse directories and find tsconfig.json files
function traverseAndUpdateTsConfigs(dir) {
  // Read all files in the directory
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // If it's a directory, recursively call the function
    if (stat.isDirectory()) {
      traverseAndUpdateTsConfigs(fullPath);
    } else if (file === 'tsconfig.json') {
      // If it's a tsconfig.json, update it
      updateTsConfig(fullPath);
    }
  });
}

// Function to update tsconfig.json file
function updateTsConfig(filePath) {
  try {
    // Read the existing tsconfig.json file
    const tsConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Ensure 'compilerOptions' exists
    if (!tsConfig.compilerOptions) {
      tsConfig.compilerOptions = {};
    }

    // Add or update the 'strict' flag
    if (!tsConfig.compilerOptions.strict) {
      tsConfig.compilerOptions.strict = true;
      console.log(`Updated strict check in: ${filePath}`);
    } else {
      console.log(`'strict' already set in: ${filePath}`);
    }

    // Write the updated tsconfig.json file back to disk
    fs.writeFileSync(filePath, JSON.stringify(tsConfig, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error updating ${filePath}:`, err);
  }
}

// Start the process from the root directory of your project
const rootDir = path.resolve(__dirname); // Set this to your project's root directory if different
traverseAndUpdateTsConfigs(rootDir);
