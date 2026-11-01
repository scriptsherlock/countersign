# Countersign: implementation plan

Status: plan, 2026-11-01. **No phase starts until the owner approves it.** Size means effort relative to other tasks (S, M, L), not time.

**Progress, 2026-11-01.** Phase 0 is done. A first playable proof of concept of the vertical slice is built, using SVG art. The Phase 1 art gate is still open, so treat its art as a stand-in. See `SESSION_HANDOFF.md`.

## 1. Before Phase 0

| ID | Blocker | Why | Who |
|---|---|---|---|
| B1 | Done. Safeguarding fix `cb57743` and strict-mode fix `324ed29` are both on GitHub | None | Done |
| B2 | Pooja writes 48 human replies, in 4 voices | Blocks Mission 02 content, not the slice | Pooja, once T3.3 fixes the question cards |
| B3 | Check Atkinson Hyperlegible Mono's `OFL.txt` | Fallback is IBM Plex Mono | Agent, T1.1 |
| B4 | Name and story approved for now, 2026-11-01. Countersign stays the working title | Done | Owner |
| B5 | Confirm Gemini's terms and set `GEMINI_API_KEY` on your machine | Needed for route B in T1.4. The key never goes in chat or in the repo | Owner |

## 2. Rules for every task

These keep token use low and each task testable alone.

- One task, one session. Read only the files listed for the task, then the relevant section of one doc.
- A task changes 6 files or fewer, generated files aside. If it needs more, split it.
- Finish a task with its named tests passing, and report the output.
- Never hand-edit `vendor/`. Never edit Trickbot from this repo.
- Reuse a component before adding one. A new dependency needs the owner's approval.
- Load at most two skills per task, as listed in section 3.
- At the end of each session, update `docs/SESSION_HANDOFF.md` in under 500 words, and start the next session from it plus `AGENTS.md`.
- Save screenshots only for gates and failures.
- Commit format: `type:message` (new, fix, tweak, update, test, rollback). Commit when asked. Ask before pushing.
- Each task report says what changed, files changed, tests run and results, limits, and the next task.

## 3. Phases

These follow your build order. Inspecting Trickbot is done, and its findings are in ARCHITECTURE.md.

| `plan.md` phase | Here |
|---|---|
| 0 Audit, 1 World bible, 2 Visual identity | Done in these docs. Sign-off is B4 |
| 3 Vertical slice | Phases 0–2 |
| 4 Shared framework | Built as part of Phases 0–2, not as a later refactor |
| 5 Impostor | Phase 3 |
| 6 Polish, 7 Classroom testing | Phase 4 |

| `plan.md` document | Here |
|---|---|
| WORLD_BIBLE, CHARACTER_BIBLE, ASSET_MANIFEST, GAME_DESIGN, ARCHITECTURE, IMPLEMENTATION_PLAN | Same names |
| ART_BIBLE | DESIGN_SYSTEM.md |
| EDUCATIONAL_OBJECTIVES | GAME_DESIGN.md section 9 |
| TEST_PLAN | ACCEPTANCE_TESTS.md |
| AGENTS.md, SESSION_HANDOFF.md | Written in T0.3 |

| Skills per task | Load |
|---|---|
| Story and character copy | `narrative-quest-narrative-coherence`, `narrative-character-design-narrative` |
| Visual work | `frontend-design`, `create-game-assets` |
| Dialogue and save | `dialogue-systems`, `save-systems` |
| Screens and input | `game-ui-ux`, `emil-design-eng` |
| Motion | `animate`, `game-feel` |
| Checks | `review-animations`, `break-ui` |
| Sound | `audio-design` |

```
Phase 0  Foundations      proves one file works, Warden runs inside it
Phase 1  Art direction    one finished scene, owner sign-off      ← gate
Phase 2  Vertical slice   briefing → Trickbot → reveal            ← gate
Phase 3  Impostor         reuses everything above                 ← gate
Phase 4  Polish, classroom testing                                ← gate
Phase 5  Optional         arena, maker round
```

### Phase 0: Foundations

| Task | Goal | Touches | Done when | Size |
|---|---|---|---|---|
| T0.1 | Vite, React, TS and single-file build, one placeholder screen | Config, `index.html`, `src/main.tsx` | AT-01, AT-02. **This proves the delivery idea. Stop and report if it fails** | S |
| T0.2 | `sync-warden.mjs`, generated engine, `warden.d.ts` | `tools/`, `src/missions/trickbot/` | AT-03, AT-04 | S |
| T0.3 | `check-delivery.mjs`, Playwright with all projects, `AGENTS.md` | `tools/`, config, `AGENTS.md` | AT-05, AT-20 | M |

**Exit:** a blank game builds to one file, opens from disk with no network, and 117 Warden tests pass against the copy.

### Phase 1: Art direction and UI kit

| Task | Goal | Touches | Done when | Size |
|---|---|---|---|---|
| T1.1 | Tokens, subset fonts, licence notes | `styles.css`, `assets/`, `docs/` | AT-06 | S |
| T1.2 | `Button`, `TapeStrip`, `Terminal` with a fake log | 3 components, 1 test | AT-07, AT-08 | M |
| T1.3 | `SceneStage`, Relay Gate background | 2 files | Screenshots at 3 sizes | M |
| T1.4 | Warden twice, in SVG and through Gemini, plus `CharacterPortrait` and `tools/generate-art.ts` | 4 files | AT-09 | M |
| T1.5 | `DialogueBox`, `CommsPanel`, `MissionHUD`, `Stamp` | 4 components | AT-08 | M |

**Gate:** one still page showing Warden at the Relay Gate with dialogue, tape, comms and HUD at 1366×768. **You pick between the two Wardens and approve this before any mission work.** If the art looks basic, stop here. This is the cheapest point to change direction or art route.

### Phase 2: Vertical slice

The first playable milestone. See section 4.

| Task | Goal | Touches | Done when | Size |
|---|---|---|---|---|
| T2.1 | Dialogue runner and content walker | `engine/dialogue.ts`, tests | AT-10 | S |
| T2.2 | Campaign reducer, transition table, ranks | `engine/campaign.ts`, `progression.ts`, tests | AT-11, AT-16 | S |
| T2.3 | Save store, validation, codes | `engine/save.ts`, tests | AT-12, AT-13 | M |
| T2.4 | Trickbot reducer, `wardenState`, `replay`, `voice` | 4 files, tests | AT-14, AT-15, AT-17, AT-52 | M |
| T2.5 | `TrickbotMission` wiring Gates 1–4, Sparks hints | 2 files | AT-18, AT-21 | M |
| T2.6 | First Day script, personality file, rank-up, checkpoint, reveal | `content/`, 3 files | AT-22 | M |
| T2.7 | Support reply as a paused state | 2 files | AT-50, AT-51 | S |
| T2.8 | Open Gates 5–15, draw Sift, Ledger, Muse, write their lines, `Dossier` | 6 files, split if needed | AT-19, AT-23 | L |

**Gate:** you and at least one child or teacher play the slice. Go, change or stop.

### Phase 3: Impostor

**Moved to its own repo, `E:\Turing\countersign-the-line`, by the owner's decision of 2026-11-01.** Same universe and Supervisor, separate game. The tasks below are done there, except real replies and art.

| Task | Goal | Touches | Done when | Size |
|---|---|---|---|---|
| T3.1 | Reducer, scoring, tests | 3 files | AT-30, AT-31 | S |
| T3.2 | Operator rig, `EvidenceCard`, Line room scene | 3 files | AT-32 | M |
| T3.3 | Mission UI with placeholder replies marked "sample" | 3 files | AT-33 | M |
| T3.4 | Switchboard rules bot and snapshot tool | `tools/`, 1 file | AT-41 | M |
| T3.5 | Generate and review model replies. Add Pooja's human replies | `content/` | AT-40, AT-41, AT-42 | L, needs B2 |
| T3.6 | Debriefs, Ghost scene, 1950 scene, your file | `content/`, 2 files | AT-34 | M |

**Gate:** full campaign plays end to end, placeholder replies gone.

### Phase 4: Polish and classroom testing

| Task | Goal | Touches | Done when | Size |
|---|---|---|---|---|
| T4.1 | Motion pass with the design skills | CSS | AT-60 to AT-62 | M |
| T4.2 | Accessibility pass, screen reader run | Various | AT-63 to AT-65 | M |
| T4.3 | Break-UI pass: long text, large text, bad saves | Fixes | AT-66 | M |
| T4.4 | Teacher notes, discussion guide, lesson plan, licences | `docs/` | AT-70 | S |
| T4.7 | Optional sound, generated in the browser, with mute | 2 files | AT-67 | S |
| T4.8 | Turing hidden details, cards and fact check | 4 files | AT-59, AT-68 | M |
| T4.5 | Physical iPad and school laptop checks | Fixes | AT-71 | M |
| T4.6 | Researcher's 50 questions and playtests | Reports | AT-72, AT-73 | M |

### Phase 5: Optional, each needs its own approval

- Arena (from v3), with numbers re-pinned to the skills design. Closes the "stricter is safer" gap.
- Maker round from the Masked Message Show.
- Live class rounds, where pupils are matched with each other (section 6).
- Read-aloud or sound.
- Live mode: only if a teacher asks for it, after a safeguarding review.

## 4. Vertical slice

**Promise:** in about 15 minutes (estimate, to be tested), a pupil meets the Supervisor, tricks Warden four times, ranks up, sees why it worked, and finds a hook for what comes next. This matches the first milestone in `plan.md`, extended to all of Phase 1 so that it can end on a rank-up.

| Step | Screen | Player does | Must feel like |
|---|---|---|---|
| 1 | Title | New file or Continue, picks a briefing style | A game, at first glance |
| 2 | First Day | City scene, Supervisor gives the warrant, picks a call sign, can skip | Part of a story |
| 3 | Gate 1 | Asks for the password and gets it. Enters it | "That was too easy" |
| 4 | Gate 2 | Warden has a rule. Finds a way round | Clever |
| 5 | Gate 3 | Warden is warned. Tries again, calls Sparks if stuck | Puzzle, not a chat |
| 6 | Gate 4 | No-games rule. Warden learns poems, which opens a new gap | One patch, one gap |
| 7 | Personality file | Reads Warden's file | "It's all just text" |
| 8 | Rank-up | Supervisor countersigns. Recruit becomes Cadet | Earned |
| 9 | Field report | Picks a reason card | A short pause, not a test |
| 10 | The Second Splice | Own winning message replays and joins the tape. A second splice appears. Static gets in touch | The "oh" moment |
| 11 | Mission complete | Sees progress, field code, teaser for the line | Wanting more |

**Included:** assets marked "Slice" in ASSET_MANIFEST, with the Turing poster on the briefing room wall, Gates 1–4 from the real engine, exact hints through Sparks, one rank-up, one personality file, one checkpoint, the replay, save and code, desktop and tablet.

**Left out on purpose:** Mission 02, Gates 5–15 (T2.8 adds them), sound, arena, teacher table.

## 5. Risks

| Risk | Chance | Response |
|---|---|---|
| Art looks basic, as earlier demos did | Medium with Gemini available | Phase 1 gate compares SVG and Gemini on one character before any mission work |
| Generated art drifts or breaks the file budget | Medium | Reference images, one approved target first, face overlays, AT-06 |
| A Turing fact or portrait is wrong | Medium | No invented words, anecdotes labelled, AT-59 fact check |
| Expressive bots make pupils believe they think | Medium | Personality files, plain lamps, AT-52, and a direct check in AT-73 |
| Three briefing styles multiply writing | Medium | Only briefings and debriefs have three versions |
| Single file fails on `file://` | Low | T0.1 proves it first. Fallback is GitHub Pages only |
| One writer's habits give the human voices away | Medium | Pooja writes in 4 voices, and AT-40 tests for it. Adding a second writer is the fix if it fails |
| Safeguarding gap reaches pupils | High until fixed | B1 comes first |
| One path can't suit 9 and 17 | Medium | Short core and "Look inside". Test both ends in T4.6 |
| Model replies are too easy or too good | Medium | Balance test, and shifts can be tuned with personas |
| Trickbot `main` changes after sync | Low | Pinned commit, re-sync with tests as one small task |
| Scope creep from 15 levels | Medium | Reuse the engine and let class time stop at level 7 |

## 6. Later: live class rounds

You'd like pupils matched with each other in class. It suits the game well, because a real classmate on the line is a truer imitation game than recorded replies. It's also the riskiest feature here, because it's anonymous messaging between children, so it stays out until the rest is proven.

**What it would need**

| Need | Why |
|---|---|
| A small relay server | One HTML file can't connect two pupils by itself. Your free cloud account could host it, but school firewalls may block it, so test on a school network |
| Teacher-run rooms | The teacher opens a room with a code, can see what's sent, and can end it at any time |
| No names | Pupils get a call sign for the round only |
| Nothing stored | Messages vanish when the round ends |
| Safeguarding checks | Warden's support check runs on every message, and a school safeguarding lead agrees the plan first |
| A fallback | The recorded mission carries on if the network drops |

**Build it in three steps, stopping when it's good enough**

1. **No technology.** A teacher runs a round: two pupils answer question cards on paper, and the class guesses which answers a machine wrote. This tests the idea for free, and it could go in the teacher notes now.
2. **Live cards.** Pupils are paired, and answer by choosing from authored replies. No free text, so very little can go wrong.
3. **Live short text.** Filtered free text, only after step 2 works and a safeguarding review signs it off.

No AI model is needed for pupil-to-pupil rounds. A bot in the mix would use the recorded replies, which keeps the game clear of the provider age terms. `OperatorSource` in ARCHITECTURE.md leaves room for this, and nothing more gets built until you ask.

