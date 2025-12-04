---
title: "Energy Flow Dynamics in Pitching"
summary: "Examining how shoulder and elbow energy impacts velocity and relates to valgus torque."
date: "2025-12-01"
readTime: "15 min"
image: "blog-energy-flow"
ogImage: "energy-flow/1.jpg"
featured: true
tags: ["Biomechanics", "Physics", "Energy Flow", "Throwing"]
---

Understanding joint mechanics in human movement requires knowledge of power, energy, work, and their transmission through the body. Pitching depends on both how much mechanical energy the body produces and how efficiently that energy flows through the kinetic chain from the ground to the throwing hand and finally the baseball. Below is everything you need to know to understand joint mechanics, inverse dynamics, the power-partitioning theory used to separate generation, absorption, and transfer, and why it all matters for developing elite throwers.

## Work, Power, and Energy

Mechanical work is defined as the integral of force applied through a displacement:

$$
W = \int {F} \cdot d{x}
$$

Work changes the mechanical energy of an object, which may be kinetic (translational or rotational) or potential. Energy is measured in joules (J).

Mechanical power is the rate at which work is done:

$$
P = \frac{dW}{dt}
$$

Power is therefore the instantaneous product of force and velocity in a linear system:

$$
P = {F} \cdot {v}
$$

In rotational motion, the equivalent quantity is the product of the joint moment (torque) and angular velocity:

$$
P = M \omega
$$

Power is measured in watts (W), where 1 W = 1 J/S. The distinction between power and energy is essential: power is instantaneous and can be positive or negative at any moment, while energy is the time integral of power, and therefore accumulates only over an interval:

$$
E = \int_{t_0}^{t_1} P(t), dt
$$

This is why we can report peak power at a joint, but not “instantaneous energy.” Energy only exists over time.

## Why Energy and Power Matter in Throwing

Throwing a baseball requires imparting mechanical energy to the ball to change its position. For the ball to leave the hand with high translational kinetic energy

$$
E_{\text{ball}} = \frac{1}{2} m v^{2}
$$

the pitcher’s body must first generate and then transfer mechanical energy through the kinetic chain so that the distal segments (forearm, hand, ball) receive enough to be displaced at high speeds. More energy transferred to the hand-ball system corresponds to higher ball velocity. Efficient energy transfer also reduces the amount of local positive work that muscles at individual joints must perform, lowering mechanical stress.

Understanding where energy is generated, where it is absorbed, and how much is passed from one segment to the next is central to using biomechanics in player development.

## Joint Moments and Torques

A moment (or torque) is the rotational analog of force. For a force ${F}$ acting at a perpendicular distance (r) from a joint axis,

$$
M = r F_{\perp}
$$

Moments cause angular acceleration according to the rotational equation of motion,

$$
M = I \alpha
$$

where (I) is segment moment of inertia and $\alpha$ is angular acceleration.

Moments arise because muscles pull on bones at distances away from the joint center. When a pitcher rotates the upper arm or forearm, the muscles generate joint moments, which then contribute to joint power.

## Inverse Dynamcis: How Joint Moments Are Calculated in a Lab

In biomechanics, joint moments are obtained through inverse dynamics, a computational procedure that determines internal forces and moments from observed motion. Using segment masses, inertias, center-of-mass (COM) positions, and measured ground reaction forces, Newton–Euler equations for each body segment are solved in reverse:

### Linear Dynamics

$$
\sum {F} = m {a}
$$

### Rotational Dynamics

$$
\sum M = I \alpha + {r}_{\text{COM}} \times (m{a})
$$

From motion-capture data (positions, velocities, accelerations), these equations produce internal joint forces and moments at each time step of the motion. These joint moments and angular velocities then allow joint power to be computed.

## Joint Force Power (JFP) and Segment Torque Power (STP)

Joint power is traditionally split into two components: Joint Force Power (JFP) and Segment Torque Power (STP).

### Joint Force Power (JFP)

JFP quantifies translational power transmitted through a joint:

$$
P_{\text{JFP}} = {F}_{\text{joint}} \cdot {v}_{\text{joint}}
$$

It reflects energy that flows across a joint due to linear joint forces.

### Segment Torque Power (STP)

STP quantifies rotational power caused by joint moments. For a given segment:

$$
P_{\text{STP}} = M \omega
$$

Because each joint connects two segments (a proximal and a distal), we compute STP separately for both:

$$
P_{\text{prox}} = M\omega_{\text{prox}} , P_{\text{dist}} = M\omega_{\text{dist}}
$$

These measurements allow us to determine how much energy a joint’s musculature produces or absorbs for each segment.

## Positive and Negative Power: Generation and Absorption

If (P > 0), the musculature is generating energy:

$$
\text{Positive power } \Rightarrow \text{energy generation}
$$

If (P < 0), the musculature is absorbing energy:

$$
\text{Negative power } \Rightarrow \text{energy absorption}
$$

This applies to both proximal and distal STP components, allowing us to characterize the behavior of each segment independently.

## Energy Transfer Through a Joint

The more important question in pitching biomechanics is not how much power each joint generates, but how much energy transfers from one segment to the next. This requires separating generation from transfer. Power partitioning theory gives us a way to do this.

Consider the proximal and distal STP components at a joint:

- Proximal STP:  $(P_{\text{prox}})$
- Distal STP: $(P_{\text{dist}})$

The signs of these components determine whether a joint is primarily generating/absorbing energy or transferring it.

### Case 1: Same Sign

If

$$
\operatorname{sign}(P_{\text{prox}}) = \operatorname{sign}(P_{\text{dist}}),
$$

then both segments are experiencing power in the same direction (both generating or both absorbing). In this case, the joint is not transferring energy; the musculature is doing active work.

### Case 2: Opposite Signs

If

$$
\operatorname{sign}(P_{\text{prox}}) = - \operatorname{sign}(P_{\text{dist}}),
$$

then energy is moving from one segment to the other. The amount of transferred power equals the smaller-magnitude component:

$$
P_{\text{transfer, STP}} = \min(|P_{\text{prox}}|, |P_{\text{dist}}|).
$$

The remaining difference is the energy being actively generated or absorbed:

$$
P_{\text{muscle}} = |P_{\text{prox}}| - |P_{\text{dist}}|.
$$

However, total mechanical transfer also includes JFP. Therefore:

$$
P_{\text{transfer, total}} = P_{\text{transfer, STP}} + P_{\text{JFP}}
$$

Integrating this over time yields the total transferred energy in joules.

## Energy and Power in a Non-Ideal System

In an ideal kinetic chain, energy would flow strictly from proximal to distal segments:

$$
E_{\text{prox}} \rightarrow E_{\text{dist}}
$$

But biological systems have compliance, timing variability, non-rigid coupling, and noise. Therefore small amounts of “reverse transfer” (distal → proximal) are normal. These appear as short intervals where:

$$
P_{\text{transfer}} < 0
$$

This behavior does not imply error, it reflects the complex, soft-tissue-coupled nature of human movement.

## Why Energy Transfer Matters in Pitching

The goal in high-velocity throwing is to maximize the amount of mechanical energy that reaches the distal segments, allowing the ball to be released with high kinetic energy and therefore high velocity. The hand-ball system gains kinetic energy equal to:

$$
E_{\text{ball}} = \frac{1}{2} m v^{2}
$$

To achieve a higher release velocity (v) of a projectile with fixed mass (m), the body must either generate more energy overall, or transfer energy from further up the kinetic chain more efficiently, reducing the need for local generation at the elbow and shoulder.

Efficient energy transfer:

- reduces internal joint loading
- increases consistency of movement
- allows higher velocities with less muscular effort

## From Power to Energy

Although we compute power instantaneously, energy must always be computed by integrating that power over time:

$$
E_{\text{total}}(t_0 \rightarrow t_1) = \int_{t_0}^{t_1} P(t) , dt
$$

Therefore:

- “Peak power” is a watt value at a single instant.
- “Total energy transfer” is the result of integrating transfer power across the duration of interest.

For example:

$$
E_{\text{shoulder transfer}} = \int P_{\text{shoulder, transfer}}(t), dt
$$

$$
E_{\text{elbow transfer}} = \int P_{\text{elbow, transfer}}(t), dt
$$

A net energy flow metric can be calculated as:

$$
E_{\text{net}} = E_{\text{elbow}} - E_{\text{shoulder}}
$$

and a corresponding efficiency percentage may be defined as:

$$
\eta = 100 \times \frac{E_{\text{elbow}}}{E_{\text{shoulder}}}
$$

A user-friendly interpretation is to report energy flow as a percentage, expressed as “efficiency” (e.g., “94% of energy arriving at the shoulder made it to the elbow”) rather than reporting a “–6% loss.”

## Data Source and Population

I looked at 17,942 throws from athletes who participated in motion-capture assessments at Driveline Baseball. Only pitches with a regulation baseball, in the athlete's normal pitching motion, at game-intent, thrown over 70 mph were used in the dataset.

### Velocity Distribution
- 76 pitches 95+ mph
- 2,093 pitches 90-95 mph
- 4,730 pitches 85-90 mph
- 4,825 pitches 80-85 mph
- 6,218 pitches 70-80 mph

### Playing Level Distribution
- 7,900 pitches from youth athletes
- 6,876 pitches from college athletes
- 3,166 pitches from professional athletes

## Biomechanical Values

### Energy Transfer Metrics

Joint-level energetics were calculated from inverse dynamics, quantifying energy transfer, generation, and absorption at the shoulder and elbow joints during the throwing motion. The analysis window was defined from foot plant (FP) to ball release (BR), capturing the arm-centric phase of the pitch.

Transfer metrics included:

- Peak energy transfer (W): Maximum instantaneous power transferred across each joint from FP-BR
- Total energy transfer (J): Time-integrated energy transferred across each joint from FP-BR
- Net transfer metrics: The difference between elbow and shoulder energy values, representing the energy "gained" or "lost" between joints

Generation and absorption metrics quantified energy added to (generation) or removed from (absorption) the kinematic chain at each joint from FP-BR.

### Valgus Torque Metrics

Elbow valgus torque was calculated from inverse dynamics as the internal moment resisting valgus stress. Key metrics included:

- Peak valgus torque (Nm): Maximum valgus moment during FP-BR
- Valgus torque area under the curve (AUC, Nm·s): Time-integrated valgus loading during FP-BR, calculated using trapezoidal integration
- Maximum valgus loading rate (Nm/s): Peak rate of change in valgus torque, calculated using gradient methods

### Temporal Metrics

Event timing was extracted to quantify coordination patterns:

- Time between peak shoulder and elbow energy transfer
- Time from peak elbow energy transfer to peak valgus torque
- Time from peak shoulder energy transfer to peak valgus torque

### Kinematic Metrics

Additional biomechanical variables included maximum shoulder internal rotation velocity, maximum shoulder external rotation angle, and maximum elbow extension velocity during the pitching motion.

### Anthropometric Normalization

When available, anthropometric measurements (body mass, forearm length, upper arm length) were used to create normalized metrics accounting for individual athlete size differences. Normalized variables included valgus torque per kilogram body mass, energy transfer per unit limb length, and derived mechanical advantage ratios.

## Data Processing and Quality Control

### Outlier Removal

To ensure data quality and remove physiologically implausible values, median absolute deviation (MAD) Z-score filtering was used with a threshold of 3.5.

### Derived Metrics

Additional variables were calculated to examine efficiency, coupling, and coordination:

- **Efficiency ratios**: Transfer-to-generation ratios, generation-to-absorption ratios
- **Joint coupling metrics**: Elbow-to-shoulder transfer ratios at both peak and total levels
- **Timing interactions**: Products and ratios of temporal and energetic variables
- **Velocity-normalized stress**: Valgus torque metrics divided by pitch velocity

## Statistical Analysis

### Correlation Analysis

Bivariate relationships were assessed using Pearson correlation coefficients. For each relationship, linear regression was performed to calculate R², mean absolute error (MAE), and root mean square error (RMSE). Locally weighted scatterplot smoothing (LOESS) curves were overlaid on scatter plots to visualize non-linear trends (smoothing parameter = 0.3).

### Partial Correlation Analysis

To account for confounding relationships, partial correlations were calculated by regressing each variable of interest on a control variable, then correlating the residuals. This approach isolated unique variance in relationships while controlling for shared dependencies (e.g., examining elbow energy transfer vs. pitch velocity while controlling for shoulder energy transfer).

### Principal Component Analysis (PCA)

PCA was performed on standardized energy metrics (shoulder and elbow peak transfer, total transfer, generation, absorption, and net transfer values) to identify underlying patterns of variance. The first three principal components were retained for interpretation, and component loadings were visualized to understand variable contributions.

### Ridge Regression

Ridge regression was applied to examine multicollinearity effects among energy predictors of pitch velocity. Coefficient paths were plotted across regularization parameters (α = 0, 0.1, 1, 10, 100) to demonstrate coefficient shrinkage, with α = 0 approximating ordinary least squares.

### Variance Inflation Factors (VIF)

VIFs were calculated for all energy metrics to quantify multicollinearity severity, with VIF > 5 indicating moderate and VIF > 10 indicating high multicollinearity.

### Residual Analysis

Residual plots were generated to explore relationships independent of confounding variables. Residuals from univariate regressions were plotted against one another to identify unique variance contributions (e.g., residual valgus torque vs. residual elbow transfer, both after removing pitch velocity effects).

### Density Estimation

Bivariate kernel density estimation (Gaussian kernel) was used to visualize joint distributions of key variable pairs. Convex hulls were overlaid to delineate data boundaries. Envelope curves representing 5th and 95th percentiles within velocity bins were computed using LOESS smoothing to identify minimum and maximum performance boundaries.

## Data Management

All analyses were performed in Python 3.x using pandas (data manipulation), NumPy (numerical operations), SciPy (statistical functions), scikit-learn (machine learning methods), statsmodels (advanced statistics), and Matplotlib/Seaborn (visualization). Data were cached locally after initial database extraction to ensure reproducibility and computational efficiency.

## Results

### Summary

Pitch velocity is strongly associated with the **magnitude** of energy transfer through the arm (shoulder and elbow transfer peaks and totals), **not** with the generation/absorption of energy or the timing of peak power. Elbow varus loading is driven primarily by elbow transfer magnitude (especially elbow peak transfer), and normalization by lever length shows consistent relationships: anatomical lever arms modulate the mechanical cost of transfer. Partial-correlation and residual analyses indicate there are **few independent predictors** once shoulder–elbow coupling and pitch speed are accounted for.

### Detailed Findings

**#1: Pitch velocity is mostly related to energy transfer metrics**

Shoulder and elbow peak and total transfer metrics explain ~0.59–0.62 of variance in pitch speed. PC1 (dominated by transfer metrics) explains ~46% of variance and correlates positively with pitch speed.

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/2.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/3.png" alt="img2" style="width: 50%;" />
</div>

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/4.png" alt="img1" style="width: 33%;" />
  <img src="/images/energy-flow/5.png" alt="img2" style="width: 33%;" />
  <img src="/images/energy-flow/6.png" alt="img2" style="width: 33%;" />
</div>

Measures of generation and absorption within joints (shoulder/elbow generation or absorption), net transfer, timing, and efficiency ratios explain negligible variance in pitch speed (r² of most ~0.00–0.07).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/7.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/8.png" alt="img2" style="width: 50%;" />
</div>

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/9.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/10.png" alt="img2" style="width: 50%;" />
</div>

**Conclusion**: delivering more total and peak energy through the chain is the primary mechanical correlator of throwing velocity. There is no evidence that more generation, better absorption/generation balance, or precise joint peak power timing is a driver of velocity.

**#2: Elbow total transfer is almost entirely determined by shoulder transfer**

Shoulder total transfer → elbow total transfer: r² = **0.956**. Shoulder peak transfer also strongly predicts elbow transfer (r² = **0.787**).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/11.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/12.png" alt="img2" style="width: 50%;" />
</div>

Partial r² shows elbow total transfer still links to shoulder peak transfer after controlling for shoulder generation (partial r² = 0.751).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/13.png" alt="img1" style="width: 100%;" />
</div>

**Conclusion**: the shoulder sets the energy ceiling; the elbow largely transfers what the shoulder sends.

**#3: Valgus torque scales with transfer magnitude, especially elbow peak transfer**

Peak valgus torque correlates strongly with elbow peak transfer (r² = **0.732**) and elbow total transfer (r² = **0.660**). Total valgus (AUC) correlates with elbow total transfer (r² = **0.589**).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/14.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/15.png" alt="img2" style="width: 50%;" />
</div>

Pitch speed explains some torque variance (r² = **0.503**), but transfer magnitude is a stronger direct correlate of torque than speed alone. Residual analyses (removing speed) show residual torque still relates to residual elbow transfer (r² = **0.338**; stronger for peak transfer residual: r² = **0.470**).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/16.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/17.png" alt="img2" style="width: 50%;" />
</div>

**Conclusion**: higher energy flows to the elbow reliably increase joint loading. Thus elbow injury risk (if driven by valgus torque) is mechanistically tied to energy throughput.

**#4: Anthropometry matters: lever length changes mechanical cost**

Normalizing torque and transfer by forearm/upper-arm length preserves strong relationships: e.g., peak valgus torque / forearm_length vs elbow total transfer: r² = **0.632**; elbow total transfer / forearm_length vs pitch speed: r² = **0.616**.

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/18.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/19.png" alt="img2" style="width: 50%;" />
</div>

Peak valgus torque vs (elbow_total_transfer / forearm_length): r² ≈ 0.570.

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/20.png" alt="img1" style="width: 50%;" />
</div>

**Conclusion**: arm length affects torque magnitudes and the apparent “cost” of transfer. Normalization helps separate anatomical from technique effects.

**#5: Timing and efficiency ratios provide little explanatory power**

Timing metrics have very small r²s across the board. Efficiency ratios (transfer/transfer or absorption/generation) are effectively uncorrelated with pitch speed and poorly correlated with torque. Residual timing analyses show negligible relationships with residual velocity or torque.

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/21.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/22.png" alt="img2" style="width: 50%;" />
</div>

**Conclusion**: Sequencing precision and simple efficiency percentages do not explain which pitchers throw harder or suffer more torque.

**#6: Partial correlations / residuals show little independent predictive signal after accounting for coupling**

Once shoulder transfer is accounted for, elbow transfer has minimal additional predictive power for speed. Anthropometrics (mass) explain moderate partial variance in torque (partial r² = **0.303**).

<div style="display: flex; gap: 10px;">
  <img src="/images/energy-flow/23.png" alt="img1" style="width: 50%;" />
  <img src="/images/energy-flow/24.png" alt="img2" style="width: 50%;" />
</div>

## Discussion

The findings of this study highlight a central principle of throwing mechanics: the primary role of the throwing arm is not to generate energy, but to transfer energy that has already been produced proximally. Across all analyses, the shoulder and elbow behaved as a mechanically coupled system in which the elbow served primarily as a conduit rather than an engine. Joint power partitioning showed that local energy generation or absorption at the elbow and the shoulder had little to no relationship with pitch velocity. In contrast, the magnitude of transferred energy, particularly from the shoulder, was strongly predictive of ball velocity.

This reinforces the concept that the throwing arm’s primary job is to maintain structural integrity under high loads rather than contribute meaningful energetic output. Its job, from a velocity standpoint, is to remain connected to the torso and allow the energy produced by proximal segments to be delivered distally with minimal interruption. In other words, the arm must stay attached and stay compliant. The strong linear coupling between shoulder and elbow energetics supports this interpretation: pitchers who generate more energy proximally simply pass more of it distally, with the elbow acting largely as a passive transmitter.

One of the most interesting findings was the lack of statistical value in commonly cited qualitative concepts such as “sequencing”, “efficiency”, or the timing of energy transfer between segments. Metrics related to timing, peak timing offsets, and transfer efficiency explained little variance in performance or loading even after controlling for the magnitude of energy transfer. This challenges long-held assumptions about the importance of precise arm-segment sequencing during the throwing motion and suggests that proximal energy magnitude, not distal timing nuance, is the dominant factor. 

With respect to injury risk: elbow varus moment (valgus torque) ,a primary mechanical correlate of elbow injury, showed a robust positive relationship with both peak and total elbow energy transfer. This is expected: more energy flowing through the joint generally requires more internal force to resist it. However, the relationship was not perfectly predictive. A moderate portion of variance in valgus torque remained unexplained by energy transfer alone. This residual variance is very useful and meaningful. It implies that some athletes are able to transmit large amounts of energy at comparatively lower joint cost, while others require disproportionately high torque for the same energetic throughput.

This "energy-to-torque tradeoff" may provide a promising framework for understanding mechanical injury risk. Pitchers who sit in a quadrant characterized by high energy transfer but relatively low torque may represent more cost-effective movement solutions and have found ways to accept, orient, or distribute load more effectively. Conversely, athletes who show elevated torque relative to their energy transfer may represent higher-risk mechanical profiles. Identifying these features could have significant implications for training and injury prevention.

Future work should attempt to model this residual (the portion of valgus torque not explained by energy transfer) using joint angles, joint positions, timing features, full joint center signals, or other biomechanical variables. If these features can be identified and trained without diminishing energy transfer (and thus without reducing velocity), they may form the basis for low-cost, high-output mechanical adaptations, a key target for reducing elbow injury risk in high-level throwers.

Overall, these findings reinforce the longstanding qualitative coaching idea that "muscling up" is counterproductive. Attempting to generate force locally in the arm not only fails to increase velocity but may interfere with the arm's primary function as a passive conductor of energy. The forearm flexor-pronator musculature and its associated tendons function most effectively when allowed to utilize rapid stretch-shortening cycles, where passive elastic energy storage and recoil contribute to force production. When these tissues are held in sustained contraction throughout the throwing motion, this elastic advantage is compromised, forcing the muscle-tendon unit to rely on active contractile work rather than passive energy transfer.

As throwing volume accumulates and these tissues fatigue, overly-contracted musculature becomes progressively less capable of stabilizing the joint under high energy loads. Pitchers who habitually "muscle up" may therefore undermine their arm's primary mechanical function: local muscular effort fails to increase velocity (as energy transfer, not generation, drives ball speed) while potentially interfering with the compliant, elastic properties necessary for the arm to serve as an effective conduit. The most effective throwers appear to be those who maintain a compliant, connected arm that allows proximal segments to supply nearly all the energy needed for high-velocity pitching. This study provides quantitative evidence supporting that principle and underscores the biomechanical value of promoting a passive, high-transfer throwing arm rather than one that attempts to contribute local power.

## Supporting Materials

Richards, D. E. (2001). *Basic engineering science: A systems, accounting, and modeling approach*. Rose-Hulman Institute of Technology. [https://eng.libretexts.org/Bookshelves/Introductory_Engineering/Basic_Engineering_Science_-_A_Systems_Accounting_and_Modeling_Approach_(Richards)/07%3A_Conservation_of_Energy/7.01%3A_Mechanics_and_the_Mechanical_Energy_Balance#:~:text=The%20time%20rate%20at%20which,F%7D%5C%29%20on%20the](https://eng.libretexts.org/Bookshelves/Introductory_Engineering/Basic_Engineering_Science_-_A_Systems_Accounting_and_Modeling_Approach_(Richards)/07%3A_Conservation_of_Energy/7.01%3A_Mechanics_and_the_Mechanical_Energy_Balance?utm_source=chatgpt.com#:~:text=The%20time%20rate%20at%20which,F%7D%5C%29%20on%20the) [Engineering LibreTexts+2Engineering LibreTexts+2](https://eng.libretexts.org/Bookshelves/Introductory_Engineering/Basic_Engineering_Science_-_A_Systems_Accounting_and_Modeling_Approach_%28Richards%29?utm_source=chatgpt.com)
Umberger, B. R., McLean, S. G., & Tso, M. (2013). Generation, absorption, and transfer of mechanical energy during walking in children. *Medical Engineering & Physics, 35*, 644–651. [https://www.umass.edu/locomotion/pdfs/mep-2013.pdf#:~:text=In%20human%20locomotion%2C%20the%20net,may%20cause%20energy%20to%20be](https://www.umass.edu/locomotion/pdfs/mep-2013.pdf?utm_source=chatgpt.com#:~:text=In%20human%20locomotion%2C%20the%20net,may%20cause%20energy%20to%20be)
Simonsen, E. B. et al. (2023). Propulsive fractions of joint work during maximal sprint: joint power was obtained by the formula. *[Journal name]*. [https://link.springer.com/article/10.1007/s11332-023-01121-4#:~:text=joint%20power%20was%20obtained%20by,the%20formula](https://link.springer.com/article/10.1007/s11332-023-01121-4?utm_source=chatgpt.com#:~:text=joint%20power%20was%20obtained%20by,the%20formula)