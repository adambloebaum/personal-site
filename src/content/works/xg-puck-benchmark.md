---
title: "NHL Expected Goals Model Benchmark and Spatial Explorer"
summary: "A public-data NHL expected goals benchmark and rink-first spatial explorer that beats MoneyPuck."
date: "2026-04-19"
type: "project"
url: "https://github.com/adambloebaum/xg-puck-benchmark"
short: "NHL expected goals benchmark and spatial explorer"
venue: "GitHub"
sample: ["723,634 shots", "7 NHL seasons"]
method: "Python, XGBoost, LightGBM, PyTorch, Dash, Three.js"
image: "/images/works/xg-puck-benchmark.jpg"
figureCaption: "The rink explorer, 3D arena view."
---

Six model families trained on 723,634 regular-season shots from seven complete seasons of MoneyPuck's public data, evaluated on a strict temporal train, validation, and test split. A tuned XGBoost and LightGBM ensemble using only public, team-agnostic features beats MoneyPuck's published xG on held-out 2024-25 test log-loss (0.2139 against 0.2146), driven by tighter calibration on high-danger chances, while MoneyPuck still edges it slightly on AUC. The repo also ships a Dash app with a GPU-instanced 3D rink, shot-type danger heatmaps, calibration and SHAP diagnostics, and interactive skater and goalie leaderboards.
