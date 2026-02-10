type Props = {
  choices: string[];
  onPick: (index: number) => void;
  align?: "center" | "right";
};

export function Choices({ choices, onPick, align = "center" }: Props) {
  const wrap =
    align === "right"
      ? "w-full space-y-2"
      : "absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] space-y-2";

  return (
    <div className={wrap}>
      {choices.map((c, i) => (
        <button
          key={c}
          onClick={() => onPick(i)}
          className="w-full rounded-xl bg-white/10 hover:bg-white/20 border border-white/20
                     p-3 text-left text-white"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
