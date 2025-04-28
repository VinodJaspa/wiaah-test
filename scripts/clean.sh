#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"/..
echo "Cleanup started."
# Find and remove node_modules directories, dist directories.
find . -type d -name "node_modules" -print0 | xargs -0 rm -rf
find . -type d -name "dist" -exec rm -rf {} +
find . -type d -name ".turbo" -exec rm -rf {} +

echo "Cleanup completed."
exit 0