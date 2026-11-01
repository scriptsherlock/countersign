import { defineConfig } from '@playwright/test';

const everywhere = ['**/smoke.spec.ts', '**/layout.spec.ts', '**/slice.spec.ts'];
const withAccessibility = [...everywhere, '**/a11y.spec.ts'];

function device(name: string, browserName: 'chromium' | 'firefox' | 'webkit', width: number, height: number, touch = false, testMatch = everywhere) {
  return { name, testMatch, use: { browserName, viewport: { width, height }, hasTouch: touch, isMobile: touch && browserName !== 'firefox' } };
}

// Desktop and tablet only. There is no phone target. See docs/ACCEPTANCE_TESTS.md.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 2,
  timeout: 30_000,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: true, timeout: 30_000 },
  projects: [
    device('desktop-1366', 'chromium', 1366, 768, false, withAccessibility),
    device('desktop-short', 'chromium', 1366, 680),
    device('desktop-1280', 'chromium', 1280, 720),
    device('desktop-1440', 'chromium', 1440, 900),
    device('desktop-1920', 'chromium', 1920, 1080),
    device('desktop-firefox', 'firefox', 1366, 768),
    device('tablet-land', 'webkit', 1180, 820, true),
    device('tablet-port', 'webkit', 768, 1024, true, withAccessibility),
  ],
});
