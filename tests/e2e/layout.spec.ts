import { expect, test } from './fixtures';
import { reachGateOne } from './play';

async function expectNoOverflow(page: import('@playwright/test').Page) {
  const size = await page.evaluate(() => { const r = document.documentElement; return { width: r.scrollWidth, height: r.scrollHeight, viewWidth: r.clientWidth, viewHeight: r.clientHeight }; });
  expect(size.width).toBeLessThanOrEqual(size.viewWidth);
  expect(size.height).toBeLessThanOrEqual(size.viewHeight);
}

test('AT-20: the title and the gate fit the screen with no overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Countersign' })).toBeVisible();
  await expectNoOverflow(page);
  await reachGateOne(page);
  await expectNoOverflow(page);
});
