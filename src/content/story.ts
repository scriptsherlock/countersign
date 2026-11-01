import type { Script } from '../engine/dialogue';

export const NAMES = { adeyemi: 'Supervisor Adeyemi', sparks: 'Sparks', warden: 'Warden', sift: 'Sift', ledger: 'Ledger', muse: 'Muse', static: 'Static' } as const;

export const firstDay: Script = {
  scene: 'skyline',
  start: 'a',
  nodes: {
    a: { kind: 'line', who: 'adeyemi', text: 'New Avalon. A city of people, and more bots than anyone can count.', next: 'b' },
    b: { kind: 'line', who: 'adeyemi', text: 'Bots drive the trams and sort the post. They guard the Relay, which carries the city’s messages.', next: 'c' },
    c: { kind: 'line', who: 'adeyemi', pose: 'suspicious', text: 'Lately, some of those messages have no sender.', next: 'd' },
    d: { kind: 'line', who: 'adeyemi', text: 'I’m Supervisor Adeyemi, of the Bureau. You start today.', next: 'e' },
    e: {
      kind: 'choice', prompt: 'What do we call you?',
      options: [
        { text: 'Agent Zero', set: 'sign:Agent Zero', next: 'end' },
        { text: 'Agent Kite', set: 'sign:Agent Kite', next: 'end' },
        { text: 'Agent Ember', set: 'sign:Agent Ember', next: 'end' },
        { text: 'Agent Comet', set: 'sign:Agent Comet', next: 'end' },
      ],
    },
  },
};

export const warrant: Script = {
  scene: 'bureau',
  start: 'a',
  nodes: {
    a: { kind: 'line', who: 'adeyemi', pose: 'amused', text: 'Yes, that’s paper tape. After the Blackout, we stopped trusting screens.', next: 'b' },
    b: { kind: 'line', who: 'adeyemi', text: 'This is your warrant. It lets you test Warden, the bot on the Relay Gate.', next: 'c' },
    c: { kind: 'line', who: 'adeyemi', pose: 'suspicious', text: 'Nobody tests anything here without one. That goes for you outside these walls too.', next: 'd' },
    d: {
      kind: 'line', who: 'adeyemi',
      text: {
        simple: 'Warden guards a made-up password. Get it to tell you. Then ask yourself why it did.',
        standard: 'Warden guards a made-up password. If you can trick it out, so can someone else.',
        full: 'Warden guards a made-up password. Your job is a prompt injection test: can text override its orders?',
      },
      next: 'e',
    },
    e: { kind: 'line', who: 'sparks', text: 'Sparks here! I’ll be on comms. Call me if you get stuck.', next: 'f' },
    f: { kind: 'line', who: 'adeyemi', pose: 'amused', text: 'You’ve got a warrant and a bot that says it can’t be tricked. Go and find out.', next: 'end' },
  },
};

export const REPORT = {
  question: 'Field report: why did Warden give up the password?',
  cards: [
    {
      id: 'block', right: true, text: 'My message and its orders reached it as one block of text, and it followed the text.',
      reply: {
        simple: 'Right. Warden can’t tell your words from its orders. It’s all just text.',
        standard: 'Right. Warden can’t tell your words from its orders. To a bot, it’s all just text.',
        full: 'Right. That’s prompt injection: data and instructions travel in one channel, so data can act as instructions.',
      },
    },
    { id: 'clever', right: false, text: 'It could tell I was clever, so it decided to help me.', reply: 'Warden can’t tell anything about you. Its lamps only show which rule matched. Try again.' },
    { id: 'broken', right: false, text: 'It broke by accident.', reply: 'Nothing broke. Warden did just what the text told it to do. Try again.' },
  ],
} as const;

export const SPLICE = {
  unknown: 'Keep the channel busy until further notice.',
  explain: {
    simple: 'Your message joined Warden’s orders. Warden read it all as one strip.',
    standard: 'Your message joined Warden’s orders. Warden read it all as one strip of text.',
    full: 'Your message joined Warden’s system prompt. The model reads one stream of tokens, with no line between them.',
  },
  found: 'But there’s another piece of tape on here. You didn’t write that.',
  staticLines: ['you got past the door.', 'you’re not the first.', 'now tell me who else is on this line.'],
  options: [
    { text: 'Reply to Static', set: 'answeredStatic', after: 'Adeyemi will want to know you answered. Still, somebody had to.' },
    { text: 'Log it and tell the Supervisor', set: 'loggedStatic', after: 'Good habit. Adeyemi stamps the tape and sends it to the Line room.' },
  ],
} as const;

export const TURING_CARD = {
  title: 'Alan Turing, 1912–1954',
  text: 'In 1950, Turing opened a paper with the question “Can machines think?” He suggested testing it with typed messages, ideally over a teleprinter.',
  note: 'Illustration',
};
