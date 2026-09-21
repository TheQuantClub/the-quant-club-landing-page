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
    use: "Evaluate the model for your firm's large-cap mandate, then use the platform to support implementation, maintenance and reporting in your firm's identity.",
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
    use: "Assess the model within your firm's investment process and follow implementation and portfolio activity through the platform.",
    focus: "Small-cap equities",
  },
  "multi-cap": {
    eyebrow: "EQUITIES ACROSS MARKET CAPS",
    description: "Equity research spanning India's market-cap segments. Explore the strategy within the platform alongside tools for applying and maintaining it.",
    use: "Evaluate the model for a mandate spanning market-cap segments, supported by implementation and reporting tools.",
    focus: "Equities across market caps",
  },
  "diversified-funds": {
    eyebrow: "DIVERSIFIED MUTUAL FUNDS",
    description: "Research for your firm's diversified mutual fund offering, connected with implementation, portfolio maintenance and reports that carry your firm's identity.",
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
    intro: "Bring model portfolios and a built-in analysis engine into your advisory process. Follow through with implementation, maintenance and client reviews that carry your name and identity.",
    uses: [
      "Use the analysis engine to evaluate model portfolios against your firm's mandate.",
      "Prepare client-specific order files, record execution outcomes and follow outstanding portfolio actions.",
      "Make factsheets and review material your own, with your logo and identity supporting the client relationship.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
  {
    id: "distributors",
    name: "Mutual fund distributors",
    intro: "Support your mutual fund offering with model portfolios, built-in analysis and order preparation tools. Keep your firm's name and identity in the client material.",
    uses: [
      "Evaluate diversified and sector or thematic mutual fund models within the platform.",
      "Prepare fund order files and maintain records of investments, redemptions and implementation.",
      "Put your firm's logo, colours and contact details on fund factsheets and client review material.",
    ],
    strategies: ["diversified-funds", "sector-rotation"],
  },
  {
    id: "wealth",
    name: "Wealth management teams",
    intro: "Give investment, operations and relationship teams a connected workflow for evaluating models, preparing implementation, maintaining portfolios and communicating with clients.",
    uses: [
      "Use model portfolios and the built-in analysis engine within your team's investment review.",
      "Coordinate implementation across client records, monitor deviations and follow unresolved actions.",
      "Give the relationship team review material that carries your firm's name and identity.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
  {
    id: "institutions",
    name: "PMS, AIFs & family offices",
    intro: "Evaluate model portfolios with the analysis engine and implement them through your existing systems, with structured information and reporting in your firm's identity.",
    uses: [
      "Bring model portfolios and the built-in analysis engine into your investment committee's evaluation.",
      "Use model-level information and order files within your own implementation and portfolio operations.",
      "Use structured reporting data or documents carrying your firm's name within your communication workflow.",
    ],
    strategies: ["large-cap", "mid-cap", "small-cap", "multi-cap", "diversified-funds", "sector-rotation"],
  },
];
