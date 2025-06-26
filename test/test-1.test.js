const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Clicking each of the first three buttons changes the output area', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  const { window } = dom;
  const { document } = window;

  await new Promise(resolve => window.setTimeout(resolve, 0));

  // Get all buttons except the one inside the form
  const allButtons = Array.from(document.querySelectorAll('button'));
  const form = document.querySelector('form');
  const formButton = form ? form.querySelector('button') : null;
  const buttons = allButtons.filter(btn => btn !== formButton).slice(0, 3);
  expect(buttons.length).toBe(3);

  // Find the first div or span after the buttons as output
  let output = null;
  for (let el of document.body.children) {
    if ((el.tagName === 'DIV' || el.tagName === 'SPAN') && !output) output = el;
  }
  expect(output).not.toBeNull();

  const seen = new Set();
  buttons.forEach(btn => {
    btn.click();
    expect(output.textContent).not.toBe('');
    seen.add(output.textContent);
  });
  expect(seen.size).toBe(3); // All messages are unique
});
