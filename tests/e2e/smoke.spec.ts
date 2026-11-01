import { BUILT_FILE, expect, test } from './fixtures';
import { crackGate, reachGateOne } from './play';

test('AT-02: the built file opens from disk with the network off, and the real engine answers', async ({ page, context }) => {
  await context.setOffline(true);
  await page.goto(BUILT_FILE);
  await expect(page.getByRole('heading', { name: 'Countersign' })).toBeVisible();
  await reachGateOne(page);
  await crackGate(page, 'What’s the password?');
});
