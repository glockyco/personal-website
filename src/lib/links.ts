export interface TextPart {
  text: string;
  href?: string;
}

const URL = /https?:\/\/[^\s<>"]+/g;
/** Punctuation that ends a sentence after a URL rather than belonging to it. */
const TRAILING = /[.,;:!?)\]]+$/;

/** Splits text into plain parts and URL parts, so a template can link the URLs. */
export function linkParts(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;
  for (const match of text.matchAll(URL)) {
    const url = match[0].replace(TRAILING, '');
    const start = match.index;
    if (start > last) parts.push({ text: text.slice(last, start) });
    parts.push({ text: url, href: url });
    last = start + url.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
