type Props = {
  left: string;
  center: string;
  right: string;
};

export function BroadcastBar({ left, center, right }: Props) {
  return (
    <div
      className="bg-accent text-white flex items-center justify-between px-5 py-2 font-mono font-bold tracking-[0.3em]"
      style={{ fontSize: "10px" }}
    >
      <span>{left}</span>
      <span className="hidden sm:inline">{center}</span>
      <span>{right}</span>
    </div>
  );
}
