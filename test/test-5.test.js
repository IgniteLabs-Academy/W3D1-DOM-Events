const fs = require('fs');
const path = require('path');

test('Uses DOM selectors in the code', () => {
  const js = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  expect(js).toMatch(/querySelector|getElementById/);
});
