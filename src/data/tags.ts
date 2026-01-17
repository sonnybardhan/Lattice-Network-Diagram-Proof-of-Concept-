import { Tag } from "../types";

export const tags: Tag[] = [
  {
    id: "decision-prioritization",
    name: "Decision & Prioritization",
    l1Question: "Are you weighing options or deciding what to do?",
    l2Question: "What's the core decision challenge?",
    l2Options: [
      {
        text: "I have too many options and need to prioritize",
        modelIds: ["eisenhower-matrix", "pareto-principle", "satisficing"],
        l3Question: "What's the prioritization challenge?",
        l3Options: [
          { text: "Separating urgent from important", modelId: "eisenhower-matrix" },
          { text: "Finding the vital few that drive most results", modelId: "pareto-principle" },
          { text: "Accepting good enough to move forward", modelId: "satisficing" },
        ],
      },
      {
        text: "I need to evaluate trade-offs between choices",
        modelIds: [
          "opportunity-cost",
          "comparative-advantage",
          "expected-value",
          "diminishing-returns",
        ],
        l3Question: "What's the nature of the trade-off?",
        l3Options: [
          { text: "Choosing between fundamentally different paths", modelId: "opportunity-cost" },
          { text: "Deciding where to focus my limited strengths", modelId: "comparative-advantage" },
          { text: "Weighing probabilities and payoffs", modelId: "expected-value" },
          { text: "Wondering if more effort is worth it", modelId: "diminishing-returns" },
        ],
      },
      {
        text: "I want to keep options open or stay flexible",
        modelIds: ["reversibility", "optionality", "barbell-strategy"],
      },
      {
        text: "I need a fallback or negotiation baseline",
        modelIds: ["batna"],
      },
      {
        text: "I want to stress-test or de-risk my decision",
        modelIds: ["pre-mortem", "inversion", "regret-minimization"],
        l3Question: "How do you want to stress-test?",
        l3Options: [
          { text: "Imagine future failure and work backward", modelId: "pre-mortem" },
          { text: "Ask what would guarantee failure and avoid that", modelId: "inversion" },
          { text: "Consider which choice I'll regret least long-term", modelId: "regret-minimization" },
        ],
      },
      {
        text: "I'm stuck and need to reframe from scratch",
        modelIds: [
          "first-principles",
          "via-negativa",
          "via-positiva-vs-via-negativa",
        ],
        l3Question: "How do you want to reframe?",
        l3Options: [
          { text: "Break it down to fundamental truths and rebuild", modelId: "first-principles" },
          { text: "Figure out what to remove or stop doing", modelId: "via-negativa" },
          { text: "Decide whether to add or subtract", modelId: "via-positiva-vs-via-negativa" },
        ],
      },
      {
        text: "I need to actually follow through on this decision",
        modelIds: ["implementation-intentions", "forcing-function"],
      },
      {
        text: "I'm being irrational about risk or categories",
        modelIds: ["zero-risk-bias", "mental-accounting"],
      },
    ],
    modelIds: [
      "eisenhower-matrix",
      "pareto-principle",
      "reversibility",
      "implementation-intentions",
      "diminishing-returns",
      "opportunity-cost",
      "forcing-function",
      "batna",
      "satisficing",
      "pre-mortem",
      "inversion",
      "regret-minimization",
      "expected-value",
      "first-principles",
      "optionality",
      "comparative-advantage",
      "via-negativa",
      "via-positiva-vs-via-negativa",
      "barbell-strategy",
      "zero-risk-bias",
      "mental-accounting",
    ],
  },
  {
    id: "unexpected-behavior",
    name: "Unexpected Behavior",
    l1Question: "Is someone acting in a way that doesn't make sense?",
    l2Question: "What might explain the behavior?",
    l2Options: [
      {
        text: "They're responding to rewards or penalties I haven't considered",
        modelIds: ["incentives", "moral-hazard", "principal-agent-problem"],
        l3Question: "What's the relationship between you and them?",
        l3Options: [
          { text: "They're acting on their own interests, not related to me", modelId: "incentives" },
          { text: "They're supposed to be acting on my behalf", modelId: "principal-agent-problem" },
          { text: "They're taking risks because they won't bear the consequences", modelId: "moral-hazard" },
        ],
      },
      {
        text: "A metric or rule is creating perverse outcomes",
        modelIds: ["goodharts-law", "cobra-effect"],
      },
      {
        text: "I'm misreading their motives or situation",
        modelIds: [
          "hanlons-razor",
          "fundamental-attribution-error",
          "empathy-gap",
        ],
        l3Question: "What might I be getting wrong?",
        l3Options: [
          { text: "Assuming bad intent when it's probably just incompetence", modelId: "hanlons-razor" },
          { text: "Blaming their character when it's really their circumstances", modelId: "fundamental-attribution-error" },
          { text: "Can't imagine how they feel in their emotional state", modelId: "empathy-gap" },
        ],
      },
      {
        text: "Their actions reveal what they actually want (vs. what they say)",
        modelIds: ["revealed-preference", "mimetic-desire"],
      },
      {
        text: "They're prioritizing now over later",
        modelIds: ["hyperbolic-discounting"],
      },
    ],
    modelIds: [
      "incentives",
      "hanlons-razor",
      "revealed-preference",
      "empathy-gap",
      "goodharts-law",
      "cobra-effect",
      "principal-agent-problem",
      "hyperbolic-discounting",
      "moral-hazard",
      "fundamental-attribution-error",
      "mimetic-desire",
    ],
  },
  {
    id: "incomplete-information",
    name: "Incomplete Information",
    l1Question: "Does someone know something important that others don't?",
    l2Question: "What's the nature of the information gap?",
    l2Options: [
      {
        text: "Someone knows more than I do (or vice versa)",
        modelIds: [
          "information-asymmetry",
          "adverse-selection",
          "curse-of-knowledge",
        ],
        l3Question: "What's the consequence of the information gap?",
        l3Options: [
          { text: "It affects negotiation or transaction outcomes", modelId: "information-asymmetry" },
          { text: "It's attracting the wrong participants", modelId: "adverse-selection" },
          { text: "I can't communicate what I know effectively", modelId: "curse-of-knowledge" },
        ],
      },
      {
        text: "I'm working with probabilities or incomplete data",
        modelIds: ["base-rates", "bayes-theorem", "regression-to-the-mean"],
        l3Question: "What's the probability challenge?",
        l3Options: [
          { text: "I need to know the general odds before considering specifics", modelId: "base-rates" },
          { text: "I need to update my beliefs with new evidence", modelId: "bayes-theorem" },
          { text: "I'm seeing extreme results that might not persist", modelId: "regression-to-the-mean" },
        ],
      },
      {
        text: "My mental model might not match reality",
        modelIds: ["map-vs-territory", "circle-of-competence"],
      },
      {
        text: "There's fundamental uncertainty—I can't know what I don't know",
        modelIds: ["black-swan", "knightian-uncertainty"],
      },
    ],
    modelIds: [
      "information-asymmetry",
      "circle-of-competence",
      "curse-of-knowledge",
      "base-rates",
      "regression-to-the-mean",
      "map-vs-territory",
      "bayes-theorem",
      "adverse-selection",
      "black-swan",
      "knightian-uncertainty",
    ],
  },
  {
    id: "change-disruption",
    name: "Change & Disruption",
    l1Question: "Is something ending, shifting, or being replaced?",
    l2Question: "What's the nature of the change?",
    l2Options: [
      {
        text: "Something new is replacing something old",
        modelIds: ["creative-destruction", "lindy-effect"],
      },
      {
        text: "Past investments are clouding current judgment",
        modelIds: ["sunk-cost-fallacy", "commitment-bias", "status-quo-bias"],
        l3Question: "What's driving the attachment to the current path?",
        l3Options: [
          { text: "I've invested too much to walk away", modelId: "sunk-cost-fallacy" },
          { text: "I made a commitment and feel I must honor it", modelId: "commitment-bias" },
          { text: "Staying feels safer even if change is better", modelId: "status-quo-bias" },
        ],
      },
      {
        text: "I need to think through downstream consequences",
        modelIds: [
          "second-order-thinking",
          "second-order-effects",
          "unintended-consequences",
        ],
        l3Question: "What's the concern about consequences?",
        l3Options: [
          { text: "I need a framework for thinking beyond the immediate", modelId: "second-order-thinking" },
          { text: "I want to trace the chain of effects from effects", modelId: "second-order-effects" },
          { text: "I'm worried about outcomes I'm not intending", modelId: "unintended-consequences" },
        ],
      },
      {
        text: "I'm tempted to change something without understanding why it exists",
        modelIds: ["chestertons-fence"],
      },
      {
        text: "History or structure constrains what's possible",
        modelIds: ["path-dependence"],
      },
      {
        text: "The system might break—or get stronger—under stress",
        modelIds: ["antifragile", "phase-transitions"],
        l3Question: "What's the relationship with stress?",
        l3Options: [
          { text: "It could gain from disorder and volatility", modelId: "antifragile" },
          { text: "It could suddenly shift to a new state", modelId: "phase-transitions" },
        ],
      },
    ],
    modelIds: [
      "sunk-cost-fallacy",
      "status-quo-bias",
      "unintended-consequences",
      "chestertons-fence",
      "second-order-thinking",
      "second-order-effects",
      "path-dependence",
      "lindy-effect",
      "antifragile",
      "phase-transitions",
      "commitment-bias",
      "creative-destruction",
    ],
  },
  {
    id: "social-dynamics",
    name: "Social Dynamics",
    l1Question:
      "Are other people's perceptions, actions, or cooperation part of this?",
    l2Question: "What's the social dynamic at play?",
    l2Options: [
      {
        text: "Actions are about perception or status, not just outcomes",
        modelIds: ["signaling", "mimetic-desire"],
        l3Question: "What's the signaling dynamic?",
        l3Options: [
          { text: "Someone is communicating value or intent through costly actions", modelId: "signaling" },
          { text: "Someone wants something because others want it", modelId: "mimetic-desire" },
        ],
      },
      {
        text: "People are following others or deferring to authority",
        modelIds: ["social-proof", "authority-bias"],
      },
      {
        text: "Give-and-take, liking, or obligation is shaping behavior",
        modelIds: ["reciprocation", "liking-bias", "commitment-bias"],
        l3Question: "What's the social mechanism?",
        l3Options: [
          { text: "Feeling obligated to return favors", modelId: "reciprocation" },
          { text: "Being influenced because I like them", modelId: "liking-bias" },
          { text: "Feeling bound by past statements or positions", modelId: "commitment-bias" },
        ],
      },
      {
        text: "Individual incentives conflict with group outcomes",
        modelIds: [
          "prisoners-dilemma",
          "tragedy-of-the-commons",
          "nash-equilibrium",
        ],
        l3Question: "What's the structure of the conflict?",
        l3Options: [
          { text: "Two parties, both better off cooperating but tempted to defect", modelId: "prisoners-dilemma" },
          { text: "Shared resource being depleted by individual use", modelId: "tragedy-of-the-commons" },
          { text: "Stable state where no one can improve alone", modelId: "nash-equilibrium" },
        ],
      },
    ],
    modelIds: [
      "reciprocation",
      "social-proof",
      "liking-bias",
      "authority-bias",
      "signaling",
      "prisoners-dilemma",
      "tragedy-of-the-commons",
      "nash-equilibrium",
      "mimetic-desire",
      "commitment-bias",
    ],
  },
  {
    id: "risk-uncertainty",
    name: "Risk & Uncertainty",
    l1Question:
      "Is there a downside that matters, or real uncertainty about outcomes?",
    l2Question: "What's the risk profile?",
    l2Options: [
      {
        text: "Upside and downside aren't balanced",
        modelIds: ["asymmetric-risk"],
      },
      {
        text: "The downside is catastrophic or irreversible",
        modelIds: [
          "precautionary-principle",
          "extinction-events",
          "black-swan",
        ],
        l3Question: "What's the nature of the catastrophic risk?",
        l3Options: [
          { text: "I should act cautiously even without full evidence", modelId: "precautionary-principle" },
          { text: "This could wipe me out completely—no recovery", modelId: "extinction-events" },
          { text: "This is a rare, unpredictable, high-impact event", modelId: "black-swan" },
        ],
      },
      {
        text: "Someone's exposure to consequences shapes their behavior",
        modelIds: ["skin-in-the-game"],
      },
      {
        text: "I need buffer room for error",
        modelIds: ["margin-of-safety"],
      },
      {
        text: "Repeated exposure to risk changes the math",
        modelIds: ["ergodicity"],
      },
    ],
    modelIds: [
      "skin-in-the-game",
      "margin-of-safety",
      "asymmetric-risk",
      "precautionary-principle",
      "ergodicity",
      "extinction-events",
      "black-swan",
    ],
  },
  {
    id: "resource-management",
    name: "Resource Management",
    l1Question: "Is there friction around time, energy, or getting started?",
    l2Question: "What's the resource problem?",
    l2Options: [
      {
        text: "Work is expanding to fill available time",
        modelIds: ["parkinsons-law"],
      },
      {
        text: "My estimates were too optimistic",
        modelIds: ["planning-fallacy"],
      },
      {
        text: "I'm mentally overloaded or can't focus",
        modelIds: ["cognitive-load"],
      },
      {
        text: "I can't get started—there's too much friction",
        modelIds: ["activation-energy"],
      },
    ],
    modelIds: [
      "cognitive-load",
      "parkinsons-law",
      "activation-energy",
      "planning-fallacy",
    ],
  },
  {
    id: "systems-growth",
    name: "Systems & Growth",
    l1Question:
      "Does this involve something growing, compounding, or feeding back on itself?",
    l2Question: "What system dynamic are you thinking about?",
    l2Options: [
      {
        text: "Small inputs compounding into big outputs over time",
        modelIds: ["compound-interest", "multiplicative-systems"],
      },
      {
        text: "Loops that amplify or dampen themselves",
        modelIds: ["feedback-loops", "tight-feedback-loops"],
      },
      {
        text: "Where to intervene for maximum effect",
        modelIds: ["leverage-points"],
      },
      {
        text: "Why some things dominate while others stay small",
        modelIds: [
          "power-law",
          "network-effects",
          "winner-take-most",
          "economies-of-scale",
          "critical-mass",
        ],
        l3Question: "What's driving the dominance?",
        l3Options: [
          { text: "The distribution is extremely unequal (few giants, many small)", modelId: "power-law" },
          { text: "Each additional user makes it more valuable for everyone", modelId: "network-effects" },
          { text: "The market naturally consolidates to one or few winners", modelId: "winner-take-most" },
          { text: "Bigger players have lower per-unit costs", modelId: "economies-of-scale" },
          { text: "There's a threshold after which growth becomes self-sustaining", modelId: "critical-mass" },
        ],
      },
      {
        text: "How complex behavior arises from simple parts",
        modelIds: ["emergence", "scale-free-networks"],
      },
      {
        text: "Building resilience or spreading risk",
        modelIds: ["redundancy", "diversification"],
        l3Question: "What's the resilience strategy?",
        l3Options: [
          { text: "Duplicate critical components so there's backup", modelId: "redundancy" },
          { text: "Spread bets across uncorrelated outcomes", modelId: "diversification" },
        ],
      },
      {
        text: "Competitive advantage or market dynamics",
        modelIds: ["economic-moats", "arbitrage", "mr-market"],
        l3Question: "What's the market dynamic?",
        l3Options: [
          { text: "Durable advantage that protects from competition", modelId: "economic-moats" },
          { text: "Price differences to exploit", modelId: "arbitrage" },
          { text: "Emotional market behavior creating opportunity", modelId: "mr-market" },
        ],
      },
      {
        text: "Being stuck in a suboptimal position, or hitting natural limits",
        modelIds: ["local-vs-global-maxima", "carrying-capacity"],
      },
    ],
    modelIds: [
      "tight-feedback-loops",
      "feedback-loops",
      "redundancy",
      "compound-interest",
      "diversification",
      "leverage-points",
      "local-vs-global-maxima",
      "power-law",
      "economies-of-scale",
      "network-effects",
      "arbitrage",
      "winner-take-most",
      "critical-mass",
      "economic-moats",
      "multiplicative-systems",
      "emergence",
      "scale-free-networks",
      "carrying-capacity",
      "mr-market",
    ],
  },
  {
    id: "experience-perception",
    name: "Experience & Perception",
    l1Question: "Does how this feels, looks, or will be remembered matter?",
    l2Question: "What aspect of perception or experience is at play?",
    l2Options: [
      {
        text: "How something is remembered vs. how it actually was",
        modelIds: ["peak-end-rule", "recency-bias"],
      },
      {
        text: "How context or comparison shapes perception",
        modelIds: ["contrast-effect", "anchoring", "framing-effect"],
        l3Question: "What's shaping the perception?",
        l3Options: [
          { text: "A starting number is biasing judgment", modelId: "anchoring" },
          { text: "Comparison is distorting perception", modelId: "contrast-effect" },
          { text: "Presentation is changing the reaction", modelId: "framing-effect" },
        ],
      },
      {
        text: "Why people resist giving something up or changing",
        modelIds: [
          "loss-aversion",
          "endowment-effect",
          "default-effect",
          "switching-costs",
        ],
        l3Question: "What's the source of the resistance?",
        l3Options: [
          { text: "The fear of loss outweighs the potential gain", modelId: "loss-aversion" },
          { text: "They overvalue it simply because they own it", modelId: "endowment-effect" },
          { text: "The current option is pre-selected and requires no action", modelId: "default-effect" },
          { text: "Changing would cost time, money, or effort", modelId: "switching-costs" },
        ],
      },
      {
        text: "Why familiarity or exposure changes preference",
        modelIds: ["mere-exposure-effect"],
      },
      {
        text: "Why satisfaction fades or expectations shift",
        modelIds: ["hedonic-adaptation", "scarcity-vs-abundance"],
      },
    ],
    modelIds: [
      "default-effect",
      "switching-costs",
      "recency-bias",
      "contrast-effect",
      "anchoring",
      "peak-end-rule",
      "mere-exposure-effect",
      "loss-aversion",
      "framing-effect",
      "endowment-effect",
      "hedonic-adaptation",
      "scarcity-vs-abundance",
    ],
  },
  {
    id: "competition-strategy",
    name: "Competition & Strategy",
    l1Question:
      "Are you competing with others or trying to maintain a position?",
    l2Question: "What's the competitive dynamic?",
    l2Options: [
      {
        text: "I have to keep running just to stay in place",
        modelIds: ["red-queen-effect"],
      },
      {
        text: "Competition is selecting for traits that aren't purely functional",
        modelIds: ["sexual-selection"],
      },
      {
        text: "Progress is happening but satisfaction isn't increasing",
        modelIds: ["easterbrooks-paradox"],
      },
      {
        text: "I should focus where I have relative advantage",
        modelIds: ["comparative-advantage"],
      },
    ],
    modelIds: [
      "red-queen-effect",
      "sexual-selection",
      "easterbrooks-paradox",
      "comparative-advantage",
    ],
  },
  {
    id: "personal-performance",
    name: "Personal Performance",
    l1Question: "Is this about your own skill, growth, or motivation?",
    l2Question: "What's the performance challenge?",
    l2Options: [
      {
        text: "My beliefs about ability are limiting me",
        modelIds: ["growth-vs-fixed-mindset"],
      },
      {
        text: "I need to improve faster or more effectively",
        modelIds: ["deliberate-practice", "desirable-difficulty"],
        l3Question: "What's the improvement need?",
        l3Options: [
          { text: "Structured practice with feedback at my edge", modelId: "deliberate-practice" },
          { text: "Embracing difficulty that enhances learning", modelId: "desirable-difficulty" },
        ],
      },
      {
        text: "I'm doubting myself despite evidence I'm capable",
        modelIds: ["impostor-syndrome"],
      },
      {
        text: "My mindset about resources is shaping my behavior",
        modelIds: ["scarcity-vs-abundance"],
      },
    ],
    modelIds: [
      "growth-vs-fixed-mindset",
      "deliberate-practice",
      "desirable-difficulty",
      "impostor-syndrome",
      "scarcity-vs-abundance",
    ],
  },
  {
    id: "thinking-clearly",
    name: "Thinking Clearly",
    l1Question: "Could your own thinking be part of the problem here?",
    l2Question: "What thinking trap or technique applies?",
    l2Options: [
      {
        text: "I might be seeing what I want to see",
        modelIds: ["confirmation-bias"],
      },
      {
        text: "I'm overweighting what's easy to recall or vivid",
        modelIds: ["availability-bias", "survivorship-bias"],
        l3Question: "What's making it too available?",
        l3Options: [
          { text: "Vivid or emotional examples dominate my thinking", modelId: "availability-bias" },
          { text: "I'm only seeing the winners, not the failures", modelId: "survivorship-bias" },
        ],
      },
      {
        text: "I'm retrofitting a story onto what happened",
        modelIds: ["hindsight-bias", "narrative-fallacy"],
        l3Question: "What's the storytelling trap?",
        l3Options: [
          { text: "Thinking I knew it all along after learning the outcome", modelId: "hindsight-bias" },
          { text: "Creating a narrative for what might be random events", modelId: "narrative-fallacy" },
        ],
      },
      {
        text: "I need to simplify or find the core explanation",
        modelIds: ["occams-razor", "abstraction-ladders"],
      },
      {
        text: "I need to consider multiple causes or perspectives",
        modelIds: ["multicausal", "steelmanning"],
      },
      {
        text: "Multiple forces are combining in unexpected ways",
        modelIds: ["lollapalooza-effect"],
      },
      {
        text: "My confidence doesn't match my competence",
        modelIds: ["dunning-kruger-effect"],
      },
    ],
    modelIds: [
      "occams-razor",
      "multicausal",
      "steelmanning",
      "confirmation-bias",
      "availability-bias",
      "survivorship-bias",
      "narrative-fallacy",
      "hindsight-bias",
      "abstraction-ladders",
      "lollapalooza-effect",
      "dunning-kruger-effect",
    ],
  },
];
