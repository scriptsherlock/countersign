import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

test('axe finds no serious or critical issues', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Countersign' })).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.filter(v => v.impact === 'serious' || v.impact === 'critical').map(v => v.id)).toEqual([]);
});
