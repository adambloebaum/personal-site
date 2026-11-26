"""Illustrative figures for the Thinking Alike post. Run from the repo root."""
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib import font_manager
from matplotlib.colors import LinearSegmentedColormap

here = Path(__file__).parent
for ttf in (here / "fonts").glob("*.ttf"):
    font_manager.fontManager.addfont(ttf)
plt.style.use(here / "atlas.mplstyle")
out = here.parent / "public/images/thinking-alike"

paper = LinearSegmentedColormap.from_list("paper", ["#1f3d40", "#2f6f73", "#b8862b", "#a4472b"])

# Loss landscape with a gradient-descent path from a high start to a basin.
rng = np.random.default_rng(7)
gx = gy = np.linspace(-3, 3, 140)
X, Y = np.meshgrid(gx, gy)
Z = (0.6 * np.sin(1.1 * X) * np.cos(1.1 * Y)
     + 0.9 * np.exp(-((X + 1.4) ** 2 + (Y + 1.1) ** 2) / 1.1)   # a basin
     - 1.3 * np.exp(-((X - 1.0) ** 2 + (Y - 1.2) ** 2) / 1.4)   # deeper basin
     + 0.12 * (X ** 2 + Y ** 2))

fig = plt.figure(figsize=(7.2, 5.6))
ax = fig.add_subplot(111, projection="3d", computed_zorder=False)
ax.plot_surface(X, Y, Z, cmap=paper, linewidth=0.2, edgecolor="#1f2a30",
                antialiased=True, rstride=3, cstride=3, alpha=0.96, shade=True)

def surf(x, y):
    return (0.6 * np.sin(1.1 * x) * np.cos(1.1 * y)
            + 0.9 * np.exp(-((x + 1.4) ** 2 + (y + 1.1) ** 2) / 1.1)
            - 1.3 * np.exp(-((x - 1.0) ** 2 + (y - 1.2) ** 2) / 1.4)
            + 0.12 * (x ** 2 + y ** 2))

# Actual gradient descent on the surface, so the path ends at the bottom of the basin.
pos = np.array([-2.4, 2.2]); path = [pos.copy()]
for _ in range(400):
    e = 1e-4
    grad = np.array([surf(pos[0] + e, pos[1]) - surf(pos[0] - e, pos[1]),
                     surf(pos[0], pos[1] + e) - surf(pos[0], pos[1] - e)]) / (2 * e)
    pos = pos - 0.05 * grad
    path.append(pos.copy())
px, py = np.array(path).T
lowest = np.unravel_index(Z.argmin(), Z.shape)
assert np.hypot(px[-1] - X[lowest], py[-1] - Y[lowest]) < 0.1, "descent did not reach the global minimum"
pz = surf(px, py) + 0.08
ax.plot(px, py, pz, color="#a4472b", linewidth=3, zorder=10)
ax.scatter(px[0], py[0], pz[0], color="#1f2a30", s=45, zorder=11)
ax.scatter(px[-1], py[-1], pz[-1], color="#a4472b", s=55, zorder=11, edgecolor="#1f2a30", linewidth=1)

ax.set_axis_off()
ax.view_init(elev=52, azim=-70)
ax.set_box_aspect((1, 1, 0.55))
fig.subplots_adjust(left=0, right=1, bottom=0, top=1)
fig.savefig(out / "2.png", dpi=190)

# 3D axes leave wide margins that bbox="tight" does not remove; trim them.
from PIL import Image, ImageChops
im = Image.open(out / "2.png").convert("RGB")
box = ImageChops.difference(im, Image.new("RGB", im.size, "white")).getbbox()
im.crop((box[0] - 30, box[1] - 30, box[2] + 30, box[3] + 30)).save(out / "2.png")
print("wrote 2.png")
