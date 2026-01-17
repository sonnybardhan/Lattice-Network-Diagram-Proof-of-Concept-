# Lattice Mental Models Filtering System

## Complete Reference Document

---

## Overview

This filtering system narrows 121 mental models to actionable clusters of ≤5 models through progressive questioning:

- **L1:** 12 yes/no characteristic questions → builds initial pool
- **L2:** Tag-specific narrowing questions → reduces to ~6-10 models
- **L3:** Optional refinement questions → final cluster of ≤5 models

---

## Filtering Flow

```
User describes scenario
        ↓
L1: Answer 12 yes/no questions (or 6 reduced set)
        ↓
Pool models from all "yes" tags
        ↓
Deduplicate
        ↓
If pool ≤ 6 → Done, show cluster
        ↓
If pool > 6 → Ask L2 for top 2-3 tags (by model count)
        ↓
Combine L2 results, deduplicate
        ↓
If pool ≤ 5 → Done, show cluster
        ↓
If pool > 5 → Ask L3 for largest contributing L2 branches
        ↓
Final cluster (≤5 models)
```

---

## L1: Characteristic Questions

### Full Set (12 Questions)

Ordered by concreteness (easiest to answer first):

| #   | Question                                                                     | Tag                       |
| --- | ---------------------------------------------------------------------------- | ------------------------- |
| 1   | Are you weighing options or deciding what to do?                             | `decision-prioritization` |
| 2   | Is someone acting in a way that doesn't make sense?                          | `unexpected-behavior`     |
| 3   | Does someone know something important that others don't?                     | `incomplete-information`  |
| 4   | Is something ending, shifting, or being replaced?                            | `change-disruption`       |
| 5   | Are other people's perceptions, actions, or cooperation part of this?        | `social-dynamics`         |
| 6   | Is there a downside that matters, or real uncertainty about outcomes?        | `risk-uncertainty`        |
| 7   | Is there friction around time, energy, or getting started?                   | `resource-management`     |
| 8   | Does this involve something growing, compounding, or feeding back on itself? | `systems-growth`          |
| 9   | Does how this feels, looks, or will be remembered matter?                    | `experience-perception`   |
| 10  | Are you competing with others or trying to maintain a position?              | `competition-strategy`    |
| 11  | Is this about your own skill, growth, or motivation?                         | `personal-performance`    |
| 12  | Could your own thinking be part of the problem here?                         | `thinking-clearly`        |

### Reduced Set (6 Questions)

For faster filtering when 12 feels like too many:

| #   | Question                                                              | Tag                       |
| --- | --------------------------------------------------------------------- | ------------------------- |
| 1   | Are you weighing options or deciding what to do?                      | `decision-prioritization` |
| 2   | Is someone acting in a way that doesn't make sense?                   | `unexpected-behavior`     |
| 3   | Is something ending, shifting, or being replaced?                     | `change-disruption`       |
| 4   | Does someone know something important that others don't?              | `incomplete-information`  |
| 5   | Is there friction around time, energy, or getting started?            | `resource-management`     |
| 6   | Is there a downside that matters, or real uncertainty about outcomes? | `risk-uncertainty`        |

---

## L2 & L3: Complete Reference by Tag

---

### 1. `decision-prioritization` (21 models)

**Models:** Eisenhower Matrix, Pareto Principle, Reversibility, Implementation Intentions, Diminishing Returns, Opportunity Cost, Forcing Function, BATNA, Satisficing, Pre-mortem, Inversion, Regret Minimization, Expected Value, First Principles, Optionality, Comparative Advantage, Via Negativa, Via Positiva vs. Via Negativa, Barbell Strategy, Zero-Risk Bias, Mental Accounting

**L2 Question:** _"What's the core decision challenge?"_

| L2 Option                                          | Models                                                                       | Has L3? |
| -------------------------------------------------- | ---------------------------------------------------------------------------- | ------- |
| I have too many options and need to prioritize     | Eisenhower Matrix, Pareto Principle, Satisficing                             | Yes     |
| I need to evaluate trade-offs between choices      | Opportunity Cost, Comparative Advantage, Expected Value, Diminishing Returns | Yes     |
| I want to keep options open or stay flexible       | Reversibility, Optionality, Barbell Strategy                                 | No      |
| I need a fallback or negotiation baseline          | BATNA                                                                        | No      |
| I want to stress-test or de-risk my decision       | Pre-mortem, Inversion, Regret Minimization                                   | Yes     |
| I'm stuck and need to reframe from scratch         | First Principles, Via Negativa, Via Positiva vs. Via Negativa                | Yes     |
| I need to actually follow through on this decision | Implementation Intentions, Forcing Function                                  | No      |
| I'm being irrational about risk or categories      | Zero-Risk Bias, Mental Accounting                                            | No      |

#### L3 for "I have too many options and need to prioritize"

**L3 Question:** _"What's the prioritization challenge?"_

| Option                                        | Model             |
| --------------------------------------------- | ----------------- |
| Separating urgent from important              | Eisenhower Matrix |
| Finding the vital few that drive most results | Pareto Principle  |
| Accepting good enough to move forward         | Satisficing       |

#### L3 for "I need to evaluate trade-offs between choices"

**L3 Question:** _"What's the nature of the trade-off?"_

| Option                                         | Model                 |
| ---------------------------------------------- | --------------------- |
| Choosing between fundamentally different paths | Opportunity Cost      |
| Deciding where to focus my limited strengths   | Comparative Advantage |
| Weighing probabilities and payoffs             | Expected Value        |
| Wondering if more effort is worth it           | Diminishing Returns   |

#### L3 for "I want to stress-test or de-risk my decision"

**L3 Question:** _"How do you want to stress-test?"_

| Option                                            | Model               |
| ------------------------------------------------- | ------------------- |
| Imagine future failure and work backward          | Pre-mortem          |
| Ask what would guarantee failure and avoid that   | Inversion           |
| Consider which choice I'll regret least long-term | Regret Minimization |

#### L3 for "I'm stuck and need to reframe from scratch"

**L3 Question:** _"How do you want to reframe?"_

| Option                                          | Model                         |
| ----------------------------------------------- | ----------------------------- |
| Break it down to fundamental truths and rebuild | First Principles              |
| Figure out what to remove or stop doing         | Via Negativa                  |
| Decide whether to add or subtract               | Via Positiva vs. Via Negativa |

---

### 2. `unexpected-behavior` (11 models)

**Models:** Incentives, Hanlon's Razor, Revealed Preference, Empathy Gap (Hot-Cold), Goodhart's Law, Cobra Effect, Principal-Agent Problem, Hyperbolic Discounting, Moral Hazard, Fundamental Attribution Error, Mimetic Desire

**L2 Question:** _"What might explain the behavior?"_

| L2 Option                                                        | Models                                                     | Has L3? |
| ---------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| They're responding to rewards or penalties I haven't considered  | Incentives, Moral Hazard, Principal-Agent Problem          | Yes     |
| A metric or rule is creating perverse outcomes                   | Goodhart's Law, Cobra Effect                               | No      |
| I'm misreading their motives or situation                        | Hanlon's Razor, Fundamental Attribution Error, Empathy Gap | Yes     |
| Their actions reveal what they actually want (vs. what they say) | Revealed Preference, Mimetic Desire                        | No      |
| They're prioritizing now over later                              | Hyperbolic Discounting                                     | No      |

#### L3 for "They're responding to rewards or penalties I haven't considered"

**L3 Question:** _"What's the relationship between you and them?"_

| Option                                                        | Model                   |
| ------------------------------------------------------------- | ----------------------- |
| They're acting on their own interests, not related to me      | Incentives              |
| They're supposed to be acting on my behalf                    | Principal-Agent Problem |
| They're taking risks because they won't bear the consequences | Moral Hazard            |

#### L3 for "I'm misreading their motives or situation"

**L3 Question:** _"What might I be getting wrong?"_

| Option                                                       | Model                         |
| ------------------------------------------------------------ | ----------------------------- |
| Assuming bad intent when it's probably just incompetence     | Hanlon's Razor                |
| Blaming their character when it's really their circumstances | Fundamental Attribution Error |
| Can't imagine how they feel in their emotional state         | Empathy Gap                   |

---

### 3. `incomplete-information` (10 models)

**Models:** Information Asymmetry, Circle of Competence, Curse of Knowledge, Base Rates, Regression to the Mean, Map vs Territory, Bayes' Theorem, Adverse Selection, Black Swan, Knightian Uncertainty

**L2 Question:** _"What's the nature of the information gap?"_

| L2 Option                                                      | Models                                                       | Has L3? |
| -------------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| Someone knows more than I do (or vice versa)                   | Information Asymmetry, Adverse Selection, Curse of Knowledge | Yes     |
| I'm working with probabilities or incomplete data              | Base Rates, Bayes' Theorem, Regression to the Mean           | Yes     |
| My mental model might not match reality                        | Map vs Territory, Circle of Competence                       | No      |
| There's fundamental uncertainty—I can't know what I don't know | Black Swan, Knightian Uncertainty                            | No      |

#### L3 for "Someone knows more than I do (or vice versa)"

**L3 Question:** _"What's the consequence of the information gap?"_

| Option                                         | Model                 |
| ---------------------------------------------- | --------------------- |
| It affects negotiation or transaction outcomes | Information Asymmetry |
| It's attracting the wrong participants         | Adverse Selection     |
| I can't communicate what I know effectively    | Curse of Knowledge    |

#### L3 for "I'm working with probabilities or incomplete data"

**L3 Question:** _"What's the probability challenge?"_

| Option                                                       | Model                  |
| ------------------------------------------------------------ | ---------------------- |
| I need to know the general odds before considering specifics | Base Rates             |
| I need to update my beliefs with new evidence                | Bayes' Theorem         |
| I'm seeing extreme results that might not persist            | Regression to the Mean |

---

### 4. `change-disruption` (12 models)

**Models:** Sunk Cost Fallacy, Status Quo Bias, Unintended Consequences, Chesterton's Fence, Second-Order Thinking, Second-Order Effects, Path Dependence, Lindy Effect, Antifragile, Phase Transitions, Commitment Bias, Creative Destruction

**L2 Question:** _"What's the nature of the change?"_

| L2 Option                                                           | Models                                                               | Has L3? |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | ------- |
| Something new is replacing something old                            | Creative Destruction, Lindy Effect                                   | No      |
| Past investments are clouding current judgment                      | Sunk Cost Fallacy, Commitment Bias, Status Quo Bias                  | Yes     |
| I need to think through downstream consequences                     | Second-Order Thinking, Second-Order Effects, Unintended Consequences | Yes     |
| I'm tempted to change something without understanding why it exists | Chesterton's Fence                                                   | No      |
| History or structure constrains what's possible                     | Path Dependence                                                      | No      |
| The system might break—or get stronger—under stress                 | Antifragile, Phase Transitions                                       | Yes     |

#### L3 for "Past investments are clouding current judgment"

**L3 Question:** _"What's driving the attachment to the current path?"_

| Option                                       | Model             |
| -------------------------------------------- | ----------------- |
| I've invested too much to walk away          | Sunk Cost Fallacy |
| I made a commitment and feel I must honor it | Commitment Bias   |
| Staying feels safer even if change is better | Status Quo Bias   |

#### L3 for "I need to think through downstream consequences"

**L3 Question:** _"What's the concern about consequences?"_

| Option                                               | Model                   |
| ---------------------------------------------------- | ----------------------- |
| I need a framework for thinking beyond the immediate | Second-Order Thinking   |
| I want to trace the chain of effects from effects    | Second-Order Effects    |
| I'm worried about outcomes I'm not intending         | Unintended Consequences |

#### L3 for "The system might break—or get stronger—under stress"

**L3 Question:** _"What's the relationship with stress?"_

| Option                                     | Model             |
| ------------------------------------------ | ----------------- |
| It could gain from disorder and volatility | Antifragile       |
| It could suddenly shift to a new state     | Phase Transitions |

---

### 5. `social-dynamics` (10 models)

**Models:** Reciprocation, Social Proof, Liking Bias, Authority Bias, Signaling, Prisoner's Dilemma, Tragedy of the Commons, Nash Equilibrium, Mimetic Desire, Commitment Bias

**L2 Question:** _"What's the social dynamic at play?"_

| L2 Option                                                 | Models                                                       | Has L3? |
| --------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| Actions are about perception or status, not just outcomes | Signaling, Mimetic Desire                                    | Yes     |
| People are following others or deferring to authority     | Social Proof, Authority Bias                                 | No      |
| Give-and-take, liking, or obligation is shaping behavior  | Reciprocation, Liking Bias, Commitment Bias                  | Yes     |
| Individual incentives conflict with group outcomes        | Prisoner's Dilemma, Tragedy of the Commons, Nash Equilibrium | Yes     |

#### L3 for "Actions are about perception or status, not just outcomes"

**L3 Question:** _"What's the signaling dynamic?"_

| Option                                                          | Model          |
| --------------------------------------------------------------- | -------------- |
| Someone is communicating value or intent through costly actions | Signaling      |
| Someone wants something because others want it                  | Mimetic Desire |

#### L3 for "Give-and-take, liking, or obligation is shaping behavior"

**L3 Question:** _"What's the social mechanism?"_

| Option                                        | Model           |
| --------------------------------------------- | --------------- |
| Feeling obligated to return favors            | Reciprocation   |
| Being influenced because I like them          | Liking Bias     |
| Feeling bound by past statements or positions | Commitment Bias |

#### L3 for "Individual incentives conflict with group outcomes"

**L3 Question:** _"What's the structure of the conflict?"_

| Option                                                         | Model                  |
| -------------------------------------------------------------- | ---------------------- |
| Two parties, both better off cooperating but tempted to defect | Prisoner's Dilemma     |
| Shared resource being depleted by individual use               | Tragedy of the Commons |
| Stable state where no one can improve alone                    | Nash Equilibrium       |

---

### 6. `risk-uncertainty` (7 models)

**Models:** Skin in the Game, Margin of Safety, Asymmetric Risk, Precautionary Principle, Ergodicity, Extinction Events, Black Swan

**L2 Question:** _"What's the risk profile?"_

| L2 Option                                                | Models                                                 | Has L3? |
| -------------------------------------------------------- | ------------------------------------------------------ | ------- |
| Upside and downside aren't balanced                      | Asymmetric Risk                                        | No      |
| The downside is catastrophic or irreversible             | Precautionary Principle, Extinction Events, Black Swan | Yes     |
| Someone's exposure to consequences shapes their behavior | Skin in the Game                                       | No      |
| I need buffer room for error                             | Margin of Safety                                       | No      |
| Repeated exposure to risk changes the math               | Ergodicity                                             | No      |

#### L3 for "The downside is catastrophic or irreversible"

**L3 Question:** _"What's the nature of the catastrophic risk?"_

| Option                                             | Model                   |
| -------------------------------------------------- | ----------------------- |
| I should act cautiously even without full evidence | Precautionary Principle |
| This could wipe me out completely—no recovery      | Extinction Events       |
| This is a rare, unpredictable, high-impact event   | Black Swan              |

---

### 7. `resource-management` (4 models)

**Models:** Cognitive Load, Parkinson's Law, Activation Energy, Planning Fallacy

**L2 Question:** _"What's the resource problem?"_

| L2 Option                                     | Models            | Has L3? |
| --------------------------------------------- | ----------------- | ------- |
| Work is expanding to fill available time      | Parkinson's Law   | No      |
| My estimates were too optimistic              | Planning Fallacy  | No      |
| I'm mentally overloaded or can't focus        | Cognitive Load    | No      |
| I can't get started—there's too much friction | Activation Energy | No      |

_No L3 needed—all L2 options map to single models._

---

### 8. `systems-growth` (19 models)

**Models:** Tight Feedback Loops, Feedback Loops, Redundancy, Compound Interest, Diversification, Leverage Points, Local vs. Global Maxima, Power Law, Economies of Scale, Network Effects, Arbitrage, Winner-Take-Most, Critical Mass, Economic Moats, Multiplicative Systems, Emergence, Scale-Free Networks, Carrying Capacity, Mr. Market

**L2 Question:** _"What system dynamic are you thinking about?"_

| L2 Option                                                       | Models                                                                          | Has L3? |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| Small inputs compounding into big outputs over time             | Compound Interest, Multiplicative Systems                                       | No      |
| Loops that amplify or dampen themselves                         | Feedback Loops, Tight Feedback Loops                                            | No      |
| Where to intervene for maximum effect                           | Leverage Points                                                                 | No      |
| Why some things dominate while others stay small                | Power Law, Network Effects, Winner-Take-Most, Economies of Scale, Critical Mass | Yes     |
| How complex behavior arises from simple parts                   | Emergence, Scale-Free Networks                                                  | No      |
| Building resilience or spreading risk                           | Redundancy, Diversification                                                     | Yes     |
| Competitive advantage or market dynamics                        | Economic Moats, Arbitrage, Mr. Market                                           | Yes     |
| Being stuck in a suboptimal position, or hitting natural limits | Local vs. Global Maxima, Carrying Capacity                                      | No      |

#### L3 for "Why some things dominate while others stay small"

**L3 Question:** _"What's driving the dominance?"_

| Option                                                         | Model              |
| -------------------------------------------------------------- | ------------------ |
| The distribution is extremely unequal (few giants, many small) | Power Law          |
| Each additional user makes it more valuable for everyone       | Network Effects    |
| The market naturally consolidates to one or few winners        | Winner-Take-Most   |
| Bigger players have lower per-unit costs                       | Economies of Scale |
| There's a threshold after which growth becomes self-sustaining | Critical Mass      |

#### L3 for "Building resilience or spreading risk"

**L3 Question:** _"What's the resilience strategy?"_

| Option                                          | Model           |
| ----------------------------------------------- | --------------- |
| Duplicate critical components so there's backup | Redundancy      |
| Spread bets across uncorrelated outcomes        | Diversification |

#### L3 for "Competitive advantage or market dynamics"

**L3 Question:** _"What's the market dynamic?"_

| Option                                           | Model          |
| ------------------------------------------------ | -------------- |
| Durable advantage that protects from competition | Economic Moats |
| Price differences to exploit                     | Arbitrage      |
| Emotional market behavior creating opportunity   | Mr. Market     |

---

### 9. `experience-perception` (12 models)

**Models:** Default Effect, Switching Costs, Recency Bias, Contrast Effect, Anchoring, Peak-End Rule, Mere Exposure Effect, Loss Aversion, Framing Effect, Endowment Effect, Hedonic Adaptation, Scarcity vs. Abundance

**L2 Question:** _"What aspect of perception or experience is at play?"_

| L2 Option                                           | Models                                                           | Has L3? |
| --------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| How something is remembered vs. how it actually was | Peak-End Rule, Recency Bias                                      | No      |
| How context or comparison shapes perception         | Contrast Effect, Anchoring, Framing Effect                       | Yes     |
| Why people resist giving something up or changing   | Loss Aversion, Endowment Effect, Default Effect, Switching Costs | Yes     |
| Why familiarity or exposure changes preference      | Mere Exposure Effect                                             | No      |
| Why satisfaction fades or expectations shift        | Hedonic Adaptation, Scarcity vs. Abundance                       | No      |

#### L3 for "How context or comparison shapes perception"

**L3 Question:** _"What's shaping the perception?"_

| Option                                | Model           |
| ------------------------------------- | --------------- |
| A starting number is biasing judgment | Anchoring       |
| Comparison is distorting perception   | Contrast Effect |
| Presentation is changing the reaction | Framing Effect  |

#### L3 for "Why people resist giving something up or changing"

**L3 Question:** _"What's the source of the resistance?"_

| Option                                                    | Model            |
| --------------------------------------------------------- | ---------------- |
| The fear of loss outweighs the potential gain             | Loss Aversion    |
| They overvalue it simply because they own it              | Endowment Effect |
| The current option is pre-selected and requires no action | Default Effect   |
| Changing would cost time, money, or effort                | Switching Costs  |

---

### 10. `competition-strategy` (4 models)

**Models:** Red Queen Effect, Sexual Selection, Easterbrook's Paradox, Comparative Advantage

**L2 Question:** _"What's the competitive dynamic?"_

| L2 Option                                                         | Models                | Has L3? |
| ----------------------------------------------------------------- | --------------------- | ------- |
| I have to keep running just to stay in place                      | Red Queen Effect      | No      |
| Competition is selecting for traits that aren't purely functional | Sexual Selection      | No      |
| Progress is happening but satisfaction isn't increasing           | Easterbrook's Paradox | No      |
| I should focus where I have relative advantage                    | Comparative Advantage | No      |

_No L3 needed—all L2 options map to single models._

---

### 11. `personal-performance` (5 models)

**Models:** Growth vs Fixed Mindset, Deliberate Practice, Desirable Difficulty, Impostor Syndrome, Scarcity vs. Abundance

**L2 Question:** _"What's the performance challenge?"_

| L2 Option                                         | Models                                    | Has L3? |
| ------------------------------------------------- | ----------------------------------------- | ------- |
| My beliefs about ability are limiting me          | Growth vs Fixed Mindset                   | No      |
| I need to improve faster or more effectively      | Deliberate Practice, Desirable Difficulty | Yes     |
| I'm doubting myself despite evidence I'm capable  | Impostor Syndrome                         | No      |
| My mindset about resources is shaping my behavior | Scarcity vs. Abundance                    | No      |

#### L3 for "I need to improve faster or more effectively"

**L3 Question:** _"What's the improvement need?"_

| Option                                       | Model                |
| -------------------------------------------- | -------------------- |
| Structured practice with feedback at my edge | Deliberate Practice  |
| Embracing difficulty that enhances learning  | Desirable Difficulty |

---

### 12. `thinking-clearly` (11 models)

**Models:** Occam's Razor, Multicausal, Steelmanning, Confirmation Bias, Availability Bias, Survivorship Bias, Narrative Fallacy, Hindsight Bias, Abstraction Ladders, Lollapalooza Effect, Dunning-Kruger Effect

**L2 Question:** _"What thinking trap or technique applies?"_

| L2 Option                                          | Models                               | Has L3? |
| -------------------------------------------------- | ------------------------------------ | ------- |
| I might be seeing what I want to see               | Confirmation Bias                    | No      |
| I'm overweighting what's easy to recall or vivid   | Availability Bias, Survivorship Bias | Yes     |
| I'm retrofitting a story onto what happened        | Hindsight Bias, Narrative Fallacy    | Yes     |
| I need to simplify or find the core explanation    | Occam's Razor, Abstraction Ladders   | No      |
| I need to consider multiple causes or perspectives | Multicausal, Steelmanning            | No      |
| Multiple forces are combining in unexpected ways   | Lollapalooza Effect                  | No      |
| My confidence doesn't match my competence          | Dunning-Kruger Effect                | No      |

#### L3 for "I'm overweighting what's easy to recall or vivid"

**L3 Question:** _"What's making it too available?"_

| Option                                           | Model             |
| ------------------------------------------------ | ----------------- |
| Vivid or emotional examples dominate my thinking | Availability Bias |
| I'm only seeing the winners, not the failures    | Survivorship Bias |

#### L3 for "I'm retrofitting a story onto what happened"

**L3 Question:** _"What's the storytelling trap?"_

| Option                                                  | Model             |
| ------------------------------------------------------- | ----------------- |
| Thinking I knew it all along after learning the outcome | Hindsight Bias    |
| Creating a narrative for what might be random events    | Narrative Fallacy |

---

## Complete Model List by Tag

### `decision-prioritization` (21 models)

1. Eisenhower Matrix
2. Pareto Principle
3. Reversibility
4. Implementation Intentions
5. Diminishing Returns
6. Opportunity Cost
7. Forcing Function
8. BATNA
9. Satisficing
10. Pre-mortem
11. Inversion
12. Regret Minimization
13. Expected Value
14. First Principles
15. Optionality
16. Comparative Advantage\*
17. Via Negativa
18. Via Positiva vs. Via Negativa
19. Barbell Strategy
20. Zero-Risk Bias
21. Mental Accounting

### `unexpected-behavior` (11 models)

1. Incentives
2. Hanlon's Razor
3. Revealed Preference
4. Empathy Gap (Hot-Cold)
5. Goodhart's Law
6. Cobra Effect
7. Principal-Agent Problem
8. Hyperbolic Discounting
9. Moral Hazard
10. Fundamental Attribution Error
11. Mimetic Desire\*

### `incomplete-information` (10 models)

1. Information Asymmetry
2. Circle of Competence
3. Curse of Knowledge
4. Base Rates
5. Regression to the Mean
6. Map vs Territory
7. Bayes' Theorem
8. Adverse Selection
9. Black Swan\*
10. Knightian Uncertainty

### `change-disruption` (12 models)

1. Sunk Cost Fallacy
2. Status Quo Bias
3. Unintended Consequences
4. Chesterton's Fence
5. Second-Order Thinking
6. Second-Order Effects
7. Path Dependence
8. Lindy Effect
9. Antifragile
10. Phase Transitions
11. Commitment Bias\*
12. Creative Destruction

### `social-dynamics` (10 models)

1. Reciprocation
2. Social Proof
3. Liking Bias
4. Authority Bias
5. Signaling
6. Prisoner's Dilemma
7. Tragedy of the Commons
8. Nash Equilibrium
9. Mimetic Desire\*
10. Commitment Bias\*

### `risk-uncertainty` (7 models)

1. Skin in the Game
2. Margin of Safety
3. Asymmetric Risk
4. Precautionary Principle
5. Ergodicity
6. Extinction Events
7. Black Swan\*

### `resource-management` (4 models)

1. Cognitive Load
2. Parkinson's Law
3. Activation Energy
4. Planning Fallacy

### `systems-growth` (19 models)

1. Tight Feedback Loops
2. Feedback Loops
3. Redundancy
4. Compound Interest
5. Diversification
6. Leverage Points
7. Local vs. Global Maxima
8. Power Law
9. Economies of Scale
10. Network Effects
11. Arbitrage
12. Winner-Take-Most
13. Critical Mass
14. Economic Moats
15. Multiplicative Systems
16. Emergence
17. Scale-Free Networks
18. Carrying Capacity
19. Mr. Market

### `experience-perception` (12 models)

1. Default Effect
2. Switching Costs
3. Recency Bias
4. Contrast Effect
5. Anchoring
6. Peak-End Rule
7. Mere Exposure Effect
8. Loss Aversion
9. Framing Effect
10. Endowment Effect
11. Hedonic Adaptation
12. Scarcity vs. Abundance\*

### `competition-strategy` (4 models)

1. Red Queen Effect
2. Sexual Selection
3. Easterbrook's Paradox
4. Comparative Advantage\*

### `personal-performance` (5 models)

1. Growth vs Fixed Mindset
2. Deliberate Practice
3. Desirable Difficulty
4. Impostor Syndrome
5. Scarcity vs. Abundance\*

### `thinking-clearly` (11 models)

1. Occam's Razor
2. Multicausal
3. Steelmanning
4. Confirmation Bias
5. Availability Bias
6. Survivorship Bias
7. Narrative Fallacy
8. Hindsight Bias
9. Abstraction Ladders
10. Lollapalooza Effect
11. Dunning-Kruger Effect

_\* Models appearing in multiple tags_

---

## Overlapping Models (5 total)

| Model                  | Primary Tag             | Secondary Tag        |
| ---------------------- | ----------------------- | -------------------- |
| Comparative Advantage  | decision-prioritization | competition-strategy |
| Mimetic Desire         | unexpected-behavior     | social-dynamics      |
| Commitment Bias        | change-disruption       | social-dynamics      |
| Black Swan             | incomplete-information  | risk-uncertainty     |
| Scarcity vs. Abundance | experience-perception   | personal-performance |

---

## L3 Summary Table

| Tag                     | L2 Option               | L3 Question                            | L3 Options (Model Count) |
| ----------------------- | ----------------------- | -------------------------------------- | ------------------------ |
| decision-prioritization | Too many options        | "What's the prioritization challenge?" | 3 options → 1 model each |
| decision-prioritization | Trade-offs              | "What's the nature of the trade-off?"  | 4 options → 1 model each |
| decision-prioritization | Stress-test             | "How do you want to stress-test?"      | 3 options → 1 model each |
| decision-prioritization | Reframe                 | "How do you want to reframe?"          | 3 options → 1 model each |
| unexpected-behavior     | Rewards/penalties       | "What's the relationship?"             | 3 options → 1 model each |
| unexpected-behavior     | Misreading motives      | "What might I be getting wrong?"       | 3 options → 1 model each |
| incomplete-information  | Someone knows more      | "What's the consequence?"              | 3 options → 1 model each |
| incomplete-information  | Probabilities           | "What's the probability challenge?"    | 3 options → 1 model each |
| change-disruption       | Past investments        | "What's driving attachment?"           | 3 options → 1 model each |
| change-disruption       | Downstream consequences | "What's the concern?"                  | 3 options → 1 model each |
| change-disruption       | Stress on system        | "What's the relationship with stress?" | 2 options → 1 model each |
| social-dynamics         | Perception/status       | "What's the signaling dynamic?"        | 2 options → 1 model each |
| social-dynamics         | Give-and-take           | "What's the social mechanism?"         | 3 options → 1 model each |
| social-dynamics         | Individual vs. group    | "What's the structure of conflict?"    | 3 options → 1 model each |
| risk-uncertainty        | Catastrophic downside   | "What's the nature of the risk?"       | 3 options → 1 model each |
| systems-growth          | Dominance               | "What's driving dominance?"            | 5 options → 1 model each |
| systems-growth          | Resilience              | "What's the resilience strategy?"      | 2 options → 1 model each |
| systems-growth          | Market dynamics         | "What's the market dynamic?"           | 3 options → 1 model each |
| experience-perception   | Context/comparison      | "What's shaping perception?"           | 3 options → 1 model each |
| experience-perception   | Resist change           | "What's the source of resistance?"     | 4 options → 1 model each |
| personal-performance    | Improve faster          | "What's the improvement need?"         | 2 options → 1 model each |
| thinking-clearly        | Overweighting vivid     | "What's making it too available?"      | 2 options → 1 model each |
| thinking-clearly        | Retrofitting story      | "What's the storytelling trap?"        | 2 options → 1 model each |

**Total L3 branches:** 23

---

## Implementation Logic

### When to Ask L2

```
if (poolSize > 6) {
  // Sort tags by model count (descending)
  // Ask L2 for top 2-3 tags
}
```

### When to Ask L3

```
if (poolSizeAfterL2 > 5) {
  // Find L2 branches that contributed ≥2 models
  // Ask L3 for largest contributing branch
  // Repeat if still > 5
}
```

### Deduplication

Models appearing in multiple tags should only be counted once in the pool.

### Maximum Questions

- L1: 12 (or 6 reduced)
- L2: Max 3
- L3: Max 2

**Total maximum questions:** 17 (12 + 3 + 2) or 11 (6 + 3 + 2)

---

## Tested Scenarios

| Scenario                       | L1 Yes | After L2 | After L3 | Final |
| ------------------------------ | ------ | -------- | -------- | ----- |
| Startup acquisition offer      | 7      | 10       | 5        | ✓     |
| Team missing deadlines         | 5      | 7        | 5        | ✓     |
| First-time manager negotiation | 8      | 6-7      | 4        | ✓     |

---

## Version

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Total Models:** 121  
**Total Tags:** 12  
**Total L2 Options:** 46  
**Total L3 Branches:** 23
