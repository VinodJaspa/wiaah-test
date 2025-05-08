const { readdirSync, existsSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve, basename } = require('path');

const ROOT_DIRS = [
  'apps/back-end/gateway', // Add your directories to search here
  'apps/back-end/services', // Add your directories to search here
];

function getDirectories(source) {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory()) // Filter only directories
      .map(dirent => join(source, dirent.name));
  } catch (error) {
    console.log(`❌ Error reading directory: ${source}`);
    return [];
  }
}

function createProjectJson(appPath, appName) {
  const projectJsonPath = join(appPath, 'project.json');

  if (existsSync(projectJsonPath)) {
    console.log(`⚠️ Skipping: ${projectJsonPath} already exists.`);
    return;
  }

  // Using relative path to the repository root
  const relativeCwd = join('apps', 'back-end', 'services', basename(appPath)); // Relative path

  const projectJson = {
    name: appName,
    targets: {
      dev: {
        executor: 'nx:run-commands',
        options: {
          command: 'pnpm start:dev',
          cwd: relativeCwd // Set the relative path here
        }
      }
    }
  };

  try {
    writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2));
    console.log(`✅ Created: ${projectJsonPath}`);
  } catch (error) {
    console.log(`❌ Failed to create: ${projectJsonPath}`, error);
  }
}

function run() {
  ROOT_DIRS.forEach(root => {
    const absRoot = resolve(root);
    console.log(`🚀 Processing root directory: ${absRoot}`);
    if (!existsSync(absRoot)) {
      console.log(`❌ Directory does not exist: ${absRoot}`);
      return;
    }

    const appDirs = getDirectories(absRoot); // Get only direct subdirectories

    appDirs.forEach(appPath => {
      const pkgJsonPath = join(appPath, 'package.json');
      if (!existsSync(pkgJsonPath)) {
        console.log(`❌ No package.json found in: ${appPath}`);
        return;
      }

      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));

      if (!pkgJson.scripts || !pkgJson.scripts['start:dev']) {
        console.log(`❌ No "start:dev" script in package.json of: ${appPath}`);
        return;
      }

      const appName = pkgJson.name || basename(appPath);
      console.log(`➡️ Creating project.json for: ${appName} at ${appPath}`);
      createProjectJson(appPath, appName);
    });
  });
}

run();
