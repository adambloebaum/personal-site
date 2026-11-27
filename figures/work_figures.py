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

W, H = 560, 330
def write(work, label, parts):
    (out / f"{work}.svg").write_text(f'<svg class="workfig" viewBox="0 0 {W} {H}" role="img" aria-label="{label}">{"".join(parts)}</svg>\n')
    print("wrote", work)
tick = lambda x, y, s, anchor="start": f'<text class="tick" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}">{s}</text>'

# Energy flow paper: shoulder energy transferred vs generated, public OpenBiomechanics pitches.
obp = pd.read_csv(studies / "pitching-energy-flow/data/.cache/poi_metrics.csv")
L, R, T, B = 46, 14, 30, 40
px = lambda mph: L + (mph - 68) / (96 - 68) * (W - L - R)
py = lambda j: H - B - j / 550 * (H - T - B)
parts = []
for j in [0, 100, 200, 300, 400, 500]:
    parts.append(f'<line class="grid" x1="{L}" y1="{py(j):.1f}" x2="{W - R}" y2="{py(j):.1f}"/>' + tick(L - 8, py(j) + 4, j, "end"))
for mph in [70, 75, 80, 85, 90, 95]:
    parts.append(tick(px(mph), H - B + 18, mph, "middle"))
for col, color in [("shoulder_transfer_fp_br", "teal"), ("shoulder_generation_fp_br", "rust")]:
    parts += [f'<circle class="dot {color}" cx="{px(x):.1f}" cy="{py(y):.1f}" r="2.2"/>' for x, y in zip(obp.pitch_speed_mph, obp[col])]
parts.append(f'<path class="axis" d="M{L} {T}V{H - B}H{W - R}"/>')
for i, (name, color) in enumerate([("Transferred through the shoulder", "teal"), ("Generated at the shoulder", "rust")]):
    parts.append(f'<circle class="dot {color}" cx="{L + 20}" cy="{T + 16 + i * 16}" r="3.5" style="opacity:1"/>' + tick(L + 32, T + 20 + i * 16, name))
parts.append(tick(L, T - 14, "Energy, joules, foot plant to release"))
parts.append(tick(W - R, H - 6, "Pitch speed, mph", "end"))
write("energy-flow-throwing-arm", f"Shoulder energy transfer rises with pitch speed while energy generated at the shoulder stays low, {len(obp)} public OpenBiomechanics pitches", parts)

# Complexity paper: mean vs within-session SD of pelvis spectral entropy across velocity bands.
sd = pd.read_parquet(studies / "pitching-complexity-reproducibility/data/within_athlete_sd.parquet")
names = ["Under 70", "70 to 75", "75 to 80", "80 to 85", "85 to 90", "90 and over"]
grp = sd.groupby(pd.cut(sd.velo_med, [0, 70, 75, 80, 85, 90, 200], labels=names), observed=True)
px = lambda i: L + 40 + i / 5 * (W - L - R - 80)
py = lambda v: H - B - v / 120 * (H - T - B)
parts = []
for v in [0, 25, 50, 75, 100]:
    parts.append(f'<line class="grid" x1="{L}" y1="{py(v):.1f}" x2="{W - R}" y2="{py(v):.1f}"/>' + tick(L - 8, py(v) + 4, v, "end"))
parts += [tick(px(i), H - B + 18, n, "middle") for i, n in enumerate(names)]
parts.append(f'<path class="axis" d="M{L} {T}V{H - B}H{W - R}"/>')
for k, (col, name, color) in enumerate([("pelvis_angle_z__spectral_ent__mean", "Complexity, session mean", "teal"), ("pelvis_angle_z__spectral_ent__sd", "Pitch-to-pitch variation in complexity", "rust")]):
    idx = 100 * grp[col].mean() / grp[col].mean().iloc[0]
    parts.append(f'<path class="curve {color}" d="M' + " L".join(f"{px(i):.1f} {py(v):.1f}" for i, v in enumerate(idx)) + '"/>')
    parts += [f'<circle class="dot {color}" cx="{px(i):.1f}" cy="{py(v):.1f}" r="3.5" style="opacity:1"/>' for i, v in enumerate(idx)]
    parts.append(f'<line class="curve {color}" x1="{L + 14}" y1="{H - B - 34 + k * 16}" x2="{L + 34}" y2="{H - B - 34 + k * 16}"/>' + tick(L + 42, H - B - 30 + k * 16, name))
    print(col, idx.round(1).tolist())
parts.append(tick(L, T - 14, "Pelvis rotation spectral entropy, slowest band = 100"))
parts.append(tick(W - R, H - 6, "Session median fastball velocity, mph", "end"))
write("reproducibility-movement-complexity-throwing", "Mean movement complexity is flat across velocity bands while its pitch-to-pitch variation falls steadily as velocity rises", parts)

# Lean mass paper: the two change coefficients under four model specifications.
coef = pd.read_csv(studies / "dexa-emg-force-plate/data/analysis/primary_model_coefficients.csv")
models = [("ols_conventional", "OLS"), ("ols_cluster_athlete", "Cluster-robust"), ("mixed_random_intercept", "Mixed model"), ("gee_exchangeable", "GEE")]
parts = []
for p, (term, title, lo, hi, color) in enumerate([("delta_legs_lean_mass_lbs", "Leg lean mass change, N s per lb", -2, 5, "teal"),
                                                   ("delta_emg_avg_peak_pair_across_trials", "EMG peak amplitude change, N s per mV", -14, 4, "rust")]):
    x0, x1 = 110 + p * 232, 110 + p * 232 + 190
    px = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0)
    parts.append(tick(x0, T - 6, title) + f'<line class="axis" x1="{x0}" y1="{H - B}" x2="{x1}" y2="{H - B}"/>'
                 f'<line class="event" x1="{px(0):.1f}" y1="{T + 8}" x2="{px(0):.1f}" y2="{H - B}"/>')
    parts += [tick(px(v), H - B + 18, v, "middle") for v in ([-2, 0, 2, 4] if p == 0 else [-12, -8, -4, 0, 4])]
    for i, (model, name) in enumerate(models):
        y = T + 50 + i * 56
        row = coef[(coef.model == model) & (coef.term == term)].iloc[0]
        if p == 0:
            parts.append(tick(x0 - 14, y + 4, name, "end"))
        parts.append(f'<line class="curve {color}" x1="{px(row.ci_low):.1f}" y1="{y}" x2="{px(row.ci_high):.1f}" y2="{y}"/>'
                     f'<circle class="dot {color}" cx="{px(row.coef):.1f}" cy="{y}" r="4.5" style="opacity:1"/>')
parts.append(tick(W - R, H - 6, "Coefficient on jump concentric impulse change, 95% interval", "end"))
write("lean-mass-jump-impulse", "Across four model specifications the lean mass coefficient stays positive with intervals above zero, while the EMG amplitude coefficient shifts and its interval crosses zero in two of four", parts)

# Patent: the method flowchart from the published application (steps 202 to 220).
steps = ["Start|session", "Position and|calibrate|camera", "Capture|video", "Detect|swing", "Estimate|pose",
         "Process|keypoints", "Predict swing|metrics", "Display|feedback", "Upload|and sync", "Analysis and|reporting"]
bw, bh, gap = 96, 76, 12
parts = ['<defs><marker id="arrowhead" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0L7 3L0 6z" style="fill:var(--ink)"/></marker></defs>']
for i, s in enumerate(steps):
    row, col = divmod(i, 5)
    col = col if row == 0 else 4 - col
    x, y = 16 + col * (bw + gap), 62 + row * 142
    lines = s.split("|")
    parts.append(f'<rect class="box" x="{x}" y="{y}" width="{bw}" height="{bh}"/>' + tick(x + 8, y - 8, 202 + 2 * i)
                 + "".join(tick(x + bw / 2, y + bh / 2 + 4 + 15 * (j - (len(lines) - 1) / 2), ln, "middle") for j, ln in enumerate(lines)))
    if i == 4:
        parts.append(f'<path class="arrow" marker-end="url(#arrowhead)" d="M{x + bw / 2} {y + bh}V{y + 142 - 22}"/>')
    elif i < 9:
        d = 1 if row == 0 else -1
        xs = x + bw if row == 0 else x
        parts.append(f'<path class="arrow" marker-end="url(#arrowhead)" d="M{xs} {y + bh / 2}h{d * gap}"/>')
write("bat-tracking-patent", "Flowchart of the method: start session, position and calibrate camera, capture video, detect swing, estimate pose, process keypoints, predict swing metrics, display feedback, upload and sync, analysis and reporting", parts)
