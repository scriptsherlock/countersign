# Countersign

**[Play in your browser](https://scriptsherlock.github.io/countersign/)**

A narrative game about prompt injection, for school pupils. You join the Bureau in the neon city of New Avalon and test Warden and its guard bots under a warrant, using nothing but words.

It's one offline HTML file, with no accounts, tracking or network calls. Nothing you type leaves your device. Warden is a simulation made of rules, built on [Trick the Bot](https://github.com/scriptsherlock/trickbot), and not a real AI model. Only try these tricks on practice bots.

Mission 02 is a separate game: [The Line](https://github.com/scriptsherlock/countersign-the-line).

## Develop

Node 22 or later.

```sh
npm ci
npm run dev
npm run build      # one file in dist/
npm run check      # needs a local Trickbot checkout, for the engine tests
npm run test:e2e
```

Design notes are in [docs/](docs/). Character and scene art was generated with Codex for this project: see `src/assets/licences.json`.
