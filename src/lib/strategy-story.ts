export type StrategyStory = {
  eyebrow: string;
  description: string;
  use: string;
  focus: string;
};

export const strategyStories: Record<string, StrategyStory> = {
  "large-cap": {
    eyebrow: "LARGE-CAP EQUITIES",
    description: "A model portfolio drawn from India’s large-cap equity universe. Follow a defined selection process, equal starting weights and the portfolio’s scheduled review, with fresh monthly publications for different investment starting dates.",
    use: "For a large-cap equity mandate that needs a repeatable portfolio process.",
    focus: "Established companies",
  },
  "mid-cap": {
    eyebrow: "MID-CAP EQUITIES",
    description: "A dedicated model for India’s mid-cap equities. Keep this market segment within its own mandate, then use the monthly portfolio publication and its review schedule to put the research to work.",
    use: "For an explicit mid-cap allocation within a wider investment plan.",
    focus: "The mid-cap universe",
  },
  "small-cap": {
    eyebrow: "SMALL-CAP EQUITIES",
    description: "A model portfolio focused on India’s small-cap universe. A defined mandate and equal starting weights give your team a consistent basis for reviewing the research before making its own allocation decisions.",
    use: "For a dedicated small-cap mandate, assessed within your firm’s investment process.",
    focus: "Smaller listed companies",
  },
  "multi-cap": {
    eyebrow: "EQUITIES ACROSS MARKET CAPS",
    description: "One equity strategy with a universe spanning market-cap segments. Review the portfolio as a complete model, with the same equal-weight construction and publication process used across The Quant Club’s strategy range.",
    use: "For an equity mandate that can invest across market-cap segments.",
    focus: "A wider equity universe",
  },
  "diversified-funds": {
    eyebrow: "DIVERSIFIED MUTUAL FUNDS",
    description: "A model portfolio built from diversified mutual funds. Give fund selection and portfolio review a shared reference point, with dated publications your team can return to when discussing or reviewing a fund allocation.",
    use: "For a fund-based allocation supported by an organised model portfolio and review record.",
    focus: "Diversified fund selection",
  },
  "sector-rotation": {
    eyebrow: "SECTOR & THEMATIC MUTUAL FUNDS",
    description: "A dedicated research model for sector and thematic mutual funds. Follow how the published allocation changes at its scheduled review, and assess the model’s role within your own broader portfolio process.",
    use: "For teams evaluating a distinct sector or thematic fund allocation.",
    focus: "Sector allocation",
  },
};

export type AudienceStory = {
  id: string;
  name: string;
  intro: string;
  uses: string[];
  strategies: string[];
};

export const audienceStories: AudienceStory[] = [
  {
    id: "advisers",
    name: "Advisors & RIAs",
    intro: "Your clients do not all invest on the same day. Use a fresh monthly model when a client is ready, then follow the review cycle tied to that portfolio’s starting month.",
    uses: [
      "Choose a strategy whose investment universe fits the mandate your firm has defined.",
      "Use the relevant monthly publication as the research input for a new deployment.",
      "Follow that portfolio’s six-month rebalance cycle; use its dated history when reviewing the research.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
  {
    id: "wealth",
    name: "Wealth Managers / MFDs",
    intro: "Bring a consistent reference to fund conversations. Explore our mutual fund models, understand what each one covers and use the research within the services your firm provides.",
    uses: [
      "Start with diversified funds or sector and thematic funds, depending on the allocation under discussion.",
      "Use the model as a structured fund shortlist and a shared reference for your team’s review.",
      "Keep each publication and its review context together; apply the research according to your firm’s advisory or distribution role.",
    ],
    strategies: ["diversified-funds", "sector-rotation"],
  },
  {
    id: "institutions",
    name: "PMS, AIFs & Family Offices",
    intro: "Give your investment team an external research input it can examine. Review a strategy’s universe, construction and publication record alongside your own investment process.",
    uses: [
      "Take a defined model portfolio into an investment committee discussion or internal research review.",
      "Assess the strategy’s intended role alongside your existing mandates and allocation decisions.",
      "Follow the model’s published changes over time while your team retains portfolio decisions and execution.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
];
