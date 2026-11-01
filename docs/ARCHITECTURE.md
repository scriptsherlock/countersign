# Countersign: architecture

Status: plan, 2026-11-01. Written for the agents and developers who will build it. No code exists yet. The `ghost-protocol` folder keeps its name until you approve the title.

## 1. What already exists

| Asset | Where | Facts (measured) | Decision |
|---|---|---|---|
| Warden engine | `trickbot/trickbot/index.html` lines 420 onwards, pinned to the commit with the safeguarding fix | About 107 KB. Pure logic, no DOM. API: `processMessage`, `makeCtx`, `instructionsFor`, `analyse`, `levelCode`, `parseLevelCode`, `pickWords`, plus `LEVELS`, `TRICKS`, `DEFENCES`, `ACTS` | **Reuse unchanged** by sync script |
| Engine tests | `tests/engine.test.cjs`, `innocent.json`, `probes.json`, `researcher-questions.json` | 117 tests pass | **Reuse.** `npm run test:warden` runs them on the synced copy in strict mode |
| Trickbot UI | Same file, lines 1397 on | About 22 KB, one IIFE, builds HTML strings | Do not reuse. Copy behaviour, not code |
| Replay and robot state | `trickbot-v3`, `replaySteps`, `wardenState` | Written against the old levels | **Port the idea** as pure functions in Ghost |
| Safeguarding fixes | On Trickbot `main`, `cb57743`, pushed | Catches 15 of 15 wordings | Included in the synced engine |
| Arena | `trickbot-v3` | Numbers stale after the level rework | Defer to Phase 5 |
| React setup | `sidekick academy` | React 19, TS 5.9, Vite 7, Vitest 4, Playwright 1.58, axe. React chunk 222 KB minified. Not a git repo | **Copy the tool config**, drop three.js |
| Persistence pattern | `sidekick academy/src/core/persistence.ts` | Validation, export and import. 13 KB, IndexedDB | Copy `validate` and export idea, use `localStorage` |
| Test fixtures, stress pattern | `sidekick academy/tests/e2e` | Worst-case saves, axe, visual specs | Copy the pattern |
| Classroom docs | `sidekick academy/docs` | Playtest protocol, observation sheet, teacher guide | Use as templates |
| Fonts | Embedded in Trickbot | Saira Stencil One, IBM Plex Mono, Atkinson | Reuse where the design system says so |
| Kenney CC0 art | DecisionTree, Bolt | Different style | Do not use. It would break the single look |

Trickbot stays live and independent. This game reads from it and never writes to it.

**`plan.md` assumes Trickbot has an LLM integration and a backend. It has neither.** Everything in that document about keeping a backend or model endpoint for Trickbot doesn't apply.

## 2. Delivery

Pupils can't run a server, and the brief asks for React and TypeScript. Both hold if the build is a developer step:

**Build with Vite and `vite-plugin-singlefile` into one `index.html`.** Works from GitHub Pages or by double-click. No fetch, no workers, no CDN, no web fonts, no router.

- Inline scripts avoid the `file://` limits on external modules, and hash routes are not needed because the game has no routes.
- SVG is inlined as JSX or strings, because the plugin does not inline SVG imports or `public/` files.
- `localStorage` is an enhancement. The game works if it's blocked.
- **This is unproven here,** so task T0.1 proves it before anything else is built. If it fails on `file://`, fall back to GitHub Pages only and tell the owner.

### Dependencies

| Used | Not used, and why |
|---|---|
| `react`, `react-dom` | three.js: 2D game. Motion library: CSS and WAAPI are enough |
| Vite, `vite-plugin-singlefile`, TypeScript | XState: small reducers are enough. Router: no URLs |
| Vitest, Playwright, axe | Ink, Yarn, Twine: lines, choices and flags need only a small runner |
| `@anthropic-ai/sdk` in `tools/` only, never bundled | Tailwind, component kits: 11 components and one token file |
| | Zustand: `plan.md` allows it only if needed, and reducers cover this. Motion: `plan.md` says "where suitable", and CSS and WAAPI cover the short list of moments. Revisit if a real need appears |

### Budgets

| Item | Budget | Basis |
|---|---|---|
| Single `index.html` | Target 1.5 MB, hard limit 2 MB, with final art | Repo plan: under 2 MB where justified |
| React | 222 KB | Measured, Sidekick build |
| Warden engine | 107 KB | Measured |
| Fonts | 150 KB | Estimate, subset and base64 |
| App code, art, content | 500 KB with SVG art | Estimate. Generated art adds about 1.4 MB, so the hard limit becomes 2 MB (ASSET_MANIFEST) |
| Warden reply | Under 50 ms | Measured 2.35 ms worst on sample; fuzz worst was 28 ms |
| Running cost | $0 | No server, no live API |

## 3. File structure

Follows the suggested structure, plus `content/`, `tools/` and `vendor/`, which keep data, dev-only code and copied code apart.

```
ghost-protocol/
├── AGENTS.md
├── docs/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx               # renders the current stage, nothing else
│   ├── styles.css            # tokens and component styles
│   ├── components/           # the 10 from DESIGN_SYSTEM.md
│   ├── engine/
│   │   ├── campaign.ts       # stages and transitions
│   │   ├── dialogue.ts       # runner
│   │   ├── progression.ts    # milestones, ranks, what is unlocked
│   │   ├── save.ts           # store, validate, codes
│   │   └── types.ts
│   ├── missions/
│   │   ├── trickbot/
│   │   │   ├── vendor/warden-engine.js   # generated, never hand-edited
│   │   │   ├── warden.d.ts
│   │   │   ├── machine.ts    # reducer
│   │   │   ├── replay.ts     # steps from a record
│   │   │   ├── wardenState.ts
│   │   │   ├── voice.ts      # guard and flavour lines by stage and outcome
│   │   │   └── TrickbotMission.tsx
│   │   └── impostor/
│   │       ├── machine.ts
│   │       ├── scoring.ts
│   │       └── ImpostorMission.tsx
│   ├── content/              # scripts, cards, replies, as typed data
│   └── assets/               # SVG as TSX
├── tools/
│   ├── sync-warden.mjs
│   ├── snapshot-operators.ts # dev only, needs a key
│   ├── generate-art.ts       # dev only, needs GEMINI_API_KEY, never bundled
│   └── check-delivery.mjs
└── tests/
    ├── unit/
    ├── warden/               # Trickbot tests against the synced copy
    └── e2e/
```

## 4. Warden integration

`tools/sync-warden.mjs` reads the engine from Trickbot at a pinned commit, using the same two marker comments as `scripts/engine.cjs`. It writes a generated module that exposes the API, and it records the commit in a header comment. The copied file is never edited by hand. Fixes go to Trickbot first, then get synced.

Rules that follow from how the engine works:
- ES modules are always strict, and Trickbot's page script isn't. A strict-only crash reached Phase 0 this way, so `test:warden` always tests in strict mode.
- `ctx` is stateful (the memory checker counts across messages) and holds `Set`s. It stays in a ref, never in React state or a save.
- A level counts only after a real leak and a correct guess. The mission machine enforces this.
- Passwords are picked per load and never saved. A half-played level restarts with a new word.
- `rec.stages`, `leak`, `crack`, `reveal`, `tags` and `final` are the only inputs to `replay.ts` and `wardenState.ts`.
- **Engine text is never changed.** `voice.ts` adds a short line from the right guard beside the engine reply. It reads `rec` and doesn't feed anything back, and it returns nothing when `rec.support` is set.
- **Hints come straight from `LEVELS[i].hints`.** `CommsPanel` adds a Sparks opener and shows the text unchanged. The existing rule stays: the next signal opens after 4 tries that didn't leak.
- React escapes text, so `esc()` is not needed. Highlight marks must be built as elements, never `dangerouslySetInnerHTML`.

## 5. State machines

Each machine is a pure reducer with a typed event union. An event that makes no sense in the current state returns the state unchanged. No side effects inside reducers. The save effect runs in one place, in `App`.

### Campaign

```ts
type Stage =
  | { at: 'title' }
  | { at: 'scene'; scene: SceneId }            // dialogue-led story beat
  | { at: 'mission'; mission: MissionId }
  | { at: 'checkpoint'; id: CheckpointId }
  | { at: 'reveal'; mission: MissionId }
  | { at: 'rankUp'; rank: Rank }               // Supervisor countersigns
  | { at: 'file' };                            // the end dossier
```

```
title → scene:first-day → mission:trickbot (Phase 1) → rankUp:cadet → checkpoint:report-1
      → reveal:trickbot → scene:second-splice → hub
hub → mission:trickbot (Phases 2–5) or mission:impostor (Shifts 1–5), in any order
mission:impostor done → reveal:impostor → scene:last-tape → scene:1950 → file
any finished phase or shift may pass through rankUp
```

Transitions are one table in `campaign.ts`, so the story order can be read and tested in one place.

### Trick the Bot

```
ready → (send) → replied ─ no leak ──→ ready
                       └─ leak ─────→ canGuess → (guess right) → cracked → patched → ready (next door)
                                         └ (guess wrong) → canGuess
any → (support reply) → paused → (continue) → ready
```

`send` is synchronous and never awaits. Hint state sits beside this machine: `signals` used and `dry` tries, matching Trickbot's `hints` and `dry`. `cracked` can only follow a real leak. A `paused` state shows the support message outside the game fiction.

### Impostor

```
lineOpen → asking(bars) → (card) → asking(bars−1) → quiet → judging → (all marked) → revealing → revising → debrief → next shift
```

`judging` needs a verdict (`human`, `machine` or `unsure`), a confidence and a clue for every operator. `revising` allows one clue change, and doing it finishes the shift for rank purposes.

### Ranks

```ts
const RANKS = [[0, 'recruit'], [1, 'cadet'], [3, 'agent'], [5, 'investigator'], [7, 'senior'], [10, 'inspector']] as const;
function rankFor(milestones: number): Rank; // pure
```

A rank is worked out from saved milestones and never stored, so it can't disagree with them. Milestones are only ever added, so a rank never drops.

### Dialogue

A script is a flat record of nodes. The runner is about 60 lines, pure and testable.

```ts
type Node =
  | { kind: 'line'; who: CharacterId; pose?: Pose; text: string | Record<Band, string>; next: NodeId | 'end' }
  | { kind: 'choice'; prompt?: string; options: { text: string; set?: Flag; next: NodeId }[] }
  | { kind: 'branch'; when: Flag; then: NodeId; else: NodeId };
```

Lines appear at once, the player advances with a click or Space, can skip a scene, and can open a history log. There is no timed text. `Band` is the briefing style. Only briefings and debriefs use the three-part form, and text lives in `content/`, so translation stays possible later. A content test walks every script: all `next` ids exist, every path ends, every line is 18 words or fewer.

## 6. Character system

```ts
interface Character { id: CharacterId; name: string; poses: Record<Pose, Layers> }
<CharacterPortrait character="warden" pose="stopped" />
```

Each character is one TSX file of layered SVG. Bot poses come from `wardenState(rec)` and are named after rules (`idle`, `matched`, `answered`, `missed`, `stopped`), never moods. Humans use `neutral`, `suspicious`, `amused`, `surprised`, `alarmed`. Personality files are plain text in `content/personas/`, the same files shown to the player. Operators share one rig with a small seeded variation. No face or pose may depend on `source`, which a test checks.

## 7. Mission transitions

Moving between missions only ever goes through a campaign stage. Each mission gets props and returns one event:

```ts
<TrickbotMission start={...} onExit={(result) => dispatch({ type: 'missionDone', result })} />
```

Missions never import each other. Shared UI comes from `components/`, shared rules from `engine/`. The transition is a 280 ms wipe plus a dialogue scene, so the story carries the player across.

## 8. Save

| Layer | Purpose |
|---|---|
| `localStorage`, key `ghost-protocol.save.v1` | Automatic, on stage change and level cracked |
| Memory | Fallback when storage is blocked. The game never errors |
| Save code, such as `KITE-7Q4M` | Shared classroom devices and moving between lessons |

```ts
interface SaveV1 {
  v: 1;
  stage: Stage;
  flags: Flag[];
  trickbot: { cracked: number[]; tricks: string[] };
  impostor: { shift: number; clues: ClueResult[] };
  milestones: MilestoneId[];
  band: Band;
  reports: Record<CheckpointId, string>;
  settings: { reducedMotion: boolean; largeText: boolean; sound: boolean; highContrast: boolean };
}
```

- No name, free text, password or chat is stored. The call sign is picked from a list and stored as an id.
- Everything loaded is validated. A bad save is ignored with a clear message, and the game starts fresh.
- Title screen: Continue, New tester and Enter code. New tester clears the device save for the next pupil.
- Codes carry stage and progress with a checksum. A code is convenience, not security. Pupils can forge one, and that's acceptable, since a code unlocks doors and never shows answers.
- Later versions migrate through `migrate(save)`, with one test per old version.
- Save at safe points only: gate opened, shift finished, stage changed. Write to a second key first, then swap, so a crash can't leave half a save.

## 9. Impostor content

```ts
type Source =
  | { kind: 'human'; author: string; consent: string; date: string }
  | { kind: 'model'; model: string; promptId: string; date: string; reviewedBy: string }
  | { kind: 'rules'; engine: 'switchboard'; version: string };

interface Reply { operator: OperatorId; question: QuestionId; text: string; source: Source }
```

Content ships as generated typed data. `source` stays veiled in the page until a reveal, the same way Trickbot veils `POOL`. This slows casual source readers, and it isn't real protection. Operators are shuffled per seed.

### Snapshot pipeline (developer only)

1. Persona prompts live in `content/impostor/personas/*.md` and are shown to players at the reveal.
2. `tools/snapshot-operators.ts` reads the API key from the environment and runs through the official Anthropic SDK and the Batches API. Default model: `claude-opus-5-5`. The tool handles `refusal` stop reasons.
3. The output is written to a pending file with model, prompt hash and date.
4. A person approves each reply. Only approved replies enter `content/`.
5. `npm run check` fails if a reply lacks a full source record.

### Leaving room for live rounds

`ImpostorMission` gets its replies through one small interface, and the only version now reads the bundled data. A live class round would be a second version of this, with no change to the mission.

```ts
interface OperatorSource { reply(operator: OperatorId, question: QuestionId): Promise<Reply>; }
```

This is the only preparation for live play. Nothing else gets built for it now.

The provider is an assumption, since the brief does not name one. Check the current API docs when building this, as details change.

### Cost

Prices from the Claude API reference, cached 2026-10-06. Batch is 50% off. The token counts are estimates.

| Case | Calls | Tokens in / out | Model | Cost |
|---|---|---|---|---|
| Generate 60 replies, three passes | 180 | 108k / 22k | Opus 5.5, batch | About $0.43 |
| **Class of 30 playing** | 0 | 0 | none | **$0** |
| Rejected: live, 30 pupils × 20 questions | 600 | 480k / 72k | Haiku 5.5 | About $0.08 per class |
| Rejected: live, same | 600 | 480k / 72k | Opus 5.5 | About $3.36 per class |

`plan.md` lists an optional live round for advanced players. Live mode is rejected for this release on risk, not price. It would need a proxy, key handling, moderation, rate limits and a safeguarding review, and one network failure stops a class.

## 10. Security

- No API key or secret in `src/`. Keys live only in environment variables on the developer's machine. Neither Gemini nor any other provider is called from the game: Gemini's terms bar use in an app likely to be used by under-18s. `tools/` is excluded from the build. `check-delivery.mjs` scans the output for `sk-ant`, `api.anthropic.com`, `fetch(`, `XMLHttpRequest` and `WebSocket`.
- A strict CSP meta tag: no `connect-src`, no external sources.
- Passwords are fictional and veiled. Pupils can read the source, and that's fine: Trickbot's console greeting and "trick it first" rule stay.
- Test hooks (`?seed=`, `#teacher`) exist in the production build, but they reveal nothing that the source doesn't already.

## 11. Testing seams

- Pure reducers and content walkers run in Vitest with no DOM.
- `?seed=1234` fixes shuffles and passwords for Playwright.
- `data-testid` only where role and text aren't enough.
- Motion can be set to instant through the reduced-motion setting.

The verification strategy is in ACCEPTANCE_TESTS.md.
