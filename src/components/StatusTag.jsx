const STYLES = {
  deployed: "bg-verified-soft text-verified",
  monitoring: "bg-amber-soft text-amber",
  archived: "bg-line text-steel",
  high: "bg-alert-soft text-alert",
  medium: "bg-amber-soft text-amber",
  low: "bg-verified-soft text-verified",
  info: "bg-line text-steel",
};

const LABELS = {
  deployed: "SHIPPED",
  monitoring: "MONITORING",
  archived: "ARCHIVED",
  high: "HIGH",
  medium: "MED",
  low: "LOW",
  info: "INFO",
};

export default function StatusTag({ status, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide ${STYLES[status] || STYLES.info} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status] || status.toUpperCase()}
    </span>
  );
}
