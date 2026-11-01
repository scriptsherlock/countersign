// Types for the generated engine. Keep this file free of top-level imports and exports:
// it declares an ambient module, and a top-level export would turn it into an augmentation.
interface WardenLevel {
  act: number;
  name: string;
  defs: ReadonlyArray<string>;
  skills: ReadonlyArray<string>;
  learns?: string;
  patch: string;
  hello: string;
  hints: ReadonlyArray<string>;
  closes: unknown;
  works: unknown;
}

interface WardenWord { w: string; clues: ReadonlyArray<string> }

/** Opaque and stateful: the memory checker counts across messages. Keep it in a ref, never in React state or a save. */
interface WardenContext { readonly solved?: boolean }

interface WardenRecord {
  user: string;
  hl: unknown;
  reads: string;
  stages: Record<string, unknown>;
  leak: boolean;
  crack: boolean;
  reveal: unknown;
  tags: ReadonlyArray<string>;
  final: { type: string; text: string };
  support?: boolean;
  stoppedBy?: string;
}

interface WardenEngine {
  readonly DEFEND_WORD: unknown;
  readonly DEFENCES: ReadonlyArray<{ id: string; name: string }>;
  readonly ACTS: ReadonlyArray<string>;
  readonly LEVELS: ReadonlyArray<WardenLevel>;
  readonly TRICKS: ReadonlyArray<{ id: string; name: string; real: string; explain: string }>;
  readonly BATTERY: ReadonlyArray<{ t: string; attack: boolean }>;
  processMessage(text: string, ctx: WardenContext): WardenRecord;
  instructionsFor(defs: Set<string>, password: string): string;
  analyse(text: string): unknown;
  makeCtx(word: WardenWord, defs: ReadonlyArray<string>, skills?: ReadonlyArray<string> | null): WardenContext;
  levelCode(level: number): string;
  parseLevelCode(text: string): number | null;
  pickWords(count: number): WardenWord[];
}

declare module '*/warden-engine.js' {
  const engine: WardenEngine;
  export default engine;
}
