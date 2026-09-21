"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check, FileText, Fingerprint, HeartPulse, ListChecks, SlidersHorizontal, Users } from "lucide-react";

const scenes = [
  {
    key: "emotion", label: "Emotional decisions", icon: HeartPulse,
    title: "Emotions can change the plan.",
    problem: "A headline, a sudden market move or a confident opinion can pull a decision away from the original plan. Staying consistent is harder when every day brings a new reason to react.",
    solution: "Give decisions a defined process.",
    answer: "Keep selection and review decisions tied to a documented strategy. A clear set of rules gives your team a consistent basis for the conversation with each client.",
    before: "Pulled in different directions", after: "Following a defined process",
    description: "The same decision markers move from scattered positions between fear and hype onto one defined rule path.",
  },
  {
    key: "risk", label: "Profit & loss decisions", icon: SlidersHorizontal,
    title: "When should we book profits? What loss can the client bear?",
    problem: "Knowing when to act is only half the question. The decision also has to make sense for the client's ability to handle a loss, before the market puts that ability to the test.",
    solution: "Know the rules. Understand the client's limits.",
    answer: "Understand the strategy's profit-booking and loss-handling process, then consider it against the client's capacity for loss. Defined rules support consistent decisions; they do not remove market risk.",
    before: "Questions without a shared process", after: "A process to review against client needs",
    description: "Two decision markers for profit booking and loss capacity move from disconnected positions into a defined review process. This illustration makes no promise of loss protection.",
  },
  {
    key: "clients", label: "Client calculations", icon: Users,
    title: "Every client means another calculation.",
    problem: "Different starting dates and investment amounts mean repeating the allocation work for each client. More clients can quickly mean more spreadsheets, more checking and more room for errors.",
    solution: "Organise the work around each client.",
    answer: "Use a clear workflow for client-specific allocations and actions. Keep each client's starting point and follow-up work together, while the strategy's method stays consistent.",
    before: "Disconnected requests", after: "Client-specific work, clearly organised",
    description: "Six abstract client request tags move from scattered positions into three labelled client lanes. No actual client data or investment amounts are shown.",
  },
  {
    key: "actions", label: "Missed updates", icon: ListChecks,
    title: "Updates can slip through the gaps.",
    problem: "An update lands in an inbox. A follow-up sits in a message. When the work is spread across places, it becomes harder to tell what is pending, what is done and what needs another look.",
    solution: "Make the next action visible.",
    answer: "Bring updates and follow-up work into a shared view. Separate pending actions, confirmations and items for review, so the team can see what still needs attention.",
    before: "Loose tasks, unclear follow-through", after: "A clear status for every action",
    description: "The same six task tokens move into pending, confirmed and review lanes.",
  },
  {
    key: "reports", label: "Manual reports", icon: FileText,
    title: "Reports take too much manual work.",
    problem: "Collecting the pieces, checking the formatting and rebuilding the same report takes time away from the client conversation. The work repeats every time an update is needed.",
    solution: "Bring the pieces into one report.",
    answer: "Keep the reporting workflow connected to the research and client work. A consistent report structure helps the team spend less time assembling documents and more time explaining them.",
    before: "Separate pieces to assemble", after: "One consistent report structure",
    description: "Six generic paper sections move together to form a single report. The illustration contains no model, holdings or performance information.",
  },
  {
    key: "branding", label: "Firm identity", icon: Fingerprint,
    title: "Your work should look like your firm.",
    problem: "You build the client relationship. But a collection of differently styled documents can make the work feel disconnected from the firm delivering it.",
    solution: "Keep your firm's identity consistent.",
    answer: "Present reports with your firm's identity and a consistent document style. Keep the required disclosures visible, so the presentation is as considered as the work behind it.",
    before: "Different documents, different identities", after: "Your firm, consistently presented",
    description: "Three differently styled documents align and adopt matching Your Firm headers, brand stripes and visible disclosure strips.",
  },
] as const;

export type ResearchSceneProps = { selectedScene?: number; onSceneChange?: (index: number) => void };

function useScene({ selectedScene, onSceneChange }: ResearchSceneProps) {
  const [localScene, setLocalScene] = useState(0);
  const value = Math.max(0, Math.min(scenes.length - 1, selectedScene ?? localScene));
  const change = (index: number) => { setLocalScene(index); onSceneChange?.(index); };
  return [value, change] as const;
}

function SceneSelector({ value, onChange, panelId, label }: { value: number; onChange: (index: number) => void; panelId: string; label: string }) {
  return <div className="qp-selector" role="group" aria-label={label}>
    {scenes.map(({ label: name, icon: Icon }, index) => <button key={name} type="button" className="qp-choice" aria-pressed={value === index} aria-controls={panelId} onClick={() => onChange(index)}>
      <Icon size={19} strokeWidth={1.65} aria-hidden="true" /><span>{name}</span><span className="qp-choice-number" aria-hidden="true">0{index + 1}</span>
    </button>)}
  </div>;
}

const loose = [[19, 29, -12], [50, 54, 9], [81, 32, 11], [21, 76, 8], [49, 22, -8], [79, 79, -9]];

function MotionObject({ index, x, y, rotation = 0, children, className = "" }: { index: number; x: number; y: number; rotation?: number; children?: ReactNode; className?: string }) {
  const style = { "--qp-x": `${x}%`, "--qp-y": `${y}%`, "--qp-rotation": `${rotation}deg`, "--qp-delay": `${index * 35}ms` } as CSSProperties;
  return <span className={`qp-object ${className}`} style={style} data-object={index}>{children}</span>;
}

function ProcessVisual({ scene, solved }: { scene: number; solved: boolean }) {
  const item = scenes[scene];
  return <div className={`qp-visual qp-visual-${item.key} ${solved ? "qp-is-solved" : "qp-is-problem"}`} role="img" aria-label={`${solved ? item.after : item.before}. ${item.description}`}>
    <div className="qp-scene" aria-hidden="true">
      {item.key === "emotion" && <>
        <div className="qp-emotion-label qp-label-fear qp-before-only">Fear</div><div className="qp-emotion-label qp-label-hype qp-before-only">Hype</div>
        <div className="qp-visual-heading qp-after-only">A defined set of rules</div>
        <svg className="qp-path qp-after-only" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M 13 58 L 28 44 L 43 58 L 58 44 L 73 58 L 88 44" /></svg>
        {loose.map(([x, y, rotation], i) => <MotionObject key={i} index={i} x={solved ? 13 + i * 15 : x} y={solved ? i % 2 ? 44 : 58 : y} rotation={solved ? 0 : rotation} className="qp-decision"><span /></MotionObject>)}
        <div className="qp-visual-footnote">Decision by decision</div>
      </>}
      {item.key === "risk" && <>
        <div className="qp-visual-heading qp-after-only">Review before the decision</div>
        <svg className="qp-path qp-risk-path qp-after-only" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M 24 43 L 50 70 L 76 43" /></svg>
        <MotionObject index={0} x={solved ? 24 : 28} y={solved ? 43 : 32} rotation={solved ? 0 : -9} className="qp-question"><span className="qp-question-mark">?</span><span>Book<br />profits?</span></MotionObject>
        <MotionObject index={1} x={solved ? 76 : 69} y={solved ? 43 : 68} rotation={solved ? 0 : 10} className="qp-question"><span className="qp-question-mark">?</span><span>Capacity<br />for loss?</span></MotionObject>
        <div className="qp-review-node qp-after-only"><Check size={18} /><span>Review fit</span></div>
        <div className="qp-visual-footnote">Rules inform. Your team assesses.</div>
      </>}
      {(item.key === "clients" || item.key === "actions") && <>
        <div className="qp-lanes qp-after-only">{(item.key === "clients" ? ["Client A", "Client B", "Client C"] : ["Pending", "Confirmed", "Review"]).map(name => <div key={name}><span>{name}</span></div>)}</div>
        {loose.map(([x, y, rotation], i) => <MotionObject key={i} index={i} x={solved ? (i % 3) * 33.333 + 16.667 : x} y={solved ? i < 3 ? 40 : 68 : y} rotation={solved ? 0 : rotation} className="qp-task">
          <span className="qp-task-dot" />{item.key === "clients" ? `${["A", "B", "C"][i % 3]} · ${i < 3 ? "review" : "prepare"}` : `Task ${["A", "B", "C", "D", "E", "F"][i]}`}
        </MotionObject>)}
      </>}
      {item.key === "reports" && <>
        <div className="qp-report-outline qp-after-only"><span>REPORT</span></div>
        {loose.map(([x, y, rotation], i) => <MotionObject key={i} index={i} x={solved ? i % 2 ? 61 : 39 : x} y={solved ? 34 + Math.floor(i / 2) * 20 : y} rotation={solved ? 0 : rotation} className="qp-paper-piece"><span /><span /><span /></MotionObject>)}
        <div className="qp-visual-footnote">Ready for the conversation</div>
      </>}
      {item.key === "branding" && <>
        {[0, 1, 2].map(i => <MotionObject key={i} index={i} x={18 + i * 32} y={solved ? 48 : i === 1 ? 59 : 42} rotation={solved ? 0 : [-8, 7, -5][i]} className={`qp-brand-paper qp-brand-paper-${i}`}>
          <span className="qp-brand-stripe" /><span className="qp-brand-name"><span className="qp-before-only">Report</span><span className="qp-after-only">Your firm</span></span><span className="qp-paper-lines"><i /><i /><i /></span><span className="qp-disclosure qp-after-only">Disclosure</span>
        </MotionObject>)}
        <div className="qp-visual-footnote">One considered identity</div>
      </>}
    </div>
    <div className="qp-visual-caption"><span className="qp-status-dot" /><span>{solved ? item.after : item.before}</span></div>
  </div>;
}

export function ResearchProblems(props: ResearchSceneProps = {}) {
  const [selected, setSelected] = useScene(props);
  const panelId = useId();
  const item = scenes[selected];
  return <section className="qp-section qp-problems-section" id="why-quant-club" aria-labelledby={`${panelId}-heading`}>
    <div className="tqc-container">
      <div className="qp-section-intro"><p className="tqc-eyebrow">03 / THE WORK BEHIND THE PORTFOLIO</p><h2 className="qp-section-heading" id={`${panelId}-heading`}>Good decisions need<br />more than a good idea.</h2><p>From the first decision to the next client update, the everyday work can get in the way.</p></div>
      <SceneSelector value={selected} onChange={setSelected} panelId={panelId} label="Explore the problems" />
      <div className="qp-feature" id={panelId}>
        <div className="qp-feature-copy" aria-live="polite" aria-atomic="true"><span className="qp-scene-index">THE CHALLENGE / 0{selected + 1}</span><h3>{item.title}</h3><p>{item.problem}</p><a className="qp-text-link" href="#research-solutions">See how the process helps <ArrowRight size={18} aria-hidden="true" /></a></div>
        <ProcessVisual scene={selected} solved={false} />
      </div>
    </div>
  </section>;
}

export function ResearchSolutions(props: ResearchSceneProps = {}) {
  const [selected, setSelected] = useScene(props);
  const [solved, setSolved] = useState(true);
  const panelId = useId();
  const item = scenes[selected];
  return <section className="qp-section qp-solutions-section" id="research-solutions" aria-labelledby={`${panelId}-heading`}>
    <div className="tqc-container">
      <div className="qp-section-intro"><p className="tqc-eyebrow">04 / HOW THE QUANT CLUB HELPS</p><h2 className="qp-section-heading" id={`${panelId}-heading`}>Rules for the strategy.<br />Order for the work.</h2><p>A defined investment process, with the everyday work organised around it.</p></div>
      <SceneSelector value={selected} onChange={setSelected} panelId={panelId} label="Explore the solutions" />
      <div className="qp-feature qp-solution-feature" id={panelId}>
        <div className="qp-feature-copy" aria-live="polite" aria-atomic="true"><span className="qp-scene-index">THE APPROACH / 0{selected + 1}</span><h3>{item.solution}</h3><p>{item.answer}</p><div className="qp-solution-note"><Check size={18} aria-hidden="true" /><span>A clearer process. A more considered conversation.</span></div></div>
        <div className="qp-solution-visual"><div className="qp-toggle" role="group" aria-label="Compare the problem and the solution"><button type="button" aria-pressed={!solved} onClick={() => setSolved(false)}>Before</button><ArrowRight size={16} aria-hidden="true" /><button type="button" aria-pressed={solved} onClick={() => setSolved(true)}>After</button></div><ProcessVisual scene={selected} solved={solved} /><span className="qp-sr-only" aria-live="polite">{solved ? item.after : item.before}</span></div>
      </div>
    </div>
  </section>;
}
