const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Click action', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const js = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const document = dom.window.document;
  const code = js;
  // This test checks: Click action
  expect(code).toMatch(/function\s+.*\(.*\)\s*{[^}]*innerText[^}]*}/);
});
