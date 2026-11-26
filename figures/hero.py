"""Home page figure: elbow transfer power for every pitcher in the public
OpenBiomechanics release, one ridge per pitcher, ordered by pitch speed.

Usage: python figures/hero.py <dir holding energy_flow.zip and metadata.csv>
Data: github.com/drivelineresearch/openbiomechanics, baseball_pitching/data
(full_sig/energy_flow.zip, metadata.csv), commit 8a3e8895.
"""
import sys
from pathlib import Path

import numpy as np
import pandas as pd

src = Path(sys.argv[1])
out = Path(__file__).parent.parent / "src/assets/hero.svg"

ef = pd.read_csv(src / "energy_flow.zip", usecols=[
    "session_pitch", "time", "elbow_energy_transfer_stp", "elbow_energy_transfer_jfp",
    "fp_100_time", "BR_time"])
meta = pd.read_csv(src / "metadata.csv").set_index("session_pitch")

# Phase axis: 0 = foot plant, 1 = ball release, drawn from -0.25 to 1.12.
phase = np.linspace(-0.25, 1.12, 90)
rows = []
for sp, g in ef.groupby("session_pitch"):
    fp, br = g.fp_100_time.iloc[0], g.BR_time.iloc[0]
    if not 0.08 <= br - fp <= 0.25:
        continue
    power = (g.elbow_energy_transfer_stp + g.elbow_energy_transfer_jfp).to_numpy()
    ok = ~np.isnan(power)
    rows.append((meta.user[sp], meta.pitch_speed_mph[sp],
                 np.interp(phase, ((g.time.to_numpy() - fp) / (br - fp))[ok], power[ok])))
df = pd.DataFrame(rows, columns=["user", "mph", "wave"])
by = df.groupby("user").agg(mph=("mph", "mean"), wave=("wave", lambda w: np.mean(np.stack(w), axis=0)))
by = by.sort_values("mph")  # slowest at the back, fastest in front

W, H, L, R, TOP, STEP = 1120, 380, 0, 1040, 130, 2.0
scale = 135 / by.wave.map(np.max).max()
x = L + (phase - phase[0]) / (phase[-1] - phase[0]) * (R - L)
ridges = ""
for i, wave in enumerate(by.wave):
    base = TOP + i * STEP
    pts = " ".join(f"{a:.1f},{base - b * scale:.1f}" for a, b in zip(x, wave))
    line = pts.replace(" ", " L")
    # paper-filled body hides the ridges behind it; its sides and bottom fall outside the clip
    ridges += f'<path d="M{L - 5},{H} L{L - 5},{base:.1f} L{line} L{R + 5},{base:.1f} L{R + 5},{H} Z" />'

fx, bx = np.interp([0, 1], phase, x)
floor = TOP + len(by) * STEP + 24
slow, fast = by.mph.iloc[0], by.mph.iloc[-1]
svg = f'''<svg viewBox="0 0 {W} {H}" role="img" aria-label="Power transferred across the elbow from foot plant to ball release, one line per pitcher for {len(by)} pitchers, ordered from slowest to fastest">
<g stroke="var(--ink)" stroke-opacity="0.35"><line x1="{fx:.0f}" y1="40" x2="{fx:.0f}" y2="{floor:.0f}" /><line x1="{bx:.0f}" y1="40" x2="{bx:.0f}" y2="{floor:.0f}" /></g>
<clipPath id="hero-clip"><rect x="{L}" y="0" width="{R - L}" height="{floor:.0f}" /></clipPath>
<g clip-path="url(#hero-clip)" fill="var(--paper)" stroke="var(--ink)" stroke-width="0.9" stroke-linejoin="round">{ridges}</g>
<line x1="{L}" y1="{floor:.0f}" x2="{R}" y2="{floor:.0f}" stroke="var(--ink)" />
<g class="label" fill="var(--ink-3)" font-size="13">
<text x="{fx:.0f}" y="{floor + 18:.0f}" text-anchor="middle">Foot plant</text>
<text x="{bx:.0f}" y="{floor + 18:.0f}" text-anchor="middle">Ball release</text>
<text x="{R + 12}" y="{TOP + 4}">{slow:.0f} mph</text>
<text x="{R + 12}" y="{TOP + len(by) * STEP:.0f}">{fast:.0f} mph</text>
</g>
</svg>
'''
out.parent.mkdir(exist_ok=True)
out.write_text(svg)
print(f"wrote {out}: {len(by)} pitchers, {len(df)} pitches, {slow:.1f} to {fast:.1f} mph, {len(svg)} bytes")
