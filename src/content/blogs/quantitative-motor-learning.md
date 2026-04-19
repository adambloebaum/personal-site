---
title: "Quantitative Motor Learning Principles"
summary: "A quantitative framing of motor learning using control and optimization models."
date: "2026-02-17"
readTime: "20 min"
ogImage: "quantitative-motor-learning/1.jpg"
---

Motor learning is how the nervous system acquires, refines, and retains the ability to produce movement. It's what allows a child to ride a bike for the first time, or an athlete to go from great to world-class. While this process is not purely deterministic, it is also far from random. Motor learning is supported by identifiable biological mechanisms, many of which can be represented quantitatively.

Viewing motor learning from a quantitative perspective removes a large portion of the perceived magic of skill development. Rather than treating motor learning as a qualitative progression from "bad" to "good," we can represent the underlying processes with the same mathematics used in control systems engineering, signal processing, and optimization theory. Gradient descent, Kalman filtering, optimal control, and phase dynamics are all useful models for thinking about what the nervous system may be doing as it learns to produce skilled movement.

To present this effectively, we'll split motor learning into three phases: Exploration, Consolidation, and Automaticity. During exploration, the brain is searching a massive solution space with uncalibrated sensors and no predictive ability. During consolidation, it has found a rough solution and is now optimizing it to refine timing, reduce waste, and compress sequences. During automaticity, the solution is known, and the nervous system is finding ways to execute it faster, cheaper, and more reliably.

![](/images/quantitative-motor-learning/2.jpg)

An important note before we go further: these phases exist on a continuous spectrum. There are no hard boundaries where one ends and the next begins. The three-phase framework is a useful simplification for organizing the principles, not a claim for discrete motor learning stages.

## Key takeaways

- Motor learning is not a single process; it shifts in character over time.
- **Exploration** looks like high variability and heavy feedback dependence as the system searches a solution space.
- **Consolidation** looks like increasing consistency as the system optimizes timing, coordination, and efficiency.
- **Automaticity** looks like robust, low-attention execution as the nervous system hardens both control policies and the infrastructure that runs them.

Before getting into the principles themselves, we need to understand the biological and mechanical building blocks that everything depends on.

## Foundations of Motor Learning

### How Does Movement Occur?

Movement begins as an intention and ends as force applied. The path between those two runs through a signaling chain: the motor cortex generates a motor plan, transmits it down the spinal cord via descending pathways, which activate motor neurons that recruit motor units, which are bundles of muscle fibers that contract to produce force. This entire chain executes in milliseconds, and the exactness of the signal at every point matters.

But movement is not an open-loop process, where the output does not influence the input. The nervous system is constantly receiving feedback from many sensory systems operating in parallel. Proprioceptors in muscles and joints report limb position and force. The vestibular system reports head orientation and balance. The visual system streams the state of the external environment. These information sources are integrated in real time to monitor movement as it happens and adjust if necessary. We'll make this feedback loop explicit in Phase 1 (feedback control) and show how it increasingly shifts toward prediction in Phase 2.

The signaling chain is electrochemical, and motor learning involves many neurotransmitter and neuromodulator systems. Three that show up repeatedly in motor learning discussions are dopamine, glutamate, and GABA. Dopamine is often framed as a reinforcement signal, shaping which motor solutions are worth repeating. Glutamate is the primary excitatory neurotransmitter, driving synaptic transmission and many forms of plasticity. GABA is inhibitory, and its role is subtler but still critical: it helps refine neural activity by suppressing noise and sharpening useful patterns.

![](/images/quantitative-motor-learning/3.jpg)

In summary, a plan is generated, a signal is transmitted, muscles contract, sensors report back, and the system adjusts. Everything that follows in this article describes how this loop is tuned, optimized, and eventually automated.

### Why Does Movement Occur the Way It Does?

Given the same task and the same basic anatomy, two people will rarely produce identical movement. A throw, a swing, a jump — each person arrives at their own solution to the problem. But this isn't random noise or an issue to be fixed. It's the natural consequence of many interacting constraints that shape how any individual's nervous system organizes and executes a movement strategy.

The first set of constraints is individual. Each person possesses a unique biological profile shaped by their specific anatomy, ranges of motion, and strength-power qualities, as well as their personal injury history and neural wiring. These physical and neurological properties define the "landscape" of movements available to that person. Ultimately, these internal factors act as a filter, biasing the system toward certain motor solutions over others based on what the body is naturally equipped to handle.

The second set of constraints arises from the task itself. The specific goal, the rules of the game, and the precise timing demands all define what constitutes a successful movement. For example, a pitcher throwing a fastball for a strike and a basketball player sinking a jump shot are solving fundamentally different optimization problems. These task-specific requirements narrow the space of viable solutions, forcing the athlete to calibrate their movement to meet the specific objective at hand.

The third set of constraints is environmental, representing the global context in which the movement occurs. These are the external factors that exist independently of the individual or the specific task, such as the playing surface, ambient lighting, weather conditions, or even the social pressure of a crowd. Whether it is the friction of a track or the temperature of a gym, the environment provides the "stage" for action, requiring the mover to constantly adapt their technique to suit the world around them.

![](/images/quantitative-motor-learning/4.jpg)

Within these constraints, the nervous system doesn't compute a movement from scratch every time. Instead, it tends to settle into stable, preferred coordination patterns known as attractor states. These are movement solutions that the system naturally gravitates toward. This happens not because they were explicitly programmed, but because they represent dynamically stable configurations given the individual's constraints and the task demands. With practice, these attractors deepen and the movement becomes more stable, more repeatable, and harder to disrupt. We'll return to attractor stability in Phase 2 (coordination dynamics) and again in Phase 3 when skills become robust under pressure and interference.

This connects to a broader framework known as the perception-action cycle, a core component of dynamic systems theory. Movement and perception are not executed sequentially, but continuous, coupled processes. Sensory information shapes the motor command in real time, and the motor command changes the sensory landscape. The system is always looping, always updating.

Underpinning all of this is what Nikolai Bernstein referred to as the degrees of freedom problem. The human body has far more controllable joints, muscles, and motor units than any single task requires. A throw requires the coordination of dozens of degrees of freedom, and there are effectively infinite combinations that could produce a given ball velocity. Learning a motor skill is, in large part, the process of constraining this vast space into a functional, repeatable solution. Early in learning, the system freezes out degrees of freedom to simplify control. As skill develops, it progressively releases them, incorporating more of the body into a coordinated, efficient movement. In practice, this freeze → release progression often tracks the broader shift from exploration to consolidation.

![](/images/quantitative-motor-learning/5.jpg)

All of these factors: individual constraints, task demands, attractor dynamics, perception-action coupling, and degrees of freedom are ultimately implemented through patterns of neural activity. The variability of those firing patterns is high early in learning and decreases as the system converges on a solution. That transition from high variability to low variability is a consistent signature of motor learning, and it will show up repeatedly in the modeled principles ahead.

### What Areas of the Brain Control Movement?

Several brain structures play distinct roles in motor learning, and their relative contributions change as the individual becomes more skilled.

The motor cortex is the primary site of motor planning and voluntary movement initiation. It generates the descending commands that ultimately drive muscle contraction, and its firing patterns evolve as a skill is learned, becoming less noisy and more stable.

The cerebellum is often described as the brain's error correction engine. Early in learning, it operates reactively, comparing predicted outcomes to actual sensory feedback and computing correction signals. As learning progresses, it shifts toward feed-forward prediction, generating anticipatory adjustments before errors occur rather than correcting them after.

The basal ganglia are strongly implicated in reinforcement learning and habit formation. In early learning, they drive the trial-and-error cycle: an action is performed, a dopaminergic reward signal evaluates the outcome, and the connection between context and action is strengthened or weakened. As skill develops, the basal ganglia compress sequences of actions into "chunks" which are automatic packages that can be triggered as a unit rather than assembled step by step.

Spinal circuits handle reflex integration and motor unit recruitment. They are the final common pathway for motor commands and are extremely plastic, adapting to make motor unit recruitment patterns more efficient with repetition.

The prefrontal cortex tends to be more active during early learning, reflecting the effortful, attention-demanding nature of novel skill acquisition. As a skill becomes automatic, prefrontal activity decreases drastically and control shifts to subcortical motor networks, a tangible sign of automaticity.

Finally, oligodendrocytes are glial cells responsible for producing myelin, the insulating sheath that wraps frequently used axons. Myelination increases conduction velocity and reduces metabolic cost per neural signal. This process becomes particularly important in developing automaticity, where it represents the nervous system's infrastructure investment in well-learned skills.

![](/images/quantitative-motor-learning/6.jpg)

A few biological processes will recur throughout the phases and are worth defining briefly here. Synaptogenesis is the formation of new synaptic connections. Long-term potentiation (LTP) and long-term depression (LTD) are the strengthening and weakening of existing synapses, the core cellular mechanisms of circuit refinement. Dendritic spine growth, followed by stabilization, provides the physical substrate for memory formation. Lastly, cortical reorganization refers to the expansion of skill-specific cortical territory with practice, where the brain allocates more space to well-trained movements.

With this foundation in place, we can move into the three phases of motor learning and the quantitative models that describe them.

## Phase 1: Exploration

### What this phase looks like

- Attempts look **variable** from rep to rep as the system searches.
- Performance is **feedback-heavy**: lots of conscious correction during the movement.
- You see occasional "great" reps, but **consistency is low**.
- Timing and coordination are usually the limiting factors more than physical ability.
- It’s common to look briefly worse before looking better as new solutions are tried.

The first phase of motor learning is fundamentally a search problem. The nervous system has a goal of producing a movement that achieves some outcome, but it has no reliable model of how to get there. The sensory systems are uncalibrated for the task, the motor commands are imprecise, and there is no internal prediction to lean on. Much must be discovered through interaction with the environment.

Biologically, this phase is characterized by construction and variability. The motor cortex is forming new motor plans, generating descending commands that are rough and inconsistent. The cerebellum is operating reactively, comparing the predicted outcome of each movement to what actually happened and computing error correction signals. The basal ganglia are driving the core learning loop: a movement is attempted, a dopaminergic signal evaluates the outcome, and the association between that context and that motor solution is updated. At the synaptic level, new connections are forming through synaptogenesis, short-term potentiation is beginning to convert to LTP, and dendritic spines are growing. Neural firing variability is at its highest, which is not a bug but a feature, since the system needs to explore broadly before it can converge.

The quantitative models that describe this phase all deal with the same core challenge: learning from noisy, unreliable experience.

### Gradient-Based Error Minimization

The most fundamental model of how synaptic connections change with learning is gradient descent. Each time a movement is performed and an error is observed, the nervous system adjusts the synaptic weights that produced that movement in the direction that would reduce the error.

This can be expressed as:

$$
\Delta w = -\eta \cdot \frac{\partial E}{\partial w}
$$

where $w$ represents the synaptic weight, $\eta$ is the learning rate, and $E$ is the error — the discrepancy between the intended movement outcome and what actually occurred. The negative sign means the update moves in the direction of decreasing error. The partial derivative $\frac{\partial E}{\partial w}$ captures how sensitive the error is to a change in that particular connection.

If this looks familiar, it should. It is the same update rule used to train artificial neural networks via backpropagation. The biological implementation is much noisier, more local, and modulated by dopaminergic reward signals rather than a clean loss function, but the principle is the same. The system is iteratively descending an error surface, adjusting its parameters to move toward a minimum.

![](/images/quantitative-motor-learning/7.gif)

The learning rate $\eta$ matters here conceptually as well as mathematically. Early in learning, the system benefits from a relatively high learning rate, allowing for large updates in response to errors and rapid exploration of the solution space. As learning progresses and the system approaches a good solution, the effective learning rate decreases, allowing finer adjustments without overshooting. This mirrors common practice in machine learning (learning rate schedules, annealing), and there is evidence that the nervous system implements something functionally similar through changes in dopaminergic modulation and synaptic plasticity thresholds.

### Feedback Control

While gradient descent describes how the system learns across trials, feedback control describes how it manages movement within a single trial. When a novice performs a movement, they are heavily reliant on real-time sensory feedback to correct errors as they unfold. This can be modeled as a PID (Proportional-Integral-Derivative) controller:

$$
u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) \, d\tau + K_d \frac{de(t)}{dt}
$$

where $u(t)$ is the motor command at time $t$, $e(t)$ is the error — the difference between the desired state and the actual state — and $K_p$, $K_i$, and $K_d$ are the proportional, integral, and derivative gains, respectively.

The proportional term $K_p \cdot e(t)$ drives a correction proportional to the current error: the further off you are, the harder you correct. The integral term $K_i \cdot \int e(t) \, dt$ accumulates past errors, addressing persistent biases that the proportional term alone can't fix. The derivative term $K_d \cdot \frac{de}{dt}$ responds to the rate of change of the error, providing a damping effect that anticipates where the error is headed.

In a novice, the proportional and derivative gains tend to be high. The system is overcorrecting by reacting aggressively to every error signal and its rate of change. The result is movement that is jerky, inconsistent, and effortful.

This is why a beginner's movement looks the way it does. A novice tennis player receiving a serve is constantly adjusting the racket face angle, first too open, then too closed, then open again, because their control system is dominated by reactive, high-gain feedback. There is no predictive model yet to dampen the corrections. The system is doing the best it can with what it has: closing the loop through sensation, one correction at a time.

As we'll see in the next phase, the transition from feedback-dominant to feed-forward-dominant control is one of the major shifts in motor learning — and one that is relatively quantifiable.

### Bayesian Sensorimotor Updating and Kalman Filtering

The third principle in this phase addresses a different problem: state estimation. At any given moment during a movement, the brain needs to answer the question, "Where am I, and what just happened?" The answer comes from two sources: 1. an internal prediction (the prior) and 2. incoming sensory feedback (the observation). But both are noisy, and the brain has to combine them in a principled way — often modeled as Bayesian inference.

The Kalman filter provides a formal framework for this. It maintains a running estimate of the system's state and updates that estimate each time new sensory information arrives:

$$
\hat{x} = \hat{x}_{\text{predicted}} + K \cdot (z - \hat{x}_{\text{predicted}})
$$

where $\hat{x}$ is the updated state estimate, $\hat{x}_{\text{predicted}}$ is the prediction based on the internal model, $z$ is the actual sensory feedback, and $K$ is the Kalman gain: a weighting factor that determines how much the system trusts the new sensory information versus its own prediction.

The Kalman gain is the key to understanding this model's relevance to motor learning. When the internal model is poor, the prediction is unreliable, and the Kalman gain is high. The system leans heavily on sensory feedback because it doesn't yet have a good internal model to trust. This is why novice movement is so feedback-dependent and why disrupting sensory feedback (closing the eyes, adding noise) is so impactful on a beginner's performance.

![](/images/quantitative-motor-learning/8.gif)

A goalkeeper learning to track ball flight operates in this way. Early on, their attempts are dominated by visual correction through watching the ball, reacting to its position, adjusting in real time. There is no predictive model of ball trajectory yet, so every movement is a response to what the eyes are currently reporting. With experience, the internal model of ball flight improves, the Kalman gain drops, and the goalkeeper begins to move predictively, based on the predicted trajectory rather than the current visual input.

### Key takeaways

- Exploration is a **search** phase: high variability is expected and useful.
- Across trials, learning can be modeled as **gradient-based error minimization** (error-driven updates).
- Within a trial, early performance often depends on **high-gain feedback control** (PID-like correction).
- State estimation can be framed as **Bayesian updating**; the Kalman gain captures the trust balance between prediction and sensory input.
- As internal models improve, control begins shifting from reactive correction toward prediction, setting up consolidation.

## Phase 2: Consolidation

### What this phase looks like

- The movement becomes **repeatable**: you can reliably reproduce "good" reps.
- Corrections become **smaller and earlier**, with less mid-movement scrambling.
- The skill starts to feel **smoother** and more "timed" rather than forced.
- Attention demands drop: you can execute while thinking about higher-level strategy.
- Gains are often **slower but stickier** than in exploration.

If exploration is a search problem, consolidation is an optimization problem. The nervous system has found a workable solution, a motor plan that roughly accomplishes the task, and the challenge shifts from discovering what to do to refining how to do it. The goals shift to optimizing timing, reducing wasted energy, compressing sequences, and transitioning from reactive correction to predictive control.

The biological signatures of this phase reflect that shift. Motor cortex firing patterns stabilize; populations begin firing in more consistent, coordinated patterns than the variable, exploratory activity seen during exploration. The basal ganglia begin compressing action sequences into "chunks," packaging what were once individual, consciously assembled steps into unified, triggerable units. The cerebellum undergoes one of the most important transitions in the learning process: it shifts from feedback-based error correction to feed-forward prediction, generating anticipatory motor adjustments based on learned models of the body and the task rather than waiting for errors to occur and correcting them after the fact.

At the synaptic level, LTP and LTD work in concert across the cortex, cerebellum, and basal ganglia, strengthening connections that are part of the emerging solution and weakening those that aren't. Dendritic spines, which grew rapidly during exploration, now stabilize, consolidating into the durable structural substrate of long-term motor memory. Cortical maps reorganize, with skill-specific cortical territory expanding as the brain allocates more neural real estate to the trained movement. Habit loops solidify, where cue → movement → reward becomes an automatic sequence rather than a deliberate decision.

Neural firing variability — the hallmark of the exploration phase — decreases significantly. The system is converging. And the models that describe this phase are models of convergence: cost function optimization, force sequencing, and coordination dynamics.

### Optimal Control: LQR and Pontryagin's Minimum Principle

The central quantitative framework during consolidation is optimal control theory. Once the brain has a rough motor solution, it faces a decision: accuracy costs energy, and energy conservation costs accuracy. The question is no longer "what movement should I make?" but "what is the best version of this movement, given that I can't maximize everything at once?"

This tradeoff is formalized through a cost function:

$$
J = \int_{0}^{T} (\mathbf{x}^T Q \mathbf{x} + \mathbf{u}^T R \mathbf{u}) \, dt
$$

where $\mathbf{x}$ represents the state error — how far the movement deviates from the desired trajectory — and $\mathbf{u}$ represents the control input, or the effort being exerted. $Q$ is a weighting matrix that penalizes inaccuracy, and $R$ is a weighting matrix that penalizes effort. The integral is taken over the duration of the movement, from $t=0$ to $t=T$. The brain's job is to find the control strategy $u(t)$ that minimizes $J$, the best available compromise between precision and energy expenditure.

This is the Linear Quadratic Regulator (LQR) formulation, and its more general cousin, Pontryagin's Minimum Principle, extends the idea to nonlinear systems and more complex constraints. The core insight is the same: "efficient movement" is not a vague qualitative descriptor. It is the solution to a mathematically precise optimization problem with competing objectives.

![](/images/quantitative-motor-learning/9.gif)

The $Q$ and $R$ matrices are where task demands enter the model. A surgeon performing a microsurgical procedure needs extremely low state error. $Q$ is large, accuracy is incredibly important, and the system will spend energy freely to achieve precision. A distance runner, by contrast, needs to minimize effort over thousands of strides, so $R$ dominates, and the system tolerates small deviations in form to conserve metabolic resources. The brain adjusts these weightings based on context, and learning to set them appropriately is itself part of skill consolidation. This is why mechanical efficiency improves with skill development. It is not just repetition, but the progressive solution of a constrained optimization problem.

### Impulse-Momentum Transfer and Jerk Minimization

Optimal control describes what the brain is optimizing. The next two models describe how that optimization manifests in the physics of the movement itself.

Skilled movement is built on sequential force generation, applying precise magnitudes of force across body segments at the right time. The impulse-momentum theorem captures this relationship:

$$
J = \int F \cdot dt = \Delta p
$$

where $J$ is the impulse (force applied over time), and $\Delta p$ is the resulting change in momentum. For the rotational movements that dominate most sports skills, the angular analog applies:

$$
\int \tau \cdot dt = \Delta L
$$

where $\tau$ is torque and $\Delta L$ is the change in angular momentum.

The biomechanical principle here is segmental summation, the proximal-to-distal sequencing of force generation that characterizes skilled, high-velocity movement. Each segment in the chain accelerates, decelerates, and transfers its momentum to the next. The timing of these transfers is what separates effective and ineffective movement.

![](/images/quantitative-motor-learning/11.gif)

Skill refinement in the consolidation phase is, in large part, the optimization of this sequential summation. The nervous system is learning when to signal each segment, for how long, and at what intensity, tuning the impulse profile so that momentum transfers are smooth and additive rather than competing or leaking. Much like cracking a whip, energy must move from proximal to distal, with each segment amplifying the velocity of the next, resulting in a speed that far exceeds what any single segment could produce in isolation.

Alongside force sequencing, the motor cortex is optimizing for smoothness. The jerk minimization model formalizes this:

$$
\min \int \left( \frac{d^3 x}{dt^3} \right)^2 dt
$$

Jerk is the third derivative of position, or the rate of change of acceleration. Minimizing jerk produces trajectories that are smooth, continuous, and free of abrupt transitions.

This is not an aesthetic preference. Smooth movement is metabolically cheaper (fewer corrective muscle contractions), mechanically safer (lower peak joint loads from sudden accelerations), and more predictable (easier for the feed-forward system to model). The convergence toward minimum jerk is a direct consequence of the cost function optimization described above. It is what happens when the brain successfully reduces both state error and control effort simultaneously.

### Coordination Dynamics: The Haken-Kelso-Bunz Model

The final model in this phase addresses coordination: how the timing relationship between body segments stabilizes with practice.

The Haken-Kelso-Bunz (HKB) model describes the dynamics of relative phase between two oscillating components (limbs, segments, any coupled system) using a potential function:

$$
V(\phi) = -a \cdot \cos(\phi) - b \cdot \cos(2\phi)
$$

where $\phi$ is the relative phase between the two components, and $a$ and $b$ are parameters that determine the shape of the potential landscape. The system tends to settle into minima of this potential as stable coordination patterns, or attractor states.

At low movement frequencies, the potential landscape may have multiple minima, where the system can sustain different coordination patterns. But they are weakly stable and easily disrupted. With practice, the $\frac{a}{b}$ ratio changes. The preferred coordination mode deepens, becomes more stable, more resistant to perturbation, and easier to maintain under varying conditions. Phase transitions occur: coordination patterns that were previously available become unstable and the system snaps into the more practiced, more deeply entrenched pattern. The HKB model gives us a precise understanding that stable coordination is a deep potential minimum, and practice reshapes the potential landscape.

![](/images/quantitative-motor-learning/10.gif)

When learning how to swim, the timing between arm stroke and leg kick is inconsistent, but the system can support various phase relationships due to the low movement frequency. With increased frequency, a new ideal phase emerges, and the coupling between stroke and kick tightens until it becomes self-sustaining. Even when perturbed due to fatigue or a change in pace, it returns to the deepened attractor state.

### Key takeaways

- Consolidation is **optimization**: refining a workable solution rather than searching for one.
- Optimal control frames skilled movement as a tradeoff between **accuracy** (weighted by $Q$) and **effort** (weighted by $R$).
- Refinement includes **timing and force sequencing** and a push toward smoother trajectories (often described with jerk minimization).
- Coordination patterns stabilize into deeper **attractor states**, making the movement harder to disrupt.
- The overall signature is decreasing variability and increasing feed-forward prediction.

## Phase 3: Automaticity

### What this phase looks like

- Execution feels **low-effort**: you can "just do it" without step-by-step control.
- Performance becomes **robust** across context changes, fatigue, and pressure.
- Timing tightens: actions feel **earlier, faster, and cleaner** rather than reactive.
- The movement holds together while attention shifts to strategy, opponents, or environment.
- The skill becomes more **durable**: it decays more slowly and is less easily disrupted.

The transition to automaticity is a fundamental shift in the nature of the problem. The nervous system has found its solution and optimized it. The motor plan is stable, the coordination patterns are ingrained, and the feed-forward models are accurate. What increasingly limits performance is less about finding the right solution and more about the speed, efficiency, and reliability of executing it. To move toward automaticity, the infrastructure often needs to be upgraded.

Biologically, one of the most important processes in this phase is myelination. Oligodendrocytes wrap frequently used axons in myelin, a fatty insulating sheath that dramatically increases conduction velocity and reduces the metabolic cost of signal transmission. It reflects a literal, physical change to the wiring of the nervous system, and it is activity-dependent: pathways that fire frequently and consistently tend to become more myelinated over time.

The other biological signatures follow the same infrastructure logic. Control tends to shift toward more efficient circuits: the basal ganglia run chunked sequences, spinal circuits handle reflex integration with faster loop times, and prefrontal involvement drops as the skill becomes less attention-demanding. In broad terms, execution can look "cheaper" neurally: movements that once required effortful, cortex-heavy processing begin running on more efficient patterns.

It also helps to separate **infrastructure** from **control policy**. Infrastructure changes (like increased myelination and faster, lower-noise communication) raise the ceiling on speed and reliability. In parallel, control-level changes (like chunking and better feed-forward predictions) determine what gets executed. Automaticity is the combination: better policies running on better wiring. Skills become resistant to decay and robust to interference. The neural representation is consolidated, insulated, and durable.

The quantitative models in this phase describe the measurable consequences of these infrastructure changes: faster signaling, tighter synchrony, and lower energy cost per action.

### Myelination and Conduction Speed

Myelination can increase axon conduction velocity. The proportionalities below are simplified scaling intuitions (not exact biophysical laws), but they capture the core idea: better-insulated fibers can carry signals faster.

In unmyelinated axons, conduction velocity is often approximated as increasing with axon diameter:

$$
v \propto d
$$

where $d$ is the axon diameter. The signal propagates continuously along the membrane, and wider axons generally reduce resistance and speed propagation.

With myelination, the relevant size scale becomes the *effective* fiber diameter (axon + myelin). If $d$ is the axon diameter and $t$ is the myelin thickness, the total fiber diameter is:

$$
D = d + 2t
$$

and conduction velocity is often described as increasing with $D$:

$$
v \propto D
$$

The myelin sheath also enables saltatory conduction, where the action potential jumps between nodes of Ranvier, which tends to be faster and more energy-efficient than continuous propagation. The result is a substantial increase in signal transmission speed without requiring a larger axon.

The information content of the signal hasn't changed. The motor command is the same, but it arrives faster and with less energy lost in transit. For motor performance, this matters enormously. Within a given window to complete a task, dozens of muscles must activate and deactivate in precise sequence. Conduction velocity constrains how tightly these activation windows can be packed. Faster signals mean finer temporal resolution, which supports more precise force summation.
### Timing Synchrony and Phase Locking

Faster conduction is necessary but not completely sufficient. The signals must not only arrive quickly, but also together. Automaticity is characterized by an increase in neural synchrony: populations of neurons that contribute to a skilled movement begin firing in tightly coordinated temporal patterns.

This synchrony can be quantified using the phase-locking value:

$$
PLV = \left| \langle e^{i\phi(t)} \rangle \right|
$$

where $\phi(t)$ is the instantaneous phase of a neural oscillation and the angle brackets denote averaging over time. The PLV ranges from 0 (no consistent phase relationship, neurons firing independently) to 1 (perfect phase locking, neurons firing in precise temporal coordination). Well-trained motor networks show higher PLV values than untrained ones, and this increase correlates with improved performance.

![](/images/quantitative-motor-learning/12.gif)

The functional result is precise co-activation. A back handspring involves the coordinated activation of over dozens of muscles, many of which must fire within millisecond windows of each other to produce an effective movement. If the neural signals driving these muscles are asynchronous — arriving at slightly different times, slightly different phases — the resulting force production is imprecise and suboptimal. High phase-locking values mean the signals arrive in lockstep, producing sharp, well-timed force summation.

### Energy Optimization, Hick-Hyman Law, and Fitts' Law

The final model in this phase captures the metabolic and decision-making efficiencies that emerge with automaticity.

Neural economy improves measurably as skills become automatic. This can be expressed as:

$$
\eta = \frac{W_{\text{useful}}}{E_{\text{total}}}
$$

where $W_{\text{useful}}$ is the useful mechanical work produced and $E_{\text{total}}$ is the total energy expended, including muscular, neural, and metabolic costs. Myelination contributes directly to this ratio by lowering the ATP cost per neural spike. Subcortical control transfer contributes by reducing the metabolic overhead of cortical processing. The net result is more output per unit of biological investment. Elite skill is, in a very real sense, maximum power at minimum neural cost.

Decision-making speed also improves, and this is captured by the Hick-Hyman Law:

$$
RT = a + b \cdot \log_2(n + 1)
$$

where $RT$ is reaction time, $n$ is the number of stimulus-response alternatives, and $a$ and $b$ are empirically determined constants. Reaction time increases logarithmically with the number of choices. But experts effectively reduce $n$ through chunking and pattern recognition. An experienced point guard doesn't evaluate every possible pass, dribble, and shot independently. They recognize the player configurations on the court as a pattern they've seen before, which maps to a small set of pre-compiled responses. The effective number of alternatives collapses, and reaction time drops accordingly.

Finally, Fitts' Law describes the speed-accuracy tradeoff in aimed movements. As motor noise decreases through infrastructure upgrades, the speed-accuracy tradeoff improves. The performer can move faster without sacrificing accuracy, or achieve greater accuracy without slowing down.

$$
MT = a + b \cdot \log_2 \left( \frac{D}{W} + 1 \right)
$$

The Fitts' Law relationship doesn't disappear, but the operating point shifts: the entire curve moves in the favorable direction. This is the quantitative expression of what observers describe qualitatively when they say an expert "makes it look easy." The tradeoff inflection point has moved.

### Key takeaways

- Automaticity is about **reliable execution**: stable policies running on fast, efficient infrastructure.
- Myelination and circuit routing changes can support **faster, lower-noise signaling** and reduced energetic cost.
- Tight timing depends not only on speed but also on **synchrony**, where neural populations fire in coordinated phases.
- As decision and control costs drop, skills feel less attention-demanding and more durable under interference.

## Conclusion

Motor learning, viewed quantitatively, tends to follow a trajectory. In the exploration phase, the system explores a vast solution space using noisy gradient descent, reactive feedback control, and Bayesian state estimation, to learn what works by trying, failing, sensing, and updating. In the consolidation phase, the system optimizes the solution it has found, minimizing cost functions that trade accuracy against effort, refining the sequential force generation that produces skilled movement, and stabilizing coordination patterns into deep attractor states. In the automaticity phase, the system hardens its infrastructure through the myelination of pathways, synchronizing neural populations, and reducing the metabolic cost of execution until the skill runs automatically on dedicated, high-speed, energy-efficient hardware.

This progression — exploration, optimization, infrastructure — is not unique to motor learning. It is the general pattern of any complex system moving from prototype to production. The brain first searches the design space, then optimizes the design, then builds the systems needed to manufacture it reliably at scale.

The practical implication is simple: practice demands should change over time. Aligning constraints, feedback, and repetition with the phase you're in is the difference between accelerating learning and fighting it.

The nervous system is, in many ways, the most sophisticated control system in existence. It senses, predicts, corrects, optimizes, and rebuilds itself, all in the service of producing skilled movement. The mathematics we use to describe it are borrowed from engineering, physics, and optimization theory, but the system itself came first. The brain was solving these problems long before we had the equations to describe them.