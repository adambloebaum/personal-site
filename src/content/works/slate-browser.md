---
title: "Slate: The Browser Window You Open, Use, and Burn"
summary: "The browser window you open, use, and burn."
date: "2025-12-28"
type: "project"
url: "https://github.com/adambloebaum/slate"
more: { label: "Download", url: "https://github.com/adambloebaum/slate/releases/latest" }
short: "Slate: a throwaway-session browser for Windows"
venue: "GitHub"
sample: []
method: "C++17, Qt 6 WebEngine (Chromium), CMake, GitHub Actions"
image: "/images/works/slate.png"
figureCaption: "Slate v1.1.0, the built-in About page."
---

Slate is a small Windows browser for one-off browsing: checking a link you do not trust, or signing in to a second account. Every tab is its own in-memory session with separate cookies and storage, closing a tab destroys its session, and a burn button wipes everything at once. It blocks ads and trackers using the StevenBlack hosts list, upgrades connections to HTTPS, and writes nothing to disk except its blocklist cache. Built in C++17 with Qt 6 WebEngine, with a test suite and a GitHub Actions pipeline that builds the installer.
