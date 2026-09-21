"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Building2, Check, Landmark, Layers3, Users } from "lucide-react";
import { homeAudiences } from "@/lib/business-content";
import { BrandBackdrop } from "./brand-backdrop";

const audienceIcons = [Users, Layers3, Building2, Landmark];

export function AudienceSection() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionId = useId();
  const audience = homeAudiences[selected];
  const SelectedIcon = audienceIcons[selected];
  const panelId = `${sectionId}-panel`;
  const headingId = `${sectionId}-heading`;

  function selectWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % homeAudiences.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + homeAudiences.length - 1) % homeAudiences.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = homeAudiences.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return (
    <section className="tqc-practices" id="who-we-serve" aria-labelledby={headingId}>
      <div className="tqc-container">
        <div className="tqc-practices-heading">
          <div>
            <p className="tqc-eyebrow">WHO WE SERVE</p>
            <h2 id={headingId}>Built for your practice.</h2>
          </div>
          <p>Choose your role. See where the platform fits.</p>
        </div>

        <div className="tqc-practices-layout">
          <div className="tqc-practices-choices" role="group" aria-label="Choose your type of firm">
            {homeAudiences.map((item, index) => {
              const Icon = audienceIcons[index];
              return (
                <button
                  className="tqc-practice-choice"
                  type="button"
                  key={item.id}
                  aria-pressed={selected === index}
                  aria-controls={panelId}
                  onClick={() => setSelected(index)}
                  onKeyDown={event => selectWithKeyboard(event, index)}
                  ref={element => { buttons.current[index] = element; }}
                >
                  <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  <span>{item.name}</span>
                  <ArrowRight className="tqc-practice-choice-arrow" size={18} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <article className="tqc-practice-panel" id={panelId} aria-labelledby={`${sectionId}-role`}>
            <BrandBackdrop variant="flow" tone="light" className="tqc-practice-backdrop" />
            <div className="tqc-practice-content">
              <div className="tqc-practice-context" aria-hidden="true"><SelectedIcon size={18} strokeWidth={1.6} /><span>YOUR PRACTICE, CONNECTED</span></div>
              <div className="tqc-practice-introduction" aria-live="polite" aria-atomic="true">
                <h3 id={`${sectionId}-role`}>{audience.name}</h3>
                <p>{audience.copy}</p>
              </div>
              <ul className="tqc-practice-actions">
                {audience.actions.map(action => <li key={action}><Check size={16} strokeWidth={1.8} aria-hidden="true" /><span>{action}</span></li>)}
              </ul>
              <Link className="tqc-practice-link" href={`/institutions#${audience.id}`}>
                Explore your workflow <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="tqc-practice-illustration" aria-hidden="true">
              <span className="tqc-practice-orbit" />
              <span className="tqc-practice-paper tqc-practice-paper-back" />
              <span className="tqc-practice-paper tqc-practice-paper-front"><i /><strong>Your firm</strong><span /><span /><span /></span>
              <span className="tqc-practice-connection"><Check size={12} /></span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
