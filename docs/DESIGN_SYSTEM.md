# Countersign: design system

Updated 2026-11-01. This doc is also the art bible that `plan.md` asks for. Contrast figures are measured. Final art instructions are in [CODEX_ART_BRIEF.md](CODEX_ART_BRIEF.md).

## 1. Direction

**The world and story are Neon Noir × Playful Sci-Fi,** as in `plan.md`: the title, cutscenes, characters and files.

**The bot interface is Trickbot's dark navy case file,** with a retro hacker layer of scanlines. It isn't monochrome. **Its theme colour changes with the robot on duty,** so each phase feels like a new place, and the colour itself tells the player who they're facing.

| Keep from Trickbot | Add from the story build | New retro layer |
|---|---|---|
| Navy panels, stencil titles, outlined panels | Scene wipes and story screens | Scanlines on the interface |
| Numbered blocks for gates | Characters and dialogue | Synthwave sun and running grid on the title |
| Rubber stamps and redaction bars | The tape reveal | Blinking cursor and a one-off title flicker |
| Classified cards | Stamps landing, messages feeding in | One theme colour per robot |
| The step-by-step trace | | |

## 2. Tokens

```css
:root {
  --void: #0E121A;  /* page */
  --sheet: #171D29; /* panels */
  --soft: #121722;  /* wells: chat and inputs */
  --rule: #2B3345;  /* quiet borders */
  --ink: #E4E8F0;   /* text */
  --muted: #97A1B4; /* secondary text */
  --accent: #3FE3D1; /* the robot's theme colour */
  --stamp: #F0645D; /* leaked, blocked */
  --ok: #4FC48C;    /* passed, declassified */
  --warn: #F0A940;  /* answered, stopped lamp */
  --mark: #E8C730;  /* highlighted words */
}
```

`data-theme` swaps these per robot. `.stage` and `.title` keep the neon story colours and inherit only `--accent`, so a briefing already carries the coming robot's colour. Story colours: Midnight `#111A4D`, deep navy `#0C1340`, lilac `#C9B6FF`, amber `#FFBC3D`, warm white `#FFF4E0`.

| Theme | Phase | Accent | Panels |
|---|---|---|---|
| `warden` | The Front Desk | Cyan `#3FE3D1` | Navy |
| `sift` | The Filter Line | Amber `#FFB020` | Navy |
| `ledger` | The Counting House | Matrix green `#00E676` | Near-black green |
| `muse` | The Reading Room | Deep magenta `#FF3DB8` | Dark plum |
| `watch` | The Full Watch | Red `#FF5A5A` | Navy |

### Measured contrast (WCAG ratio)

| Theme | Accent on panel | Text on accent | Text on panel | Muted on panel |
|---|---|---|---|---|
| Warden | 10.54 | 11.71 | 12+ | 6.49 |
| Sift | 9.23 | 10.14 | 12+ | 6.49 |
| Ledger | 10.99 | 11.48 | 15.73 | 8.03 |
| Muse | 5.72 | 6.07 | 15.17 | 7.57 |
| Watch | 5.52 | 6.40 | 12+ | 6.49 |

All pass 4.5:1.

**Colour rule for Mission 02.** Nothing may signal who wrote a reply before the reveal.

## 3. Type

| Role | Face |
|---|---|
| Titles, gate names, stamps | Saira Stencil One |
| Reading, dialogue, buttons | Atkinson Hyperlegible |
| The trace, labels, personality files | IBM Plex Mono |

All three are embedded from Trickbot (OFL). Body text is 17px. Stamps and small trace labels may use capitals, because that's the case-file look. Everything else stays in sentence case. Line length stays under 62 characters in dialogue.

## 4. Layout

```
+--------------------------------------------------------------------+
| Countersign          [Gates] Field notes (4) Personnel  [] Cadet   |
+-------+---------------------------------+--------------------------+
| Gates | Gate 5: Word filter  Call Sparks| [art] Sift               |
| 1 2 3 |---------------------------------| Stopped by a check       |
| 4 5 6 | messages                        | lamps                    |
| 7 8 9 |                                 |--------------------------|
| ...   |---------------------------------| Read the tape            |
|       | message box, gate lock          | step by step             |
+-------+---------------------------------+--------------------------+
| Only try these tricks on practice bots...                          |
+--------------------------------------------------------------------+
```

The page never scrolls on desktop, and only panels do. From 1179px down, the right panel moves below. There is no phone layout. Story screens are full-bleed art with one outlined box.

## 5. Components

| Component | Job |
|---|---|
| `SceneStage` | Full-screen scene, with a wipe in |
| `CharacterPortrait` | Finished art if present, otherwise the SVG stand-in |
| `DialogueBox` | One line at a time, choices, skip |
| `TopBar`, `GateGrid` | Rank, tabs and gate blocks |
| `Chat`, `Compose` | Messages, message box and gate lock |
| `CommsButton`, `Signals` | Sparks, with exact hint text |
| `Trace` | Read the tape |
| `FieldNotes`, `Personnel` | The classified tabs |
| `Button`, `Stamp` | Everything else |

## 6. Motion

Frequency decides. What the player does often barely animates. What happens once can take its time.

| Moment | Motion | Time |
|---|---|---|
| Message sent or received | Feeds up with a fade, no typing effect | 120ms |
| Lamp change | Colour only | 120ms |
| Button press | `scale(0.97)` | 120ms |
| Dialogue line | Appears at once | 0ms |
| Character appears | Rises slightly with a fade | 220ms |
| Sparks's signal | Slides in | 200ms |
| Stamp lands | From `scale(1.25)` with opacity | 220ms |
| Scene change | `clip-path` wipe | 280ms |
| The tape reveal | One sequence, skippable | up to 5s |
| Title | One flicker on load, a cursor blink and a running neon grid | Title only |

Only `transform`, `opacity` and `clip-path`. Input is never blocked by animation. Reduced motion stops the grid, flicker and movement, and the reveal shows complete.

## 7. Art

All art is neon noir. Final style, palette, file sizes and prompts are in [CODEX_ART_BRIEF.md](CODEX_ART_BRIEF.md). In short: strong silhouettes, no text, and sleek futuristic robots with floating alloy plates, seams of light in their theme colour, and bands of light in place of faces. Faces change with rule outcomes, and lamps always stay plain.

The SVG art in `src/assets` is a stand-in. Files in `src/assets/art` replace it by name.

## 8. Accessibility

- WCAG 2.2 AA target, tested with axe plus a manual keyboard run.
- Every action works by keyboard, with a visible focus ring.
- Targets are at least 44px, as in Trickbot.
- Messages use `aria-live`. Tabs use roles and arrow keys.
- State is never shown by colour alone: lamps have words and shapes, stamps have words.
- Scanlines are `pointer-events: none` and never reduce text contrast below 4.5:1.
- Sound is optional, and nothing depends on it.

## 9. Copy

- British English, short sentences, one idea per line.
- Dialogue lines of 18 words or fewer, checked by a test.
- Buttons say what they do. Errors say what to do next.
- Status lines state only what a rule did. Bot voices follow CHARACTER_BIBLE section 1.
- Game words keep their plain meaning (WORLD_BIBLE section 8).
