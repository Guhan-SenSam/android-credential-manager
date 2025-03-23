#!/usr/bin/env node
const { execSync } = require('child_process');

const files = process.argv.slice(2);

try {
  // Only lint the staged files
  execSync(`eslint --fix ${files.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ ESLint passed and fixed all fixable issues.');
} catch (error) {
  console.log(error);
  const errorMessage = `
🚨 ESLint found issues that could not be automatically fixed!
Please review the errors above and fix them manually.
Run "npm run lint" or "eslint src/**/*.{js,ts}" to see details.
Commit aborted.
`;
  console.error(errorMessage);
  process.stderr.write('ESLint failed. Check eslint-errors.log or terminal.\n');
  process.exit(1);
}
