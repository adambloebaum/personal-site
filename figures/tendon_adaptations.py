"""Illustrative figures for the tendon adaptations post. Run from the repo root."""
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib import font_manager

here = Path(__file__).parent
for ttf in (here / "fonts").glob("*.ttf"):
    font_manager.fontManager.addfont(ttf)
plt.style.use(here / "atlas.mplstyle")
out = here.parent / "public/images/tendon-adaptations"

# Equal impulse (40 N*s) from different force-duration combinations.
fig, ax = plt.subplots(figsize=(7, 4.6))
dt = np.linspace(0.85, 10.6, 400)
ax.plot(dt, 40 / dt, color="#2F6F73")
points = {1: "VERY HIGH FORCE\nVERY SHORT DURATION", 2: "HIGH FORCE\nSHORT DURATION", 5: "MODERATE FORCE\nMODERATE DURATION", 10: "LOW FORCE\nLONG DURATION"}
for x, label in points.items():
    ax.scatter(x, 40 / x, s=70, color="#A4472B", zorder=3)
    ax.annotate(label, (x, 40 / x), xytext=(10, 10), textcoords="offset points", fontsize=13, linespacing=1.2, color="#1F2A30")
ax.set(xlim=(0, 11.5), ylim=(0, 48), xlabel="DURATION (S)", ylabel="FORCE (N)")
fig.savefig(out / "12.png")

# Force-time curves with different peaks and durations.
fig, ax = plt.subplots(figsize=(7, 4.6))
t = np.linspace(0, 5, 500)
for peak, sigma in ((100, 0.2), (80, 0.75), (60, 1.25), (40, 2.0)):
    force = peak * np.exp(-((t - 2.5) ** 2) / (2 * sigma**2))
    (line,) = ax.plot(t, force)
    ax.fill_between(t, force, color=line.get_color(), alpha=0.14, linewidth=0)
ax.set(xlim=(0, 5), ylim=(0, 106), xlabel="TIME (S)", ylabel="FORCE (N)")
fig.savefig(out / "13.png")
