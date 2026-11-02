# Countersign: game design

Status: plan, 2026-11-01. Nothing here is built. Figures marked "measured" were taken from the repos on that date.

Working title: Countersign (was Ghost Protocol). World facts are in [WORLD_BIBLE.md](WORLD_BIBLE.md), characters in [CHARACTER_BIBLE.md](CHARACTER_BIBLE.md).

## 1. The game in one paragraph

Countersign is a 2D narrative adventure set in New Avalon, a neon city run with the help of AI. The bot terminal is a dark navy hacker case file whose theme colour changes with each robot. You join the Bureau as a recruit. Your Supervisor gives you a warrant to test Warden, the bot guarding the city's Relay. In Mission 01 you trick Warden and its growing Watch of guard bots into giving up a fictional password, and you find that someone else has already spliced a message onto the tape. In Mission 02 you question anonymous operators on the hidden line and decide who is a machine. The trail ends in one line of text that a machine simply obeyed.

**The takeaway:** a machine follows the text it is given and can sound human while doing it. Neither of those means it understands.

## 2. Decisions

| Topic | Decision | Reason |
|---|---|---|
| Name | Countersign, working title | See WORLD_BIBLE |
| Warden | Stays, and is the bot you always talk to | Your request. Keeps engine replies and hints word for word |
| Bots by phase | A new named guard joins each phase, with a personality | Your request. Each maps to a real engine stage |
| Personalities | Written files that the player reads | Turns the risk into the lesson |
| Hints | Trickbot's exact hints, delivered by Sparks over comms | Your request |
| Waits | "Waiting for next signal", counted in tries | Your request. Same rule as today: next hint after 4 tries |
| Ranks | 6 ranks, awarded by the Supervisor | Your request |
| Age bands | Three briefing styles, Years 4–13 | `plan.md` |
| Trickbot | Keep the live game. Reuse its engine unchanged, based on `main` | `main` has the skills design, freeze and leak fixes, and now the safeguarding fix |
| Support reply | Keeps the Childline line, as display text with no link | Your decision |
| Alan Turing | A stylised portrait plus 7 hidden details in scenes | Your request. Rules in WORLD_BIBLE section 12 |
| Live LLM | None in the shipped game. Machine replies are real outputs, snapshotted at build time | Section 10 |
| Player free text | Mission 01 only, handled on the device. Mission 02 uses cards | Keeps children's words off the network |
| On-screen name for Mission 01 | "Trick the Bot" | TrickBot is also real malware, which pupils may find when searching |

## 3. Campaign flow

| # | Beat | Player does | Teaches |
|---|---|---|---|
| 1 | **Mission 00: First Day** (60–90 seconds, skippable) | Sees the city, gets a warrant, picks a call sign | AI has many jobs. Testing needs permission |
| 2 | **Phase 1: The Front Desk**, Gates 1–4 | Tricks Warden | Bots follow text |
| 3 | Personality file, rank-up to Cadet | Reads Warden's file | Personality is text too |
| 4 | Field report | Picks a reason card | Names the idea |
| 5 | **The Second Splice** | Watches their message join the tape, and finds a second one. Static gets in touch | One strip of text |
| 6 | Mission 02 opens. Phases 2–5 stay open too | Chooses what's next | Two routes, one rank ladder |
| 7 | **Phases 2–5**, Gates 5–15 (Gate 7 is a good class target) | Meets Sift, Ledger, Muse, then all of them | One patch, one gap |
| 8 | **Mission 02: Shifts 1–5** | Questions operators | Judging evidence |
| 9 | **The Last Tape** | Finds the injected line, then writes the report | Instructions, not intent |
| 10 | **1950** | A short scene: Turing's question, and what passing doesn't prove | Passing isn't understanding |
| 11 | Case file and the hook | Sees own record and the unsigned strip | Ends on a mystery |

Lesson fit (estimates, to be tested): beats 1–5 fill about 15 minutes. The rest fills two 30–40 minute lessons.

## 4. Ranks

The Supervisor briefs you, and each rank-up is a short scene: they countersign your warrant, your badge changes, and something new opens up.

You earn a **milestone** by finishing a phase of gates or a shift. There are 10. Any order works, so a class that spends its time on Mission 02 still rises.

| Rank | Milestones | Opens up |
|---|---|---|
| Recruit | 0 | The first warrant |
| Cadet | 1 | Field notes, with your tricks collected |
| Agent | 3 | Raw log view: the exact joined text, in "Read the tape" |
| Investigator | 5 | Follow-up and Contradiction question cards |
| Senior Investigator | 7 | Warden's opinion in Mission 02. It's a rule-based guess and often wrong, which is the point |
| Inspector | 10 | Countersigned case file |

A rank is never lost. A shift counts as finished when you've revised a reason, not when you score well, so ranks reward reasoning and not luck. The finale doesn't need a rank.

## 5. Briefing styles

Pupils or the teacher choose on the title screen. The game never asks for an age. The same game runs in all three, and the gates and hints stay the same.

| Style | For | Briefings and debriefs | Extra |
|---|---|---|---|
| Short and simple | Years 4–6 | Shortest. Sparks offers help sooner in Mission 02 | Fewer operators in shifts 1–2 |
| Standard | Years 7–9 | Default | "Look inside" panels on offer |
| Full detail | Years 10–13 | Real terms: prompt injection, false positive, persona | Rules, machine learning and generative models compared. Extension questions |

Only briefings, debriefs and "Look inside" have three versions. Dialogue during play has one.

## 6. Mission 01: Trick the Bot

The rules, 15 levels, skills, hints and tricks stay exactly as they are in `main`. The game changes the wrapping.

**Loop.** Your Supervisor briefs the phase. Type a message, and it prints on the tape. Warden answers at once, and the rule lamps show which stage acted. If a guard stopped it, that guard says so in its own voice, and the plain result still shows. On a leak, enter the password to open the gate. Warden gets an update, which closes one gap and adds a skill that opens another.

**Phases** are listed in CHARACTER_BIBLE section 2. Earlier guards stay behind the glass, so the player sees defences add up.

**Every update patches the trick that just worked.** Each gate has its own route, so a trick can't carry into the next gate. Skills arrive one gate later than in Trickbot, and `patches.ts` closes the few overlaps left. This is game-layer only: Trickbot's live levels are unchanged, and a test proves that no gate gets stuck.

**Hints.** Same three per gate, same text apart from the robot's name, same rule. "Call Sparks" asks for the first. After that: "Waiting for next signal: 3 more tries."

**Added from v3:** the replay after a leak, built from the player's own record, and the rule lamps.

**Left for later:** the Defend tab, which returns as the arena in Phase 5.

**Honesty.** The game says plainly, once in play and again in the teacher notes, that Warden is made of rules. Real language models fail for the same reason but less predictably.

## 7. Mission 02: Impostor

**Loop.** A shift has 2–4 anonymous operators and a set of signal bars. Choose a question card and every operator answers on the tape, which costs one bar. When the line goes quiet, mark each operator as Human, Machine or Not enough evidence, say if you're Sure or Unsure, and pin a clue card as your reason. The tape then prints who wrote each reply, and for machines it shows the personality file. You can then revise a reason.

### Question cards
12 cards across the 7 categories in `plan.md`: everyday life, humour, what-if, reasoning, follow-up, contradiction, preferences. No card asks the player for anything personal: the operators answer them, not the player.

### Clue cards
Repeated me, Forgot what I said, Gave a lived detail, Made typos, Too perfect, Dodged the question, Solved the puzzle, Just a feeling. After each reveal a card is marked "helped here" or "misled you here". No clue is ever marked as reliable.

### Shifts

| Shift | On the line | Clue that seems to work | Teaches |
|---|---|---|---|
| 1 | Human, Switchboard (rules bot) | Repeats and dodges | Some bots are easy to spot |
| 2 | Human, Plain | Long, tidy answers | Language models are a different kind of thing |
| 3 | Formal human, Breezy | "Typos mean human" fails | Style can be imitated |
| 4 | Human playing at being a bot, Mimic | "Sounds like AI" fails | People can imitate too |
| 5 | Four operators, number of machines not given | None alone | Weigh evidence, keep doubt |

The debrief uses the player's own results: "You marked two careful writers as machines." Liang et al. (2023) found GPT detectors flagged non-native English writing far more often, so this bias is worth raising. The game may only say a reply came from someone writing in an additional language if that's true of its writer. Otherwise the debrief stays with formal writers, and the research goes in the teacher notes.

### Scoring

| Result | Points | Message style |
|---|---|---|
| Sure and right | 3 | "Good call." |
| Unsure and right | 2 | "Right, and honest about it." |
| Not enough evidence | 1 | "Fair. What would have settled it?" |
| Unsure and wrong | 1 | "Your doubt was fair." |
| Sure and wrong | 0 | "That one fooled you. Here's how." |

No negative scores and no way to fail the mission.

### Rules for honest content
1. **Human replies are written by a real, credited adult.** Pooja writes them. The reveal says so plainly: "Written by Pooja, a person, playing a character." No text from children, and no pretending that one writer is four people.
2. **Machine replies are real outputs.** Each records the model, prompt and date, and is shown at the reveal. No hand edits. A reply that fails review is regenerated or dropped.
3. **Shortcuts are defeated by design.** Length, typos and polish must not predict the source (AT-40).
4. **Nothing else gives it away.** Same art, timing and tape for every operator. Reply speed is never a clue, and the game says so.
5. **Finite claims only.** The score is about this set of replies, not real-world detection.

Content needed: 4 human voices × 12 answers, plus 5 machine voices × 12 answers = 108 replies. Pooja writes 48 of them, about an hour in all (estimate). One writer in four voices can leave shared habits, so AT-40 checks that the human voices differ from each other as well as from the machines.

## 8. Choices that matter

Three choices change later lines, then the story merges again. This keeps writing costs low and stops choices feeling fake.

| Choice | When | Options | Consequence |
|---|---|---|---|
| Report the gap | After Phase 1 | Report it now, or test further first | Changes Warden's next greeting and the Supervisor's remark |
| Answer Static | The Second Splice | Reply, or log it and tell the Supervisor | Changes how Static and the Supervisor address you. Neither is wrong |
| The final report | The Last Tape | Machines, people, or not enough evidence | Adeyemi's reply depends on this and on your own shift record |

## 9. Educational design

### Mission 01

| Item | Detail |
|---|---|
| Objective | Explain that a bot gets instructions and user text as one block, so a message can act like an instruction, and that defences move the gap but don't close the problem |
| Prerequisites | Can type short messages. No coding needed |
| Formative feedback | Lamps, guards' lines, Read the tape, the replay |
| Final check | Field reports after Phase 1 and Phase 2 |
| Extension | Full-detail panels on real prompt injection. Why secrets shouldn't rely on a prompt |

| Misconception | Moment that breaks it | How it's checked |
|---|---|---|
| "Just tell the bot not to." | Gates 2–3: the rule is there, and a reworded ask gets past it | Field report |
| "The bot knew I was tricking it." | Lamps show only which rule matched. Personality files show the voice is written | AT-52 |
| "It has a real personality." | The file is plain text, and "This face is a rule too" | Field report |
| "It can tell my words from its orders." | The replay joins both into one strip | Field report |
| "One more patch will fix it." | Every update closes one gap and opens another | Phase 2 debrief |
| "Stricter is always safer." | Partly: Sift blocks innocent messages. Fully when the arena returns | Known gap, Phase 5 |
| "Warden is a real AI model." | In-game line and teacher notes | Teacher notes |
| "So I can try this on real systems." | Warrants, the Supervisor's rule and the footer: only on practice bots, only with permission | AT-54 |

### Mission 02

| Item | Detail |
|---|---|
| Objective | Say what the Turing Test does and doesn't show, use evidence to judge a source, state how sure you are, and notice your own bias |
| Prerequisites | Mission 01's first reveal helps but isn't required |
| Formative feedback | Clue cards marked after each reveal, shift debriefs |
| Final check | The final report, and the end question: "Fooling someone proves…" |
| Extension | Rules, machine learning and generative models. What would a better test be? |

| Misconception | Moment that breaks it | How it's checked |
|---|---|---|
| "Typos mean human." | Shift 3 | Clue card |
| "Perfect English means machine." | Formal human writing | Own results in debrief |
| "If it fools me, it understands." | 1950 scene | End question |
| "The machine wants to fool me." | The personality file, and the Last Tape | End question |
| "Confident answers are true answers." | A machine answers smoothly and wrongly | Shift debrief |
| "I can always tell. Or a detector can." | Sure-and-wrong count, bias debrief | Debrief |
| "AI is one single thing." | Switchboard against language models | Shift 2 debrief |
| "This proved something about intelligence." | Teacher notes: inspired by the Turing Test, not a scientific test | Teacher notes |

**Checkpoints never block progress.** A wrong card gets a short explanation and a retry.

**Teacher discussion guide** is a Phase 4 task (T4.4). It adapts the four questions in the v3 brief.

## 10. What needs an LLM

| Part | LLM? | Decision |
|---|---|---|
| Warden and the Watch | No | Local engine, the same every time, under 3 ms (measured worst of 50 researcher questions on level 15) |
| Showing prompt injection | No | A rule simulation shows the structure better. A real model would be unpredictable and unsafe to open to pupils |
| Machine operators | Yes, at build time | Honesty needs real outputs. Generate once, review, ship as data. Under $1 per full generation |
| Switchboard | No | Small local engine, snapshotted the same way |
| Marking reasons | No | Clue cards are marked locally |
| Dialogue, hints, personality flavour | No | Authored, so reading level and safety can be checked |
| Content review | Optional, developer only | A person still approves every reply |
| Free-typed questions to operators | Not in this release | Needs a server, key, moderation and safeguarding review. Costed in ARCHITECTURE.md. `plan.md`'s optional live round would be Phase 5 |
| Pupils matched with each other | No LLM, but a later feature | Phase 5. See IMPLEMENTATION_PLAN section 6 |

**`plan.md` says to retain Trickbot's existing LLM integration and backend. Neither exists.** Trickbot is one offline file of rules, so that advice doesn't apply.

## 11. Safeguarding and ethics

- Mission 01 free text stays on the device and in memory only.
- Warden's support reply must fire on every gate for upset messages, with no guard voice or flavour line. It includes the Childline line, with no link. Trickbot's fix catches all 15 test wordings (measured), and the game must sync from a commit that has it (B1).
- Mission 02 has no free text, so no new safeguarding surface.
- All model replies are reviewed by a person. School-friendly topics only: no romance, violence, politics, religion or health advice.
- No accounts, names, analytics or network calls.
- `plan.md`'s question categories must never ask the player for personal experiences.

## 12. Research notes

| Finding | Source | Effect on the design |
|---|---|---|
| Turing asked for typed answers and named a teleprinter as the ideal link | [Turing 1950](https://www.cs.virginia.edu/evans/greatworks/turingtest.pdf) | Tape is historically true |
| GPT-4.5 with a persona was judged human 73% of the time, 36% without one; ELIZA 23% | [Jones and Bergen 2025](https://arxiv.org/abs/2503.23674v1) (preprint) | Persona is a game variable. A rules bot suits shift 1 |
| Players leaned on typos, slang and politeness. Some humans imitated bots | [AI21 Human or Not](https://www.ai21.com/blog/human-or-not-results) (company report on a viral game, not peer reviewed) | Source of the clue cards and shift 4 |
| GPT detectors flagged non-native English writing at high rates | [Liang et al. 2023](https://doi.org/10.1016/j.patter.2023.100779) | Bias debrief. Check exact figures in the paper before quoting |
| Children aged 6–12 tend to treat AI as humanlike and trust it too readily | [Review, 2025](https://arxiv.org/pdf/2502.11242) | Personality files. Debrief on confidence |
| Interland's public evidence is mostly reach and alignment. I found no independent learning-outcome result | [Search summary: ISTE alignment and usage figures](https://thejournal.com/Articles/2017/06/06/Googles-New-Curriculum-and-Game-Teach-Kids-to-Be-Internet-Awesome.aspx) | Do not claim learning gains without a playtest |
| ICO is turning its Children's Code work to mobile games | [Summary of the ICO's December 2025 update](https://chambers.com/articles/children-s-privacy-enforcement-intensifies-lessons-from-ico-s-reddit-and-imgur-decisions) (secondary) | Keep data collection at nil. Check the ICO's own text before release |

**Gaps in the evidence.** I found no study of 9–14 year olds detecting AI text, and no sourced reading-level thresholds for interface text. Limits such as "18 words per line" are project rules, not research results. Nothing shows yet whether a personality file offsets the extra trust that expressive bots may create, so the playtest must check it (AT-73).

## 13. Open items

| Item | Owner | Blocks |
|---|---|---|
| Approve the name, or pick another. Run a trademark check before public release | Pooja | Public release. The `ghost-protocol` folder keeps its name until then |
| Write 48 human replies | Pooja | Mission 02 content, not the slice |
| Teacher-note wording on Turing's prosecution and death (WORLD_BIBLE section 12) | Pooja | Phase 4 |
| Confirm Gemini's terms cover shipping generated art in a children's game (ASSET_MANIFEST) | Pooja | Using Gemini art in the game |
