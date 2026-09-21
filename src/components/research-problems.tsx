"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, FileText, Fingerprint, HeartPulse, ListChecks, RotateCcw, SlidersHorizontal, Users } from "lucide-react";

const scenes = [
  {
    key: "emotion", label: "Emotions", icon: HeartPulse, pillar: "Model portfolios",
    title: "Emotions can change the plan",
    problem: "A headline, a sudden move or a strong opinion can pull a decision away from the plan you agreed with the client.",
    solution: "Give the decision a set of rules.",
    answer: "Model portfolios give your team a defined strategy to work from, with a documented selection and review process behind each decision.",
    before: "Pulled in different directions", after: "Following a defined process",
    description: "The same decision markers move from scattered positions between fear and hype onto one defined rule path.",
  },
  {
    key: "risk", label: "Profit & loss", icon: SlidersHorizontal, pillar: "Analysis engine",
    title: "When should we book profits? What loss can the client bear?",
    problem: "When to act and how much loss a client can handle are different questions. Both need a considered answer before investing.",
    solution: "Examine the approach before acting.",
    answer: "Use the analysis engine to examine the strategy and its profit-booking and loss-handling process. Your team assesses the client's capacity for loss. Market risk remains.",
    before: "Questions without a shared process", after: "A process to review against client needs",
    description: "Two decision markers for profit booking and loss capacity move from disconnected positions into a defined review process. This illustration makes no promise of loss protection.",
  },
  {
    key: "clients", label: "Client calculations", icon: Users, pillar: "Implementation",
    title: "Every client means another calculation.",
    problem: "Different amounts and starting dates mean another allocation to prepare, another spreadsheet to check and another chance for an error.",
    solution: "Make implementation client-specific.",
    answer: "Bring client-specific allocation work into the implementation workflow. Organise each starting point and the actions that follow without rebuilding the process each time.",
    before: "Disconnected requests", after: "Client-specific work, clearly organised",
    description: "Six abstract client request tags move from scattered positions into three labelled client lanes. No actual client data or investment amounts are shown.",
  },
  {
    key: "actions", label: "Updates & actions", icon: ListChecks, pillar: "Implementation",
    title: "Updates can slip through the gaps.",
    problem: "An update in an inbox. A follow-up in a message. It becomes difficult to see what is waiting and what is already done.",
    solution: "Make the next action visible.",
    answer: "Keep implementation and follow-up work in one view. Separate pending actions, confirmations and items for review so the team knows what needs attention.",
    before: "Loose tasks, unclear follow-through", after: "A clear status for every action",
    description: "The same six task tokens move into pending, confirmed and review lanes.",
  },
  {
    key: "reports", label: "Manual reports", icon: FileText, pillar: "Your brand",
    title: "Reports take too much manual work.",
    problem: "Collecting the pieces and rebuilding the same report takes time away from the client conversation. The work repeats with every update.",
    solution: "Bring the pieces into a branded report.",
    answer: "Connect reporting to the work behind it. Bring the relevant pieces into a consistent report carrying your brand, ready for the client conversation.",
    before: "Separate pieces to assemble", after: "One consistent report structure",
    description: "Six generic paper sections move together to form a single report. The illustration contains no model, holdings or performance information.",
  },
  {
    key: "branding", label: "Your firm's identity", icon: Fingerprint, pillar: "Your brand",
    title: "Your work should look like your firm.",
    problem: "You build the relationship. Differently styled documents can make the work feel disconnected from the firm delivering it.",
    solution: "Keep your firm's identity consistent.",
    answer: "Keep your brand present across client documents, with a consistent identity and visible disclosures. Your work should feel like it comes from your firm.",
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
      <Icon size={18} strokeWidth={1.65} aria-hidden="true" /><span>{name}</span><ChevronRight className="qp-choice-arrow" size={15} aria-hidden="true" />
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
          <span className="qp-task-dot" />{item.key === "clients" ? `${["A", "B", "C"][i % 3]} · ${i < 3 ? "plan" : "check"}` : `Task ${["A", "B", "C", "D", "E", "F"][i]}`}
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

export function ResearchComparison(props: ResearchSceneProps = {}) {
  const [selected, setSelected] = useScene(props);
  const [resetting, setResetting] = useState(false);
  const workbench = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const visible = useRef(true);
  const panelId = useId();
  const item = scenes[selected];

  useEffect(() => {
    const element = workbench.current;
    if (!element) return;
    const settle = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      setResetting(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      element.dataset.motion = entry.isIntersecting ? "on" : "off";
      if (!entry.isIntersecting) settle();
    }, { threshold: 0.08 });
    observer.observe(element);
    const onVisibility = () => {
      element.dataset.motion = document.hidden || !visible.current ? "off" : "on";
      if (document.hidden) settle();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function chooseScene(index: number) {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setResetting(false);
    setSelected(index);
  }

  function replay() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (!visible.current || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setResetting(false);
      return;
    }
    setResetting(true);
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => {
        setResetting(false);
        frame.current = null;
      });
    });
  }

  return <section className="qp-section qp-comparison-section" id="why-quant-club" aria-labelledby={`${panelId}-heading`}>
    <div className="tqc-container">
      <div className="qp-section-intro"><div><p className="tqc-eyebrow">03 / THE PRACTICAL DIFFERENCE</p><h2 className="qp-section-heading" id={`${panelId}-heading`}>Rules for the strategy.<br />Order for the work.</h2></div><p>Pick a familiar challenge.<br />See the process that helps.</p></div>
      <div className="qp-workbench" ref={workbench}>
        <aside className="qp-topic-rail"><span className="qp-rail-label">The everyday work</span><SceneSelector value={selected} onChange={chooseScene} panelId={panelId} label="Choose a challenge" /></aside>
        <div className="qp-pair" id={panelId}>
          <article className="qp-side qp-side-before" aria-labelledby={`${panelId}-problem`}>
            <div className="qp-panel-label"><span className="qp-panel-dot" />The problem</div>
            <div className="qp-panel-copy"><h3 id={`${panelId}-problem`}>{item.title}</h3><p>{item.problem}</p></div>
            <ProcessVisual scene={selected} solved={false} />
          </article>
          <span className="qp-connection" aria-hidden="true"><ArrowRight size={17} /></span>
          <article className={`qp-side qp-side-after${resetting ? " qp-replay-reset" : ""}`} aria-labelledby={`${panelId}-solution`}>
            <div className="qp-panel-label"><span className="qp-panel-dot" />{item.pillar}</div>
            <div className="qp-panel-copy"><h3 id={`${panelId}-solution`}>{item.solution}</h3><p>{item.answer}</p></div>
            <ProcessVisual scene={selected} solved={!resetting} />
            <button type="button" className="qp-replay" onClick={replay} aria-label={`Replay the change: ${item.label}`}><RotateCcw size={15} aria-hidden="true" />Replay the change</button>
          </article>
        </div>
      </div>
      <span className="qp-sr-only" aria-live="polite">{item.title} {item.solution}</span>
    </div>
  </section>;
}
