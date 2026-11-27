// Turns a paragraph holding only an image into a numbered <figure>, using the
// image's alt text as the caption. SVG diagrams are inlined so their labels use
// the site's fonts.
import { readFileSync } from 'node:fs';
export default function rehypeFigures() {
  return (tree) => {
    let n = 0;
    const walk = (node) => {
      if (!node.children) return;
      node.children.forEach((child, i) => {
        const kids = child.children?.filter((c) => !(c.type === 'text' && !c.value.trim()));
        if (child.tagName === 'p' && kids.length === 1 && kids[0].tagName === 'img') {
          const img = kids[0];
          const caption = img.properties.alt;
          const svg = img.properties.src.endsWith('.svg') && readFileSync(`public${img.properties.src}`, 'utf8');
          const figure = { type: 'element', tagName: 'figure', properties: {}, children: [svg ? { type: 'raw', value: caption ? svg.replace('<svg ', `<svg role="img" aria-label="${caption.replaceAll('"', '&quot;')}" `) : svg } : img] };
          if (caption) {
            n += 1;
            figure.children.push({
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [
                { type: 'element', tagName: 'span', properties: { className: ['label'] }, children: [{ type: 'text', value: `Fig. ${n}` }] },
                { type: 'text', value: ` ${caption}` },
              ],
            });
          }
          node.children[i] = figure;
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}
