import { TypeWriter } from "./Game";

type TypewriterState = {
	done: boolean;
	revealAll: () => void;
};

type Props = {
	speaker?: string;
	text: string;
	onNext?: () => void;
	showNextHint?: boolean;
	align?: "center" | "right";

	// NEW: lets Game handle "Space finishes text first"
	onTypewriterState?: (s: TypewriterState) => void;
};

export function DialogueBox({
	speaker,
	text,
	onNext,
	showNextHint,
	align = "center",
	onTypewriterState,
}: Props) {
	const base =
		"rounded-xl bg-black/70 border border-white/20 p-4 text-white select-none";

	// Centered layout (when not right-aligned)
	const centered =
		"absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[900px]";

	// Right layout: full width within the right panel container
	const cls = align === "right" ? `${base} w-full` : `${base} ${centered}`;

	return (
		<div
			className={cls}
			onClick={onNext}
			role={onNext ? "button" : undefined}
			tabIndex={onNext ? 0 : -1}
		>
			{speaker && (
				<div className="text-sm opacity-80 mb-1 font-pixel">
					{speaker}
				</div>
			)}

			<TypeWriter
				text={text}
				speed={20}
				onState={onTypewriterState}
			/>

			{showNextHint && (
				<div className="text-xs opacity-60 mt-2 font-pixel">
					Click / Space to continue
				</div>
			)}
		</div>
	);
}
