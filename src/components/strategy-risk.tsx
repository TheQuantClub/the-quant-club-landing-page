export function StrategyRisk({ level }: { level: string | null }) {
  return <dl className="mk-strategy-risk">
    <dt>Risk profile</dt>
    <dd>{level || "Review in the platform"}</dd>
  </dl>;
}
