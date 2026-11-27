---
title: "NHL Expected Goals Model Benchmark and Spatial Explorer"
summary: "A public-data NHL expected goals benchmark and rink-first spatial explorer that beats MoneyPuck."
date: "2026-04-19"
type: "project"
url: "https://github.com/adambloebaum/xg-puck-benchmark"
short: "NHL expected goals benchmark and spatial explorer"
venue: "GitHub"
sample: ["Public data"]
---

Six model families trained on 825,907 shots from seven seasons of MoneyPuck's public shot data, with a strict temporal train, validation, and test split. A tuned XGBoost using only public features edges MoneyPuck's own published xG on held-out 2024-25 test log-loss (0.2145 against 0.2146); MoneyPuck still leads on AUC. The repo also ships a Dash app with a 3D rink view, shot heatmaps, and player leaderboards.
