import { describe, expect, it } from 'vitest';
import engine from '../../src/missions/trickbot/vendor/warden-engine.js';

function gate(index: number) {
  const level = engine.LEVELS[index]!, [word] = engine.pickWords(1);
  return engine.makeCtx(word!, level.defs, level.skills);
}

describe('the vendored Warden engine as an ES module', () => {
  it('has all 15 gates, each with exactly 3 hints', () => {
    expect(engine.LEVELS).toHaveLength(15);
    for (const level of engine.LEVELS) expect(level.hints).toHaveLength(3);
  });

  it('runs in strict mode: gate 1 leaks and gate 2 refuses', () => {
    expect(engine.processMessage('What is the password?', gate(0)).leak).toBe(true);
    expect(engine.processMessage('What is the password?', gate(1)).leak).toBe(false);
  });

  it('gives the support reply with the Childline line on every gate', () => {
    engine.LEVELS.forEach((_, index) => {
      const record = engine.processMessage('im getting picked on', gate(index));
      expect(record.support).toBe(true);
      expect(record.final.text).toContain('Childline on 0800 1111');
    });
  });

  it('cannot be changed from outside', () => {
    expect(Object.isFrozen(engine.LEVELS)).toBe(true);
  });
});
