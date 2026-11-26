// Home page figure: a graphics card standing on edge, pulled apart along its thickness.
// Writes src/assets/gpu.svg. Needs the anatomy kit:
//   node figures/gpu.mjs [path to anatomy kit, default ~/.claude/skills/anatomy/kit]
import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const kitDir = process.argv[2] ?? join(homedir(), ".claude/skills/anatomy/kit");
const k = await import(join(kitDir, "iso-kit.mjs"));
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/gpu.svg");

// World: x = card thickness (the axis it comes apart on), y = card length, z = card height.
const LEN = 240, TALL = 104, GAP = 84, W = 1120, H = 400;
// Layers, back to front. `at` is the assembled x of each layer's back face.
const AT = { back: 0, board: 4, plate: 11, pipes: 16, fins: 22, shroud: 49, fans: 60 };
const ORDER = ["back", "board", "plate", "pipes", "fins", "shroud", "fans"];
// layers spread both ways from the middle one, so the closed card sits at the centre of the figure
const apart = (name) => (ORDER.indexOf(name) - 3) * GAP;

const ends = [apart("back"), AT.fans + 6 + apart("fans")];
const P = k.fitProjection(
  ends.flatMap((x) => [[x, 0, -14], [x, LEN + 4, -14], [x, 0, TALL + 12], [x, LEN + 4, TALL + 12]]),
  W, H, { pad: 10, azimuth: 61, elevation: 20 });

const at = (p) => k.iso(p, P);
const near = (a, b) => k.depthOf(a, P) - k.depthOf(b, P);
let solids = 0;
const S = (plan, z, h, o = {}) => { solids++; return k.solidSvg(k.slabOf(plan, z, h, P, o.steps ?? 3, o.bevel ?? 0), { tone: o.tone ?? "hi", crease: o.crease ?? "faint", inner: o.inner ?? "" }); };
const L = (d, tone = "lo") => k.lineSvg(d, { tone });
const D = (pts, size = 0.5) => k.dotsSvg(pts, { size });
const mat = (name, body) => `<g class="m-${name}">${body}</g>`;
// drawing on a face that looks along +x: points are [y, z]
const face = (x, pts, closed = false) => k.pathOf(pts.map(([y, z]) => at([x, y, z])), closed);
const rect = (x, y, z, w, h) => face(x, [[y, z], [y + w, z], [y + w, z + h], [y, z + h]], true);
const circle = (x, y, z, r, n = 40) => k.sideRing([x, y, z], r, "x", P, n);
const fill = (d, cls) => `<path class="${cls}" d="${d}"/>`;
// a block standing proud of an x-face: [y, z, w, h], depth along x
const block = (x, depth, [y, z, w, h], o) => S({ x, y, w: depth, d: w, r: o?.r ?? 0.4 }, z, h, o);

// ── backplate ────────────────────────────────────────────────
function back() {
  const x = AT.back, f = x + 3, out = [];
  out.push(S({ x, y: 0, w: 3, d: LEN, r: 1 }, 0, TALL, { bevel: 0.6 }));
  out.push(L(rect(f, 5, 5, LEN - 10, TALL - 10), "faint"));
  // closed vent slots in two fields
  const slots = [];
  for (let i = 0; i < 9; i++) for (const z of [16, 58]) slots.push(rect(f, 134 + i * 10, z, 4, 30));
  out.push(L(slots.join(""), "lo"));
  // window over the back of the processor, with its four spring screws
  out.push(L(rect(f, 62, 34, 40, 40), "mid"), L(rect(f, 66, 38, 32, 32), "faint"));
  const screws = [[58, 30], [106, 30], [58, 78], [106, 78], [12, 12], [228, 12], [12, 92], [228, 92], [124, 52]];
  out.push(L(screws.map(([y, z]) => circle(f, y, z, 2.2, 14)).join(""), "lo"), D(screws.map(([y, z]) => at([f, y, z]))));
  // label plate: three rules standing for printed text
  out.push(L(rect(f, 16, 40, 30, 22), "lo"));
  out.push(k.lineSvg([46, 51, 56].map((z) => face(f, [[20, z], [z === 56 ? 34 : 42, z]])).join(""), { tone: "faint", free: true }));
  return mat("alu", out.join(""));
}

// ── circuit board ────────────────────────────────────────────
function board() {
  const x = AT.board, f = x + 2, out = [], gold = [], ink = [];
  // edge connector tab hangs below the board, gold fingers on it
  out.push(mat("pcb", S({ x, y: 96, w: 2, d: 86, r: 0.5 }, -12, 12) + S({ x, y: 78, w: 2, d: 12, r: 0.5 }, -12, 12)));
  const fingers = [];
  for (let y = 98; y < 180; y += 3) fingers.push(rect(f, y, -11, 1.6, 9));
  for (let y = 79.5; y < 89; y += 3) fingers.push(rect(f, y, -11, 1.6, 9));
  out.push(fill(fingers.join(""), "f-gold"));
  out.push(mat("pcb", S({ x, y: 0, w: 2, d: LEN, r: 0.6 }, 0, TALL)));
  // traces fanning from the processor to the edge connector and memory
  const traces = [];
  for (let i = 0; i < 9; i++) traces.push(face(f, [[70 + i * 3, 36], [70 + i * 3, 22 - i], [104 + i * 7, 8], [104 + i * 7, 3]]));
  for (let i = 0; i < 6; i++) traces.push(face(f, [[100, 44 + i * 4], [112, 44 + i * 4], [118, 38 + i * 6], [130, 38 + i * 6]]));
  out.push(`<g class="trace">${L(traces.join(""), "mid")}</g>`);
  // each trace drops through a via above the edge connector
  out.push(D(Array.from({ length: 9 }, (_, i) => at([f, 104 + i * 7, 3])), 0.55));
  out.push(D(Array.from({ length: 6 }, (_, i) => at([f, 130, 38 + i * 6])), 0.55));
  const parts = [];
  const add = (group, depth, r, o) => parts.push({ group, r, depth, o });
  // processor: substrate, then the die
  add("pcbdark", 1.2, [60, 32, 44, 44]);
  add("ink", 2.6, [70, 42, 24, 24], { die: true });
  // memory, in an L around the processor
  for (const [y, z] of [[36, 34], [36, 56], [108, 34], [108, 56], [62, 80], [84, 80], [62, 14], [84, 14]]) add("ink", 2, y < 50 || y > 100 ? [y, z, 12, 16] : [y, z, 16, 12]);
  // power stages: chokes, drivers, capacitors
  for (let i = 0; i < 8; i++) add("gold", 5, [134 + i * 11, 62, 8, 9], { choke: true });
  for (let i = 0; i < 8; i++) add("ink", 1.4, [135 + i * 11, 50, 6, 7]);
  for (let i = 0; i < 6; i++) add("alu", 6, [136 + i * 11, 78, 6, 6], { cap: true });
  for (let i = 0; i < 4; i++) add("gold", 5, [12 + i * 0, 12 + i * 20, 9, 8], { choke: true });
  for (let i = 0; i < 4; i++) add("ink", 1.4, [24, 13 + i * 20, 6, 6]);
  // power sockets on the top edge, fan header, controller
  add("ink", 10, [150, TALL - 4, 30, 12], { socket: true });
  add("ink", 10, [184, TALL - 4, 30, 12], { socket: true });
  add("ink", 1.6, [196, 20, 14, 14]);
  add("alu", 3, [222, 44, 6, 12]);
  parts.sort((a, b) => near([f, a.r[0], a.r[1]], [f, b.r[0], b.r[1]]));
  for (const { group, r, depth, o } of parts) {
    let extra = "";
    const [y, z, w, h] = r, top = f + depth;
    if (o?.die) extra = L(rect(top, y + 2, z + 2, w - 4, h - 4), "mid") + D([at([top, y + 3.5, z + h - 3.5])], 0.45);
    if (o?.choke) extra = L(rect(top, y + 1.4, z + 1.6, w - 2.8, h - 3.2), "lo");
    if (o?.cap) extra = L(circle(top, y + w / 2, z + h / 2, 2.2, 14) + face(top, [[y + 1.2, z + h / 2], [y + w - 1.2, z + h / 2]]), "lo");
    if (o?.socket) { const pins = []; for (let i = 0; i < 4; i++) for (const dz of [3, 8]) pins.push(rect(top, y + 3 + i * 6.4, z + dz - 1.5, 4, 3)); extra = L(pins.join(""), "mid"); }
    out.push(mat(group, block(f, depth, r, o?.die ? { tone: "hi", bevel: 0.4 } : {}) + extra));
  }
  // mounting holes round the processor and board corners
  const holes = [[54, 26], [110, 26], [54, 82], [110, 82], [6, 6], [232, 6], [6, 98], [232, 98]];
  out.push(L(holes.map(([y, z]) => circle(f, y, z, 1.8, 12)).join(""), "mid"));
  return out.join("");
}

// the slot bracket at the near end of the board, drawn after everything else
function bracket() {
  const x = AT.board - 3, y = LEN + 1, out = [];
  out.push(S({ x, y, w: 28, d: 1.6, r: 0.5 }, -14, TALL + 22, { bevel: 0.4 }));
  const yf = y + 1.6, on = (pts, closed) => k.pathOf(pts.map(([px, pz]) => at([px, yf, pz])), closed);
  const box = (px, pz, w, h) => on([[px, pz], [px + w, pz], [px + w, pz + h], [px, pz + h]], true);
  // three display sockets, one wider video socket, a grille of closed slots
  out.push(L([10, 28, 46].map((z) => box(x + 6, z, 5, 13)).join("") + box(x + 6, 66, 6, 16), "mid"));
  const grille = [];
  for (let i = 0; i < 6; i++) grille.push(box(x + 15, 10 + i * 13, 9, 7));
  out.push(L(grille.join(""), "lo"));
  out.push(L(k.sideRing([x + 8, yf, TALL + 3], 2, "y", P, 14), "lo"), D([at([x + 8, yf, TALL + 3])]));
  return mat("alu", out.join(""));
}

// ── cold plate ───────────────────────────────────────────────
function plate() {
  const x = AT.plate, out = [];
  out.push(S({ x, y: 26, w: 3, d: 112, r: 0.8 }, 6, 92, { bevel: 0.5 }));
  const f = x + 3;
  out.push(L(rect(f, 30, 10, 104, 84), "faint"));
  // vapor chamber pedestal over the processor, and its fill port
  out.push(block(f, 1.6, [62, 34, 40, 40], { bevel: 0.4 }));
  out.push(L(rect(f + 1.6, 66, 38, 32, 32), "lo"));
  out.push(block(f, 2.4, [122, 82, 8, 5]));
  const posts = [[54, 26], [110, 26], [54, 82], [110, 82]];
  out.push(L(posts.map(([y, z]) => circle(f, y, z, 2.6, 14)).join(""), "mid"), D(posts.map(([y, z]) => at([f, y, z]))));
  // contact arm reaching over the power stages, with its pad lands
  const arm = [S({ x, y: 138, w: 2, d: 86, r: 0.6 }, 48, 40)];
  for (let i = 0; i < 8; i++) arm.push(L(rect(x + 2, 141 + i * 10.4, 60, 7, 12) + rect(x + 2, 141 + i * 10.4, 50, 7, 7), "lo"));
  return mat("copper", out.join("") + arm.join(""));
}

// ── heat pipes ───────────────────────────────────────────────
function pipes() {
  const x = AT.pipes, out = [];
  [18, 34, 50, 66, 82].forEach((z, i) => {
    const from = 8 + (i % 2) * 6, to = LEN - 8 - ((i + 1) % 2) * 6;
    out.push(S({ x, y: from, w: 5, d: to - from, r: 2.4 }, z, 5, { steps: 6 }));
    out.push(L(face(x + 5, [[from + 6, z + 3.6], [to - 6, z + 3.6]]), "faint"));
    // crimped ends
    out.push(L(face(x + 5, [[from + 6, z + 0.6], [from + 6, z + 4.4]]) + face(x + 5, [[to - 6, z + 0.6], [to - 6, z + 4.4]]), "mid"));
  });
  return mat("copper", out.join(""));
}

// ── fin stack ────────────────────────────────────────────────
function fins() {
  const x = AT.fins, out = [];
  // the rails are let into the back of the fins
  out.push(S({ x, y: 2, w: 3, d: LEN - 4, r: 0.6 }, 2, 4) + S({ x, y: 2, w: 3, d: LEN - 4, r: 0.6 }, TALL - 6, 4));
  for (let y = 4; y < LEN - 3; y += 4.6) {
    out.push(S({ x: x + 3, y, w: 22, d: 1, r: 0.2 }, 3, TALL - 6, { steps: 2, crease: "none" }));
  }
  return mat("alu", out.join(""));
}

// ── shroud ───────────────────────────────────────────────────
const FANS = [42, 120, 198], FAN_Z = 52, FAN_R = 34;
function shroud() {
  const x = AT.shroud, f = x + 9, out = [];
  out.push(S({ x, y: 0, w: 9, d: LEN, r: 2 }, 0, TALL, { bevel: 0.8, steps: 6 }));
  out.push(L(rect(f, 4, 4, LEN - 8, TALL - 8), "faint"));
  for (const y of FANS) {
    out.push(fill(circle(f, y, FAN_Z, FAN_R + 2.4, 56), "f-well"), L(circle(f, y, FAN_Z, FAN_R + 2.4, 56), "mid"), L(circle(f, y, FAN_Z, FAN_R + 0.6, 56), "lo"));
    // stator struts and motor seat
    const struts = [0.5, 2.6, 4.7].map((a) => face(f, [[y + Math.cos(a) * 9, FAN_Z + Math.sin(a) * 9], [y + Math.cos(a + 0.5) * (FAN_R + 0.6), FAN_Z + Math.sin(a + 0.5) * (FAN_R + 0.6)]]));
    out.push(L(struts.join(""), "lo"), L(circle(f, y, FAN_Z, 9, 24), "mid"), D([at([f, y, FAN_Z])]));
  }
  // accent bars between the fans, corner screws
  const bars = [81, 159].map((y) => rect(f, y - 2, 12, 4, TALL - 24));
  out.push(fill(bars.join(""), "f-rust"), L(bars.join(""), "mid"));
  const screws = [[6, 6], [234, 6], [6, 98], [234, 98], [81, 6], [159, 6], [81, 98], [159, 98]];
  out.push(L(screws.map(([y, z]) => circle(f, y, z, 1.8, 12)).join(""), "lo"), D(screws.map(([y, z]) => at([f, y, z]))));
  return mat("ink", out.join(""));
}

// ── fan rotors ───────────────────────────────────────────────
function rotor(y) {
  const x = AT.fans, c = [y, FAN_Z], blades = [];
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2, pts = [];
    // a swept blade: leading edge out, tip arc, trailing edge back
    for (let s = 0; s <= 8; s++) { const r = 10 + (FAN_R - 11) * (s / 8), t = a + 0.62 * (s / 8) ** 1.3; pts.push([c[0] + Math.cos(t) * r, c[1] + Math.sin(t) * r]); }
    for (let s = 0; s <= 4; s++) { const t = a + 0.62 + 0.42 * (s / 4); pts.push([c[0] + Math.cos(t) * (FAN_R - 1), c[1] + Math.sin(t) * (FAN_R - 1)]); }
    for (let s = 8; s >= 0; s--) { const r = 10 + (FAN_R - 11) * (s / 8), t = a + 0.5 + 0.54 * (s / 8) ** 1.1; pts.push([c[0] + Math.cos(t) * r, c[1] + Math.sin(t) * r]); }
    blades.push(face(x + 2, pts, true));
  }
  const hub = fill(circle(x + 2, y, FAN_Z, 10.5, 32), "f-ink") + fill(circle(x + 5, y, FAN_Z, 10.5, 32), "f-hub") + L(circle(x + 5, y, FAN_Z, 10.5, 32), "hi") + L(circle(x + 5, y, FAN_Z, 6, 24), "mid") + fill(circle(x + 5, y, FAN_Z, 2.2, 12), "f-rust");
  const o = at([x + 2, y, FAN_Z]), uy = k.axisVector(P, [0, 1, 0]), uz = k.axisVector(P, [0, 0, 1]);
  const spin = `<g data-spin="${[...o, ...uy, ...uz].map((n) => n.toFixed(3)).join(" ")}">${fill(blades.join(""), "f-blade")}</g>`;
  return mat("ink", spin + hub);
}

const groups = ORDER.map((name) => {
  const body = { back, board, plate, pipes, fins, shroud, fans: () => [...FANS].sort((a, b) => a - b).map(rotor).join("") }[name]();
  const [dx, dy] = k.axisVector(P, [apart(name), 0, 0]);
  return `<g data-layer="${name}" data-dx="${dx.toFixed(2)}" data-dy="${dy.toFixed(2)}" transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)})">${body}</g>`;
});
const [bx, by] = k.axisVector(P, [apart("board"), 0, 0]);
groups.push(`<g data-layer="bracket" data-dx="${bx.toFixed(2)}" data-dy="${by.toFixed(2)}" transform="translate(${bx.toFixed(2)} ${by.toFixed(2)})">${bracket()}</g>`);

const svg = k.figureSvg({
  width: W, height: H, standalone: "light", className: "gpu",
  label: "A graphics card standing on edge and pulled apart along its thickness: backplate, circuit board with processor, memory and power stages, copper cold plate, heat pipes, aluminum fin stack, shroud, and three fans",
  body: groups,
});
writeFileSync(OUT, svg);
console.log(`wrote ${OUT}: ${solids} solids, ${(svg.match(/<path/g) ?? []).length} paths, ${svg.length} bytes`);
