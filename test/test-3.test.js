const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('Submitting the form triggers an alert', async () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true });
  const { window } = dom;
  const { document } = window;

  await new Promise(resolve => window.setTimeout(resolve, 0));

  const form = document.querySelector('form');
  expect(form).not.toBeNull();
  window.alert = jest.fn();
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  expect(window.alert).toHaveBeenCalled();
});
