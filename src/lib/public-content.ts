export const publicStrategies = [
  {
    slug: "large-cap", name: "Large Cap Club", type: "Equity", theme: "Large cap",
    universe: "Large-cap equities", title: "Quantitative research for large-cap equities.",
    description: "An equity strategy focused on India's large-cap companies, supported by research and portfolio tools within the platform.",
    lens: "Explore the strategy within the platform and assess its role in your firm's large-cap mandate.",
    shape: "large",
  },
  {
    slug: "mid-cap", name: "Mid Cap Club", type: "Equity", theme: "Mid cap",
    universe: "Mid-cap equities", title: "Quantitative research for mid-cap equities.",
    description: "An equity strategy focused on India's mid-cap companies, with research and tools to support your firm's investment workflow.",
    lens: "Explore the strategy within the platform and assess its role in your firm's mid-cap mandate.",
    shape: "mid",
  },
  {
    slug: "small-cap", name: "Small Cap Club", type: "Equity", theme: "Small cap",
    universe: "Small-cap equities", title: "Quantitative research for small-cap equities.",
    description: "An equity strategy focused on India's small-cap companies, with supporting research available within the platform.",
    lens: "Explore the strategy within the platform and assess its role in your firm's small-cap mandate.",
    shape: "small",
  },
  {
    slug: "multi-cap", name: "Multi Cap Club", type: "Equity", theme: "Across market caps",
    universe: "Equities across market caps", title: "Equity research across market-cap segments.",
    description: "An equity strategy spanning India's market-cap segments, supported by research and portfolio tools within the platform.",
    lens: "Explore the strategy within the platform and assess its role in an equity mandate spanning market-cap segments.",
    shape: "multi",
  },
  {
    slug: "diversified-funds", name: "Diversified Mutual Fund Club", type: "Mutual funds", theme: "Diversified funds",
    universe: "Diversified mutual funds", title: "Quantitative research for diversified mutual funds.",
    description: "A mutual fund strategy supported by research, deployment tools and branded reporting for your firm's fund offering.",
    lens: "Explore the strategy within the platform and assess how it fits your firm's mutual fund offering.",
    shape: "funds",
  },
  {
    slug: "sector-rotation", name: "Sector Rotation Club", type: "Mutual funds", theme: "Sector and thematic funds",
    universe: "Sector & thematic mutual funds", title: "Research for sector and thematic fund allocations.",
    description: "A mutual fund strategy focused on sectors and themes, with supporting research and portfolio tools within the platform.",
    lens: "Explore the strategy within the platform and assess its role in your firm's sector and thematic fund offering.",
    shape: "sector",
  },
];

export const processSteps = [
  { title: "Evaluate", subtitle: "Research for your investment process", body: "Review the research and analysis within the platform, then decide how a strategy fits your firm's mandate." },
  { title: "Deploy", subtitle: "Prepare the work for your team", body: "Apply a strategy to relevant client records and prepare order files for your firm's execution process." },
  { title: "Maintain", subtitle: "Follow the portfolio over time", body: "Record changes, monitor deviations and keep outstanding actions visible to the people responsible." },
  { title: "Brand", subtitle: "Keep your firm in the client conversation", body: "Prepare factsheets and review material in your firm's branding, with the supporting information and required disclosures." },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  art: string;
  status: "draft" | "published";
  author?: string;
  publishedAt?: string;
  sections: { title: string; paragraphs: string[] }[];
};

// Educational drafts. Publication requires an editorial decision; no byline or date is implied.
export const articles: Article[] = [
  {
    slug: "the-process-behind-the-portfolio", category: "Investment practice",
    title: "From research review to a working portfolio",
    dek: "The hand-offs an investment team needs to make research useful in practice.",
    art: "orbits", status: "draft",
    sections: [
      { title: "Establish the purpose", paragraphs: ["Begin by recording the role a strategy is expected to play within the firm's mandate. Identify who reviews the research, who approves its use and which questions must be answered before a portfolio is implemented."] },
      { title: "Prepare the implementation", paragraphs: ["A research decision needs an operational hand-off. The team carrying it out needs the relevant instructions, the accounts affected and a record of any exceptions. An order file is an input to that process; it is not evidence that the trades occurred."] },
      { title: "Close the loop", paragraphs: ["After implementation, compare the intended change with the recorded outcome. Keep partial execution, deliberate skips and outstanding actions visible. A useful research workflow continues beyond the initial decision and preserves the context needed for the next portfolio review."] },
    ],
  },
  {
    slug: "equal-weighting-is-a-design-choice", category: "Portfolio operations",
    title: "Target allocations and recorded holdings",
    dek: "Why an allocation instruction and an investment record serve different purposes.",
    art: "grid", status: "draft",
    sections: [
      { title: "Separate the instruction from the outcome", paragraphs: ["A target allocation describes an intended portfolio. Recorded holdings describe what a particular account actually contains. Keeping the two separate helps a team identify whether a proposed change has been fully carried out."] },
      { title: "Keep the account context", paragraphs: ["Clients may invest different amounts, add money at different times or withdraw part of an investment. Their records therefore need the relevant dates and quantities. An instruction prepared for one account should not be assumed to apply unchanged to another."] },
      { title: "Confirm before reporting", paragraphs: ["Use execution records and subsequent transactions to maintain the account view. If information is incomplete, identify the gap before calculating changes or preparing a client review. Reports are easier to interpret when the reader can see the date, record type and information on which they are based."] },
    ],
  },
  {
    slug: "publication-is-not-rebalancing", category: "Portfolio operations",
    title: "A research update and a portfolio action",
    dek: "Give every date and instruction a clear role in the team's workflow.",
    art: "paths", status: "draft",
    sections: [
      { title: "Read the purpose of the update", paragraphs: ["A publication date identifies when a document was released. It does not, by itself, establish when a portfolio action is required. Read the update's purpose, effective date and applicable instructions before assigning work to the team."] },
      { title: "Follow the relevant schedule", paragraphs: ["Review and rebalance schedules can differ between strategies. Use the schedule attached to the relevant strategy and portfolio record. Keep any exceptions with the original instruction so colleagues can understand why the action taken differed."] },
      { title: "Record what happened", paragraphs: ["Separate the date an instruction was issued from the date it was implemented. Record incomplete actions and deliberate skips as well as completed work. This makes the next review more useful: the team can discuss an observed difference without first reconstructing which update applied and whether it was carried out."] },
    ],
  },
  {
    slug: "a-shared-research-language", category: "Adviser practice",
    title: "Give your team a shared investment record",
    dek: "Clear ownership and consistent labels help colleagues work from the same context.",
    art: "network", status: "draft",
    sections: [
      { title: "Name the record", paragraphs: ["A research document, a model instruction and a client account record answer different questions. Label each clearly, including its relevant date. A colleague should be able to identify what they are reading without relying on the person who prepared it."] },
      { title: "Make ownership visible", paragraphs: ["For each action, identify the person responsible and the information required to complete it. If the action is paused, record the reason and the next step. A visible exception gives the team something to resolve rather than an assumption to carry forward."] },
      { title: "Preserve the decision", paragraphs: ["Keep the team's conclusion alongside the records it reviewed. Note unresolved questions and the reason for any departure from the original instruction. This gives colleagues a useful starting point at the next review and helps maintain continuity when responsibility changes."] },
    ],
  },
  {
    slug: "reading-a-strategy-methodology", category: "Research evaluation",
    title: "Questions to bring to a research evaluation",
    dek: "Prepare the questions that help your team assess research and its intended use.",
    art: "layers", status: "draft",
    sections: [
      { title: "Clarify the mandate", paragraphs: ["Start with your firm's purpose for considering the research. Establish the investment scope, the decisions the research will support and the people responsible for evaluating it. A clear mandate makes it easier to identify which information is relevant."] },
      { title: "Examine the evidence", paragraphs: ["Ask about data sources, the period covered and the assumptions accompanying an analysis. Distinguish simulated history from live observations. When reviewing audited material, understand the scope of the audit and which records it covers."] },
      { title: "Consider the operational fit", paragraphs: ["Research also needs to fit the way your firm works. Ask how updates are delivered, how the relevant review schedule is identified and what information supports implementation and client reporting. Record unanswered questions so the next conversation resolves them before your team makes its decision."] },
    ],
  },
  {
    slug: "research-and-technology", category: "Client communication",
    title: "A clearer workflow for client reviews",
    dek: "Connect the portfolio record with the material your firm puts in front of a client.",
    art: "signal", status: "draft",
    sections: [
      { title: "Begin with the right record", paragraphs: ["A useful review starts with the correct account information and reporting period. Check that recent transactions and outstanding actions are reflected in the record before preparing the document. Clearly identify the date to which the information applies."] },
      { title: "Keep the firm's voice consistent", paragraphs: ["Consistent branding helps a client recognise material from their firm. The document also needs clear labels, relevant context and the required disclosures. Presentation should make the information easier to understand without changing what it represents."] },
      { title: "Prepare for the conversation", paragraphs: ["Record the points the adviser needs to discuss and any follow-up work. A review document provides a common reference; the conversation gives the client an opportunity to ask questions. Keep the resulting actions connected to the account record so the next review can follow what happened."] },
    ],
  },
];

export const commonQuestions = [
  ["Who is The Quant Club built for?", "Investment advisers, mutual fund distributors, wealth management teams and investment institutions. We bring quantitative research, strategy deployment, portfolio maintenance and branded reporting into the firm's investment workflow."],
  ["Which data sources do you use?", "Our research uses data from NSE, AMFI, Morningstar and other paid data tools."],
  ["Are your backtests and research data audited?", "All our backtests and research data are audited by a Chartered Accountant (CA) firm. The research data and supporting information are available within the platform."],
  ["How is your live data tracked?", "Our live data is tracked through PaRRVA. Live records are kept distinct from backtested research within the platform."],
  ["Where can I see model information and holdings?", "Model information, holdings, research data, backtests and strategy analytics are available within the SaaS platform, subject to your firm's access. The public website introduces the services and strategy range."],
  ["How often do strategies rebalance?", "Rebalance schedules vary by strategy. The relevant schedule and updates are provided within the platform so your team can plan and follow the required actions."],
  ["Can the reports carry our firm's branding?", "Yes. Your firm can apply its logo, name, colours and contact details to factsheets and client review material. The research information and required disclosures remain part of the documents."],
  ["Does the platform execute trades?", "The platform prepares model-level, client-specific and consolidated order files and supports execution records and follow-up. Your firm executes through its chosen broker or fund platform and records the outcome."],
  ["How does the platform support client management?", "Use client reference tags to organise strategy allocations, recorded holdings, investment flows and review activity. Your firm retains the client identity mapping and the client relationship."],
  ["What happens in a walkthrough?", "We discuss your firm's investment workflow, relevant strategies, deployment needs and reporting requirements, then walk through how the platform can support your team."],
];
