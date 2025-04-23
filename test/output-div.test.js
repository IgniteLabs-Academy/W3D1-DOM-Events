const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Output div', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
  const document = dom.window.document;
  // This test checks: Output div
  expect(document.querySelector('#output')).not.toBeNull();
});
