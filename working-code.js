const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Load root package.json and extract all dependency versions
const rootPkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const rootVersions = {
  ...rootPkg.dependencies,
  ...rootPkg.devDependencies,
};

// Build a list of workspace package names from all workspace package.json files
const workspacePackageJsonPaths = glob.sync("**/package.json", {
  ignore: ["**/node_modules/**", "package.json"],
});

const internalPackages = new Set();

workspacePackageJsonPaths.forEach((pkgPath) => {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.name) {
    internalPackages.add(pkg.name);
  }
});

workspacePackageJsonPaths.forEach((pkgPath) => {
  const fullPath = path.resolve(pkgPath);
  const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  let modified = false;

  // Process shadow dependencies if present
  if (pkg.shadow) {
    ["dependencies", "devDependencies"].forEach((type) => {
      const deps = pkg.shadow[type] || [];
      deps.forEach((dep) => {
        const version = rootVersions[dep];
        if (!version) {
          console.warn(`⚠️  "${dep}" not found in root for ${pkg.name}`);
          return;
        }
        if (!pkg[type]) pkg[type] = {};
        pkg[type][dep] = version;
        modified = true;
      });
    });
    delete pkg.shadow;
  }

  // Convert "*" to "workspace:*" for internal packages
  ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].forEach((type) => {
    if (!pkg[type]) return;
    Object.entries(pkg[type]).forEach(([dep, version]) => {
      if (version === "*" && internalPackages.has(dep)) {
        pkg[type][dep] = "workspace:*";
        modified = true;
      }
    });
  });

  if (modified) {
    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`✅ Updated: ${pkgPath}`);
  }
});
