# Session handoff

Updated 2026-11-01.

## Status

Mission 01 is fully playable, end to end. To play it, open `dist/index.html`, or run `npm run build` first if it's missing. Field codes on the title screen jump to later gates, for example `TIDE-QG` for Phase 2.

The world and story are neon sci-fi, as in `plan.md`. The bot interface is Trickbot's dark navy case file with a retro hacker layer, and its theme colour changes per robot: cyan, amber, Matrix green, deep magenta, red. See `docs/DESIGN_SYSTEM.md`.

## What exists

- **Delivery:** one offline HTML file of about 480 KB. Engine pinned to Trickbot `324ed29`.
- **Story:** title, briefing style, First Day, warrant, then five phases with a briefing, personality file and rank check each, the field report, the tape reveal after Phase 1, the finale, and mission complete.
- **Guards:** Warden, Sift, Ledger and Muse, each voicing its real engine stage.
- **Interface:** gate blocks, Sparks's exact hints, rule lamps, Read the tape trace, classified Field notes and Personnel tabs, field codes, local save.
- **Art:** futuristic SVG stand-ins for the robots. Files in `src/assets/art/` replace them by name.

## Next task

Batches 0, 1 and 2 are in and approved. Mission 02 lives in its own repo, `E:\Turing\countersign-the-line`, with no link between the two games, at the owner's request.

Live site: https://scriptsherlock.github.io/countersign/ , deployed by `.github/workflows/pages.yml` on every push to `main`.

## Design notes

- The robot on duty owns the chat, its name and its voice. Engine text changes only by name, at display time.
- Every update patches the trick that just worked (`src/missions/trickbot/patches.ts`). If Trickbot's engine changes, re-run `tests/unit/patches.test.ts`, which uses `tests/fixtures/probes.json`.

## Tests

See the final report for the latest run. Commands are in `AGENTS.md`.

## Known gaps

- The game folder isn't a git repository yet.
- Fonts are embedded in CSS, so the file-based licence check doesn't see them.
- Not built: Mission 02, sound, teacher notes, keyboard-only test, reduced-motion test.
- Only the first report and the first reveal have choices. Later phases have no field report yet.
- Physical iPad and school laptop checks haven't been done, and nobody has played it with pupils.
