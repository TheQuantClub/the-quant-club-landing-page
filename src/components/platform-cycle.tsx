"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, CalendarDays, Check, RefreshCw } from "lucide-react";

const months = ["March", "April", "May", "June", "July", "August", "September"];

export function PlatformCycle() {
  const [selected, setSelected] = useState(0);
  const isStart = selected === 0;
  const isReview = selected === 6;
  const month = months[selected];
  const title = isStart
    ? "Start with the March portfolio."
    : isReview
      ? "September brings the scheduled rebalance."
      : `In ${month}, the March portfolio stays on its own clock.`;
  const description = isStart
    ? "Use the March publication as the starting model. Positions begin at equal weights, and the March series is scheduled for its next rebalance in September."
    : isReview
      ? "Review the September publication for the March series. Apply the updated selection and reset positions to equal weights for the next six-month period."
      : `A fresh ${month} portfolio is available for a new start. It does not replace the March portfolio: that series continues towards its September rebalance, with weights allowed to move with the market.`;

  return (
    <section className="pc-section" aria-labelledby="pc-title">
      <div className="pc-shell">
        <div className="pc-heading">
          <div>
            <p className="pc-eyebrow"><CalendarDays size={14} /> THE PUBLICATION RHYTHM</p>
            <h2 id="pc-title">A March start.<br /><span>A September rebalance.</span></h2>
          </div>
          <p>A fresh portfolio every month, so you can start when you need to. Each series then follows its own six-month rebalance cycle.</p>
        </div>

        <div className="pc-calendar">
          <div className="pc-calendar-top"><span><i /> MARCH SERIES</span><p>Select a month to follow the portfolio <ArrowRight size={14} /></p></div>
          <div className="pc-timeline" style={{ "--pc-progress": `${selected / 6 * 100}%` } as CSSProperties} role="group" aria-label="Explore the March to September portfolio cycle">
            <div className="pc-rail" aria-hidden="true"><span /></div>
            {months.map((name, index) => (
              <button
                key={name}
                type="button"
                className={`pc-month${selected === index ? " pc-selected" : ""}${index === 0 || index === 6 ? " pc-milestone" : ""}`}
                aria-pressed={selected === index}
                aria-label={`${name}: ${index === 0 ? "starting portfolio" : index === 6 ? "scheduled rebalance" : "continue the March series"}`}
                onClick={() => setSelected(index)}
              >
                <span className="pc-month-name">{name.slice(0, 3)}</span>
                <span className="pc-point" aria-hidden="true">{index === 0 ? <Check size={15} /> : index === 6 ? <RefreshCw size={15} /> : <i />}</span>
                <span className="pc-month-action">{index === 0 ? "Start" : index === 6 ? "Rebalance" : "Continue"}</span>
              </button>
            ))}
          </div>

          <div className="pc-detail" aria-live="polite" aria-atomic="true">
            <div className="pc-detail-copy">
              <span className="pc-phase">{isStart ? "THE STARTING MODEL" : isReview ? "THE NEXT REVIEW" : "BETWEEN REVIEWS"}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="pc-next"><span>{isReview ? "NEXT CYCLE" : "SCHEDULED REBALANCE"}</span><strong>{isReview ? "September → March" : "September"}<ArrowRight size={15} /></strong></div>
            </div>
            <div className={`pc-model${isReview ? " pc-model-reviewed" : ""}`} aria-hidden="true">
              <div className="pc-model-head"><span>{isReview ? "SEPTEMBER" : "MARCH"} MODEL</span><span className="pc-model-badge">{isReview ? "REBALANCED" : isStart ? "PUBLISHED" : "CONTINUING"}</span></div>
              <div className="pc-model-grid">{Array.from({ length: 12 }, (_, index) => <span key={index} style={{ "--pc-cell": index } as CSSProperties}><i /></span>)}</div>
              <div className="pc-model-foot"><span><i /> {isReview ? "Updated selection" : "Original series"}</span><span>{isStart || isReview ? "Equal weights at construction" : "Weights move with markets"}</span></div>
            </div>
          </div>

          <div className="pc-monthly-note"><CalendarDays size={18} /><p><strong>Monthly availability. Six-month rebalancing.</strong> A new monthly release is a new starting point, not a rebalance instruction for every existing portfolio.</p></div>
        </div>
        <p className="pc-caption">Illustrative publication schedule · Portfolios published on the first of each month by 12 pm.</p>
      </div>
    </section>
  );
}
