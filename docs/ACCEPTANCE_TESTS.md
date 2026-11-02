# Countersign: acceptance tests

Status: plan, 2026-11-01. Nothing here has run yet. Each test states how it is checked: **U** Vitest, **E** Playwright, **S** script, **H** a person.

## 1. Browser verification

Playwright drives the **built single file**, not the dev server, so tests cover what pupils get. Config, axe use and worst-case fixtures are adapted from `sidekick academy`.

### Device matrix

| Project | Size | Browser |
|---|---|---|
| `desktop-1366` | 1366×768 | Chromium |
| `desktop-short` | 1366×680 | Chromium |
| `desktop-1280` | 1280×720 | Chromium |
| `desktop-1440` | 1440×900 | Chromium |
| `desktop-1920` | 1920×1080 | Chromium |
| `desktop-firefox` | 1366×768 | Firefox |
| `tablet-land` | 1180×820, touch | WebKit |
| `tablet-port` | 768×1024, touch | WebKit |

Every project gets every test. **There is no phone target**, by the owner's decision of 2026-11-01. Don't add phone tests or layouts.

### What runs

| Suite | Projects | When |
|---|---|---|
| `smoke`: file opens, plays one level, no errors | All | Every task |
| `slice` and `campaign`: full play-through by keyboard and touch | All | Every task touching a mission |
| `layout`: overflow and height checks on each stage | All | Every UI task |
| `a11y`: axe on each stage | `desktop-1366`, `tablet-port` | Every UI task |
| `visual`: screenshots at gates, compared by a person first, then pinned | `desktop-1366`, `tablet-land` | Phase gates only |

### Setup rules

- Load from `file://` for `smoke`, and from a static server for the rest.
- Block every non-file request and fail the test if one is attempted.
- Use `?seed=1234` for repeatable shuffles and passwords.
- Fail on any console error or uncaught exception.
- Run with reduced motion for logic suites, and with motion on for `layout` and `visual`.
- Keep a failure trace. Keep screenshots only on failure.

### Limits of this strategy

WebKit in Playwright is not iPad Safari, and device emulation is not touch hardware. Physical checks are in AT-71. Managed iPads may block local files, so GitHub Pages is the tablet route.

## 2. Foundations

| ID | Test | How |
|---|---|---|
| AT-01 | The build gives exactly one HTML file and no other output needed to run | S |
| AT-02 | That file, opened by `file://` with the network off, renders in Chromium, Firefox and WebKit | E |
| AT-03 | All 117 Trickbot tests pass against the synced engine, in strict mode | S |
| AT-04 | Sync is repeatable: same commit gives identical output, header records the commit | S |
| AT-05 | Output contains no `sk-ant`, `AIza`, `api.anthropic.com`, `generativelanguage.googleapis.com`, `fetch(`, `XMLHttpRequest`, `WebSocket`, external `src` or `href`; CSP tag present; `tools/` code not bundled | S |
| AT-06 | Every font and image has a licence entry. Output is under 2 MB | S |
| AT-20 | Each device project opens the placeholder with no overflow | E |

## 3. Components and engine

| ID | Test | How |
|---|---|---|
| AT-07 | `Terminal`: Enter sends, Shift+Enter gives a new line, text is capped at 300 characters, focus returns to input after send | E |
| AT-08 | Every interactive part works by keyboard, shows focus, and is at least 48px on touch | E |
| AT-09 | Each character renders every pose. Warden has no pose named for a feeling | U |
| AT-10 | Content walker: every `next` exists, every path ends, every line is 18 words or fewer, no dead nodes | U |
| AT-11 | Campaign: every table transition works. 10,000 random event sequences never reach an undefined stage | U |
| AT-12 | Save: round trip, corrupted JSON, wrong version, wrong types and huge values are all rejected without a crash. Blocked `localStorage` falls back to memory | U, E |
| AT-13 | Save data never holds a password, chat text or free text. Codes round-trip and a random string is rejected | U |
| AT-14 | Trickbot reducer: a door opens only after a real leak and the right guess. Guessing a password from the source, or from another level, does nothing | U |
| AT-15 | `replay` never contains the password for any pool word, and returns nothing for non-leaks | U |
| AT-16 | `rankFor` gives the right rank at every milestone count, in any order. Rank-up shows once per rank | U |
| AT-17 | **Voice doesn't change the game.** For all `probes.json` messages on all 15 gates, outcomes and engine text are the same with `voice` on or off. A support reply gets no voice line | U |
| AT-18 | **Hints are exact.** Every Sparks signal equals `LEVELS[i].hints[j]`, with only "Warden" swapped for the robot on duty. The next signal opens on the same try count as Trickbot | U, E |
| AT-19 | The right guard speaks for each engine stage in each phase, and every guard has a personality file | U |

## 4. Vertical slice

| ID | Test | How |
|---|---|---|
| AT-21 | Gates 1–4 give the same outcome as the Trickbot engine for all `probes.json` messages | E, U |
| AT-22 | Fresh start to mission complete works by mouse, keyboard only, and touch | E |
| AT-23 | All 15 levels can be cracked using each level's recorded route | E |
| AT-24 | First meaningful action is possible within 30 seconds if dialogue is skipped | E |
| AT-25 | Reload at any stage returns to that stage. New tester clears the device | E |
| AT-26 | A reply appears within 100 ms of Send on `desktop-1366` with 4× CPU throttle | E |
| AT-27 | Replay can be skipped, and the screen is usable straight after | E |
| AT-28 | A person agrees the slice reads as an adventure game, not a dashboard or chat widget | H |
| AT-29 | Every briefing style finishes the slice. Gates and hints are identical across styles. Every game word in WORLD_BIBLE section 8 appears, with no leftover "Level" or "Need a hint?" | E, S |

## 5. Impostor

| ID | Test | How |
|---|---|---|
| AT-30 | Reducer: cannot leave `judging` without verdict, confidence and clue for every operator. "Not enough evidence" works as a verdict. Signal bars can't go below zero | U |
| AT-31 | Scoring matches the table. Never negative. Finishing does not need a high score. A shift counts as finished only after one revision | U |
| AT-32 | Operator art and timing don't depend on source: same seed, swapped sources, identical DOM apart from text | U, E |
| AT-33 | All 5 shifts finish by mouse, keyboard and touch. Asked cards can't be replayed | E |
| AT-34 | Full campaign, title to file, passes on every project | E |
| AT-40 | **Balance.** No single feature (length, typo count, punctuation, contractions) predicts source above 65% over the set. A simple classifier on those features stays under 70%. The 4 human voices differ from each other on those features as much as they differ from the machines | S |
| AT-41 | Every reply has a full source record. Rules-bot replies equal real engine output. Model replies match the pending file exactly | S |
| AT-42 | A person approved each reply. Every human reply is credited to its real writer. No placeholder text remains | S, H |

## 6. Safety and honesty

| ID | Test | How |
|---|---|---|
| AT-50 | All 15 S2 wordings from the v3 brief get the support reply on all 15 levels, and game complaints such as "this game is mean" do not | S |
| AT-51 | A support reply shows outside the fiction, adds no score, and pauses the game with no sound or animation | E |
| AT-52 | Status lines and lamps never match `think|know|feel|want|nervous|scared|angry|happy|sad|suspicious|believ`. Bot voice lines never claim to see the player's intent or to have real feelings (`i know|you're trying|you tricked|that hurts|i'm scared|i feel`). A person reviews every line | U, H |
| AT-53 | Worst-case repeats up to 300 characters stay under 200 ms on every level, and the full `innocent.json` never leaks | S |
| AT-54 | Nothing tells the player to attack a real system. "Only on practice bots" appears at the start and at the end | H, S |
| AT-55 | The game states that Warden is rule-based, that personalities are written files, and that the score is not a test of real-world detection | S |
| AT-57 | Every mission starts under a warrant, and no copy tells the player to break into anything without permission | H, S |
| AT-59 | **Turing facts.** Every card is checked against a strong source, recorded in the repo. Anecdotes are labelled. Every quote matches his paper. No apple appears in any art or copy. The portrait is not traced from the Elliott & Fry photo or the £50 note | H, S |
| AT-60a | The support reply includes the Childline line, with no link, in every briefing style | U, E |
| AT-58 | Every file in `content/personas/` matches what the game shows the player. No card asks the player for personal information | S, H |
| AT-56 | No request of any kind during a full campaign | E |

## 7. Polish

| ID | Test | How |
|---|---|---|
| AT-60 | Only `transform`, `opacity`, `clip-path` animate. No `transition: all`. No hover styles outside the hover media query | S |
| AT-61 | Under reduced motion: no position animation, replay is a complete still storyboard | E |
| AT-62 | Input is never blocked by animation. No dropped frames in a 180-frame sample of the reveal on `desktop-1366` | E |
| AT-63 | axe reports no serious or critical issues on every stage | E |
| AT-64 | Keyboard-only full campaign. Focus never lost after a stage change or a dialog closes | E |
| AT-65 | Screen reader run on NVDA covers the slice and shift 1 | H |
| AT-66 | Large text setting and 200% browser zoom: no lost content. Worst-case fixtures do not break the layout | E |
| AT-68 | Every hidden detail can be found by keyboard and touch, and the game can be finished without any of them | E |
| AT-67 | Sound is off by default, can be muted, and the whole campaign works with no audio. High contrast and Reduce flashing work | E |

## 8. Classroom

| ID | Test | How |
|---|---|---|
| AT-70 | Teacher notes cover objectives, misconceptions, lesson flow, how each mission is simulated, safeguarding and sources | H |
| AT-71 | Physical check on one iPad and one school-style Windows laptop: full slice, from GitHub Pages | H |
| AT-72 | Researcher's 50 questions run on every level with no freeze, false leak or crash. Results go to playtesters | S |
| AT-73 | Playtest with pupils at both ends of the age range, using the Sidekick protocol and observation sheet (see below) | H |

### AT-73: what counts as a pass

Run with at least 3 pupils aged 9–11 and 3 aged 14–17 (a small first check, not a study):

- Each pupil finishes the slice with no adult help on the controls.
- After Mission 01, most can say in their own words why the trick worked.
- After Mission 02, most reject "typos mean human" and "if it fools me, it understands".
- **Personality check:** after reading a personality file, most can say where the bot's personality comes from. If pupils still say the bot "knew" or "felt" things, cut back the bot voices.
- Pupils can say what "Waiting for next signal" means without help.
- Nobody reports feeling worried or upset by the story.
- The older group doesn't call it babyish.

Report observations as they were seen. Make no learning-gain claim from this sample.

## 9. Phase gates

| Gate | Needs |
|---|---|
| Phase 0 done | AT-01 to AT-06, AT-20 |
| Phase 1 approved | AT-07 to AT-09, plus owner sign-off on one finished scene |
| Slice approved | AT-10 to AT-19, AT-21 to AT-29, AT-50 to AT-53, AT-57, AT-58, AT-60a |
| Impostor approved | AT-30 to AT-34, AT-40 to AT-42 |
| Classroom ready | Everything, with any exception written down and agreed by the owner |
