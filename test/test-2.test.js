const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Input field updates character counter in real time', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  const { window } = dom;
  const { document } = window;

  await new Promise(resolve => window.setTimeout(resolve, 0));

  // Find the first text input not in a form
  const allInputs = Array.from(document.querySelectorAll('input[type="text"]'));
  const form = document.querySelector('form');
  const formInput = form ? form.querySelector('input[type="text"]') : null;
  const input = allInputs.find(inp => inp !== formInput);
  expect(input).not.toBeNull();

  // Find the first span after the input (character counter)
  let charCount = input.nextElementSibling;
  while (charCount && charCount.tagName.toLowerCase() !== 'span') {
    charCount = charCount.nextElementSibling;
  }
  expect(charCount).not.toBeNull();

  input.value = '';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  const initialCount = charCount.textContent;

  input.value = 'hello';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  expect(Number(charCount.textContent)).toBeGreaterThan(Number(initialCount));
});
