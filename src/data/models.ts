import { MentalModel } from "../types";

export const models: MentalModel[] = [
  // ============================================
  // DECISION-PRIORITIZATION (21 models)
  // ============================================
  {
    id: "eisenhower-matrix",
    name: "Eisenhower Matrix",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What should I focus on first?",
    keyInsight:
      "Separate urgent from important. Urgent tasks demand attention but important tasks drive results.",
    redFlagPhrases: [
      "I'm overwhelmed",
      "Everything is a priority",
      "I don't know where to start",
    ],
    adjacentModels: [
      "pareto-principle",
      "opportunity-cost",
      "satisficing",
      "cognitive-load",
    ],
    whyAdjacent: {
      "pareto-principle":
        "Both address prioritization; Pareto identifies the vital few",
      "opportunity-cost": "Choosing one quadrant means not choosing another",
      satisficing: "Accept good enough on less important tasks",
      "cognitive-load": "Explains why prioritization matters",
    },
  },
  {
    id: "pareto-principle",
    name: "Pareto Principle",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Which 20% of inputs are driving 80% of results?",
    keyInsight:
      "Outcomes are rarely evenly distributed. A small number of causes typically drive most effects.",
    redFlagPhrases: [
      "Most of the value comes from...",
      "Focus on what matters",
      "Diminishing returns",
    ],
    adjacentModels: [
      "eisenhower-matrix",
      "leverage-points",
      "power-law",
      "diminishing-returns",
    ],
    whyAdjacent: {
      "eisenhower-matrix": "Both address prioritization",
      "leverage-points": "Applies 80/20 to systems",
      "power-law": "Mathematical basis for Pareto",
      "diminishing-returns": "Explains when to stop investing",
    },
  },
  {
    id: "reversibility",
    name: "Reversibility",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Can this decision be undone?",
    keyInsight:
      "Reversible decisions deserve less deliberation. Irreversible ones deserve more.",
    redFlagPhrases: ["Can we undo this?", "Point of no return", "One-way door"],
    adjacentModels: [
      "optionality",
      "asymmetric-risk",
      "precautionary-principle",
      "regret-minimization",
    ],
    whyAdjacent: {
      optionality: "Both address preserving future flexibility",
      "asymmetric-risk": "Frames why reversibility matters",
      "precautionary-principle": "Avoid irreversible downside",
      "regret-minimization": "Irreversible choices carry more regret risk",
    },
  },
  {
    id: "implementation-intentions",
    name: "Implementation Intentions",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "When and where will I do this specific action?",
    keyInsight:
      "Vague goals fail. Specific if-then plans dramatically increase follow-through.",
    redFlagPhrases: [
      "I'll do it later",
      "When I get around to it",
      "I keep meaning to",
    ],
    adjacentModels: [
      "forcing-function",
      "activation-energy",
      "commitment-bias",
      "default-effect",
    ],
    whyAdjacent: {
      "forcing-function": "Both create constraints that drive action",
      "activation-energy": "Reduces starting friction",
      "commitment-bias": "Public commitment increases follow-through",
      "default-effect": "Pre-planned actions become defaults",
    },
  },
  {
    id: "diminishing-returns",
    name: "Diminishing Returns",
    tags: ["decision-prioritization"],
    diagnosticQuestion:
      "Is additional effort still producing proportional results?",
    keyInsight:
      "Each additional unit of input eventually produces less output. Know when to stop or reallocate.",
    redFlagPhrases: [
      "We're polishing too much",
      "Is this worth more effort?",
      "Good enough",
    ],
    adjacentModels: [
      "pareto-principle",
      "satisficing",
      "opportunity-cost",
      "local-vs-global-maxima",
    ],
    whyAdjacent: {
      "pareto-principle": "Most value comes early",
      satisficing: "Accepts good enough because of diminishing returns",
      "opportunity-cost": "Signals when to reallocate",
      "local-vs-global-maxima":
        "Over-optimizing locally misses global opportunities",
    },
  },
  {
    id: "opportunity-cost",
    name: "Opportunity Cost",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What am I giving up by choosing this?",
    keyInsight:
      "The true cost of anything is what you sacrifice to get it. Every yes is a no to something else.",
    redFlagPhrases: [
      "What else could I do with this?",
      "Is this the best use of...",
      "Trade-offs",
    ],
    adjacentModels: [
      "comparative-advantage",
      "batna",
      "expected-value",
      "sunk-cost-fallacy",
    ],
    whyAdjacent: {
      "comparative-advantage": "Opportunity cost applied to strengths",
      batna: "Your alternative defines opportunity cost",
      "expected-value": "Compare expected values of alternatives",
      "sunk-cost-fallacy":
        "Ignores opportunity cost by focusing on past investment",
    },
  },
  {
    id: "forcing-function",
    name: "Forcing Function",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What constraint would make this happen?",
    keyInsight:
      "Constraints drive action. Remove optionality to force progress.",
    redFlagPhrases: [
      "We need a deadline",
      "Nothing happens without pressure",
      "Back against the wall",
    ],
    adjacentModels: [
      "implementation-intentions",
      "activation-energy",
      "parkinsons-law",
      "commitment-bias",
    ],
    whyAdjacent: {
      "implementation-intentions": "Both create conditions that drive action",
      "activation-energy": "Forces overcome starting friction",
      "parkinsons-law": "Without forcing functions, work expands",
      "commitment-bias": "Public commitment is a forcing function",
    },
  },
  {
    id: "batna",
    name: "BATNA",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What's my best alternative if this doesn't work out?",
    keyInsight:
      "Your negotiating power comes from your alternatives. A strong BATNA lets you walk away.",
    redFlagPhrases: [
      "What's plan B?",
      "We have no other options",
      "They need us more than we need them",
    ],
    adjacentModels: [
      "opportunity-cost",
      "asymmetric-risk",
      "information-asymmetry",
      "leverage-points",
    ],
    whyAdjacent: {
      "opportunity-cost": "Your BATNA defines your opportunity cost",
      "asymmetric-risk": "Weak BATNA creates asymmetric vulnerability",
      "information-asymmetry": "Others may not know your true BATNA",
      "leverage-points": "BATNA is a key leverage point in negotiation",
    },
  },
  {
    id: "satisficing",
    name: "Satisficing",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Is 'good enough' actually good enough here?",
    keyInsight:
      "Optimize where it matters, satisfice where it doesn't. Perfect is often the enemy of done.",
    redFlagPhrases: ["Good enough", "Don't overthink it", "Analysis paralysis"],
    adjacentModels: [
      "pareto-principle",
      "diminishing-returns",
      "cognitive-load",
      "optionality",
    ],
    whyAdjacent: {
      "pareto-principle": "Focus optimization on the vital few",
      "diminishing-returns": "Explains why satisficing is rational",
      "cognitive-load": "Satisficing preserves mental bandwidth",
      optionality: "Satisficing preserves time for other options",
    },
  },
  {
    id: "pre-mortem",
    name: "Pre-mortem",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "If this fails, why will it have failed?",
    keyInsight:
      "Imagine future failure and work backward. It surfaces risks that optimism obscures.",
    redFlagPhrases: ["What could go wrong?", "Devil's advocate", "Stress test"],
    adjacentModels: [
      "inversion",
      "second-order-thinking",
      "unintended-consequences",
      "hindsight-bias",
    ],
    whyAdjacent: {
      inversion: "Both approach problems from the failure direction",
      "second-order-thinking": "Pre-mortems force downstream thinking",
      "unintended-consequences": "Surfaces unintended risks",
      "hindsight-bias": "Pre-mortems prevent 'I knew it all along'",
    },
  },
  {
    id: "inversion",
    name: "Inversion",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What would guarantee failure? How do I avoid that?",
    keyInsight:
      "Instead of seeking success, systematically avoid failure. Often easier and more reliable.",
    redFlagPhrases: [
      "Flip it around",
      "What's the opposite?",
      "Avoid the worst",
    ],
    adjacentModels: [
      "pre-mortem",
      "via-negativa",
      "second-order-thinking",
      "first-principles",
    ],
    whyAdjacent: {
      "pre-mortem": "Both approach from the failure direction",
      "via-negativa": "Inversion applied to action—remove vs. add",
      "second-order-thinking": "Inverted thinking reveals hidden consequences",
      "first-principles": "Both reframe problems fundamentally",
    },
  },
  {
    id: "regret-minimization",
    name: "Regret Minimization",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Which choice will I regret least when I'm 80?",
    keyInsight:
      "Project yourself to the end of life. Regret for inaction often exceeds regret for action.",
    redFlagPhrases: [
      "Will I regret not trying?",
      "What would future me think?",
      "Playing it safe",
    ],
    adjacentModels: [
      "reversibility",
      "asymmetric-risk",
      "loss-aversion",
      "expected-value",
    ],
    whyAdjacent: {
      reversibility: "Irreversible choices carry more regret risk",
      "asymmetric-risk": "Regret is often asymmetric",
      "loss-aversion": "Explains why regret weighs heavily",
      "expected-value": "Regret minimization adjusts for emotional outcomes",
    },
  },
  {
    id: "expected-value",
    name: "Expected Value",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What's the probability-weighted outcome?",
    keyInsight:
      "Multiply probability by payoff for each outcome. Choose the highest expected value—but watch for ruin.",
    redFlagPhrases: [
      "What are the odds?",
      "Risk vs. reward",
      "Probability times impact",
    ],
    adjacentModels: [
      "base-rates",
      "bayes-theorem",
      "asymmetric-risk",
      "regret-minimization",
    ],
    whyAdjacent: {
      "base-rates": "Feeds probability estimates",
      "bayes-theorem": "Updates probability with new information",
      "asymmetric-risk": "Adjusts for non-linear payoffs",
      "regret-minimization": "EV doesn't capture emotional weight",
    },
  },
  {
    id: "first-principles",
    name: "First Principles",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What do I know to be fundamentally true here?",
    keyInsight:
      "Break problems down to basic truths and reason up. Escapes inherited assumptions.",
    redFlagPhrases: [
      "Why do we do it this way?",
      "From scratch",
      "Fundamental",
    ],
    adjacentModels: [
      "inversion",
      "abstraction-ladders",
      "chestertons-fence",
      "map-vs-territory",
    ],
    whyAdjacent: {
      inversion: "Both reframe problems fundamentally",
      "abstraction-ladders": "Moving between concrete and abstract",
      "chestertons-fence": "Warns against naive first-principles destruction",
      "map-vs-territory": "First principles gets closer to territory",
    },
  },
  {
    id: "optionality",
    name: "Optionality",
    tags: ["decision-prioritization"],
    diagnosticQuestion:
      "Does this choice preserve or reduce my future options?",
    keyInsight:
      "Options have value. Preserve flexibility when uncertain; commit when the path is clear.",
    redFlagPhrases: [
      "Keep my options open",
      "Don't burn bridges",
      "Flexibility",
    ],
    adjacentModels: [
      "reversibility",
      "barbell-strategy",
      "asymmetric-risk",
      "antifragile",
    ],
    whyAdjacent: {
      reversibility: "Reversible choices preserve options",
      "barbell-strategy": "Operationalizes optionality",
      "asymmetric-risk": "Options capture upside, limit downside",
      antifragile: "Optionality enables antifragility",
    },
  },
  {
    id: "comparative-advantage",
    name: "Comparative Advantage",
    tags: ["decision-prioritization", "competition-strategy"],
    diagnosticQuestion: "What can I do relatively better than alternatives?",
    keyInsight:
      "Focus on relative, not absolute, strength. Trade what you're relatively worse at for what you're relatively better at.",
    redFlagPhrases: ["What's my edge?", "Focus on strengths", "Specialize"],
    adjacentModels: ["opportunity-cost", "pareto-principle", "diversification"],
    whyAdjacent: {
      "opportunity-cost": "Comparative advantage is opportunity cost applied",
      "pareto-principle": "Focus on your vital 20%",
      diversification: "Portfolio-level view of advantage",
    },
  },
  {
    id: "via-negativa",
    name: "Via Negativa",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "What should I remove or stop doing?",
    keyInsight:
      "Improvement by subtraction. Often more effective and less risky than adding.",
    redFlagPhrases: ["Less is more", "Stop doing", "Eliminate"],
    adjacentModels: [
      "inversion",
      "first-principles",
      "satisficing",
      "precautionary-principle",
    ],
    whyAdjacent: {
      inversion: "Via negativa is inversion applied to action",
      "first-principles": "Subtraction reveals fundamentals",
      satisficing: "Stop optimizing what doesn't matter",
      "precautionary-principle": "Removing is safer than adding",
    },
  },
  {
    id: "via-positiva-vs-via-negativa",
    name: "Via Positiva vs. Via Negativa",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Should I add something or remove something?",
    keyInsight:
      "We default to adding. Often the better intervention is subtraction.",
    redFlagPhrases: [
      "Add or subtract?",
      "Do more or do less?",
      "Build or prune?",
    ],
    adjacentModels: [
      "via-negativa",
      "first-principles",
      "leverage-points",
      "chestertons-fence",
    ],
    whyAdjacent: {
      "via-negativa": "The subtraction option",
      "first-principles": "Helps decide which approach fits",
      "leverage-points": "Sometimes adding is the leverage point",
      "chestertons-fence": "Understand before removing",
    },
  },
  {
    id: "barbell-strategy",
    name: "Barbell Strategy",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Can I combine extreme safety with extreme upside?",
    keyInsight:
      "Avoid the middle. Combine very safe with very risky to capture upside while limiting ruin.",
    redFlagPhrases: [
      "Play it safe AND swing big",
      "Avoid the middle",
      "Asymmetric bets",
    ],
    adjacentModels: [
      "optionality",
      "asymmetric-risk",
      "antifragile",
      "diversification",
    ],
    whyAdjacent: {
      optionality: "Barbell operationalizes optionality",
      "asymmetric-risk": "Captures asymmetric upside",
      antifragile: "Barbell is an antifragile strategy",
      diversification: "Extreme form of diversification",
    },
  },
  {
    id: "zero-risk-bias",
    name: "Zero-Risk Bias",
    tags: ["decision-prioritization"],
    diagnosticQuestion: "Am I irrationally pursuing zero risk in one area?",
    keyInsight:
      "We prefer eliminating a small risk entirely over reducing a large risk significantly. This is often irrational.",
    redFlagPhrases: ["Eliminate all risk", "100% safe", "Zero tolerance"],
    adjacentModels: [
      "loss-aversion",
      "precautionary-principle",
      "expected-value",
      "asymmetric-risk",
    ],
    whyAdjacent: {
      "loss-aversion": "Drives the bias toward zero",
      "precautionary-principle": "When zero-risk makes sense",
      "expected-value": "EV often favors risk reduction over elimination",
      "asymmetric-risk": "Sometimes zero-risk is rational",
    },
  },
  {
    id: "mental-accounting",
    name: "Mental Accounting",
    tags: ["decision-prioritization"],
    diagnosticQuestion:
      "Am I treating equivalent resources differently based on arbitrary categories?",
    keyInsight:
      "Money is fungible, but we treat it differently based on mental labels. This creates irrational decisions.",
    redFlagPhrases: ["It's house money", "Different budget", "Found money"],
    adjacentModels: [
      "loss-aversion",
      "sunk-cost-fallacy",
      "framing-effect",
      "opportunity-cost",
    ],
    whyAdjacent: {
      "loss-aversion": "Mental accounts isolate losses",
      "sunk-cost-fallacy": "Past spending creates mental accounts",
      "framing-effect": "Framing creates the accounts",
      "opportunity-cost": "Mental accounting obscures true opportunity cost",
    },
  },

  // ============================================
  // UNEXPECTED-BEHAVIOR (11 models)
  // ============================================
  {
    id: "incentives",
    name: "Incentives",
    tags: ["unexpected-behavior"],
    diagnosticQuestion: "What is this person or system rewarded for doing?",
    keyInsight:
      "People respond to incentives predictably, even when those incentives are hidden or misaligned. Find the incentive and behavior makes sense.",
    redFlagPhrases: [
      "Follow the money",
      "What's in it for them?",
      "The system is broken",
    ],
    adjacentModels: [
      "principal-agent-problem",
      "goodharts-law",
      "moral-hazard",
      "revealed-preference",
      "skin-in-the-game",
    ],
    whyAdjacent: {
      "principal-agent-problem": "Agent's interests diverge from principal's",
      "goodharts-law": "Metrics become gamed when targeted",
      "moral-hazard": "Risk-taking when consequences are borne by others",
      "revealed-preference": "Actions reveal true incentives",
      "skin-in-the-game": "Aligns incentives through shared consequences",
    },
  },
  {
    id: "hanlons-razor",
    name: "Hanlon's Razor",
    tags: ["unexpected-behavior"],
    diagnosticQuestion: "Is this malice, or just incompetence/ignorance?",
    keyInsight:
      "Never attribute to malice what can be explained by incompetence. Most 'bad' behavior has simpler explanations.",
    redFlagPhrases: [
      "They're out to get me",
      "Conspiracy",
      "They did it on purpose",
    ],
    adjacentModels: [
      "fundamental-attribution-error",
      "empathy-gap",
      "occams-razor",
      "curse-of-knowledge",
    ],
    whyAdjacent: {
      "fundamental-attribution-error": "We over-attribute to character",
      "empathy-gap": "We fail to imagine their situation",
      "occams-razor": "Simplest explanation is usually right",
      "curse-of-knowledge": "They may not know what you know",
    },
  },
  {
    id: "revealed-preference",
    name: "Revealed Preference",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "What do their actions (not words) tell me they actually want?",
    keyInsight:
      "Ignore what people say they want. Watch what they actually do. Actions reveal true preferences.",
    redFlagPhrases: [
      "They say one thing but do another",
      "Actions speak louder",
      "Walk vs. talk",
    ],
    adjacentModels: [
      "incentives",
      "signaling",
      "mimetic-desire",
      "hyperbolic-discounting",
    ],
    whyAdjacent: {
      incentives: "Incentives drive revealed preferences",
      signaling: "Words can be cheap signals",
      "mimetic-desire": "Desires may be mimicked, not authentic",
      "hyperbolic-discounting": "Present actions reveal time preferences",
    },
  },
  {
    id: "empathy-gap",
    name: "Empathy Gap (Hot-Cold)",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "Am I failing to account for different emotional states?",
    keyInsight:
      "We can't accurately predict behavior in emotional states different from our current one. Hot states underestimate cold; cold underestimates hot.",
    redFlagPhrases: [
      "I would never do that",
      "How could they?",
      "In the heat of the moment",
    ],
    adjacentModels: [
      "hyperbolic-discounting",
      "fundamental-attribution-error",
      "hanlons-razor",
      "loss-aversion",
    ],
    whyAdjacent: {
      "hyperbolic-discounting": "Hot states create present bias",
      "fundamental-attribution-error": "We blame character, not state",
      "hanlons-razor": "Emotional state explains behavior",
      "loss-aversion": "Amplified in hot states",
    },
  },
  {
    id: "goodharts-law",
    name: "Goodhart's Law",
    tags: ["unexpected-behavior"],
    diagnosticQuestion: "Has the measure become the target?",
    keyInsight:
      "When a measure becomes a target, it ceases to be a good measure. People optimize for the metric, not the underlying goal.",
    redFlagPhrases: [
      "Gaming the system",
      "Teaching to the test",
      "Hitting numbers but missing the point",
    ],
    adjacentModels: ["incentives", "cobra-effect", "principal-agent-problem"],
    whyAdjacent: {
      incentives: "Metrics create incentives",
      "cobra-effect": "Extreme Goodhart outcome",
      "principal-agent-problem": "Agents optimize for measurable metrics",
    },
  },
  {
    id: "cobra-effect",
    name: "Cobra Effect",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "Could this incentive create the opposite of the intended outcome?",
    keyInsight:
      "Incentives can backfire spectacularly. The solution can worsen the problem it was meant to solve.",
    redFlagPhrases: ["Backfired", "Made it worse", "Perverse incentive"],
    adjacentModels: [
      "goodharts-law",
      "incentives",
      "unintended-consequences",
      "second-order-effects",
    ],
    whyAdjacent: {
      "goodharts-law": "Cobra effect is extreme Goodhart",
      incentives: "Perverse incentive design",
      "unintended-consequences": "The definition of unintended",
      "second-order-effects": "First-order fix, second-order disaster",
    },
  },
  {
    id: "principal-agent-problem",
    name: "Principal-Agent Problem",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "Does the person acting on my behalf have different interests?",
    keyInsight:
      "When you delegate, the agent's incentives may diverge from yours. They'll optimize for their interests, not yours.",
    redFlagPhrases: [
      "They don't care as much as I do",
      "Conflict of interest",
      "Whose side are they on?",
    ],
    adjacentModels: [
      "incentives",
      "moral-hazard",
      "information-asymmetry",
      "skin-in-the-game",
    ],
    whyAdjacent: {
      incentives: "Divergent incentives cause the problem",
      "moral-hazard": "Agent takes risks with principal's resources",
      "information-asymmetry": "Agent knows more than principal",
      "skin-in-the-game": "The solution—align exposure",
    },
  },
  {
    id: "hyperbolic-discounting",
    name: "Hyperbolic Discounting",
    tags: ["unexpected-behavior"],
    diagnosticQuestion: "Is present bias distorting this decision?",
    keyInsight:
      "We irrationally prefer smaller-sooner over larger-later. The present is overweighted vs. any future.",
    redFlagPhrases: [
      "I'll start tomorrow",
      "Just this once",
      "Future me can handle it",
    ],
    adjacentModels: [
      "empathy-gap",
      "revealed-preference",
      "implementation-intentions",
      "activation-energy",
    ],
    whyAdjacent: {
      "empathy-gap": "We can't feel future states",
      "revealed-preference": "Present choices reveal true time preferences",
      "implementation-intentions": "Commitment device against present bias",
      "activation-energy": "Present friction blocks future benefits",
    },
  },
  {
    id: "moral-hazard",
    name: "Moral Hazard",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "Is someone taking more risk because they won't bear the consequences?",
    keyInsight:
      "People take more risks when insulated from downside. Bailouts, insurance, and delegation all create moral hazard.",
    redFlagPhrases: [
      "Too big to fail",
      "Playing with house money",
      "No skin in the game",
    ],
    adjacentModels: [
      "principal-agent-problem",
      "incentives",
      "skin-in-the-game",
      "adverse-selection",
    ],
    whyAdjacent: {
      "principal-agent-problem": "Agent risk with principal's resources",
      incentives: "Misaligned risk-bearing creates bad incentives",
      "skin-in-the-game": "The antidote to moral hazard",
      "adverse-selection": "Often co-occur in insurance contexts",
    },
  },
  {
    id: "fundamental-attribution-error",
    name: "Fundamental Attribution Error",
    tags: ["unexpected-behavior"],
    diagnosticQuestion:
      "Am I blaming character when situation is the real cause?",
    keyInsight:
      "We over-attribute others' behavior to their personality and under-attribute to their circumstances. The situation often explains more.",
    redFlagPhrases: [
      "That's just who they are",
      "They're lazy/mean/stupid",
      "I would never...",
    ],
    adjacentModels: [
      "hanlons-razor",
      "empathy-gap",
      "incentives",
      "narrative-fallacy",
    ],
    whyAdjacent: {
      "hanlons-razor": "Situation > malice",
      "empathy-gap": "We fail to imagine their circumstances",
      incentives: "Situation includes incentive structure",
      "narrative-fallacy": "We create character-driven stories",
    },
  },
  {
    id: "mimetic-desire",
    name: "Mimetic Desire",
    tags: ["unexpected-behavior", "social-dynamics"],
    diagnosticQuestion:
      "Do I want this because I want it, or because others want it?",
    keyInsight:
      "We learn what to want from others. Desire is contagious and often unconscious.",
    redFlagPhrases: [
      "Everyone wants this",
      "Keeping up with...",
      "Status symbol",
    ],
    adjacentModels: [
      "social-proof",
      "signaling",
      "revealed-preference",
      "scarcity-vs-abundance",
    ],
    whyAdjacent: {
      "social-proof": "Mimesis drives social proof",
      signaling: "We mimic desired signals",
      "revealed-preference": "Mimetic desires are revealed in choices",
      "scarcity-vs-abundance": "Mimesis creates artificial scarcity",
    },
  },

  // ============================================
  // INCOMPLETE-INFORMATION (10 models)
  // ============================================
  {
    id: "information-asymmetry",
    name: "Information Asymmetry",
    tags: ["incomplete-information"],
    diagnosticQuestion: "Who knows what here?",
    keyInsight:
      "The party with more information often controls the outcome. Your leverage comes from closing the gap or recognizing you can't.",
    redFlagPhrases: [
      "They're not telling us everything",
      "What's the catch?",
      "How do I know this is legit?",
    ],
    adjacentModels: [
      "adverse-selection",
      "signaling",
      "principal-agent-problem",
      "curse-of-knowledge",
    ],
    whyAdjacent: {
      "adverse-selection": "Information gaps create selection problems",
      signaling: "Attempts to close the gap",
      "principal-agent-problem": "Agent has more information",
      "curse-of-knowledge": "You can't un-know what you know",
    },
  },
  {
    id: "circle-of-competence",
    name: "Circle of Competence",
    tags: ["incomplete-information"],
    diagnosticQuestion: "Is this inside or outside what I truly understand?",
    keyInsight:
      "Know the boundaries of your knowledge. Operating outside your circle is high-risk; staying inside compounds advantage.",
    redFlagPhrases: [
      "I don't really understand this",
      "Out of my depth",
      "Stick to what you know",
    ],
    adjacentModels: [
      "map-vs-territory",
      "dunning-kruger-effect",
      "first-principles",
      "base-rates",
    ],
    whyAdjacent: {
      "map-vs-territory": "Inside circle, map matches territory",
      "dunning-kruger-effect": "Explains why we misjudge our circle",
      "first-principles": "Expanding circle requires first-principles learning",
      "base-rates": "Inside circle, you know the base rates",
    },
  },
  {
    id: "curse-of-knowledge",
    name: "Curse of Knowledge",
    tags: ["incomplete-information"],
    diagnosticQuestion: "Am I assuming others know what I know?",
    keyInsight:
      "Once you know something, you can't imagine not knowing it. This causes communication failures and misjudged behavior.",
    redFlagPhrases: [
      "It's obvious",
      "How could they not know?",
      "I already explained this",
    ],
    adjacentModels: [
      "information-asymmetry",
      "empathy-gap",
      "hanlons-razor",
      "abstraction-ladders",
    ],
    whyAdjacent: {
      "information-asymmetry": "Creates asymmetry without realizing",
      "empathy-gap": "Can't imagine the unknowing state",
      "hanlons-razor": "Ignorance, not malice",
      "abstraction-ladders": "Expert at wrong abstraction level",
    },
  },
  {
    id: "base-rates",
    name: "Base Rates",
    tags: ["incomplete-information"],
    diagnosticQuestion:
      "What's the general probability before considering this specific case?",
    keyInsight:
      "Start with how often something happens in general before adjusting for specifics. We chronically ignore base rates.",
    redFlagPhrases: [
      "But this case is different",
      "What are the odds?",
      "Statistically speaking",
    ],
    adjacentModels: [
      "bayes-theorem",
      "expected-value",
      "regression-to-the-mean",
      "availability-bias",
    ],
    whyAdjacent: {
      "bayes-theorem": "Base rates are the prior",
      "expected-value": "Base rates feed probability estimates",
      "regression-to-the-mean": "Extreme cases revert to base rate",
      "availability-bias": "Causes base rate neglect",
    },
  },
  {
    id: "regression-to-the-mean",
    name: "Regression to the Mean",
    tags: ["incomplete-information"],
    diagnosticQuestion: "Is this extreme performance likely to persist?",
    keyInsight:
      "Extreme results tend to be followed by more average ones. Don't over-interpret outliers.",
    redFlagPhrases: ["Hot streak", "Sophomore slump", "Beginner's luck"],
    adjacentModels: [
      "base-rates",
      "survivorship-bias",
      "narrative-fallacy",
      "hindsight-bias",
    ],
    whyAdjacent: {
      "base-rates": "Regression pulls toward the base rate",
      "survivorship-bias": "We only see the outliers",
      "narrative-fallacy": "We create stories for regression",
      "hindsight-bias": "We think we predicted the regression",
    },
  },
  {
    id: "map-vs-territory",
    name: "Map vs Territory",
    tags: ["incomplete-information"],
    diagnosticQuestion:
      "Am I confusing my model of reality with reality itself?",
    keyInsight:
      "All models are simplifications. The map is not the territory. Useful maps can still mislead.",
    redFlagPhrases: ["In theory...", "The model says...", "On paper..."],
    adjacentModels: [
      "circle-of-competence",
      "first-principles",
      "abstraction-ladders",
      "goodharts-law",
    ],
    whyAdjacent: {
      "circle-of-competence": "Inside your circle, map fits territory",
      "first-principles": "Gets closer to territory",
      "abstraction-ladders": "Maps at different abstraction levels",
      "goodharts-law": "When the map becomes the territory",
    },
  },
  {
    id: "bayes-theorem",
    name: "Bayes' Theorem",
    tags: ["incomplete-information"],
    diagnosticQuestion: "How should new evidence update my beliefs?",
    keyInsight:
      "Start with a prior probability, then update based on new evidence. Most people update too little or too much.",
    redFlagPhrases: [
      "Given this new information...",
      "What are the chances now?",
      "Updating my priors",
    ],
    adjacentModels: [
      "base-rates",
      "expected-value",
      "confirmation-bias",
      "black-swan",
    ],
    whyAdjacent: {
      "base-rates": "Prior probability is the base rate",
      "expected-value": "Bayes feeds probability estimates",
      "confirmation-bias": "Prevents proper updating",
      "black-swan": "Some evidence is black swan level",
    },
  },
  {
    id: "adverse-selection",
    name: "Adverse Selection",
    tags: ["incomplete-information"],
    diagnosticQuestion:
      "Is the selection process attracting the wrong participants?",
    keyInsight:
      "Information asymmetry can cause the 'wrong' people to self-select. The best may not show up; the worst may flock.",
    redFlagPhrases: [
      "Why would they sell if it's good?",
      "Lemon market",
      "Only desperate applicants",
    ],
    adjacentModels: ["information-asymmetry", "signaling", "moral-hazard"],
    whyAdjacent: {
      "information-asymmetry": "Root cause of adverse selection",
      signaling: "Quality signals counter adverse selection",
      "moral-hazard": "Often co-occur in insurance",
    },
  },
  {
    id: "black-swan",
    name: "Black Swan",
    tags: ["incomplete-information", "risk-uncertainty"],
    diagnosticQuestion:
      "Could there be a high-impact event I'm not even considering?",
    keyInsight:
      "Rare, unpredictable events with massive impact exist. We systematically underestimate them because they're outside experience.",
    redFlagPhrases: [
      "Unprecedented",
      "No one saw it coming",
      "Once in a lifetime",
    ],
    adjacentModels: [
      "knightian-uncertainty",
      "antifragile",
      "narrative-fallacy",
      "ergodicity",
    ],
    whyAdjacent: {
      "knightian-uncertainty": "True uncertainty, not just risk",
      antifragile: "How to benefit from black swans",
      "narrative-fallacy": "We retrofit stories after black swans",
      ergodicity: "Black swans break ergodic assumptions",
    },
  },
  {
    id: "knightian-uncertainty",
    name: "Knightian Uncertainty",
    tags: ["incomplete-information"],
    diagnosticQuestion:
      "Is this true uncertainty (unknowable) or just risk (calculable)?",
    keyInsight:
      "Risk can be quantified; uncertainty cannot. Different strategies apply to each.",
    redFlagPhrases: ["Unknown unknowns", "Unquantifiable", "Fog of war"],
    adjacentModels: [
      "black-swan",
      "margin-of-safety",
      "precautionary-principle",
      "optionality",
    ],
    whyAdjacent: {
      "black-swan": "Black swans are Knightian",
      "margin-of-safety": "Buffer for the unknowable",
      "precautionary-principle": "Default under true uncertainty",
      optionality: "Preserve options under uncertainty",
    },
  },

  // ============================================
  // CHANGE-DISRUPTION (12 models)
  // ============================================
  {
    id: "sunk-cost-fallacy",
    name: "Sunk Cost Fallacy",
    tags: ["change-disruption"],
    diagnosticQuestion:
      "Am I continuing because of past investment rather than future value?",
    keyInsight:
      "Past costs are gone. Only future costs and benefits should drive decisions. Yet we hate 'wasting' what we've spent.",
    redFlagPhrases: [
      "We've come too far to quit",
      "I've already invested so much",
      "Can't waste what we've put in",
    ],
    adjacentModels: [
      "status-quo-bias",
      "commitment-bias",
      "loss-aversion",
      "opportunity-cost",
    ],
    whyAdjacent: {
      "status-quo-bias": "Both resist rational change",
      "commitment-bias": "Past commitment drives continuation",
      "loss-aversion": "Walking away feels like a loss",
      "opportunity-cost": "Sunk cost thinking ignores opportunity cost",
    },
  },
  {
    id: "status-quo-bias",
    name: "Status Quo Bias",
    tags: ["change-disruption"],
    diagnosticQuestion:
      "Am I preferring this because it's current, not because it's best?",
    keyInsight:
      "We prefer the current state simply because it's current. Change requires justification; status quo doesn't.",
    redFlagPhrases: [
      "If it ain't broke...",
      "Why change?",
      "We've always done it this way",
    ],
    adjacentModels: [
      "sunk-cost-fallacy",
      "default-effect",
      "loss-aversion",
      "endowment-effect",
    ],
    whyAdjacent: {
      "sunk-cost-fallacy": "Past investment reinforces status quo",
      "default-effect": "Status quo is the default",
      "loss-aversion": "Change means potential loss",
      "endowment-effect": "We overvalue what we have",
    },
  },
  {
    id: "unintended-consequences",
    name: "Unintended Consequences",
    tags: ["change-disruption"],
    diagnosticQuestion: "What might happen that I'm not intending?",
    keyInsight:
      "Actions ripple. Interventions in complex systems often produce unexpected results, sometimes opposite to intentions.",
    redFlagPhrases: ["Backfired", "Didn't see that coming", "Side effects"],
    adjacentModels: [
      "second-order-thinking",
      "cobra-effect",
      "chestertons-fence",
    ],
    whyAdjacent: {
      "second-order-thinking": "Anticipates unintended consequences",
      "cobra-effect": "Extreme unintended consequence",
      "chestertons-fence": "Understand before changing",
    },
  },
  {
    id: "chestertons-fence",
    name: "Chesterton's Fence",
    tags: ["change-disruption"],
    diagnosticQuestion: "Do I understand why this exists before I remove it?",
    keyInsight:
      "Don't remove something until you understand why it was put there. The reason may not be obvious.",
    redFlagPhrases: [
      "Why do we even have this?",
      "This seems pointless",
      "Let's just get rid of it",
    ],
    adjacentModels: [
      "first-principles",
      "unintended-consequences",
      "lindy-effect",
      "second-order-thinking",
    ],
    whyAdjacent: {
      "first-principles": "Understand the fundamentals first",
      "unintended-consequences": "Removal may have consequences",
      "lindy-effect": "Long-standing things have survived for reasons",
      "second-order-thinking": "Original builders may have seen further",
    },
  },
  {
    id: "second-order-thinking",
    name: "Second-Order Thinking",
    tags: ["change-disruption"],
    diagnosticQuestion: "And then what?",
    keyInsight:
      "First-order thinking asks 'what happens?' Second-order asks 'and then what?' Most people stop at first-order.",
    redFlagPhrases: [
      "What happens next?",
      "Downstream effects",
      "Ripple effects",
    ],
    adjacentModels: [
      "unintended-consequences",
      "second-order-effects",
      "pre-mortem",
      "inversion",
    ],
    whyAdjacent: {
      "unintended-consequences": "Second-order thinking surfaces these",
      "second-order-effects": "The output of second-order thinking",
      "pre-mortem": "Both require forward projection",
      inversion: "Think through the chain of consequences",
    },
  },
  {
    id: "second-order-effects",
    name: "Second-Order Effects",
    tags: ["change-disruption"],
    diagnosticQuestion: "What are the effects of the effects?",
    keyInsight:
      "Consequences have consequences. The most important impacts are often two or three steps removed from the action.",
    redFlagPhrases: ["Knock-on effects", "Cascading", "Chain reaction"],
    adjacentModels: [
      "second-order-thinking",
      "unintended-consequences",
      "feedback-loops",
      "emergence",
    ],
    whyAdjacent: {
      "second-order-thinking": "The process that reveals these",
      "unintended-consequences": "Second-order effects are often unintended",
      "feedback-loops": "Effects can loop back",
      emergence: "Complex effects from simple causes",
    },
  },
  {
    id: "path-dependence",
    name: "Path Dependence",
    tags: ["change-disruption"],
    diagnosticQuestion: "How is history constraining current options?",
    keyInsight:
      "Where you can go depends on where you've been. Past decisions constrain future possibilities.",
    redFlagPhrases: ["Locked in", "Legacy", "Historical reasons"],
    adjacentModels: [
      "status-quo-bias",
      "switching-costs",
      "local-vs-global-maxima",
    ],
    whyAdjacent: {
      "status-quo-bias": "Path dependence reinforces status quo",
      "switching-costs": "History creates switching costs",
      "local-vs-global-maxima": "Path can trap in local maxima",
    },
  },
  {
    id: "lindy-effect",
    name: "Lindy Effect",
    tags: ["change-disruption"],
    diagnosticQuestion:
      "Has this survived long enough to suggest it will keep surviving?",
    keyInsight:
      "For non-perishable things, life expectancy increases with age. Old things that still exist tend to keep existing.",
    redFlagPhrases: [
      "Stood the test of time",
      "Classic",
      "If it was going to fail, it would have already",
    ],
    adjacentModels: [
      "chestertons-fence",
      "antifragile",
      "creative-destruction",
      "survivorship-bias",
    ],
    whyAdjacent: {
      "chestertons-fence": "Old things exist for reasons",
      antifragile: "Lindy survivors may be antifragile",
      "creative-destruction": "Lindy predicts what survives disruption",
      "survivorship-bias": "We only see what survived",
    },
  },
  {
    id: "antifragile",
    name: "Antifragile",
    tags: ["change-disruption"],
    diagnosticQuestion: "Does this get stronger from stress and disorder?",
    keyInsight:
      "Some things benefit from volatility and shocks. Beyond robust (survives shocks) to antifragile (gains from them).",
    redFlagPhrases: [
      "What doesn't kill you...",
      "Stronger from adversity",
      "Thrives on chaos",
    ],
    adjacentModels: [
      "black-swan",
      "optionality",
      "barbell-strategy",
      "redundancy",
    ],
    whyAdjacent: {
      "black-swan": "Antifragile benefits from black swans",
      optionality: "Options are antifragile",
      "barbell-strategy": "Antifragile strategy",
      redundancy: "Provides antifragile base",
    },
  },
  {
    id: "phase-transitions",
    name: "Phase Transitions",
    tags: ["change-disruption"],
    diagnosticQuestion:
      "Could small changes suddenly trigger a dramatic shift?",
    keyInsight:
      "Systems can change state suddenly. Gradual pressure builds until a threshold triggers rapid transformation.",
    redFlagPhrases: [
      "Tipping point",
      "Suddenly everything changed",
      "Breaking point",
    ],
    adjacentModels: ["emergence", "critical-mass", "feedback-loops"],
    whyAdjacent: {
      emergence: "New states emerge suddenly",
      "critical-mass": "Threshold triggers transition",
      "feedback-loops": "Positive feedback accelerates transition",
    },
  },
  {
    id: "commitment-bias",
    name: "Commitment Bias",
    tags: ["change-disruption", "social-dynamics"],
    diagnosticQuestion: "Am I sticking with this because I said I would?",
    keyInsight:
      "We feel pressure to remain consistent with past commitments, even when they no longer serve us.",
    redFlagPhrases: ["I said I would", "Can't back out now", "I'm committed"],
    adjacentModels: [
      "sunk-cost-fallacy",
      "reciprocation",
      "implementation-intentions",
      "status-quo-bias",
    ],
    whyAdjacent: {
      "sunk-cost-fallacy": "Commitment + investment = strong lock-in",
      reciprocation: "Commitments create social obligations",
      "implementation-intentions": "Positive use of commitment bias",
      "status-quo-bias": "Commitment reinforces status quo",
    },
  },
  {
    id: "creative-destruction",
    name: "Creative Destruction",
    tags: ["change-disruption"],
    diagnosticQuestion: "What's dying here, and what's being born?",
    keyInsight:
      "Progress destroys as it creates. The destruction isn't a bug—it's the mechanism. Incumbents rarely lead revolutions.",
    redFlagPhrases: [
      "Disrupting the industry",
      "Made obsolete",
      "Adapt or die",
    ],
    adjacentModels: ["lindy-effect", "red-queen-effect", "path-dependence"],
    whyAdjacent: {
      "lindy-effect": "What survives creative destruction?",
      "red-queen-effect": "Must keep innovating to survive",
      "path-dependence": "Incumbents are path-dependent",
    },
  },

  // ============================================
  // SOCIAL-DYNAMICS (10 models)
  // ============================================
  {
    id: "reciprocation",
    name: "Reciprocation",
    tags: ["social-dynamics"],
    diagnosticQuestion: "Is give-and-take shaping this interaction?",
    keyInsight:
      "People feel obligated to return favors. This creates cooperation—and can be exploited.",
    redFlagPhrases: ["I owe them", "They did me a favor", "Quid pro quo"],
    adjacentModels: [
      "commitment-bias",
      "liking-bias",
      "social-proof",
      "prisoners-dilemma",
    ],
    whyAdjacent: {
      "commitment-bias": "Reciprocation creates commitment",
      "liking-bias": "We reciprocate more with liked people",
      "social-proof": "Social norms reinforce reciprocity",
      "prisoners-dilemma": "Reciprocity sustains cooperation",
    },
  },
  {
    id: "social-proof",
    name: "Social Proof",
    tags: ["social-dynamics"],
    diagnosticQuestion: "Am I doing this because others are doing it?",
    keyInsight:
      "We look to others to determine correct behavior, especially under uncertainty. Crowds can be wise or foolish.",
    redFlagPhrases: [
      "Everyone's doing it",
      "Must be good if it's popular",
      "Following the crowd",
    ],
    adjacentModels: ["authority-bias", "mimetic-desire", "availability-bias"],
    whyAdjacent: {
      "authority-bias": "We follow both crowds and authorities",
      "mimetic-desire": "We want what others want",
      "availability-bias": "Visible behavior becomes the standard",
    },
  },
  {
    id: "liking-bias",
    name: "Liking Bias",
    tags: ["social-dynamics"],
    diagnosticQuestion: "Am I being influenced because I like this person?",
    keyInsight:
      "We're more easily persuaded by people we like. Liking is created by familiarity, similarity, compliments, and association.",
    redFlagPhrases: [
      "I like them, so...",
      "They're so nice",
      "We really clicked",
    ],
    adjacentModels: ["reciprocation", "authority-bias", "mere-exposure-effect"],
    whyAdjacent: {
      reciprocation: "Favors increase liking",
      "authority-bias": "We can like and respect authorities",
      "mere-exposure-effect": "Familiarity breeds liking",
    },
  },
  {
    id: "authority-bias",
    name: "Authority Bias",
    tags: ["social-dynamics"],
    diagnosticQuestion:
      "Am I deferring to this person because of their position, not their argument?",
    keyInsight:
      "We tend to comply with authority figures, sometimes blindly. Authority can be real or just performed.",
    redFlagPhrases: [
      "The expert says...",
      "They must know",
      "Who am I to question?",
    ],
    adjacentModels: [
      "social-proof",
      "liking-bias",
      "signaling",
      "dunning-kruger-effect",
    ],
    whyAdjacent: {
      "social-proof": "Authority is a form of social proof",
      "liking-bias": "We can both like and defer to authority",
      signaling: "Authority markers are signals",
      "dunning-kruger-effect": "Authorities can be wrong too",
    },
  },
  {
    id: "signaling",
    name: "Signaling",
    tags: ["social-dynamics"],
    diagnosticQuestion:
      "Is this action about the outcome or about what it communicates?",
    keyInsight:
      "Actions communicate. Effective signals are costly—that's what makes them credible. Cheap talk isn't signaling.",
    redFlagPhrases: [
      "Sending a message",
      "What will people think?",
      "Why would anyone pay that much for...?",
    ],
    adjacentModels: [
      "information-asymmetry",
      "revealed-preference",
      "mimetic-desire",
    ],
    whyAdjacent: {
      "information-asymmetry": "Signaling exists because of information gaps",
      "revealed-preference": "Signals are revealed through action",
      "mimetic-desire": "We signal what others want",
    },
  },
  {
    id: "prisoners-dilemma",
    name: "Prisoner's Dilemma",
    tags: ["social-dynamics"],
    diagnosticQuestion:
      "Would we all be better off cooperating, but individual incentives push toward defection?",
    keyInsight:
      "Individual rationality can lead to collective irrationality. Cooperation requires mechanisms beyond self-interest.",
    redFlagPhrases: [
      "Race to the bottom",
      "If I don't, someone else will",
      "Every person for themselves",
    ],
    adjacentModels: [
      "nash-equilibrium",
      "tragedy-of-the-commons",
      "reciprocation",
    ],
    whyAdjacent: {
      "nash-equilibrium": "Defect-defect is the Nash equilibrium",
      "tragedy-of-the-commons": "Multi-player prisoner's dilemma",
      reciprocation: "Repeated games allow cooperation",
    },
  },
  {
    id: "tragedy-of-the-commons",
    name: "Tragedy of the Commons",
    tags: ["social-dynamics"],
    diagnosticQuestion:
      "Are individual incentives depleting a shared resource?",
    keyInsight:
      "Shared resources get overused when individuals capture benefits but share costs. Requires governance or privatization.",
    redFlagPhrases: [
      "Everyone's taking too much",
      "No one takes responsibility",
      "Free rider problem",
    ],
    adjacentModels: ["prisoners-dilemma", "incentives", "nash-equilibrium"],
    whyAdjacent: {
      "prisoners-dilemma": "Multi-player version",
      incentives: "Individual incentives cause tragedy",
      "nash-equilibrium": "Overuse is the equilibrium",
    },
  },
  {
    id: "nash-equilibrium",
    name: "Nash Equilibrium",
    tags: ["social-dynamics"],
    diagnosticQuestion:
      "Is everyone stuck in a state where no one can unilaterally improve?",
    keyInsight:
      "A stable state where no player benefits from changing strategy alone. Can be optimal or terrible for all.",
    redFlagPhrases: [
      "Stuck in a stalemate",
      "No one wants to move first",
      "Stable but suboptimal",
    ],
    adjacentModels: ["prisoners-dilemma", "tragedy-of-the-commons"],
    whyAdjacent: {
      "prisoners-dilemma": "Defect-defect is Nash equilibrium",
      "tragedy-of-the-commons": "Overuse is equilibrium",
    },
  },

  // ============================================
  // RISK-UNCERTAINTY (7 models)
  // ============================================
  {
    id: "skin-in-the-game",
    name: "Skin in the Game",
    tags: ["risk-uncertainty"],
    diagnosticQuestion:
      "Does this person bear the consequences of their decisions?",
    keyInsight:
      "People make better decisions when they're exposed to the downside. No skin in the game = no trust.",
    redFlagPhrases: [
      "They have nothing to lose",
      "Easy for them to say",
      "Put your money where your mouth is",
    ],
    adjacentModels: [
      "incentives",
      "moral-hazard",
      "principal-agent-problem",
      "asymmetric-risk",
    ],
    whyAdjacent: {
      incentives: "Skin in the game aligns incentives",
      "moral-hazard": "Lack of skin creates moral hazard",
      "principal-agent-problem": "Skin is the solution",
      "asymmetric-risk": "Ensures symmetric exposure",
    },
  },
  {
    id: "margin-of-safety",
    name: "Margin of Safety",
    tags: ["risk-uncertainty"],
    diagnosticQuestion: "Do I have enough buffer for things to go wrong?",
    keyInsight:
      "Build in buffer. The world is uncertain, estimates are wrong, and things break. Margin protects against the unknown.",
    redFlagPhrases: ["No room for error", "Cutting it close", "Buffer"],
    adjacentModels: [
      "precautionary-principle",
      "redundancy",
      "planning-fallacy",
      "antifragile",
    ],
    whyAdjacent: {
      "precautionary-principle": "Margin is precaution",
      redundancy: "Redundancy is margin for systems",
      "planning-fallacy": "Margin compensates for optimism",
      antifragile: "Margin allows antifragility",
    },
  },
  {
    id: "asymmetric-risk",
    name: "Asymmetric Risk",
    tags: ["risk-uncertainty"],
    diagnosticQuestion: "Are the potential gains and losses balanced?",
    keyInsight:
      "Upside and downside are rarely symmetric. Seek asymmetric upside; avoid asymmetric downside.",
    redFlagPhrases: [
      "Heads I win, tails I lose",
      "Risk/reward",
      "Limited downside, unlimited upside",
    ],
    adjacentModels: [
      "optionality",
      "barbell-strategy",
      "expected-value",
      "regret-minimization",
    ],
    whyAdjacent: {
      optionality: "Options create asymmetric upside",
      "barbell-strategy": "Captures asymmetry deliberately",
      "expected-value": "Asymmetry adjusts EV calculations",
      "regret-minimization": "Asymmetric regret potential",
    },
  },
  {
    id: "precautionary-principle",
    name: "Precautionary Principle",
    tags: ["risk-uncertainty"],
    diagnosticQuestion:
      "Is the potential downside catastrophic enough to justify caution despite uncertainty?",
    keyInsight:
      "When downside is catastrophic and irreversible, act cautiously even without full evidence. Burden of proof shifts.",
    redFlagPhrases: [
      "Better safe than sorry",
      "Can't be undone",
      "Unknown unknowns",
    ],
    adjacentModels: [
      "via-negativa",
      "reversibility",
      "black-swan",
      "margin-of-safety",
    ],
    whyAdjacent: {
      "via-negativa": "Precaution often means not acting",
      reversibility: "Applies to irreversible actions",
      "black-swan": "Precaution against unknown extremes",
      "margin-of-safety": "Precaution is building margin",
    },
  },
  {
    id: "ergodicity",
    name: "Ergodicity",
    tags: ["risk-uncertainty"],
    diagnosticQuestion:
      "Does the average outcome match what I'll actually experience over time?",
    keyInsight:
      "Time average ≠ ensemble average. What works for a group may not work for an individual repeatedly exposed to risk.",
    redFlagPhrases: ["In the long run", "On average", "Expected value"],
    adjacentModels: [
      "asymmetric-risk",
      "expected-value",
      "multiplicative-systems",
    ],
    whyAdjacent: {
      "asymmetric-risk": "Ruin breaks ergodicity",
      "expected-value": "EV assumes ergodicity (often wrong)",
      "multiplicative-systems": "Multiplicative systems are non-ergodic",
    },
  },
  {
    id: "extinction-events",
    name: "Extinction Events",
    tags: ["risk-uncertainty"],
    diagnosticQuestion: "Could this wipe me out completely?",
    keyInsight:
      "Some losses are unrecoverable. Avoid ruin at almost any cost—you can't compound from zero.",
    redFlagPhrases: ["Game over", "Total wipeout", "No coming back from that"],
    adjacentModels: [
      "precautionary-principle",
      "black-swan",
      "ergodicity",
      "antifragile",
    ],
    whyAdjacent: {
      "precautionary-principle": "Maximum precaution for extinction risk",
      "black-swan": "Black swans can cause extinction",
      ergodicity: "Extinction breaks all averages",
      antifragile: "Opposite of extinction-prone",
    },
  },

  // ============================================
  // RESOURCE-MANAGEMENT (4 models)
  // ============================================
  {
    id: "cognitive-load",
    name: "Cognitive Load",
    tags: ["resource-management"],
    diagnosticQuestion: "Is mental bandwidth the bottleneck?",
    keyInsight:
      "Working memory is limited. Reduce complexity to improve decisions and execution.",
    redFlagPhrases: [
      "I can't think straight",
      "Too much going on",
      "Information overload",
    ],
    adjacentModels: ["satisficing", "eisenhower-matrix", "activation-energy"],
    whyAdjacent: {
      satisficing: "Cognitive limits make satisficing rational",
      "eisenhower-matrix": "Prioritization reduces load",
      "activation-energy": "Mental load increases friction",
    },
  },
  {
    id: "parkinsons-law",
    name: "Parkinson's Law",
    tags: ["resource-management"],
    diagnosticQuestion:
      "Is this expanding because it needs to, or because it can?",
    keyInsight:
      "Work expands to fill available time. Constraints aren't just limitations—they're focusing mechanisms.",
    redFlagPhrases: [
      "We'll need the full two weeks",
      "Let's use the whole hour",
      "It's taking longer than expected",
    ],
    adjacentModels: ["forcing-function", "planning-fallacy"],
    whyAdjacent: {
      "forcing-function": "Forces counteract Parkinson's Law",
      "planning-fallacy": "Both cause time expansion",
    },
  },
  {
    id: "activation-energy",
    name: "Activation Energy",
    tags: ["resource-management"],
    diagnosticQuestion: "What's the friction preventing this from starting?",
    keyInsight:
      "Starting requires more energy than continuing. Reduce starting friction to enable action.",
    redFlagPhrases: [
      "I can't get started",
      "First step is hardest",
      "Just need to begin",
    ],
    adjacentModels: [
      "forcing-function",
      "implementation-intentions",
      "hyperbolic-discounting",
      "default-effect",
    ],
    whyAdjacent: {
      "forcing-function": "Forces overcome activation energy",
      "implementation-intentions": "Reduce starting friction",
      "hyperbolic-discounting": "Present friction blocks future benefit",
      "default-effect": "Defaults have low activation energy",
    },
  },
  {
    id: "planning-fallacy",
    name: "Planning Fallacy",
    tags: ["resource-management"],
    diagnosticQuestion: "Am I being too optimistic about time/cost/effort?",
    keyInsight:
      "We systematically underestimate time, costs, and risks while overestimating benefits. Use reference class forecasting.",
    redFlagPhrases: [
      "Should only take a few hours",
      "We'll definitely hit the deadline",
      "No unexpected issues",
    ],
    adjacentModels: ["parkinsons-law", "base-rates", "pre-mortem"],
    whyAdjacent: {
      "parkinsons-law": "Work expands to exceed estimates",
      "base-rates": "Reference class corrects optimism",
      "pre-mortem": "Surfaces hidden time sinks",
    },
  },

  // ============================================
  // SYSTEMS-GROWTH (19 models)
  // ============================================
  {
    id: "tight-feedback-loops",
    name: "Tight Feedback Loops",
    tags: ["systems-growth"],
    diagnosticQuestion: "How quickly can I learn if this is working?",
    keyInsight:
      "Rapid feedback accelerates learning and correction. Shorten the loop wherever possible.",
    redFlagPhrases: [
      "We won't know for months",
      "Flying blind",
      "Immediate feedback",
    ],
    adjacentModels: [
      "feedback-loops",
      "deliberate-practice",
      "compound-interest",
    ],
    whyAdjacent: {
      "feedback-loops": "Tight is a property of feedback loops",
      "deliberate-practice": "Requires tight feedback",
      "compound-interest": "Learning compounds faster with tight loops",
    },
  },
  {
    id: "feedback-loops",
    name: "Feedback Loops",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is the output feeding back into the input?",
    keyInsight:
      "Outputs become inputs. Positive loops amplify; negative loops stabilize. Most important dynamics are loops.",
    redFlagPhrases: ["Vicious cycle", "Virtuous cycle", "Snowball effect"],
    adjacentModels: [
      "tight-feedback-loops",
      "second-order-effects",
      "emergence",
      "compound-interest",
    ],
    whyAdjacent: {
      "tight-feedback-loops": "Speed of the loop",
      "second-order-effects": "Loops create higher-order effects",
      emergence: "Loops produce emergent behavior",
      "compound-interest": "Compound growth is a positive loop",
    },
  },
  {
    id: "redundancy",
    name: "Redundancy",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is there backup if something fails?",
    keyInsight:
      "Duplicate critical components. Redundancy seems wasteful until you need it.",
    redFlagPhrases: [
      "Single point of failure",
      "Backup plan",
      "Belt and suspenders",
    ],
    adjacentModels: ["margin-of-safety", "antifragile", "diversification"],
    whyAdjacent: {
      "margin-of-safety": "Redundancy is margin for systems",
      antifragile: "Redundancy enables antifragility",
      diversification: "Diversification is portfolio redundancy",
    },
  },
  {
    id: "compound-interest",
    name: "Compound Interest",
    tags: ["systems-growth"],
    diagnosticQuestion: "Does growth build on previous growth?",
    keyInsight:
      "Growth on growth. Small rates compound to enormous outcomes given time. The most powerful force in finance and learning.",
    redFlagPhrases: [
      "Exponential growth",
      "Snowball effect",
      "Eighth wonder of the world",
    ],
    adjacentModels: ["multiplicative-systems", "power-law", "feedback-loops"],
    whyAdjacent: {
      "multiplicative-systems": "Compounding is multiplication",
      "power-law": "Compounding creates power law distributions",
      "feedback-loops": "Compounding is a positive feedback loop",
    },
  },
  {
    id: "diversification",
    name: "Diversification",
    tags: ["systems-growth"],
    diagnosticQuestion: "Are my risks correlated or independent?",
    keyInsight:
      "Spread bets across uncorrelated outcomes. Diversification reduces risk without proportionally reducing return.",
    redFlagPhrases: [
      "Don't put all eggs in one basket",
      "Spread the risk",
      "Portfolio",
    ],
    adjacentModels: ["redundancy", "barbell-strategy", "comparative-advantage"],
    whyAdjacent: {
      redundancy: "Diversification is portfolio redundancy",
      "barbell-strategy": "Extreme diversification strategy",
      "comparative-advantage": "Diversify across different advantages",
    },
  },
  {
    id: "leverage-points",
    name: "Leverage Points",
    tags: ["systems-growth"],
    diagnosticQuestion:
      "Where would a small intervention have the largest impact?",
    keyInsight:
      "Some places in a system are more influential than others. Find the leverage points.",
    redFlagPhrases: ["High leverage", "Bottleneck", "Linchpin"],
    adjacentModels: ["pareto-principle", "batna", "feedback-loops"],
    whyAdjacent: {
      "pareto-principle": "The 20% that drives 80%",
      batna: "BATNA is a negotiation leverage point",
      "feedback-loops": "Loop junctions are leverage points",
    },
  },
  {
    id: "local-vs-global-maxima",
    name: "Local vs. Global Maxima",
    tags: ["systems-growth"],
    diagnosticQuestion: "Am I stuck at a local peak, missing a higher one?",
    keyInsight:
      "Optimization can trap you at a local peak. Sometimes you must go down to eventually reach higher ground.",
    redFlagPhrases: ["Stuck in a rut", "Local optimum", "Short-term thinking"],
    adjacentModels: [
      "path-dependence",
      "first-principles",
      "satisficing",
      "diminishing-returns",
    ],
    whyAdjacent: {
      "path-dependence": "History can trap at local maxima",
      "first-principles": "Escapes local maxima thinking",
      satisficing: "Accepting local maximum deliberately",
      "diminishing-returns": "Signals approaching local max",
    },
  },
  {
    id: "power-law",
    name: "Power Law",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is this distributed extremely unequally?",
    keyInsight:
      "Many phenomena follow power laws: a few giants, many small. Not normally distributed; extremes dominate.",
    redFlagPhrases: ["Winner take all", "Long tail", "The 1%"],
    adjacentModels: ["pareto-principle", "network-effects", "winner-take-most"],
    whyAdjacent: {
      "pareto-principle": "80/20 is a power law",
      "network-effects": "Create power law outcomes",
      "winner-take-most": "Power law competition",
    },
  },
  {
    id: "economies-of-scale",
    name: "Economies of Scale",
    tags: ["systems-growth"],
    diagnosticQuestion: "Does bigger mean cheaper per unit?",
    keyInsight:
      "Fixed costs spread over more units reduce per-unit cost. Size begets size advantage—up to a point.",
    redFlagPhrases: [
      "Bulk discount",
      "Fixed cost leverage",
      "Volume advantage",
    ],
    adjacentModels: ["network-effects", "economic-moats", "winner-take-most"],
    whyAdjacent: {
      "network-effects": "Both create size advantages",
      "economic-moats": "Scale is a moat",
      "winner-take-most": "Scale advantage drives concentration",
    },
  },
  {
    id: "network-effects",
    name: "Network Effects",
    tags: ["systems-growth"],
    diagnosticQuestion:
      "Does each additional user make this more valuable for all users?",
    keyInsight:
      "Value increases with users. Winner-take-most dynamics emerge. The network becomes the moat.",
    redFlagPhrases: ["Everyone's on it", "Critical mass", "Platform"],
    adjacentModels: [
      "power-law",
      "winner-take-most",
      "critical-mass",
      "economies-of-scale",
    ],
    whyAdjacent: {
      "power-law": "Network effects create power laws",
      "winner-take-most": "Networks drive concentration",
      "critical-mass": "Networks need critical mass",
      "economies-of-scale": "Both create size advantages",
    },
  },
  {
    id: "arbitrage",
    name: "Arbitrage",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is there a price difference I can exploit?",
    keyInsight:
      "Price differences for the same thing create profit opportunities. Arbitrage closes gaps and increases efficiency.",
    redFlagPhrases: [
      "Buy low, sell high",
      "Price discrepancy",
      "Risk-free profit",
    ],
    adjacentModels: ["information-asymmetry", "mr-market", "economic-moats"],
    whyAdjacent: {
      "information-asymmetry": "Information gaps create arbitrage",
      "mr-market": "Emotional markets create arbitrage",
      "economic-moats": "Arbitrage is hard with moats",
    },
  },
  {
    id: "winner-take-most",
    name: "Winner-Take-Most",
    tags: ["systems-growth"],
    diagnosticQuestion: "Does this market tend toward one dominant player?",
    keyInsight:
      "Some markets concentrate around one or few winners. Network effects, economies of scale, and switching costs drive this.",
    redFlagPhrases: ["Monopoly", "Market leader", "Industry consolidation"],
    adjacentModels: [
      "network-effects",
      "power-law",
      "critical-mass",
      "economies-of-scale",
    ],
    whyAdjacent: {
      "network-effects": "Key driver of winner-take-most",
      "power-law": "Winner-take-most creates power law outcomes",
      "critical-mass": "First to critical mass often wins",
      "economies-of-scale": "Scale advantages compound",
    },
  },
  {
    id: "critical-mass",
    name: "Critical Mass",
    tags: ["systems-growth"],
    diagnosticQuestion:
      "Is there a threshold after which this becomes self-sustaining?",
    keyInsight:
      "Below critical mass, things fizzle. Above, they become self-sustaining or accelerating.",
    redFlagPhrases: [
      "Tipping point",
      "Reached critical mass",
      "Self-sustaining",
    ],
    adjacentModels: [
      "network-effects",
      "phase-transitions",
      "activation-energy",
    ],
    whyAdjacent: {
      "network-effects": "Networks need critical mass",
      "phase-transitions": "Critical mass triggers transitions",
      "activation-energy":
        "Getting to critical mass requires activation energy",
    },
  },
  {
    id: "economic-moats",
    name: "Economic Moats",
    tags: ["systems-growth"],
    diagnosticQuestion: "What protects this from competition?",
    keyInsight:
      "Durable competitive advantage. Moats include brands, switching costs, network effects, cost advantages, and scale.",
    redFlagPhrases: [
      "Competitive advantage",
      "Barriers to entry",
      "Defensibility",
    ],
    adjacentModels: [
      "network-effects",
      "switching-costs",
      "economies-of-scale",
    ],
    whyAdjacent: {
      "network-effects": "Networks are moats",
      "switching-costs": "Switching costs are moats",
      "economies-of-scale": "Scale is a moat",
    },
  },
  {
    id: "multiplicative-systems",
    name: "Multiplicative Systems",
    tags: ["systems-growth"],
    diagnosticQuestion: "Does one zero ruin everything?",
    keyInsight:
      "In multiplicative systems, one failure (zero) wipes out all gains. Avoid zeros at nearly any cost.",
    redFlagPhrases: [
      "Chain is only as strong as...",
      "One bad apple",
      "All or nothing",
    ],
    adjacentModels: ["compound-interest", "ergodicity", "redundancy"],
    whyAdjacent: {
      "compound-interest": "Multiplication is compounding",
      ergodicity: "Multiplicative systems are non-ergodic",
      redundancy: "Prevents zeros",
    },
  },
  {
    id: "emergence",
    name: "Emergence",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is complex behavior arising from simple rules?",
    keyInsight:
      "Complex patterns emerge from simple rules and interactions. The whole is different from the sum of parts.",
    redFlagPhrases: [
      "More than the sum of parts",
      "Self-organizing",
      "Emergent behavior",
    ],
    adjacentModels: [
      "feedback-loops",
      "second-order-effects",
      "phase-transitions",
    ],
    whyAdjacent: {
      "feedback-loops": "Loops produce emergence",
      "second-order-effects": "Higher-order effects emerge",
      "phase-transitions": "Emergence can be sudden",
    },
  },
  {
    id: "scale-free-networks",
    name: "Scale-Free Networks",
    tags: ["systems-growth"],
    diagnosticQuestion: "Are there hubs that connect everything?",
    keyInsight:
      "Many networks have a few highly connected hubs and many sparsely connected nodes. Hubs are critical and vulnerable.",
    redFlagPhrases: ["Super connector", "Hub", "Six degrees"],
    adjacentModels: ["network-effects", "power-law"],
    whyAdjacent: {
      "network-effects": "Scale-free structure amplifies network effects",
      "power-law": "Node connections follow power law",
    },
  },
  {
    id: "carrying-capacity",
    name: "Carrying Capacity",
    tags: ["systems-growth"],
    diagnosticQuestion: "What are the limits to growth here?",
    keyInsight:
      "Environments can only support so much. Growth slows as capacity is approached. Overshoot leads to collapse.",
    redFlagPhrases: ["Hitting the ceiling", "Maxed out", "Sustainable level"],
    adjacentModels: ["diminishing-returns", "local-vs-global-maxima"],
    whyAdjacent: {
      "diminishing-returns": "Returns diminish near capacity",
      "local-vs-global-maxima": "Capacity defines the ceiling",
    },
  },
  {
    id: "mr-market",
    name: "Mr. Market",
    tags: ["systems-growth"],
    diagnosticQuestion: "Is the market being emotional rather than rational?",
    keyInsight:
      "Markets are like a manic-depressive partner. Sometimes they're euphoric, sometimes despairing. You don't have to trade.",
    redFlagPhrases: [
      "Market panic",
      "Irrational exuberance",
      "Buy when there's blood",
    ],
    adjacentModels: ["arbitrage", "regression-to-the-mean"],
    whyAdjacent: {
      arbitrage: "Emotional markets create arbitrage",
      "regression-to-the-mean": "Extremes revert",
    },
  },

  // ============================================
  // EXPERIENCE-PERCEPTION (12 models)
  // ============================================
  {
    id: "default-effect",
    name: "Default Effect",
    tags: ["experience-perception"],
    diagnosticQuestion: "Is the default option driving the outcome?",
    keyInsight:
      "People stick with defaults. Pre-selected options win disproportionately. Design defaults carefully.",
    redFlagPhrases: [
      "I just went with the default",
      "Standard option",
      "Opt-out vs opt-in",
    ],
    adjacentModels: ["status-quo-bias", "activation-energy", "loss-aversion"],
    whyAdjacent: {
      "status-quo-bias": "Default is the status quo",
      "activation-energy": "Changing from default requires activation energy",
      "loss-aversion": "Changing from default feels like loss",
    },
  },
  {
    id: "switching-costs",
    name: "Switching Costs",
    tags: ["experience-perception"],
    diagnosticQuestion: "What would it cost to change?",
    keyInsight:
      "The friction of changing creates lock-in. Switching costs include money, time, learning, and data migration.",
    redFlagPhrases: [
      "Too much hassle to switch",
      "Locked in",
      "Migration cost",
    ],
    adjacentModels: ["path-dependence", "status-quo-bias", "economic-moats"],
    whyAdjacent: {
      "path-dependence": "Switching costs create path dependence",
      "status-quo-bias": "Switching costs reinforce status quo",
      "economic-moats": "Switching costs are moats",
    },
  },
  {
    id: "recency-bias",
    name: "Recency Bias",
    tags: ["experience-perception"],
    diagnosticQuestion: "Am I overweighting what happened recently?",
    keyInsight:
      "Recent events loom larger in memory and judgment. We expect recent trends to continue.",
    redFlagPhrases: ["Lately...", "Recently...", "Things have been..."],
    adjacentModels: [
      "peak-end-rule",
      "availability-bias",
      "hindsight-bias",
      "anchoring",
    ],
    whyAdjacent: {
      "peak-end-rule": "End (recent) dominates memory",
      "availability-bias": "Recent is easily available",
      "hindsight-bias": "Recent events rewrite memory",
      anchoring: "Recent numbers anchor",
    },
  },
  {
    id: "contrast-effect",
    name: "Contrast Effect",
    tags: ["experience-perception"],
    diagnosticQuestion: "Is comparison distorting my perception?",
    keyInsight:
      "We perceive things relative to their context, not absolutely. Contrast enhances differences.",
    redFlagPhrases: [
      "Compared to...",
      "Next to that...",
      "Relatively speaking",
    ],
    adjacentModels: ["anchoring", "framing-effect"],
    whyAdjacent: {
      anchoring: "Anchors create contrast",
      "framing-effect": "Framing creates contrast",
    },
  },
  {
    id: "anchoring",
    name: "Anchoring",
    tags: ["experience-perception"],
    diagnosticQuestion: "Is a starting number biasing my judgment?",
    keyInsight:
      "First numbers anchor subsequent estimates. Even irrelevant anchors influence judgment.",
    redFlagPhrases: ["Starting point", "Initial offer", "Reference price"],
    adjacentModels: ["contrast-effect", "framing-effect"],
    whyAdjacent: {
      "contrast-effect": "Anchors create contrast",
      "framing-effect": "Anchoring is a framing technique",
    },
  },
  {
    id: "peak-end-rule",
    name: "Peak-End Rule",
    tags: ["experience-perception"],
    diagnosticQuestion: "How will this be remembered?",
    keyInsight:
      "People judge experiences by their peak (best or worst moment) and how they end. The middle barely matters.",
    redFlagPhrases: [
      "The ending ruined it",
      "That one moment",
      "Started rough but finished strong",
    ],
    adjacentModels: ["recency-bias", "loss-aversion", "framing-effect"],
    whyAdjacent: {
      "recency-bias": "End is recent",
      "loss-aversion": "Negative peaks hit harder",
      "framing-effect": "End frames the memory",
    },
  },
  {
    id: "mere-exposure-effect",
    name: "Mere Exposure Effect",
    tags: ["experience-perception"],
    diagnosticQuestion: "Do I like this because I've seen it before?",
    keyInsight:
      "Familiarity breeds preference. The more we're exposed to something, the more we tend to like it.",
    redFlagPhrases: ["It's grown on me", "Familiar", "I've seen it around"],
    adjacentModels: ["liking-bias", "status-quo-bias"],
    whyAdjacent: {
      "liking-bias": "Exposure creates liking",
      "status-quo-bias": "Familiar = status quo",
    },
  },
  {
    id: "loss-aversion",
    name: "Loss Aversion",
    tags: ["experience-perception"],
    diagnosticQuestion: "Does the fear of loss outweigh the hope of gain?",
    keyInsight:
      "Losses hurt roughly twice as much as equivalent gains feel good. We'll risk more to avoid loss than to achieve gain.",
    redFlagPhrases: [
      "I don't want to lose...",
      "Can't afford to lose",
      "Protect the downside",
    ],
    adjacentModels: [
      "endowment-effect",
      "status-quo-bias",
      "sunk-cost-fallacy",
      "regret-minimization",
    ],
    whyAdjacent: {
      "endowment-effect": "Losing what we have",
      "status-quo-bias": "Change means possible loss",
      "sunk-cost-fallacy": "Walking away feels like loss",
      "regret-minimization": "Regret for losses is stronger",
    },
  },
  {
    id: "framing-effect",
    name: "Framing Effect",
    tags: ["experience-perception"],
    diagnosticQuestion:
      "Would I react differently if this were presented differently?",
    keyInsight:
      "How something is presented changes how it's perceived. Same facts, different frames, different decisions.",
    redFlagPhrases: ["Spin", "Half full or half empty", "Positioning"],
    adjacentModels: [
      "anchoring",
      "contrast-effect",
      "loss-aversion",
      "mental-accounting",
    ],
    whyAdjacent: {
      anchoring: "Anchors are frames",
      "contrast-effect": "Frames create contrast",
      "loss-aversion": "Loss frame vs. gain frame",
      "mental-accounting": "Framing creates mental accounts",
    },
  },
  {
    id: "endowment-effect",
    name: "Endowment Effect",
    tags: ["experience-perception"],
    diagnosticQuestion: "Do I value this more because I own it?",
    keyInsight:
      "We value things more once we own them. Selling price exceeds buying price for the same item.",
    redFlagPhrases: [
      "It's mine",
      "I wouldn't sell it for...",
      "Attached to it",
    ],
    adjacentModels: ["loss-aversion", "status-quo-bias", "sunk-cost-fallacy"],
    whyAdjacent: {
      "loss-aversion": "Giving up feels like loss",
      "status-quo-bias": "Ownership is status quo",
      "sunk-cost-fallacy": "Invested in owned things",
    },
  },
  {
    id: "hedonic-adaptation",
    name: "Hedonic Adaptation",
    tags: ["experience-perception"],
    diagnosticQuestion: "Will this happiness (or misery) last?",
    keyInsight:
      "We adapt to new circumstances. Gains and losses fade. Satisfaction returns to baseline faster than expected.",
    redFlagPhrases: ["Hedonic treadmill", "The new normal", "Used to it now"],
    adjacentModels: ["scarcity-vs-abundance"],
    whyAdjacent: {
      "scarcity-vs-abundance": "Abundance loses its thrill",
    },
  },
  {
    id: "scarcity-vs-abundance",
    name: "Scarcity vs. Abundance",
    tags: ["experience-perception", "personal-performance"],
    diagnosticQuestion: "Is my mindset about resources shaping my behavior?",
    keyInsight:
      "Scarcity mindset hoards and competes; abundance mindset shares and creates. The mindset often matters more than the reality.",
    redFlagPhrases: [
      "Not enough to go around",
      "Zero-sum",
      "Plenty for everyone",
    ],
    adjacentModels: [
      "hedonic-adaptation",
      "mimetic-desire",
      "growth-vs-fixed-mindset",
    ],
    whyAdjacent: {
      "hedonic-adaptation": "Abundance doesn't satisfy",
      "mimetic-desire": "Scarcity amplifies mimetic desire",
      "growth-vs-fixed-mindset": "Similar mindset framework",
    },
  },

  // ============================================
  // COMPETITION-STRATEGY (4 models)
  // ============================================
  {
    id: "red-queen-effect",
    name: "Red Queen Effect",
    tags: ["competition-strategy"],
    diagnosticQuestion: "Am I running just to stay in place?",
    keyInsight:
      "In competitive environments, you must keep improving just to maintain position. Standing still means falling behind.",
    redFlagPhrases: [
      "Running to stay in place",
      "Arms race",
      "Competitive pressure",
    ],
    adjacentModels: ["creative-destruction"],
    whyAdjacent: {
      "creative-destruction": "Constant innovation or death",
    },
  },
  {
    id: "sexual-selection",
    name: "Sexual Selection",
    tags: ["competition-strategy"],
    diagnosticQuestion: "Is selection favoring display over function?",
    keyInsight:
      "Competition for mates can select for traits that are costly and even counterproductive except as signals.",
    redFlagPhrases: ["Peacock's tail", "Showing off", "Costly signal"],
    adjacentModels: ["signaling", "mimetic-desire"],
    whyAdjacent: {
      signaling: "Sexual selection drives signaling",
      "mimetic-desire": "We want what mates want",
    },
  },
  {
    id: "easterbrooks-paradox",
    name: "Easterbrook's Paradox",
    tags: ["competition-strategy"],
    diagnosticQuestion: "Why isn't progress making us happier?",
    keyInsight:
      "Objective conditions improve but subjective satisfaction doesn't. Expectations rise with achievements.",
    redFlagPhrases: [
      "Better off but not happier",
      "Rising expectations",
      "Never enough",
    ],
    adjacentModels: ["hedonic-adaptation"],
    whyAdjacent: {
      "hedonic-adaptation": "We adapt to improvements",
    },
  },

  // ============================================
  // PERSONAL-PERFORMANCE (5 models)
  // ============================================
  {
    id: "growth-vs-fixed-mindset",
    name: "Growth vs Fixed Mindset",
    tags: ["personal-performance"],
    diagnosticQuestion: "Do I believe this ability can be developed?",
    keyInsight:
      "Believing abilities are fixed limits effort and growth. Believing they can be developed drives learning and resilience.",
    redFlagPhrases: [
      "I'm just not good at...",
      "Natural talent",
      "I can learn this",
    ],
    adjacentModels: [
      "deliberate-practice",
      "desirable-difficulty",
      "impostor-syndrome",
      "feedback-loops",
    ],
    whyAdjacent: {
      "deliberate-practice": "Growth mindset enables deliberate practice",
      "desirable-difficulty": "Growth mindset embraces difficulty",
      "impostor-syndrome": "Fixed mindset can fuel impostor feelings",
      "feedback-loops": "Growth requires feedback",
    },
  },
  {
    id: "deliberate-practice",
    name: "Deliberate Practice",
    tags: ["personal-performance"],
    diagnosticQuestion:
      "Am I practicing with focused effort on specific weaknesses?",
    keyInsight:
      "Improvement requires focused, uncomfortable practice at the edge of current ability with immediate feedback.",
    redFlagPhrases: [
      "Pushing my limits",
      "Working on weaknesses",
      "Focused practice",
    ],
    adjacentModels: ["tight-feedback-loops", "desirable-difficulty"],
    whyAdjacent: {
      "tight-feedback-loops": "Deliberate practice requires tight feedback",
      "desirable-difficulty": "Effective practice is difficult",
    },
  },
  {
    id: "desirable-difficulty",
    name: "Desirable Difficulty",
    tags: ["personal-performance"],
    diagnosticQuestion: "Is this difficult in a way that promotes learning?",
    keyInsight:
      "Some difficulties enhance learning even though they feel harder. Easy practice is often ineffective practice.",
    redFlagPhrases: [
      "No pain, no gain",
      "Challenging but worthwhile",
      "Struggle is learning",
    ],
    adjacentModels: ["deliberate-practice", "antifragile"],
    whyAdjacent: {
      "deliberate-practice": "Deliberate practice is desirably difficult",
      antifragile: "Difficulty as strengthening stress",
    },
  },
  {
    id: "impostor-syndrome",
    name: "Impostor Syndrome",
    tags: ["personal-performance"],
    diagnosticQuestion: "Am I doubting myself despite evidence of competence?",
    keyInsight:
      "Successful people often feel like frauds about to be exposed. The feeling is common and usually inaccurate.",
    redFlagPhrases: ["I got lucky", "They'll find out", "I don't belong here"],
    adjacentModels: [
      "dunning-kruger-effect",
      "growth-vs-fixed-mindset",
      "signaling",
    ],
    whyAdjacent: {
      "dunning-kruger-effect": "Opposite pattern of miscalibration",
      "growth-vs-fixed-mindset": "Fixed mindset amplifies impostor feelings",
      signaling: "Impostors worry about their signals",
    },
  },

  // ============================================
  // THINKING-CLEARLY (11 models)
  // ============================================
  {
    id: "occams-razor",
    name: "Occam's Razor",
    tags: ["thinking-clearly"],
    diagnosticQuestion: "Is the simplest explanation sufficient?",
    keyInsight:
      "Among competing explanations, prefer the simplest one that fits the facts. Don't multiply entities unnecessarily.",
    redFlagPhrases: [
      "Simplest explanation",
      "Don't overcomplicate",
      "Conspiracy vs. incompetence",
    ],
    adjacentModels: [
      "hanlons-razor",
      "first-principles",
      "abstraction-ladders",
      "confirmation-bias",
    ],
    whyAdjacent: {
      "hanlons-razor": "Similar simplicity principle",
      "first-principles": "Both seek fundamental explanations",
      "abstraction-ladders": "Simpler = lower abstraction",
      "confirmation-bias":
        "Resists simple explanations that contradict beliefs",
    },
  },
  {
    id: "multicausal",
    name: "Multicausal",
    tags: ["thinking-clearly"],
    diagnosticQuestion: "Am I looking for one cause when there are many?",
    keyInsight:
      "Most outcomes have multiple causes. Single-cause explanations are usually incomplete.",
    redFlagPhrases: [
      "It's not just one thing",
      "Multiple factors",
      "Complex causes",
    ],
    adjacentModels: ["lollapalooza-effect", "narrative-fallacy"],
    whyAdjacent: {
      "lollapalooza-effect": "Multiple causes combining",
      "narrative-fallacy": "Stories prefer single causes",
    },
  },
  {
    id: "steelmanning",
    name: "Steelmanning",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Am I engaging with the strongest version of this argument?",
    keyInsight:
      "Argue against the best version of the opposing view, not the weakest. You learn more and persuade better.",
    redFlagPhrases: [
      "Devil's advocate",
      "Best case for...",
      "Strongest argument",
    ],
    adjacentModels: ["inversion", "confirmation-bias"],
    whyAdjacent: {
      inversion: "Both require considering opposites",
      "confirmation-bias": "Steelmanning counters confirmation bias",
    },
  },
  {
    id: "confirmation-bias",
    name: "Confirmation Bias",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Am I seeking evidence that confirms what I already believe?",
    keyInsight:
      "We notice and remember information that confirms our beliefs and ignore or forget what contradicts them.",
    redFlagPhrases: ["I knew it", "This proves...", "See, I was right"],
    adjacentModels: ["bayes-theorem", "steelmanning", "availability-bias"],
    whyAdjacent: {
      "bayes-theorem": "Proper updating counters confirmation bias",
      steelmanning: "Forces engagement with contrary evidence",
      "availability-bias": "Confirming evidence is more available",
    },
  },
  {
    id: "availability-bias",
    name: "Availability Bias",
    tags: ["thinking-clearly"],
    diagnosticQuestion: "Am I overweighting what comes easily to mind?",
    keyInsight:
      "We judge likelihood by how easily examples come to mind. Vivid, recent, or emotional events seem more probable.",
    redFlagPhrases: [
      "I can think of lots of examples",
      "It happens all the time",
      "You always hear about...",
    ],
    adjacentModels: ["recency-bias", "base-rates", "survivorship-bias"],
    whyAdjacent: {
      "recency-bias": "Recent is more available",
      "base-rates": "Availability causes base rate neglect",
      "survivorship-bias": "Survivors are more available",
    },
  },
  {
    id: "survivorship-bias",
    name: "Survivorship Bias",
    tags: ["thinking-clearly"],
    diagnosticQuestion: "Am I only seeing the winners?",
    keyInsight:
      "We see survivors, not failures. This distorts our understanding of what leads to success.",
    redFlagPhrases: [
      "Success stories",
      "They made it, so can I",
      "The secret of successful people",
    ],
    adjacentModels: [
      "availability-bias",
      "base-rates",
      "regression-to-the-mean",
    ],
    whyAdjacent: {
      "availability-bias": "Survivors are available; failures aren't",
      "base-rates": "Survivors distort base rates",
      "regression-to-the-mean": "Survivors may regress",
    },
  },
  {
    id: "narrative-fallacy",
    name: "Narrative Fallacy",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Am I fitting a story where randomness might explain more?",
    keyInsight:
      "We're compelled to create narratives, even for random events. Stories feel true but often mislead.",
    redFlagPhrases: [
      "The story is...",
      "It all makes sense now",
      "Here's what happened...",
    ],
    adjacentModels: ["hindsight-bias", "regression-to-the-mean", "multicausal"],
    whyAdjacent: {
      "hindsight-bias": "We create narratives after the fact",
      "regression-to-the-mean": "We create stories for regression",
      multicausal: "Narratives oversimplify to single causes",
    },
  },
  {
    id: "hindsight-bias",
    name: "Hindsight Bias",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Am I thinking 'I knew it all along' after learning the outcome?",
    keyInsight:
      "Once we know an outcome, we think we predicted it. This distorts learning from experience.",
    redFlagPhrases: ["I knew it", "It was obvious", "Anyone could have seen"],
    adjacentModels: ["narrative-fallacy", "pre-mortem"],
    whyAdjacent: {
      "narrative-fallacy": "Hindsight creates narratives",
      "pre-mortem": "Pre-mortems prevent hindsight bias",
    },
  },
  {
    id: "abstraction-ladders",
    name: "Abstraction Ladders",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Am I at the right level of abstraction for this problem?",
    keyInsight:
      "Problems can be viewed at different levels of abstraction. Moving up or down the ladder reveals different insights.",
    redFlagPhrases: [
      "Big picture vs. details",
      "Zoom in or out",
      "In general vs. specifically",
    ],
    adjacentModels: [
      "first-principles",
      "map-vs-territory",
      "curse-of-knowledge",
    ],
    whyAdjacent: {
      "first-principles": "Moves to foundational abstraction",
      "map-vs-territory": "Different abstractions are different maps",
      "curse-of-knowledge": "Experts at wrong abstraction level",
    },
  },
  {
    id: "lollapalooza-effect",
    name: "Lollapalooza Effect",
    tags: ["thinking-clearly"],
    diagnosticQuestion:
      "Are multiple forces combining to create an extreme outcome?",
    keyInsight:
      "When several biases or forces align, they can produce extreme results far beyond what any single factor would cause.",
    redFlagPhrases: [
      "Perfect storm",
      "Everything aligned",
      "Multiple factors converged",
    ],
    adjacentModels: ["multicausal", "feedback-loops", "incentives"],
    whyAdjacent: {
      multicausal: "Multiple causes combining",
      "feedback-loops": "Loops can amplify combination",
      incentives: "Often includes aligned incentives",
    },
  },
  {
    id: "dunning-kruger-effect",
    name: "Dunning-Kruger Effect",
    tags: ["thinking-clearly"],
    diagnosticQuestion: "Does my confidence match my actual competence?",
    keyInsight:
      "The less we know, the more we think we know. Incompetence masks the ability to recognize incompetence.",
    redFlagPhrases: [
      "I'm sure I'm right",
      "How hard can it be?",
      "Experts overcomplicate things",
    ],
    adjacentModels: ["circle-of-competence", "impostor-syndrome"],
    whyAdjacent: {
      "circle-of-competence": "Dunning-Kruger outside the circle",
      "impostor-syndrome": "Opposite miscalibration",
    },
  },
];
