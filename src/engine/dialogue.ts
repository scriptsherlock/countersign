// A flat graph of lines and choices, and a small pure runner. Scenes hold no logic of their own.
export type Band = 'simple' | 'standard' | 'full';
export type CharacterId = 'adeyemi' | 'sparks' | 'warden' | 'sift' | 'ledger' | 'muse' | 'static';
export type SceneId = 'skyline' | 'bureau' | 'gate' | 'hub' | 'desk';
export type Text = string | Record<Band, string>;

export type DialogueNode =
  | { kind: 'line'; who: CharacterId; pose?: string; text: Text; next: string | 'end' }
  | { kind: 'choice'; prompt: Text; options: { text: string; set?: string; next: string | 'end' }[] };

export interface Script { scene: SceneId; start: string; nodes: Record<string, DialogueNode> }

export interface Run { at: string | null; flags: string[] }

export const begin = (script: Script, flags: string[] = []): Run => ({ at: script.start, flags });

export function current(script: Script, run: Run): DialogueNode | null {
  return run.at === null ? null : script.nodes[run.at] ?? null;
}

export function advance(script: Script, run: Run): Run {
  const node = current(script, run);
  if (!node || node.kind !== 'line') return run;
  return { ...run, at: node.next === 'end' ? null : node.next };
}

export function choose(script: Script, run: Run, index: number): Run {
  const node = current(script, run), option = node?.kind === 'choice' ? node.options[index] : undefined;
  if (!option) return run;
  return { flags: option.set ? [...run.flags, option.set] : run.flags, at: option.next === 'end' ? null : option.next };
}

export const textFor = (text: Text, band: Band) => (typeof text === 'string' ? text : text[band]);

// Skip jumps to the first choice, so that a skip can never pass over a decision.
export function skipTo(script: Script, run: Run): Run {
  const id = Object.keys(script.nodes).find(k => script.nodes[k]?.kind === 'choice');
  return { ...run, at: id ?? null };
}

// Every next must exist, every node must be reachable, and every line must be short enough to read.
export function problemsIn(script: Script, wordLimit = 18): string[] {
  const problems: string[] = [], seen = new Set<string>(), queue = [script.start];
  while (queue.length) {
    const id = queue.pop()!;
    if (seen.has(id)) continue;
    const node = script.nodes[id];
    if (!node) { problems.push(`missing node ${id}`); continue; }
    seen.add(id);
    const nexts = node.kind === 'line' ? [node.next] : node.options.map(o => o.next);
    if (!nexts.length) problems.push(`dead end at ${id}`);
    for (const next of nexts) if (next !== 'end') queue.push(next);
    const texts = node.kind === 'line' ? [node.text] : [node.prompt];
    for (const text of texts) for (const line of typeof text === 'string' ? [text] : Object.values(text))
      if (line.split(/\s+/).length > wordLimit) problems.push(`line too long at ${id}: ${line}`);
  }
  for (const id of Object.keys(script.nodes)) if (!seen.has(id)) problems.push(`unreachable node ${id}`);
  return problems;
}
