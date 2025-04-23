const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Event listener', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
  const document = dom.window.document;
  // This test checks: Event listener
  const button = document.querySelector('button'); const onclick = button?.getAttribute('onclick'); expect(onclick || button?.onclick).not.toBeNull();
});
