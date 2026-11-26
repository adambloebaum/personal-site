"""Schematic diagrams as paper-palette SVG, for the blog posts. Run from repo root."""
from pathlib import Path

root = Path(__file__).parent.parent
INK, TEAL, RUST, OCHRE = "#1F2A30", "#2F6F73", "#A4472B", "#B8862B"
INK3, PLATE = "#55605F", "#F7F2E7"
LAB = "font-family='Barlow Condensed, sans-serif'"
SER = "font-family='Newsreader, Georgia, serif'"

def save(name, w, h, body):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
           f'font-family="Barlow Condensed, sans-serif">{body}</svg>')
    p = root / "public/images" / name
    p.write_text(svg)
    print("wrote", name)

# ---- thinking-alike/1 : neural network ----
inX, hidX, outX = 150, 400, 650
inY = [90, 170, 250, 330]; hidY = [130, 210, 290]; outY = 210
edges = ""
for y0 in inY:
    for y1 in hidY:
        edges += f'<line x1="{inX}" y1="{y0}" x2="{hidX}" y2="{y1}" stroke="{INK}" stroke-opacity="0.35" stroke-width="1"/>'
for y1 in hidY:
    edges += f'<line x1="{hidX}" y1="{y1}" x2="{outX}" y2="{outY}" stroke="{INK}" stroke-opacity="0.35" stroke-width="1"/>'
nodes = ""
for i, y in enumerate(inY):
    nodes += f'<circle cx="{inX}" cy="{y}" r="22" fill="{PLATE}" stroke="{INK}" stroke-width="2"/>'
    nodes += f'<text x="{inX}" y="{y+6}" text-anchor="middle" font-size="19" font-style="italic" {SER} fill="{INK}">x{i+1}</text>'
for y in hidY:
    nodes += f'<circle cx="{hidX}" cy="{y}" r="22" fill="{TEAL}" stroke="{INK}" stroke-width="2"/>'
nodes += f'<circle cx="{outX}" cy="{outY}" r="24" fill="{RUST}" stroke="{INK}" stroke-width="2"/>'
heads = ""
for x, t in [(inX, "INPUTS"), (hidX, "HIDDEN LAYER"), (outX, "OUTPUT")]:
    heads += f'<text x="{x}" y="40" text-anchor="middle" font-size="16" letter-spacing="1.5" fill="{INK3}">{t}</text>'
save("thinking-alike/1.svg", 760, 400, edges + nodes + heads)

# ---- thinking-alike/3 : appropriate fit vs overfit ----
import random
random.seed(11)
def panel(ox, title, overfit):
    pts = ""
    cls = []
    for _ in range(26):
        x = random.uniform(24, 236); y = random.uniform(70, 250)
        # class by rough diagonal with noise
        label = 1 if (x + y) > 300 + random.uniform(-40, 40) else 0
        cls.append((x, y, label))
    for x, y, label in cls:
        if label:
            pts += f'<circle cx="{ox+x:.0f}" cy="{y:.0f}" r="5" fill="none" stroke="{TEAL}" stroke-width="2"/>'
        else:
            s = 4.5
            pts += (f'<path d="M{ox+x-s:.0f} {y-s:.0f} l{2*s:.0f} {2*s:.0f} M{ox+x+s:.0f} {y-s:.0f} l{-2*s:.0f} {2*s:.0f}" '
                    f'stroke="{RUST}" stroke-width="2"/>')
    if overfit:
        bnd = f'<path d="M{ox+20} 250 C{ox+70} 150 {ox+60} 230 {ox+110} 160 S{ox+150} 90 {ox+190} 150 S{ox+210} 240 {ox+244} 150" fill="none" stroke="{INK}" stroke-width="2.5"/>'
    else:
        bnd = f'<path d="M{ox+20} 250 C{ox+90} 200 {ox+170} 130 {ox+244} 95" fill="none" stroke="{INK}" stroke-width="2.5"/>'
    box = f'<rect x="{ox+12}" y="60" width="240" height="210" fill="none" stroke="{INK}" stroke-opacity="0.4"/>'
    lab = f'<text x="{ox+132}" y="40" text-anchor="middle" font-size="17" letter-spacing="1" fill="{INK}">{title}</text>'
    return box + bnd + pts + lab
save("thinking-alike/3.svg", 560, 300, panel(0, "APPROPRIATE FIT", False) + panel(280, "OVERFITTING", True))

# ---- thinking-alike/4 : learning loop ----
import math
cx, cy, R = 300, 200, 120
seg = [("REFLECTION", TEAL), ("LEARNING", OCHRE), ("APPLICATION", RUST), ("FEEDBACK", INK)]
body = ""
for i, (name, col) in enumerate(seg):
    a0 = -90 + i * 90 + 6; a1 = -90 + (i + 1) * 90 - 6
    r0, r1 = math.radians(a0), math.radians(a1)
    x0, y0 = cx + R * math.cos(r0), cy + R * math.sin(r0)
    x1, y1 = cx + R * math.cos(r1), cy + R * math.sin(r1)
    body += f'<path d="M{x0:.1f} {y0:.1f} A{R} {R} 0 0 1 {x1:.1f} {y1:.1f}" fill="none" stroke="{col}" stroke-width="18"/>'
    # arrowhead at end
    ah = math.radians(a1)
    tx, ty = cx + R * math.cos(ah), cy + R * math.sin(ah)
    tang = ah + math.pi / 2
    body += (f'<path d="M{tx+10*math.cos(tang):.1f} {ty+10*math.sin(tang):.1f} '
             f'L{tx+13*math.cos(ah):.1f} {ty+13*math.sin(ah):.1f} '
             f'L{tx-10*math.cos(tang):.1f} {ty-10*math.sin(tang):.1f}" fill="{col}"/>')
    am = math.radians((a0 + a1) / 2); lr = R + 30
    lx, ly = cx + lr * math.cos(am), cy + lr * math.sin(am)
    anchor = "start" if math.cos(am) > 0 else "end"
    body += f'<text x="{lx:.0f}" y="{ly+5:.0f}" text-anchor="{anchor}" font-size="16" letter-spacing="1.2" fill="{INK}">{name}</text>'
save("thinking-alike/4.svg", 600, 400, body)

# ---- qml/2 : three-phase flow ----
blocks = [("EXPLORATION", TEAL), ("CONSOLIDATION", OCHRE), ("AUTOMATICITY", RUST)]
bw, gap, h, y = 230, 70, 90, 40
body = ""
for i, (name, col) in enumerate(blocks):
    x = i * (bw + gap)
    body += f'<rect x="{x}" y="{y}" width="{bw}" height="{h}" fill="{PLATE}" stroke="{INK}" stroke-width="2"/>'
    body += f'<rect x="{x}" y="{y}" width="8" height="{h}" fill="{col}"/>'
    body += f'<text x="{x+bw/2+4}" y="{y+h/2+6}" text-anchor="middle" font-size="22" letter-spacing="1.5" fill="{INK}">{name}</text>'
    if i < 2:
        ax = x + bw + 12
        body += f'<path d="M{ax} {y+h/2} L{ax+gap-24} {y+h/2}" stroke="{INK}" stroke-width="2"/>'
        body += f'<path d="M{ax+gap-24} {y+h/2-7} l10 7 l-10 7 z" fill="{INK}"/>'
save("quantitative-motor-learning/2.svg", 3 * bw + 2 * gap, 170, body)

# ---- qml/4 : Newell's constraints triangle ----
A, B, C = (230, 44), (70, 330), (390, 330)
tri = f'<path d="M{A[0]} {A[1]} L{B[0]} {B[1]} L{C[0]} {C[1]} Z" fill="none" stroke="{INK}" stroke-width="2.5"/>'
mid = (230, 235)
arrow = (f'<line x1="{mid[0]}" y1="{mid[1]-60}" x2="{mid[0]}" y2="{mid[1]+28}" stroke="{RUST}" stroke-width="2.5"/>'
         f'<path d="M{mid[0]-7} {mid[1]+22} l7 12 l7 -12 z" fill="{RUST}"/>')
verts = (f'<circle cx="{A[0]}" cy="{A[1]}" r="6" fill="{TEAL}"/><text x="{A[0]}" y="{A[1]-16}" text-anchor="middle" font-size="18" letter-spacing="1.5" fill="{INK}">ORGANISM</text>'
         f'<circle cx="{B[0]}" cy="{B[1]}" r="6" fill="{OCHRE}"/><text x="{B[0]-4}" y="{B[1]+28}" text-anchor="middle" font-size="18" letter-spacing="1.5" fill="{INK}">ENVIRONMENT</text>'
         f'<circle cx="{C[0]}" cy="{C[1]}" r="6" fill="{RUST}"/><text x="{C[0]+4}" y="{C[1]+28}" text-anchor="middle" font-size="18" letter-spacing="1.5" fill="{INK}">TASK</text>')
center = (f'<text x="{mid[0]}" y="{mid[1]-78}" text-anchor="middle" font-size="16" letter-spacing="1" fill="{INK3}">COORDINATION</text>'
          f'<text x="{mid[0]}" y="{mid[1]-60}" text-anchor="middle" font-size="16" letter-spacing="1" fill="{INK3}">AND CONTROL</text>')
save("quantitative-motor-learning/4.svg", 460, 372, tri + arrow + verts + center)
