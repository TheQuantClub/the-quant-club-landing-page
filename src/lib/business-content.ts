export type BusinessPillar = {
  id: string;
  name: string;
  title: string;
  copy: string;
};

export const businessPillars: BusinessPillar[] = [
  {
    id: "research",
    name: "Model portfolios",
    title: "Model portfolios. Ready for your investment process.",
    copy: "Bring equity and mutual fund model portfolios into your firm's investment process. Access the models and supporting research within the member platform.",
  },
  {
    id: "evaluate",
    name: "Analysis engine",
    title: "An analysis engine. Built into the platform.",
    copy: "Evaluate model portfolios using the platform's built-in analysis engine. Review historical behaviour, risk and supporting analysis before deciding what fits your firm's mandate.",
  },
  {
    id: "deploy",
    name: "Implementation",
    title: "From model portfolio to client-ready instructions.",
    copy: "Apply a model portfolio to the relevant client records and prepare individual or consolidated order files. Your firm executes through its chosen broker or fund platform and records the outcome.",
  },
  {
    id: "maintain",
    name: "Maintenance",
    title: "Keep portfolios and the work around them current.",
    copy: "Record investment flows, monitor deviations and follow unresolved actions. Keep the portfolio history and reconciliation records together for the next review.",
  },
  {
    id: "brand",
    name: "Your brand",
    title: "Your name. Your identity. Your client relationship.",
    copy: "Make every factsheet and review document feel like it came from you. Add your firm's logo, colours and details, with research information and required disclosures kept intact.",
  },
  {
    id: "communicate",
    name: "Client communication",
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
    copy: "Evaluate model portfolios with the built-in analysis engine, prepare client instructions and maintain the investment record. Bring your name and identity into each client review.",
    actions: ["Evaluate model portfolios", "Prepare orders and maintain portfolios", "Make client reports your own"],
  },
  {
    id: "distributors",
    name: "Mutual fund distributors",
    title: "Put model portfolios to work in your mutual fund offering.",
    copy: "Use mutual fund model portfolios, built-in analysis and order preparation tools. Give clients factsheets and review material that carry your firm's name and identity.",
    actions: ["Evaluate mutual fund models", "Prepare fund order files", "Keep your identity in every review"],
  },
  {
    id: "wealth",
    name: "Wealth management teams",
    title: "Connect investment, operations and relationship teams.",
    copy: "Use model portfolios and built-in analysis across the investment process. Coordinate implementation and maintenance, then give the relationship team reports that feel like your firm.",
    actions: ["Coordinate portfolio implementation", "Monitor portfolios and outstanding actions", "Prepare review packs in your name"],
  },
  {
    id: "institutions",
    name: "Investment institutions",
    title: "Bring model portfolios into the systems your team already uses.",
    copy: "PMS desks, AIFs and family offices can evaluate model portfolios with the analysis engine and implement them through their own systems, with reporting in the firm's identity.",
    actions: ["Evaluate models within your mandate", "Implement through your own systems", "Keep reporting in your firm's identity"],
  },
];
