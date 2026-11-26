"""Key figures for the work plates, redrawn in the site style from each study's
published outputs. Only group means leave the study folder.

Usage: python figures/work_figures.py <research-studies dir>
"""
import sys
from pathlib import Path

import pandas as pd

studies = Path(sys.argv[1])
out = Path(__file__).parent.parent / "src/assets/works"

# Uncontrolled-manifold paper, Fig. 3a: release-point synergy through the delivery by velocity band.
data = studies / "pitching-funneling-ucm/data"
syn = pd.read_parquet(data / "ucm_synergy.parquet")
syn = syn[syn.dim_null == 3]
velo = syn.velo_med_session
bands = [("Under 85 mph", velo < 85, "teal"), ("85 to 90", (velo >= 85) & (velo < 90), "ochre"), ("90 and over", velo >= 90, "rust")]
sample = pd.read_parquet(data / "theia_var_sample.parquet")
span = sample.BR_time - sample.PKH_time
events = {"Foot plant": (100 * (sample.FP_v6_time - sample.PKH_time) / span).median(),
          "Max external rotation": (100 * (sample.MER_time - sample.PKH_time) / span).median()}

W, H, L, R, T, B = 560, 330, 46, 14, 30, 40
Y0, Y1 = 0.3, 1.0
px = lambda pct: L + pct / 100 * (W - L - R)
py = lambda v: H - B - (v - Y0) / (Y1 - Y0) * (H - T - B)
parts = []
for v in [0.4, 0.6, 0.8, 1.0]:
    parts.append(f'<line class="grid" x1="{L}" y1="{py(v):.1f}" x2="{W - R}" y2="{py(v):.1f}"/>'
                 f'<text class="tick" x="{L - 8}" y="{py(v) + 4:.1f}" text-anchor="end">{v:.1f}</text>')
for pct in [0, 25, 50, 75, 100]:
    parts.append(f'<text class="tick" x="{px(pct):.1f}" y="{H - B + 18}" text-anchor="middle">{pct}</text>')
for name, pct in events.items():
    parts.append(f'<line class="event" x1="{px(pct):.1f}" y1="{T}" x2="{px(pct):.1f}" y2="{H - B}"/>'
                 f'<text class="tick" x="{px(pct) - 6:.1f}" y="{T + 10 + 14 * (name != "Foot plant")}" text-anchor="end">{name}</text>')
parts.append(f'<path class="axis" d="M{L} {T}V{H - B}H{W - R}"/>')
for i, (name, mask, color) in enumerate(bands):
    curve = syn[mask].groupby("pct").delta.mean().reindex(range(101))
    d = "M" + " L".join(f"{px(p):.1f} {py(v):.1f}" for p, v in curve.items())
    parts.append(f'<path class="curve {color}" d="{d}"/>')
    parts.append(f'<line class="curve {color}" x1="{L + 14}" y1="{T + 18 + i * 16}" x2="{L + 34}" y2="{T + 18 + i * 16}"/>'
                 f'<text class="tick" x="{L + 42}" y="{T + 22 + i * 16}">{name}</text>')
parts.append(f'<text class="tick" x="{L}" y="{T - 14}">Synergy index</text>')
parts.append(f'<text class="tick" x="{W - R}" y="{H - 6}" text-anchor="end">Percent of delivery, peak knee height to ball release</text>')
label = "Release-point synergy index through the delivery for three velocity bands; all three rise sharply into ball release and the fastest band ends highest"
(out / "uncontrolled-manifold-pitching-variability.svg").write_text(
    f'<svg class="workfig" viewBox="0 0 {W} {H}" role="img" aria-label="{label}">{"".join(parts)}</svg>\n')
print("wrote uncontrolled-manifold-pitching-variability.svg", {k: round(v, 1) for k, v in events.items()})
