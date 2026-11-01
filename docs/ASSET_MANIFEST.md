# Countersign: asset manifest

Updated 2026-11-01. Style and prompts are in [CODEX_ART_BRIEF.md](CODEX_ART_BRIEF.md), which replaces the earlier Gemini route. Gemini has no free image model, so Codex generates the art.

Status: Batches 0, 1 and 2 approved. Batch 3 goes to the Mission 02 repo, and has not been made. Until a file exists, the game shows its SVG stand-in. A character with any finished art uses its resting pose until the other poses arrive.

**One target gets approved first: `warden-idle` over `scene-gate`, at real size.** Nothing else is produced until that passes.

| Batch | Files | Count | Budget each |
|---|---|---|---|
| 0 | `warden-idle`, `scene-gate` | 2 | 22 KB, 55 KB |
| 1 | `warden-matched/answered/missed/stopped` | 4 | 22 KB |
| 1 | `adeyemi-neutral/suspicious/amused/surprised/alarmed` | 5 | 22 KB |
| 1 | `sparks-idle` | 1 | 12 KB |
| 1 | `turing-portrait` | 1 | 20 KB |
| 1 | `scene-title/skyline/bureau/desk/hub` | 5 | 55 KB |
| 2 | `sift-*`, `ledger-*`, `muse-*`, five poses each | 15 | 22 KB |
| 3 | `operator`, `scene-line`, only when asked | 2 | 22 KB, 55 KB |

**File budget.** Art up to 950 KB becomes about 1.27 MB once embedded, and the game itself is about 480 KB, so about 1.75 MB in all. The limit is 2 MB, and `npm run check` enforces it.

| Other assets | Source | Status |
|---|---|---|
| Saira Stencil One, Atkinson Hyperlegible, IBM Plex Mono | OFL, embedded from Trickbot in `src/fonts.css` | In the game |
| Rank badge, stamps, redaction bars, title horizon | Drawn in SVG or CSS | In the game |
| Sound | Generated in the browser, Phase 4 | Not built |

## Approval checklist

- Seen at real size, in the game
- Silhouette reads at 124×168
- Neon noir palette, matching the approved target, with the robot's theme colour unmistakable
- Source, prompt and date recorded in `src/assets/licences.json`
- Fits the file budget
- AI art noted in the credits
- Turing portrait checked by a person (WORLD_BIBLE section 12)
- Operator art gives no clue to the source (AT-32)
