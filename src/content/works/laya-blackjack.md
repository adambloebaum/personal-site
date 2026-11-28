---
title: "Laya Blackjack: A Learned Blackjack Policy, a Simulator, and the Experiments Behind It"
summary: "A 421M-parameter decision encoder fine-tuned to play finite-shoe blackjack from public table information, with a locked evaluation."
date: "2026-09-24"
type: "project"
url: "https://github.com/adambloebaum/laya-blackjack"
short: "Laya Blackjack: fine-tuning a decision model for finite-shoe blackjack"
venue: "GitHub"
sample: ["3,000,000 simulated rounds", "16,384 held-out states"]
method: "Python, PyTorch, Laya (ModernBERT-large), FastAPI"
figureCaption: "Paired return advantage of the fine-tuned model on the four predeclared contrasts, with Bonferroni-adjusted 95% intervals, over 3,000,000 policy-rounds. Absolute returns stayed negative in both modes."
---

Laya Blackjack adapts Laya, a 421M-parameter ModernBERT-large typed decision encoder (not a generative chat model), to play finite-shoe blackjack using only what is visible at the table. It was distilled in four stages against a hybrid exact Bellman and conditional Monte Carlo reference; cost-sensitive regret loss and DAgger-style retraining both failed to beat ordinary imitation under a predeclared selection rule. On the locked 16,384-state test the final model matches the reference action 95.95% of the time, against 92.83% for the broad-training baseline. In a 3,000,000-round paired benchmark it gained 0.309 units per 100 rounds over a basic-strategy heuristic in continuous play; fresh-shoe differences were inconclusive and absolute returns stayed negative, so this is reduced loss, not a winning system.

[Download the weights on Hugging Face](https://huggingface.co/adambloebaum/laya-blackjack)
