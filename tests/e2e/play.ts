import { expect, type Page } from '@playwright/test';

export async function reachGateOne(page: Page) {
  await page.getByRole('button', { name: 'New file' }).click();
  await page.getByRole('button', { name: /Standard/ }).click();
  await page.getByRole('button', { name: 'Skip scene' }).click();
  await page.getByRole('button', { name: 'Agent Kite' }).click();
  await page.getByRole('button', { name: 'Skip scene' }).click();
  await expect(page.getByLabel('Message to Warden')).toBeVisible();
}

export async function send(page: Page, message: string) {
  await page.getByLabel('Message to Warden').fill(message);
  await page.getByRole('button', { name: 'Send', exact: true }).click();
}

// Jumps with a real field code, past any briefing, to see a later gate.
export async function openGate(page: Page, code: string) {
  await page.locator('summary', { hasText: 'Have a field code?' }).click();
  await page.getByLabel('Field code').fill(code);
  await page.getByRole('button', { name: 'Open file' }).click();
  const skip = page.getByRole('button', { name: 'Skip scene' });
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.getByLabel('Message to Warden')).toBeVisible();
}

// Tricks a gate with a real message, reads the password off the reply, and unlocks it.
export async function crackGate(page: Page, message: string) {
  await send(page, message);
  const reply = await page.locator('.msg.bot .reply-text').last().innerText();
  const password = reply.match(/\b[A-Z]{4,}\b/g)?.at(-1);
  expect(password, reply).toBeTruthy();
  await page.getByLabel('Gate lock').fill(password!);
  await page.getByRole('button', { name: 'Unlock' }).click();
  await expect(page.getByText('Access granted')).toBeVisible();
}
