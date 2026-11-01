import { test as base, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const BUILT_FILE = pathToFileURL(resolve('dist/index.html')).href;

const isLocal = (url: string) => url.startsWith('file:') || url.startsWith('data:') || url.startsWith('http://127.0.0.1:4173/');

// Every test fails on a console error, an uncaught exception, or any attempt to reach the network.
export const test = base.extend<{ problems: string[] }>({
  problems: [async ({ page, context }, use) => {
    const problems: string[] = [];
    page.on('pageerror', error => problems.push(`exception: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error') problems.push(`console: ${message.text()}`); });
    await context.route('**/*', route => {
      const url = route.request().url();
      if (isLocal(url)) return route.continue();
      problems.push(`network: ${url}`);
      return route.abort();
    });
    await use(problems);
    expect(problems).toEqual([]);
  }, { auto: true }],
});

export { expect };
