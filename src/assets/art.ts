// Finished art goes in src/assets/art as .webp. Anything found there is embedded and replaces its SVG stand-in.
const files = import.meta.glob('./art/*.webp', { eager: true, query: '?inline', import: 'default' }) as Record<string, string>;

export const artFor = (name: string): string | undefined => files[`./art/${name}.webp`];
