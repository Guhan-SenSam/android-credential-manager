module.exports = {
  'app/**/*.{js,ts}': [
    filenames => `node scripts/lint.js ${filenames.join(' ')}`,
    'prettier --write',
  ],
  'src/**/*.{json,md}': ['prettier --write'],
};
