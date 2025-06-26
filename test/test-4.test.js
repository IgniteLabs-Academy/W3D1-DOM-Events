const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Clicking a button changes the output area', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  const { window } = dom;
  const { document } = window;

  await new Promise(resolve => window.setTimeout(resolve, 0));

  // Get the first button not in a form
  const allButtons = Array.from(document.querySelectorAll('button'));
  const form = document.querySelector('form');
  const formButton = form ? form.querySelector('button') : null;
  const button = allButtons.find(btn => btn !== formButton);
  expect(button).not.toBeNull();

  // Find the first div or span after the buttons as output
  let output = null;
  for (let el of document.body.children) {
    if ((el.tagName === 'DIV' || el.tagName === 'SPAN') && !output) output = el;
  }
  expect(output).not.toBeNull();

  button.click();
  expect(output.textContent).not.toBe('');
});
