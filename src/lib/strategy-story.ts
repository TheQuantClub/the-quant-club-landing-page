export type StrategyStory = {
  eyebrow: string;
  description: string;
  use: string;
  focus: string;
};

export const strategyStories: Record<string, StrategyStory> = {
  "large-cap": {
    eyebrow: "LARGE-CAP EQUITIES",
    description: "Quantitative research for an equity mandate focused on India's large-cap companies. Model information, research and supporting tools are available within the platform.",
    use: "Evaluate the strategy for your firm's large-cap mandate, then use the platform to support deployment, maintenance and reporting.",
    focus: "Large-cap equities",
  },
  "mid-cap": {
    eyebrow: "MID-CAP EQUITIES",
    description: "Quantitative research focused on India's mid-cap equity universe. Explore the strategy and its supporting information within the platform.",
    use: "Bring the strategy into your firm's mid-cap review, with tools to support its use across relevant client portfolios.",
    focus: "Mid-cap equities",
  },
  "small-cap": {
    eyebrow: "SMALL-CAP EQUITIES",
    description: "Quantitative research focused on India's small-cap equity universe. Model information and supporting analysis are available within the platform.",
    use: "Assess the strategy within your firm's investment process and follow deployment and portfolio activity through the platform.",
    focus: "Small-cap equities",
  },
  "multi-cap": {
    eyebrow: "EQUITIES ACROSS MARKET CAPS",
    description: "Equity research spanning India's market-cap segments. Explore the strategy within the platform alongside tools for applying and maintaining it.",
    use: "Evaluate the strategy for a mandate spanning market-cap segments, supported by deployment and reporting tools.",
    focus: "Equities across market caps",
  },
  "diversified-funds": {
    eyebrow: "DIVERSIFIED MUTUAL FUNDS",
    description: "Research for your firm's diversified mutual fund offering, connected with deployment, portfolio maintenance and branded reporting tools.",
    use: "Use the strategy within your firm's fund offering and support the ongoing client workflow through the platform.",
    focus: "Diversified mutual funds",
  },
  "sector-rotation": {
    eyebrow: "SECTOR & THEMATIC MUTUAL FUNDS",
    description: "Quantitative research for sector and thematic mutual fund allocations. Model information and supporting tools are available within the platform.",
    use: "Evaluate the strategy within your firm's fund offering, then support implementation and reviews with the platform's tools.",
    focus: "Sector and thematic funds",
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
    name: "Investment advisers",
    intro: "Bring quantitative research into your advisory process and carry it through deployment, portfolio maintenance and client reviews in your firm's brand.",
    uses: [
      "Evaluate the research against your firm's mandate and decide how to use it.",
      "Prepare client-specific order files, record execution outcomes and follow outstanding portfolio actions.",
      "Prepare branded factsheets and client review material while retaining the client relationship.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
  {
    id: "distributors",
    name: "Mutual fund distributors",
    intro: "Support your mutual fund offering with research, deployment tools and reporting that carries your firm's identity.",
    uses: [
      "Explore diversified and sector or thematic mutual fund strategies within the platform.",
      "Prepare fund order files and maintain records of investments, redemptions and implementation.",
      "Use your firm's branding on fund factsheets and client review material.",
    ],
    strategies: ["diversified-funds", "sector-rotation"],
  },
  {
    id: "wealth",
    name: "Wealth management teams",
    intro: "Give research, operations and relationship teams a connected workflow for deploying strategies, maintaining portfolios and communicating with clients.",
    uses: [
      "Use the research within your team's investment review and allocation process.",
      "Coordinate deployment across client records, monitor deviations and follow unresolved actions.",
      "Produce consistent review material in your firm's brand for the relationship team.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
  {
    id: "institutions",
    name: "PMS, AIFs & family offices",
    intro: "Evaluate the research within your investment process and deploy it through your existing systems, with structured information and reporting support.",
    uses: [
      "Bring the research and supporting analysis into your investment committee's evaluation.",
      "Use model-level information and order files within your own deployment and portfolio operations.",
      "Use structured reporting data or branded documents within your firm's communication workflow.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
];
