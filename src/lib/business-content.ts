export type BusinessPillar = {
  id: string;
  name: string;
  title: string;
  copy: string;
};

export const businessPillars: BusinessPillar[] = [
  {
    id: "research",
    name: "Research",
    title: "Give your investment process a quantitative foundation.",
    copy: "Bring equity and mutual fund research into your firm's investment process, with model information and supporting records available within the platform.",
  },
  {
    id: "evaluate",
    name: "Evaluate",
    title: "Examine the research before putting it to work.",
    copy: "Review strategy analysis, historical behaviour and the assumptions behind the research within the platform. Decide how it fits your firm's mandate.",
  },
  {
    id: "deploy",
    name: "Deploy",
    title: "Turn a strategy decision into a plan your team can carry out.",
    copy: "Map strategies to client records and prepare individual or consolidated order files. Your firm executes through its chosen route and records the outcome.",
  },
  {
    id: "maintain",
    name: "Maintain",
    title: "Keep portfolios and the work around them current.",
    copy: "Record investment flows, monitor deviations and follow unresolved actions. Keep the portfolio history and reconciliation records together for the next review.",
  },
  {
    id: "brand",
    name: "Brand",
    title: "Put your firm's identity on the client material.",
    copy: "Apply your logo, colours and contact details to factsheets and client review documents, with consistent research information and required disclosures.",
  },
  {
    id: "communicate",
    name: "Communicate",
    title: "Prepare your team for the next client conversation.",
    copy: "Bring review packs, strategy commentary and educational material into client discussions. Give your team a shared reference for explaining portfolio activity and following up.",
  },
];

export type HomeAudience = {
  id: string;
  name: string;
  title: string;
  copy: string;
  actions: string[];
};

export const homeAudiences: HomeAudience[] = [
  {
    id: "advisers",
    name: "Investment advisers",
    title: "Carry the investment decision through to the client review.",
    copy: "Use research, deployment and portfolio maintenance tools within your advisory process, then prepare review material in your firm's brand.",
    actions: ["Evaluate the research", "Deploy and maintain client portfolios", "Report in your firm's brand"],
  },
  {
    id: "distributors",
    name: "Mutual fund distributors",
    title: "Support your mutual fund offering from research to reporting.",
    copy: "Use mutual fund research and deployment tools to organise the investment workflow, with branded factsheets and review material for your clients.",
    actions: ["Explore mutual fund strategies", "Prepare fund order files", "Create branded client material"],
  },
  {
    id: "wealth",
    name: "Wealth management teams",
    title: "Connect investment, operations and relationship teams.",
    copy: "Coordinate strategy deployment and portfolio maintenance across the client book, then give the relationship team consistent reports in your firm's brand.",
    actions: ["Coordinate strategy deployment", "Monitor portfolios and outstanding actions", "Prepare branded review packs"],
  },
  {
    id: "institutions",
    name: "Investment institutions",
    title: "Bring research into the systems your team already uses.",
    copy: "PMS desks, AIFs and family offices can evaluate the research and deploy it through their own systems, supported by structured data and branded reporting options.",
    actions: ["Evaluate research within your mandate", "Deploy through your own systems", "Use reporting in your firm's brand"],
  },
];
