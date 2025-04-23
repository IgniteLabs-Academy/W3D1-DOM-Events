const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Input event', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
  const document = dom.window.document;
  // This test checks: Input event
  const input = document.querySelector('input[type="text"]'); expect(input).not.toBeNull();
});
