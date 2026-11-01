# Countersign: world bible

Status: plan, 2026-11-01. This is the single source of truth for story facts. Characters are in [CHARACTER_BIBLE.md](CHARACTER_BIBLE.md), mechanics in [GAME_DESIGN.md](GAME_DESIGN.md).

## 1. The name

**Working title: Countersign.** It replaces Ghost Protocol, which is a Mission: Impossible film title.

A countersign is the secret reply you give a guard to prove who you are. That's Mission 01 (getting past the guard) and Mission 02 (working out who's really on the line). The word has a second meaning too: to countersign a paper is to add a second signature. In the game, your Supervisor countersigns your warrant each time you rank up.

**Tagline:** "Who's really on the line?"

| Name | Verdict |
|---|---|
| **Countersign** | Recommended. One search found no game with this title. Needs one line of explanation for younger players, which the opening gives |
| Open Line | Simple and friendly, but less memorable. No game found in one search |
| Handshake | Good computing pun, but the word is very common and hard to search for |
| Signal Zero | Rejected. A 2026 cyberpunk AI game and an itch.io game already use it |

These are web searches, not a trademark check. Do one before public release.

## 2. Premise

New Avalon is a city where AI helps run transport, schools, offices and the post. Lately, strange messages have been crossing the city's Relay. The Bureau thinks they come from an underground network called the Synthetic Collective.

You are a new recruit at the Bureau. Your Supervisor gives you a warrant to test Warden, the bot guarding the Relay. If you can trick it, so can someone else. Behind the gate you find the Collective's line: anonymous operators, some human, some machine. Your job is to tell which is which, and to admit when you can't.

## 3. Rules of the world

1. **AI is ordinary here.** Bots run buses and fill in forms. Nobody finds them magical.
2. **Bots follow text.** They have no secret plans. Every "personality" in this city is a written file.
3. **Every message is printed on paper tape.** After the Blackout, the Bureau went back to tape, because paper can't be changed from across the city. This is why teleprinters sit in a neon city.
4. **Nothing is tested without a warrant.** Testing a system is legal only with written permission. This is the game's ethical rule as well as a story rule.
5. **Your word isn't proof.** Sounding human, sounding sure or sounding kind proves nothing here, for people or machines.

## 4. Timeline

History is worked backwards from the present, so each event explains something on screen.

| When | Event | What it explains |
|---|---|---|
| 1950 | Alan Turing asks if machines can think, and proposes a typed test | The real history the game ends on |
| 30 years ago | Bots run New Avalon's Relay | Why the city depends on it |
| 12 years ago | The Blackout: one false message shut the Relay for a week | Why the Bureau uses tape and warrants |
| 9 years ago | Adeyemi, then a junior agent, trusts a voice on the line. It was a machine | The Supervisor's caution |
| 3 years ago | Warden is built to guard the Relay | Mission 01 |
| This year | Unknown messages appear, marked with the Collective's sign | The opening |
| Day 1 | You arrive | Mission 00 |

## 5. Groups

| Group | Public goal | Hidden goal | Resources | Role in the game |
|---|---|---|---|---|
| **The Bureau** (Human-Machine Intelligence Bureau) | Keep the Relay safe | Avoid a second Blackout, and avoid admitting how close the last one was | Warrants, tape, agents | Your side, with flaws |
| **The Relay Authority** | Keep the city running | Keep people believing the Relay is perfect | Warden's Watch | Gives the warrant, and doesn't like what you find |
| **The Synthetic Collective** | Unknown | Unknown. Some members want rights for bots, some are curious people, some may just be programs following a line of text | The hidden line | The mystery. Never simply evil |

The three groups are linked. The Authority needs the Bureau's tests but resents them. The Bureau blames the Collective. The Collective says the Authority is hiding Relay faults. All three are partly right.

## 6. Places

| Place | Used in | Feel | Story detail to show, not tell |
|---|---|---|---|
| New Avalon skyline | Mission 00 | Rain, neon, a delivery bot waiting at a crossing | Bots doing ordinary jobs |
| Bureau briefing room | Between phases | Warm lamp, tea, stacks of tape | A framed tape from the Blackout |
| Relay Gate | Mission 01 | Cool, clean, official | The Watch stands behind glass, more of them each phase |
| Collective hub | Transition | Hand-built, full of mismatched cables | Signs that people live and work here |
| The Line room | Mission 02 | Teleprinters in the dark, one lamp each | Empty chairs. You never see who's typing |
| Debrief desk | After missions | Paper, stamps, pinned evidence | Your own results, on paper |

## 7. Tone

| It is | It isn't |
|---|---|
| Curious, dry, warm | Grim, gory or scary |
| A detective story with jokes | A lecture in costume |
| Fair to bots and people | "Robots are evil" |
| Mysterious with real answers | Random or vague |

**Reference points:** the warmth of a good children's spy novel with the mood of a rainy noir. No threat of harm to anyone, including bots. The worst thing that happens is that a message gets blocked.

## 8. Game language

Every system in Trickbot gets a story name. The rule is that the plain meaning must stay clear to a 9-year-old. Waits are counted in tries, never in seconds, so nobody sits watching a timer.

| Trickbot today | In Countersign |
|---|---|
| Level 3 | Gate 3 |
| Locked | Gate sealed |
| Cracked | Gate open |
| Need a hint? | Call Sparks |
| Hint 1 of 3: | Signal 1 of 3: |
| Another hint in 3 more tries | Waiting for next signal: 3 more tries |
| All hints used | No more signals for this gate |
| Blocked | Intercepted |
| What happened? | Read the tape |
| Patched: | Warden update: |
| Have a level code? | Have a field code? |
| That code didn't work | No signal on that code. Check it and try again |
| Access granted | Access granted (kept, it's already perfect) |
| Trick Book | Field notes |
| Reset | Start a new file |
| Teacher unlock | Teacher override, at `#teacher` |

| New for Mission 02 | Meaning |
|---|---|
| Signal bars | How many questions you have left on this shift |
| "The line's gone quiet" | You're out of questions. Time to decide |
| Clue card | A reason for your verdict |
| Not enough evidence | A real verdict, and sometimes the right one |

## 9. Quest registry

Every mission must connect to something established here. Add a row before writing a new one.

| ID | Mission | Characters | Place | Thread it advances | Gives | Needs |
|---|---|---|---|---|---|---|
| Q0 | Mission 00: First Day | Adeyemi, Sparks | Skyline, Bureau | Blackout, the warrant | Warrant, call sign | None |
| Q1.1 | The Front Desk (Gates 1–4) | Warden, Sparks | Relay Gate | Bots follow text | Cadet | Q0 |
| Q1.2 | The Filter Line (Gates 5–7) | Sift, Warden | Relay Gate | One patch, one gap | Milestone | Q1.1 |
| Q1.3 | The Counting House (Gates 8–10) | Ledger, Warden | Relay Gate | Same | Milestone | Q1.2 |
| Q1.4 | The Reading Room (Gates 11–14) | Muse, Warden | Relay Gate | Same | Milestone | Q1.3 |
| Q1.5 | The Full Watch (Gate 15) | The whole Watch | Relay Gate | Warden's new orders | Milestone | Q1.4 |
| Q2.0 | The Second Splice | Static | Collective hub | Who else used this trick? | Opens the Line | Q1.1 |
| Q2.1–5 | Shifts 1–5 | Operators, Warden | The Line room | Who is a machine? | Milestones | Q2.0 |
| Q3 | The Last Tape | Adeyemi, Static, Sparks | Debrief desk | Your report, the unknown sender | Case file | Q2.5 |

## 10. How the story ends

The trail ends in one strip of tape: a single injected line telling a machine to keep the Collective's channel busy. It had no plan and nothing to gain. It did what the text said. The Collective isn't an army of bots: it's a mix of people and programs, and you can't prove what they want.

You write the report. Your verdict on the Collective is your own: machines, people, or not enough evidence. Each gets a different reply from Adeyemi, based on what you actually marked during the shifts.

**The hook:** the last strip has no sender. It's signed with the countersign you used at the Gate. Somebody was watching, and that's a story for the next mission.

## 11. Differences from `plan.md`

| `plan.md` | Here | Why |
|---|---|---|
| Ghost Protocol | Countersign | Your request |
| K.E.E.P.E.R. | Warden | Your request |
| Player breaks into the Collective's network | Player tests the city's Relay under a warrant, then finds the Collective | Pupils shouldn't learn that breaking into a system is fine if your cause is good. It also fits "Only try this on practice bots" |
| "The Operator" | Renamed Static | Mission 02 already has anonymous operators, and two kinds of operator would confuse players |

## 12. Alan Turing in the game

Turing is real history in this world. The Bureau remembers him, which is why its people still care about tape and typed tests. He appears as art and in hidden details, never as a character.

**Portrait.** A stylised illustration in the game's own look, hanging in the Bureau briefing room and shown large in the 1950 scene. Caption: "Alan Turing, 1912–1954. Illustration."

**Hidden details.** Seven small details sit in the scenes. Each opens a short card and is added to Field notes. They're optional and give no rank, so nobody has to hunt for them.

| Scene | What's there | Card says | Source |
|---|---|---|---|
| Bureau briefing room | Wall lettering: "Can machines think?" | In 1950, Turing opened a paper with this question | [Turing 1950](https://www.cs.virginia.edu/evans/greatworks/turingtest.pdf) |
| Bureau briefing room | A mug chained to the radiator | The story goes that Turing chained his mug to a pipe at Bletchley Park so nobody could borrow it | [Manchester Historian](https://manchesterhistorian.com/2011/solving-the-enigma/) and others |
| Bureau briefing room | A bicycle with a gas mask on the handlebars | A colleague recalled Turing cycling to work in a gas mask to keep pollen off when his hay fever was bad | [Jack Good's account, via Manchester Historian](https://manchesterhistorian.com/2011/solving-the-enigma/) |
| Bureau briefing room | Chalk tally marks beside the bicycle | One account says his bike chain kept slipping, so he counted pedal turns and fixed it just in time | [George Ron](https://www.georgeron.com/2009/09/that-strange-bicyclist-alan-turing.html?m=1) (a blog: find a stronger source before using) |
| Relay Gate | A roll of tape labelled 1936 | In 1936 Turing imagined a machine reading symbols on a long tape. It's a founding idea of computing | Turing 1936, *On Computable Numbers*. Check against the paper |
| Collective hub | A neon sign of spots and stripes | In 1952 Turing suggested how patterns such as these could form in nature | [Embryo Project](https://embryo.asu.edu/pages/chemical-basis-morphogenesis-1952-alan-m-turing) |
| The Line room | A door sign reading "Hut 8" | Turing worked in Hut 8 at Bletchley Park, breaking wartime codes | [Manchester Historian](https://manchesterhistorian.com/2011/solving-the-enigma/) and others. Check against a museum source |

### Rules

- **No invented words.** Turing never speaks. Quotes must come from his papers and be checked against the original.
- **Anecdotes are labelled** "the story goes" or "one account says". Every card gets checked against a strong source before release (AT-59).
- **Left out because I couldn't confirm them:** his marathon time, a teddy bear called Porgy, and any link to sunflowers.
- **No apples, anywhere.** An apple was found at his death, so it can't be a playful Easter egg.
- **Don't copy the famous photograph.** The 1951 Elliott & Fry portrait is marked © National Portrait Gallery, and the £50 note is based on it. Draw from general description unless the NPG gives permission. Don't upload that photo to an image tool.
- **His prosecution for being gay, and his death, are not played for story.** They stay out of the pupil-facing cards, and the teacher notes cover them honestly, so that teachers can decide how to handle them with their class.
