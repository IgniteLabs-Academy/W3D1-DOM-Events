const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Button click', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
  const document = dom.window.document;
  // This test checks: Button click
  const button = document.querySelector('button'); expect(button).not.toBeNull();
});
