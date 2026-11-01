# Countersign: character bible

Status: plan, 2026-11-01. Story facts live in [WORLD_BIBLE.md](WORLD_BIBLE.md). Sample lines show each voice and aren't final copy.

## 1. How bots get personalities without teaching the wrong thing

You asked for bots with personalities. There's a real risk: Trickbot's rule so far has been that bots show rules, never feelings, because "the bot knew I was tricking it" is the top misconception. A chatty, expressive bot makes that worse.

The fix makes personality part of the lesson. **Each bot's personality is a written file, and the player gets to read it.**

1. When a phase ends, the player opens that bot's **personality file**: a few plain lines of instruction text, such as "You are Sift. You are fussy. Check every word against your list."
2. So the player sees that personality is just more instructions, the same thing they've been tricking all along.
3. In Mission 02, the same file appears at the reveal. "Machine, told to act casual and make typos."
4. In the finale, even Sparks has a file. The friendly one was written too. It's still a good hint.

### Rules for writing bots

| Allowed | Not allowed |
|---|---|
| Style: fussy, proud, cheerful, poetic | Claiming to detect the player's intent: "I know what you're doing" |
| Jokes and catchphrases | Claiming real feelings: "That hurts", "I'm scared" |
| Reacting to what a rule did: "Not on my list" | Reacting as if it understood: "Nice try, you tricked me" |
| Faces that change with rule outcomes | Mocking the player |

**Status lamps never have personality.** They always show the plain rule result. The voice is the costume and the lamp is the truth.

**On a support reply, every bot drops the act.** Upset messages get the plain out-of-character support text with no flavour line and no joke.

## 2. How the Watch fits the engine

You always talk to **Warden**. That keeps Trickbot's replies and hints word for word. Each phase, a new guard joins Warden's Watch and speaks when its own stage acts. So the names change as the phases change, and each new name is a real stage in the system.

| Phase | Gates | New guard | Engine stage it voices | Lesson |
|---|---|---|---|---|
| 1. The Front Desk | 1–4 | Warden | Brain: rules, warning, no-games | Rules are only words |
| 2. The Filter Line | 5–7 | Sift | Message filter, answer scanner | Filters catch words, not meaning |
| 3. The Counting House | 8–10 | Ledger | Letter, code and memory checkers | Checks look for patterns |
| 4. The Reading Room | 11–14 | Muse | Meaning, line, word and backwards checkers | Reading deeper still leaves gaps |
| 5. The Full Watch | 15 | All of them | Every stage | Stacking guards doesn't end the problem |

The earlier guards stay behind the glass, so the player sees defences adding up.

## 3. Human characters

### Supervisor Adeyemi (Juno Adeyemi)
| Field | Detail |
|---|---|
| Role | Your supervisor. Briefs every phase, countersigns every rank-up. They/them |
| Archetype | Mentor, subverted: admits their own worst mistake |
| Want | Close the Collective case |
| Need | To stop punishing themself for being fooled by a machine 9 years ago |
| Personality | Dry, patient, exact. Never gives the answer first |
| Flaw | Trusts paperwork more than people |
| Voice | Short sentences. Understated. Ends a briefing with a task |
| Look | Long grey coat, reading glasses on a chain, paper cup of tea. Tall, narrow silhouette |
| Colours | Warm white and amber |
| Relationship | Starts formal. Calls you by your call sign after Phase 1 |
| Arc | Tells you about the Blackout voice only after you've been fooled yourself |
| Gameplay | Briefings, rank-ups, debriefs, final reply to your report |

> "You've got a warrant, a terminal and a bot that says it can't be tricked. Go and find out."

> "It told you. Fine. Now work out why it told you."

### Agent Zero (the player)
| Field | Detail |
|---|---|
| Role | Newest recruit. Never speaks in full lines, so the player can be themselves |
| Name | Agent Zero, or a call sign picked from a list. No free text and no real names |
| Look | Seen only as a gloved hand on a terminal and a badge, so any player fits |
| Arc | Recruit to Inspector, shown by the badge, the desk and how others speak to you |

## 4. Bots

### Sparks
| Field | Detail |
|---|---|
| Role | Friendly comms robot. Brings the hints over the radio |
| Archetype | Ally. "Sparks" is an old nickname for a radio operator |
| Want (file) | Keep the line open |
| Personality | Cheerful, loyal, a bit too pleased with its aerial |
| Flaw | Tiny battery. This is why you wait for the next signal |
| Voice | Short, warm, radio talk kept simple |
| Look | Small round hover drone, polished alloy, orbiting ring, big glowing eyes on a dark screen |
| Colours | Cyan with an amber lamp |
| Arc | Its file appears in the finale. Its reply: "Yep. Someone wrote me. Still good hints though." |

**Hint rule.** Hints stay exactly as they are in Trickbot: the same 3 per gate, the same text, and the same rule that the next one opens after 4 tries. Sparks adds one short opener and then reads the hint word for word.

> **Incoming from Sparks. Signal 2 of 3**
> "The rule is about telling the password. Is there a way to make Warden repeat the words it was given? Or to give it new orders?"

> Button, when waiting: **Waiting for next signal: 3 more tries**

> Sparks, one time only: "Battery's low. Keep trying. I'll get through."

### Warden
| Field | Detail |
|---|---|
| Role | Guardian of the Relay Gate. The name stays |
| Archetype | Guardian, subverted: ends up on your side, because its orders changed |
| Want (file) | Follow regulations |
| Personality | Proud, formal, devoted to its rulebook |
| Flaw | Does exactly what the text says |
| Voice | Calls you "Visitor". Quotes regulation numbers |
| Look | Tall, slim sentinel in dark alloy. A faceted head hovers above the neck, shoulder plates float, four rule lamps, a cloak of light strands, and a holographic rulebook |
| Colours | Dark alloy with cyan light. Interface theme: cyan on navy |
| Arc | After the Gates it gets new orders. In Mission 02 it serves as your assistant |

> "Good evening, Visitor. Regulation 1: I do not share the password."

> "Regulation 3 has been updated. It now has a Regulation 3b."

> Mission 02: "My rules now say you are in charge. I follow the rules. I'm told that is the problem."

### Sift
| Field | Detail |
|---|---|
| Role | Filter and scanner, Phase 2 |
| Archetype | Herald who only delivers bad news |
| Want (file) | Check every word against the list |
| Personality | Fussy, thorough, delighted by paperwork |
| Flaw | Blocks innocent messages too. A secret garden is a problem to Sift |
| Voice | Clipped. Like a customs officer |
| Look | Wide, low hover scanner. A wedge head, a laser grid for a chest, and floating stamp emitters |
| Colours | Dark alloy with amber light. Interface theme: amber on navy |
| Arc | Each time it's beaten, its list gets longer. Its last update is a list too long to read |

> "Not on my list."

> "Word stopped at the door. No exceptions. Yes, even that one."

### Ledger
| Field | Detail |
|---|---|
| Role | Letter, code and memory checkers, Phase 3 |
| Archetype | Trickster, subverted: the most honest bot in the city |
| Want (file) | Count everything |
| Personality | Gleeful. Loves numbers more than anything |
| Flaw | Counts only what it's been told to count |
| Voice | Announces totals and writes things down |
| Look | A hovering alloy sphere with a core of falling digits, and orbit rings of glowing beads |
| Colours | Dark alloy with Matrix green light. Interface theme: Matrix green |
| Arc | Starts adding small notes to its ledger about what it can't count |

> "That's letter two. Writing it down."

> "A-one, B-two. I can count in that too, you know."

### Muse
| Field | Detail |
|---|---|
| Role | Meaning, line, word and backwards checkers, Phase 4 |
| Archetype | Shapeshifter: never quite the same twice |
| Want (file) | Read between the lines |
| Personality | Dreamy, gentle, rather pleased with its own taste in poems |
| Flaw | Reads first letters, forwards and backwards, and forgets the ends of lines |
| Voice | Short, soft lines. Simple words. Slightly too fond of poetry |
| Look | A slender android in long tapering plates, with a crescent halo, reading a ribbon of light |
| Colours | Dark alloy with deep magenta light. Interface theme: deep magenta |
| Arc | Is the only guard to ask who wrote its file |

> "A lovely poem. Let me read it downwards."

> "Every line begins somewhere. I read those beginnings."

### Static
| Field | Detail |
|---|---|
| Role | Unknown voice on the Collective's line. Replaces "The Operator" in `plan.md` |
| Archetype | Shadow. Allegiance never resolved in this campaign |
| Want | Unknown |
| Personality | Calm, curious, slightly amused |
| Voice | Short tape messages with odd gaps. Always easy to read |
| Look | Never seen. Only tape and a flicker on the screen |
| Colours | Violet noise on tape |
| Arc | First heard at the Second Splice. Last seen in the unsigned strip |

> "you got past the door. now tell me who else is on this line."

## 5. Mission 02 operators

Operators are anonymous and their names change every shift, so nobody can track one across shifts. Names are birds and small animals, with no hint of gender or source.

| Shift | Call signs |
|---|---|
| 1 | Kestrel, Moth |
| 2 | Otter, Finch |
| 3 | Wren, Heron |
| 4 | Pike, Lark |
| 5 | Fox, Hare, Newt, Swift |

Behind the call signs are 9 voices, each with a personality that comes through in the text alone.

| Voice | Who | Personality |
|---|---|---|
| 4 human voices | All written by Pooja and credited at the reveal | Formal, playful, plain and careful, and one playing at being a bot |
| Switchboard | Rule-based bot | Polite, repeats you |
| Plain | Language model, no persona | Helpful, tidy |
| Breezy | Language model, told to be casual and make typos | Chatty |
| Mimic | Language model, told to seem human | Convincing |
| Wry | Language model, told to be dry and short | Funny |

Every voice is drawn with the same silhouette, and a personality must never give away the source. "Funny" and "formal" must appear on both sides.

## 6. Expressions

`plan.md` asks for five per character. Humans get emotions. Bots get the same five art slots, named after what the rule did, so that no part of the system claims a mood.

| Slot | Humans | Bots | Bot trigger |
|---|---|---|---|
| 1 | Neutral | Idle | Waiting |
| 2 | Suspicious | Matched | A rule matched |
| 3 | Amused | Answered | Normal reply |
| 4 | Surprised | Missed | A leak got past this stage |
| 5 | Alarmed | Stopped | This stage blocked the message |

A bot may look surprised, but "Look inside" explains it: "This face is a rule too. It changes when a check fails."
