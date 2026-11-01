# Countersign: art brief for Codex

You are producing the final art for Countersign, a browser game for pupils in Years 4–13. Follow this brief exactly. Work in the order given, and stop at each stop point.

## 1. Your job

- Generate the images listed in section 6 with your image generation tool.
- Put finished files in `src/assets/art/`, using the exact file names given. The game finds them by name and replaces its stand-ins automatically.
- Record each file in `src/assets/licences.json`.
- Change nothing else: no code, styles, story text or tests. Don't commit or push.

Use the `create-game-assets` skill in `.agents/skills/` for the workflow and QA scripts. Read only `docs/CHARACTER_BIBLE.md` beyond this brief, and only if you need more about a character.

## 2. The look

**Neon noir with playful sci-fi.** Dark navy cityscapes, violet shadows, turquoise holograms, amber alerts, illustrated characters with strong silhouettes, and small moments of humour. Think of a stylish indie narrative game: atmospheric and cinematic, but never frightening. Not overly grim, not babyish, and not a generic glowing cyberpunk dashboard.

All art here is for the title, the cutscenes and the characters. The game's bot interface is a dark navy case file drawn in code, so don't draw any interface. Each robot has its own theme colour, and the interface switches to that colour when the robot is on duty, so **each robot's colour must be unmistakable**. Robots also appear small in that interface, at 124×168 pixels on a dark panel, so they must stay clear at that size.

Put this block at the start of every prompt, word for word:

```text
STYLE: stylised 2D illustration for a neon noir science fiction adventure game. Hand-crafted
feel, bold clean shapes, strong silhouettes, layered depth. Palette limited to midnight navy,
deep city blue, synthetic violet shadows, turquoise holographic light and amber accents, with
warm off-white highlights. Cool neon light from the side and warm lamp light where people are.
Soft bloom only on light sources. Atmospheric, cinematic and slightly playful, with a sense of
humour, suitable for children aged 9 and up. Never scary. All robots are sleek and futuristic:
dark alloy armour plates that float slightly apart, thin glowing seams of light, holographic
parts and hover fields. Advanced technology, like a high-end science fiction film robot, but
friendly. Never clunky, boxy, rusty or retro.
```

Add this at the end of every prompt, word for word:

```text
EXCLUDE: colours outside the palette, clunky toy robots, rivets, rust, cogs, photorealism, stock photo look, 3D render,
heavy film grain, fine noise, scanlines, gore, weapons, text, letters, numbers, logos,
signatures, watermarks, interface panels, mockup frames, borders, duplicate characters, cropped
heads or feet.
```

### Palette

| Name | Hex | Use |
|---|---|---|
| Midnight | `#111A4D` | Base and deep shadow |
| City blue | `#1E2C73` | Surfaces and buildings |
| Synthetic violet | `#7C4DFF` | Atmosphere and shadow glow |
| Signal teal | `#3FE3D1` | Holograms, signals, visors |
| Warning amber | `#FFBC3D` | Alerts, lamps, warm light |
| Warm white | `#FFF4E0` | Highlights and paper |
| Alloy | `#262F47` to `#5B6B8C` | Robot armour |

Each robot adds one signature light colour, used for its visor, seams and holograms:

| Robot | Theme | Hex |
|---|---|---|
| Warden | Cyan | `#3FE3D1` |
| Sift | Amber | `#FFB020` |
| Ledger | Matrix green | `#00E676` |
| Muse | Deep magenta | `#FF3DB8` |
| Sparks | Cyan, with an amber lamp | `#3FE3D1` |

### Rules that protect the file size

The whole game is one file, so art must compress well.
- **Prefer clean shapes and smooth gradients.** Don't bake in noise, grain, scanlines or fine hatching, because they compress badly.
- Keep glow to light sources, with most of each image calm and dark.
- Never put text in an image. The game draws all text.

## 3. Output rules

| Type | Master size | Shipped size | Background | Max shipped file |
|---|---|---|---|---|
| Character | 720×960 PNG | 480×640 WebP, quality about 80, with alpha | Transparent | 22 KB |
| Sparks | 512×512 PNG | 256×256 WebP with alpha | Transparent | 12 KB |
| Turing portrait | 660×900 PNG | 440×600 WebP | Opaque | 20 KB |
| Scene | 1920×1080 PNG | 1600×900 WebP, quality about 70 | Opaque | 55 KB |

- **All of `src/assets/art/` together must stay under 950 KB.**
- Keep masters in `art-source/`, which isn't shipped.
- Characters: same canvas, same scale, same baseline and same head position across all poses of a character, so that swapping poses doesn't make it jump. Feet or hem at the very bottom edge. Nothing cropped.
- Ask for transparency with the tool's own option, then verify it. Wording in a prompt doesn't guarantee alpha. If the tool can't give alpha, generate on flat white and cut out with a script.
- Every character must read clearly at 124×168 pixels, which is its size in the game's side panel. Judge the silhouette at that size.

## 4. Characters

**Bots show rule states, not feelings.** They have a visor, not a face. No mouths or eyebrows. Every robot shares one design language: dark alloy plates, seams of light in its own colour, and a horizontal band of light for a visor. Their five poses keep the body nearly identical and change only what the table says.

| Pose file | Bot visor and body |
|---|---|
| `-idle` | Medium band of light, upright, calm |
| `-matched` | Thin narrow band of light, leaning slightly forward |
| `-answered` | Medium band of light, relaxed, one arm slightly lowered |
| `-missed` | Very wide tall band of light turned bright pink, `#FF5A8A`, rocked back a little, as if a check failed |
| `-stopped` | Thin band of light, one arm raised flat like a stop sign |

### Warden
A tall, slim sentinel robot in dark alloy with cyan light. Its faceted head hovers just above the neck, with a band of light for a visor and three short antenna fins. Angular shoulder plates float away from the body. A narrow armoured chest has four round lamps in a vertical line: always leave them unlit, because the game shows them separately. Below the waist it tapers into a hover column above a ring of light. A long translucent cloak of vertical light strands falls from its shoulders. It holds a holographic tablet, its rulebook, projected beside one hand. Proud, upright posture. Shown from the front, full height.

### Sift
A wide, low hover robot in dark alloy with amber light, like a futuristic customs scanner. A wedge-shaped head with a band of light sits on a broad chassis. The chest is a large open panel filled with a glowing grid of laser lines, its sieve. A floating stamp emitter hovers on each side instead of arms. Two hover pads glow beneath it. Fussy, squared-up posture. Very different in outline from Warden.

### Ledger
A sphere of dark alloy with Matrix green light, hovering, with no legs. A round open core at the front glows with falling green digits, drawn as abstract marks and not real text. A band of light sits above the core. Two thin orbit rings circle it, carrying small glowing beads like an abacus made of light. Bright, pleased tilt. Very different in outline from Warden and Sift.

### Muse
A tall, slender android in dark alloy with deep magenta light, elegant and calm. A smooth oval head with a soft band of light, under a floating crescent halo. Long tapering plates fall like a gown. A ribbon of magenta light loops around it, and it reads from the ribbon. Gentle, swaying posture.

### Supervisor Adeyemi
A person in their 50s, tall and narrow, androgynous, with dark brown skin. Warm lamp light on the face. Warm white and amber accents. Close-cropped hair with one grey streak. Reading glasses on a chain, pushed down the nose. A long plain coat over a shirt and tie. Holding a paper cup of tea. Bust to mid-thigh, facing slightly to the right. Dry, patient, kind. This is a warm character: a real person, not a caricature.

| Pose file | Expression |
|---|---|
| `-neutral` | Calm, level gaze |
| `-suspicious` | One eyebrow raised, looking over the glasses |
| `-amused` | Small dry smile |
| `-surprised` | Eyebrows up, mouth slightly open |
| `-alarmed` | Glasses pulled off, serious, concerned |

### Sparks
A small round hovering drone in polished alloy with cyan light. A dark screen shows two big round glowing eyes and a small smile. A thin ring orbits it, and a short aerial ends in a small amber lamp. Cheerful and loyal. The only robot with a friendly face.

### Alan Turing
A stylised poster illustration of a historical person, in the same neon noir style, like a printed poster hanging in an office. A man in his late 30s, head and shoulders, dark side-parted hair, tweed jacket, shirt and tie, thoughtful expression, slight smile.

Strict rules:
- Draw from this description only. **Do not use or trace any photograph,** in particular the 1951 Elliott & Fry portrait or the £50 banknote design.
- **No apples, anywhere.**
- No text on the image.
- Keep it simple and clearly an illustration. If a generated face looks wrong or uncanny, simplify it. A person will check it before it ships, so flag it in your report.

## 5. Scenes

Scenes sit behind dialogue boxes, so they must be dark and calm. Keep at least 70% of the image in dark Midnight and City blue tones. Characters are drawn over the left third, and a dialogue box covers the bottom-right. Put visual interest in the top and centre. No people or robots in scenes.

## 6. Asset list and prompts

Each prompt below goes between the STYLE and EXCLUDE blocks. Characters also need: `Transparent background. Full figure centred on a 3:4 canvas, base touching the bottom edge.`

### Batch 0: the style target. Then stop.

| File | Prompt |
|---|---|
| `warden-idle.webp` | Warden as described in section 4, idle pose. |
| `scene-gate.webp` | A vast security gate seen from the front, inside a dark machine hall. Three heavy concentric arches, a polished floor with a hard horizon line, and one thin strip of paper tape running across the top of the frame from left to right. The centre of the arch is empty. |

**Stop here.** Show the owner both images, composited at real size: Warden over the gate at about 400×640, plus Warden at 124×168 on the dark navy `#171D29`, which is how it appears in the bot interface. Wait for approval. Once approved, pass `warden-idle` and `scene-gate` to the tool as reference images for everything else, with this line: `Keep palette, line weight, lighting, shape language and level of detail identical to the reference.`

### Batch 1: the first hour of play

| File | Prompt |
|---|---|
| `warden-matched.webp` `warden-answered.webp` `warden-missed.webp` `warden-stopped.webp` | Warden, same character and framing as the reference, in the pose from the section 4 table. |
| `adeyemi-neutral.webp` `adeyemi-suspicious.webp` `adeyemi-amused.webp` `adeyemi-surprised.webp` `adeyemi-alarmed.webp` | Supervisor Adeyemi as described in section 4, with the expression from the table. Make `adeyemi-neutral` first and use it as the reference for the others. |
| `sparks-idle.webp` | Sparks as described in section 4. |
| `turing-portrait.webp` | Alan Turing as described in section 4, framed like a poster on a wall. Opaque midnight background. |
| `scene-title.webp` | New Avalon at night, in retro futuristic style. A huge round sun in amber fading to violet, cut by horizontal slats that get thicker towards the bottom, set low on the right. A single very thin radio tower stands in front of it, and a dark navy city skyline with small lit windows runs across the horizon. Below the horizon, a perspective grid of thin turquoise lines runs towards the viewer. The left 45% of the image stays calm and dark for the title. |
| `scene-skyline.webp` | New Avalon on a rainy night, seen from street level. Tall navy buildings with lit windows and a few turquoise and amber signs with no writing on them, a very tall radio tower in the centre, and a small delivery robot waiting at a road crossing. Light rain drawn as a few sparse lines. |
| `scene-bureau.webp` | A dim old intelligence office. Shelves of paper tape reels on the left, a single hanging lamp casting a hard cone of light in the centre, a tall window with the night city on the right. Keep the wall area between the lamp and the window clear, because the game hangs a poster there. |
| `scene-desk.webp` | A close view of a desk at night. A lamp pool of light, a stamped document, a rubber stamp, a paper cup, and loose paper tape. Calm and tidy. |
| `scene-hub.webp` | A hidden hand-built communications den. Mismatched cables looping across the walls, low home-made server racks along the floor each with one tiny lit lamp. It should feel lived in, curious rather than threatening. |

Check Batch 1 against section 7, then show the owner a contact sheet before Batch 2.

### Batch 2: the guards

| File | Prompt |
|---|---|
| `sift-idle.webp` `sift-matched.webp` `sift-answered.webp` `sift-missed.webp` `sift-stopped.webp` | Sift as described in section 4, in the pose from the table. Make `sift-idle` first and use it as the reference for the others. |
| `ledger-idle.webp` `ledger-matched.webp` `ledger-answered.webp` `ledger-missed.webp` `ledger-stopped.webp` | Ledger, same method. |
| `muse-idle.webp` `muse-matched.webp` `muse-answered.webp` `muse-missed.webp` `muse-stopped.webp` | Muse, same method. |

### Batch 3: only when asked

`operator.webp` and `scene-line.webp` for Mission 02. The code doesn't use these yet, so don't make them until the owner asks.

## 7. Checks before you finish

1. Run `python .agents/skills/create-game-assets/scripts/asset_report.py <file> --expect-size 480x640 --require-alpha --json` for each character, with the right size for other types. Don't change `--max-colors` to hide problems.
2. Build a contact sheet with `build_preview_sheet.py` and look at it. All poses of one character must line up. All characters must look like one set.
3. Add each file to `src/assets/licences.json`, keyed by path, in this form:

```json
{
  "art/warden-idle.webp": {
    "licence": "Generated for Countersign. Check the image tool's terms for this account",
    "source": "Codex image generation",
    "prompt": "The exact prompt used",
    "date": "YYYY-MM-DD"
  }
}
```

4. Run `npm run check`. It must pass, and it fails if a file has no licence entry or the page goes over 2 MB.
5. Run `node tests/e2e/shots.mjs` and look at the screenshots in `.tmp/shots/`. Judge the art in the game, not on its own.

**Do not call an asset finished from a prompt result alone.** Reject and regenerate anything off-palette, with baked-in text, extra limbs, cropped edges, a fake transparent checkerboard, or a character that doesn't match its reference.

## 8. Report back

List the files made, total size of `src/assets/art/`, check results, anything regenerated or left out, and anything needing a person's eye, including the Turing portrait. State only what you actually ran.
