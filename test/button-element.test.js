const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Button element', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const document = dom.window.document;
  const code = js;
  // This test checks: Button element
  expect(document.querySelector('button')).not.toBeNull();
});
