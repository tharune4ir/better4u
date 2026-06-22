export interface MentalModel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface VoiceRule {
  title: string;
  tips: string[];
}

export interface VoiceSection {
  title: string;
  subtitle: string;
  rules: VoiceRule[];
}

export const MENTAL_MODELS: MentalModel[] = [
  {
    id: "first-principles",
    title: "First Principles Thinking",
    subtitle: "Reason from base truths",
    description: "Boil a problem down to the absolute facts you know are true, then build your solution back up from there. Strip away inherited assumptions and analogical copying."
  },
  {
    id: "map-territory",
    title: "Map vs. Territory",
    subtitle: "The model is not reality",
    description: "Your description of a situation is never the situation itself. Hold your mental models loosely, checking them against real-world observations and updating on errors."
  },
  {
    id: "inversion",
    title: "Inversion Principle",
    subtitle: "Avoid stupidity first",
    description: "Instead of asking how to succeed, ask: 'How would I guarantee absolute failure?' Write down the answers, then systematically avoid them. Steering clear of stupidity beats chasing brilliance."
  },
  {
    id: "probabilities",
    title: "Probabilistic Reasoning",
    subtitle: "Think in odds, not certainty",
    description: "The world is complex and runs on odds. Avoid binary 'definitely/never' traps. Make bets based on likelihoods and update your confidence intervals as new facts arrive."
  },
  {
    id: "order-effects",
    title: "Second & Third Order Effects",
    subtitle: "Follow the causal chain",
    description: "Never stop thinking after the immediate outcome. Always ask: 'And then what?' Choose paths that are challenging immediately but compound positively for decades."
  },
  {
    id: "compounding",
    title: "The Compounding Curve",
    subtitle: "Small reps multiply",
    description: "Tiny daily adjustments do not add up—they multiply over time. You will overestimate what you can accomplish in a week, but vastly underestimate what you can build in a year."
  },
  {
    id: "competence-circle",
    title: "Circle of Competence",
    subtitle: "Know your structural limits",
    description: "Know exactly where the limits of your true knowledge run. Operate with total confidence inside it, and move with extreme caution or request help when stepping outside."
  },
  {
    id: "cognitive-biases",
    title: "Cognitive Bias Audits",
    subtitle: "Sanity check shortcuts",
    description: "Actively monitor for built-in cognitive misfires. Watch for confirmation bias, recency bias, and the sunk cost fallacy. Naming them is the first step of self-defense."
  }
];

export const VOICE_SECTIONS: VoiceSection[] = [
  {
    title: "The Speaking Mindset",
    subtitle: "Attention follows ease",
    rules: [
      {
        title: "Articulation is Discovery",
        tips: [
          "You discover what you think by speaking, not before.",
          "Hunting for the right word in real-time is not a performance failure—it is the discovery process.",
          "Pause when searching for words instead of rushing into pre-written patterns."
        ]
      },
      {
        title: "Excitement over Fear",
        tips: [
          "Adrenaline is fuel. Excitement and fear feel identical physiologically.",
          "Instead of fighting your heart rate, tell yourself out loud: 'I am excited about this.'",
          "Direct the physical energy into vocal projection."
        ]
      },
      {
        title: "Imperfect Credibility",
        tips: [
          "Sounding over-rehearsed costs you trust and sounds robotic.",
          "A few stumbles make you human and approachable.",
          "Embrace the vulnerability of thinking out loud."
        ]
      }
    ]
  },
  {
    title: "Vocal Physiology & Drills",
    subtitle: "The body as an instrument",
    rules: [
      {
        title: "Low Belly Breath",
        tips: [
          "Breathing into the upper chest creates a shaky, shallow voice.",
          "Engage the diaphragm: breathe in for 4s, hold for 4s, and release for 8s.",
          "Keep the voice rooted in oxygen."
        ]
      },
      {
        title: "The Silent Pause",
        tips: [
          "Close your mouth when you want to say 'um'.",
          "Silence shows control, allows listeners to absorb, and gives your mind a breath.",
          "Use the pause strategically between key ideas."
        ]
      },
      {
        title: "Teach a Child",
        tips: [
          "Explain a complex idea to an imaginary ten-year-old child.",
          "Any place you resort to jargon or stumble indicates a gap in your own understanding.",
          "Rebuild the concept from first principles and speak it again."
        ]
      }
    ]
  },
  {
    title: "Structural Architecture",
    subtitle: "How to hold focus",
    rules: [
      {
        title: "Present vs. Future Tension",
        tips: [
          "Move back and forth between 'what is' and 'what could be'.",
          "Creating a gap between these states builds interest.",
          "The solution to the gap is what keeps the listener anchored."
        ]
      },
      {
        title: "Causal Chains",
        tips: [
          "Structure narratives with 'because of that' connections.",
          "Avoid flat bullet lists. The brain remembers cause-and-effect sequences.",
          "Make each transition lead organically into the next event."
        ]
      },
      {
        title: "Rule of Three",
        tips: [
          "The human mind holds three elements with absolute balance.",
          "Structure arguments, examples, or exercises in groups of three.",
          "More than three creates cognitive strain; fewer feels incomplete."
        ]
      }
    ]
  }
];

export const NEUROPLASTICITY_SUMMARY = {
  quote: "The brain physically rewires itself in response to what you repeatedly do, think, and pay attention to.",
  description: "Neuroplasticity is the core driver of self-transformation. Every time you practice a clear-thinking model or refuse the comfortable wrong, you strengthen the neural pathways of the person you intend to become."
};
