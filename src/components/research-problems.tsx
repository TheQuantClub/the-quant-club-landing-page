import { ArrowDown, ArrowRight, Check, Files, GitBranch, MessagesSquare } from "lucide-react";

const problems = [
  {
    icon: MessagesSquare,
    title: "Plenty of ideas. Still no clear portfolio.",
    problem: "Reports, market views and fund lists give you more to read. Your team still has to turn them into an investment approach it can explain.",
    solution: "Start with a strategy and its method.",
    answer: "A defined investment universe, a documented selection approach and an equal-weight model portfolio. Understand how the pieces fit before deciding whether they fit your mandate.",
    detail: "METHODOLOGY + MODEL PORTFOLIO",
  },
  {
    icon: GitBranch,
    title: "Every client has a different starting date.",
    problem: "A new client is ready this month. Existing clients started earlier. One latest portfolio does not tell you which review schedule belongs to whom.",
    solution: "A fresh starting point. Its own review schedule.",
    answer: "Use the relevant monthly publication for a new deployment. Keep earlier portfolios tied to their starting series, so a fresh release does not reset every portfolio’s clock.",
    detail: "MONTHLY PUBLICATIONS + DATED SERIES",
  },
  {
    icon: Files,
    title: "The research is spread across the team.",
    problem: "When the method is in a document, the portfolio is in a spreadsheet and the update is in an email, checking the full picture takes another round of searching.",
    solution: "Give everyone the same research record.",
    answer: "Bring methodology, dated portfolios and publication updates into the firm’s workspace. A combined monthly email tells the active team when the strategy releases are ready.",
    detail: "SHARED WORKSPACE + PUBLICATION UPDATES",
  },
];

export function ResearchProblems() {
  return <section className="qp-section" id="why-quant-club"><div className="q-container">
    <div className="qp-intro q-reveal"><div><p className="q-label">THE WORK BEHIND AN INVESTMENT DECISION</p><h2>Another investment idea<br/>is the easy part.</h2></div><p>The work is turning it into a portfolio, knowing which publication to use, and keeping your team on the same page.<strong>That is where The Quant Club comes in.</strong></p></div>
    <div className="qp-comparison q-reveal"><div className="qp-column-heads"><span>WHAT GETS IN THE WAY</span><span>HOW WE HELP</span></div>{problems.map(({icon:Icon,title,problem,solution,answer,detail})=><article className="qp-row" key={title}>
      <div className="qp-problem"><Icon size={21} strokeWidth={1.35}/><div><h3>{title}</h3><p>{problem}</p></div></div>
      <span className="qp-connector" aria-hidden="true"><ArrowRight size={17}/></span>
      <div className="qp-solution"><span className="qp-check"><Check size={15}/></span><div><h3>{solution}</h3><p>{answer}</p><span className="qp-detail">{detail}</span></div></div>
    </article>)}</div>
    <div className="qp-bridge q-reveal"><p>The process gives the research a structure.<br/><strong>Your mandate gives it a direction.</strong></p><a href="#strategy-explorer">Find the strategy that fits<ArrowDown size={17}/></a></div>
  </div></section>;
}
