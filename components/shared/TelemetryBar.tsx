export type TelemetrySlot = {
  label?: string;
  value: string;
  accent?: boolean;
};

type Props = {
  slots: TelemetrySlot[];
};

export function TelemetryBar({ slots }: Props) {
  return (
    <div
      className="border-t border-border bg-black/95 px-5 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono tracking-[0.2em]"
      style={{ fontSize: "10px" }}
    >
      {slots.map((s, i) => (
        <span
          key={i}
          className={
            s.accent ? "text-accent font-bold" : "text-text-tertiary"
          }
        >
          {s.label ? (
            <>
              <span className="text-text-muted">{s.label} · </span>
              <span className={s.accent ? "text-accent" : "text-text-secondary"}>
                {s.value}
              </span>
            </>
          ) : (
            s.value
          )}
        </span>
      ))}
    </div>
  );
}
