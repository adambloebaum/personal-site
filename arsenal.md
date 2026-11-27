# Arsenal

Working list of things to learn, build, and write. Check items off, add freely.
Tags: [essay] long-form post, [note] under 500 words, [build] project or
interactive, [study] learn first, write later.

The test for anything published: could a strong technical reader in any field
learn something from it that they could not get elsewhere? Baseball is the home
domain, not the audience. Other sports, games (chess, poker), and first
principles from math, physics, chemistry, and biology are all in bounds. Each
piece should show at least one of: technical depth that travels, a decision or
product actually shipped, or how to lead and build beyond IC work.

## Start here (set 2026-11-27)

1. State estimation, Kalman to particle filter, interactive (section 3)
2. Edge inference on a phone, tied to the bat-tracking patent (section 2)
3. Valuation from first principles, written across sports (section 1)
4. One systems-and-teams piece: last mile, or build vs. buy (section 5)
5. One games piece: poker or chess as a decision problem (section 8)

Skip plain-language rewrites of the preprints; the paper pages already carry
the summary. A companion is worth it only with the player's view or a decision
attached (section 7).

## 0. Queue (carried over from blog_queue.txt)

- [x] Quantitative motor learning
- [ ] Guide to developing CV models [essay]
- [ ] Markered vs. markerless motion capture [essay]
- [ ] Perspective-n-point problem [essay] [build]
- [ ] TJ rehab [essay]
- [ ] Biochemistry of caffeine [essay]
- [ ] Racing line of hitting [essay]
- [ ] Swing power and MOI vs. bat speed [essay]
- [ ] Algorithmic event detection [essay]
- [ ] Reinforcement learning and training (in-progress/, empty)
- [ ] Technical, knowledgeable, tasteful (in-progress/, empty)

## 1. Valuation and decisions (biggest gap in the public portfolio)

Everything published so far is pitching biomechanics. An R&D lead in any sport
is judged on decisions: who to acquire, what to pay, how sure to be. Write these
so the method is the subject and the sport is the example; compare across
baseball, basketball, soccer, football, and hockey where the structure differs
(continuous vs. discrete play, credit assignment, sample size per season).

- [ ] Player valuation from first principles: runs, wins, replacement level, surplus value [study] [essay]
- [ ] Projection systems: regression to the mean, aging curves, minor league translations [study] [build]
- [ ] Bayesian hierarchical models for small samples (partial pooling across levels and seasons) [study] [essay]
- [ ] Causal inference for player development: did the intervention work, or was it selection? [essay]
- [ ] Stuff / location / pitch-value models: what they capture, where they fail [essay]
- [ ] Decision-making under uncertainty: draft, trade, and promotion as portfolio problems [essay]
- [ ] Roster and contract mechanics: service time, options, arbitration, Rule 5, 40-man [study] (private study; club-specific, not site content)
- [ ] Hitting side: bat-tracking metrics, swing decisions, attack angle (pairs with the queue items above) [essay]
- [ ] In-game pose data vs. lab motion capture: what transfers, what does not [essay]
- [ ] Workload, fatigue, and injury modeling: base rates, censoring, why most models overclaim [essay]
- [ ] Model evaluation that survives contact: calibration, leakage, out-of-time validation [essay]
- [ ] One public-data project in a sport other than baseball or hockey, on the level of the NHL xG benchmark [build]

## 2. Measurement, hardware, EE/CE

- [ ] Sampling, aliasing, and filter choice in movement data (why cutoff frequency changes your joint torques) [essay]
- [ ] Camera fundamentals: shutter, sensor size, lens distortion, calibration, multi-camera sync [study] [essay]
- [ ] IMUs: gyro saturation, drift, sensor fusion, what a wearable can and cannot know [essay]
- [ ] Radar vs. optical ball tracking: measurement models and error budgets [essay]
- [ ] Force plates and EMG: what the signal is physically, common misreads [note]
- [ ] GPUs from the ground up: memory hierarchy, why batch size matters, where inference time goes [study] [essay]
- [ ] Edge inference on a phone: quantization, latency budgets (ties to the bat-tracking patent) [essay]
- [ ] Basic circuits and embedded systems: build one sensor end to end [build]

## 3. Modeling and computation

- [ ] State estimation: Kalman filter to particle filter, with an interactive demo [build]
- [ ] Optimal control and trajectory optimization for human movement [study]
- [ ] Musculoskeletal simulation: inverse vs. forward dynamics, what OpenSim-class tools assume [essay]
- [ ] Reinforcement learning as a model of practice design [essay]
- [ ] Nonlinear dynamics for movement: entropy, recurrence, what the complexity preprint means in plain words [essay]
- [ ] Uncertainty quantification: bootstrap, conformal prediction, when to show an interval [note]
- [ ] Physics of ball flight: Magnus, seam-shifted wake, drag crisis [essay] [build]
- [ ] Time-series methods for longitudinal athlete data [study]

## 4. Motor learning and training

- [ ] Information-processing vs. ecological dynamics: where each predicts something different [essay]
- [ ] Constraints-led approach in practice design, from the athlete side [essay]
- [ ] Feedback: frequency, timing, augmented vs. intrinsic, external focus of attention [essay]
- [ ] Contextual interference and transfer: what actually carries to games [essay]
- [ ] Variability: noise vs. function (plain-language companion to the UCM preprint) [essay]
- [ ] Tissue adaptation timelines vs. skill adaptation timelines [note]
- [ ] Sleep, travel, and recovery in a minor league season: what the literature says vs. what happens [essay]

## 5. Systems engineering and building teams

- [ ] Requirements, interfaces, and verification: running a biomechanics pipeline like an engineered system [essay]
- [ ] Data pipelines that coaches can trust: lineage, QA flags, reprocessing [essay]
- [ ] Build vs. buy for a club tech stack [essay]
- [ ] Getting a model used: the last mile from notebook to dugout [essay]
- [ ] How to structure an R&D group: research, engineering, and coaching liaison [study]
- [ ] Writing a one-page decision memo [note]

## 6. AI outlook

- [ ] What coding agents changed about one-person research throughput (with real examples) [essay]
- [ ] Foundation models for human motion and video: state of the art and limits [study] [essay]
- [ ] Where AI will and will not replace judgment in player evaluation [essay]
- [ ] Rework or retire "Thinking Alike" with a sharper claim [essay]

## 7. Only-you essays

- [ ] Reading your own biomechanics report as a pitcher: what changed and what you ignored
- [ ] What a player wants from an R&D department
- [ ] An offseason as an experiment: hypothesis, intervention, measurement, result
- [ ] What clubhouse buy-in actually looks like
- [ ] Things the model says that the mound disagrees with

Guardrail: nothing proprietary to Driveline or the Nationals, no teammate data.

## 8. Other sports, games, first principles

- [ ] Poker as decision-making under uncertainty: equity, ranges, variance, bankroll as risk of ruin [essay]
- [ ] Chess engines and evaluation: what search plus a value function teaches about player evaluation [essay]
- [ ] Rating systems: Elo, Glicko, and what they assume, across chess and team sports [essay] [build]
- [ ] Credit assignment across sports: why baseball is easy and soccer is hard [essay]
- [ ] Expected-value models side by side: xG, expected points, run expectancy as one idea [essay]
- [ ] Energy systems from the chemistry up: ATP, phosphocreatine, glycolysis, and what a pitch or a sprint actually costs [essay]
- [ ] Scaling laws: why size and strength do not scale together, from the physics [note]
- [ ] Biochemistry of caffeine (from the queue) [essay]

## 9. Bookshelf (candidates for a reading page; add one line of your own on each)

Baseball and decisions
- [ ] The Book -- Tango, Lichtman, Dolphin
- [ ] The MVP Machine -- Lindbergh, Sawchik
- [ ] The Physics of Baseball -- Adair
- [ ] Superforecasting -- Tetlock, Gardner
- [ ] Thinking, Fast and Slow -- Kahneman

Statistics and causality
- [ ] Statistical Rethinking -- McElreath
- [ ] Bayesian Data Analysis -- Gelman et al.
- [ ] Causal Inference: What If -- Hernan, Robins

Movement
- [ ] Biomechanics and Motor Control of Human Movement -- Winter
- [ ] Motor Control and Learning -- Schmidt, Lee
- [ ] The Computational Neurobiology of Reaching and Pointing -- Shadmehr, Wise

Engineering and computing
- [ ] The Art of Doing Science and Engineering -- Hamming
- [ ] Computer Architecture: A Quantitative Approach -- Hennessy, Patterson
- [ ] Designing Data-Intensive Applications -- Kleppmann
- [ ] The Art of Electronics -- Horowitz, Hill
- [ ] Multiple View Geometry in Computer Vision -- Hartley, Zisserman
- [ ] Reinforcement Learning: An Introduction -- Sutton, Barto
- [ ] The Visual Display of Quantitative Information -- Tufte

Leading
- [ ] High Output Management -- Grove
- [ ] An Elegant Puzzle -- Larson

## 10. Site backlog (from the 2026-11-25 review)

Done 2026-11-25: post citation and math fixes, bold restored, per-post share
cards, font blanking removed, GIFs converted to MP4, plots and photos resized,
contrast raised, unused scaffold and dependencies removed, lint clean, RSS,
sitemap, 404.html. No public email on Contact, by choice.

Redesign (Astro, Atlas design) merged and deployed 2026-11-27.
- [ ] key figures for the other three paper pages: add `src/assets/works/<id>.svg` (see `figures/work_figures.py`) and a `figureCaption` line; only the UCM paper has one
- energy-flow plots are recolored copies of the originals and stay that way: the Nov 2025 extract and code are gone and the database has since been backfilled, so the post's 17,942-throw sample cannot be rebuilt

After v1 ships
- [ ] Notes (short posts), Bookshelf page, one interactive explainer, one-page CV
