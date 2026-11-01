# Countersign

Working title. A 2D narrative game about prompt injection and the imitation game, for Years 4–13. Pupils open one HTML file: no server, no accounts, no network.

Start from [docs/SESSION_HANDOFF.md](docs/SESSION_HANDOFF.md). Read other docs only when the task needs them:
[GAME_DESIGN](docs/GAME_DESIGN.md), [WORLD_BIBLE](docs/WORLD_BIBLE.md), [CHARACTER_BIBLE](docs/CHARACTER_BIBLE.md), [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md), [ASSET_MANIFEST](docs/ASSET_MANIFEST.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [IMPLEMENTATION_PLAN](docs/IMPLEMENTATION_PLAN.md), [ACCEPTANCE_TESTS](docs/ACCEPTANCE_TESTS.md).

## Commands

```sh
npm run dev         # local preview
npm run check       # build, delivery checks, engine sync, Trickbot tests, unit tests
npm run test:e2e    # build, then all device projects in Playwright
npm run sync:warden # re-copy the engine after moving tools/warden.pin.json
node tests/e2e/shots.mjs 1366 768   # screenshots of every screen, in .tmp/shots
```

## Rules

- **Never edit `src/missions/trickbot/vendor/`.** Fix the engine in Trickbot, move the pin, re-sync.
- **Warden's replies and hints stay word for word.** Voice lines sit beside them, and never on a support reply.
- **No network in the game.** No model or image API is ever called from it, and keys never enter this repo.
- **Save nothing personal.** No names, passwords, chat or free text.
- **Bot status lamps state only what a rule did.** Personality lives in written files that the player can read.
- **Human replies are by a real, credited person. Machine replies are real outputs.** Never fake either.
- British English, short sentences, 18 words or fewer per dialogue line.
- One task per session, 6 files or fewer. Load at most two skills. Don't add dependencies without asking.
- Commit subjects are `type:message` (new, fix, tweak, update, test, rollback) with no co-author line. Commit when asked. Ask before pushing.
- At the end of a session, update `docs/SESSION_HANDOFF.md` in under 500 words. Report only tests you actually ran.
