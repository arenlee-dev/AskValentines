import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import { valentineScene } from "./valentineScene";
import { useDialogue } from "./useDialogue";
import { DialogueBox } from "./DialogueBox";
import { Choices } from "./Choices";
import { useTypeWriter } from "./useTypeWriter";
import { cn } from "@/lib/utils";

import angela from "@/assets/angela.png";
import aren from "@/assets/aren.png";
import alley from "@/assets/bg-alley.gif";
import bgmSrc from "@/assets/bgm.mp3";
import rainSrc from "@/assets/rain.mp3";
import talkSrc from "@/assets/talk.mp3";

type Phase = "intro" | "walk" | "dialogue" | "end";

export const Game = () => {
	const [phase, setPhase] = useState<Phase>("intro");

	const { node, next, choose, reset } = useDialogue(valentineScene, "start");

	const twRef = useRef<{ done: boolean; revealAll: () => void } | null>(null);

	const [audioEnabled, setAudioEnabled] = useState(false);
	const [volume, setVolume] = useState(0.5);

	const [isTyping, setIsTyping] = useState(false);

	const bgmRef = useRef<HTMLAudioElement | null>(null);
	const rainRef = useRef<HTMLAudioElement | null>(null);
	const talkRef = useRef<HTMLAudioElement | null>(null);

	const resetGame = () => {
		setPhase("intro");
		setIsTyping(false);
		reset();

		rainRef.current &&
			(rainRef.current.pause(), (rainRef.current.currentTime = 0));
		talkRef.current &&
			(talkRef.current.pause(), (talkRef.current.currentTime = 0));
	};

	useEffect(() => {
		if (phase !== "dialogue") setIsTyping(false);
	}, [phase]);
	useEffect(() => {
		const bgm = new Audio(bgmSrc);
		bgm.loop = true;

		const rain = new Audio(rainSrc);
		rain.loop = true;

		const talk = new Audio(talkSrc);
		talk.loop = true;

		bgmRef.current = bgm;
		rainRef.current = rain;
		talkRef.current = talk;

		return () => {
			bgm.pause();
			rain.pause();
			talk.pause();
			bgmRef.current = null;
			rainRef.current = null;
			talkRef.current = null;
		};
	}, []);

	useEffect(() => {
		const v = Math.max(0, Math.min(1, volume));
		if (bgmRef.current) bgmRef.current.volume = v * 0.3;
		if (rainRef.current) rainRef.current.volume = v * 0.2;
		if (talkRef.current) talkRef.current.volume = v * 0.2;
	}, [volume]);

	useEffect(() => {
		if (!audioEnabled) return;
		const bgm = bgmRef.current;
		if (!bgm) return;

		if (bgm.paused) bgm.play().catch(() => {});
	}, [audioEnabled]);

	useEffect(() => {
		if (!audioEnabled) return;
		const rain = rainRef.current;
		if (!rain) return;

		if (phase === "walk") {
			if (rain.paused) rain.play().catch(() => {});
		} else {
			rain.pause();
			rain.currentTime = 0;
		}
	}, [audioEnabled, phase]);

	useEffect(() => {
		if (!audioEnabled) return;
		const talk = talkRef.current;
		if (!talk) return;

		const shouldTalk = phase === "dialogue" && isTyping;

		if (shouldTalk) {
			if (talk.paused) talk.play().catch(() => {});
		} else {
			talk.pause();
			talk.currentTime = 0;
		}
	}, [audioEnabled, phase, isTyping]);

	useEffect(() => {
		function onEsc(e: KeyboardEvent) {
			if (e.key !== "Escape") return;
			if (phase === "intro") return;
			e.preventDefault();
			resetGame();
		}
		window.addEventListener("keydown", onEsc);
		return () => window.removeEventListener("keydown", onEsc);
	}, [phase, setPhase, reset]);

	useEffect(() => {
		if (phase !== "walk") return;
		const t = window.setTimeout(() => setPhase("dialogue"), 6500);
		return () => window.clearTimeout(t);
	}, [phase]);

	useEffect(() => {
		if (phase !== "dialogue") return;

		function onKeyDown(e: KeyboardEvent) {
			if (e.key !== " " && e.key !== "Enter") return;
			e.preventDefault();

			if (twRef.current && !twRef.current.done) {
				twRef.current.revealAll();
				return;
			}
			if (node.type === "line") {
				e.preventDefault();
				next();
			} else if (node.type === "choice") {
				e.preventDefault();
			}
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [phase, node, next]);

	useEffect(() => {
		if (phase === "dialogue" && node.id === "end") {
			setPhase("end");
		}
	}, [phase, node]);

	return (
		<div
			className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 min-h-140 min-w-220 bg-gamebg rounded-[2vw] overflow-hidden"
		>
			<div
				className={cn(
					"absolute bottom-4 right-4 z-50 flex flex-col items-end gap-2",
					phase === "intro" ? "hidden" : "",
				)}
			>
				<VolumeControl value={volume} onChange={setVolume} />
				<ResetButton onReset={resetGame} />
			</div>
			{phase === "intro" && (
				<div className="min-h-140 min-w-220">
					<img
						src={alley}
						alt="alley"
						className="min-h-140 min-w-220"
						style={{ imageRendering: "pixelated" }}
					/>
					<button
						onClick={() => {
							setAudioEnabled(true);
							setPhase("walk");

							bgmRef.current?.play().catch(() => {});
						}}
						className={cn(
							"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/80 w-60 h-30 rounded-full",
							"text-black text-4xl flex items-center justify-center font-pixel animate-float",
						)}
					>
						{" "}
						Play Now!
					</button>
				</div>
			)}
			{phase === "walk" && (
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-black/30" />
					<div className="absolute inset-0 animate-bgPan pointer-events-none" />

					<img
						src={alley}
						alt="Alley"
						className="min-h-140 min-w-220"
						style={{ imageRendering: "pixelated" }}
					/>

					<div className="absolute right-6 top-6 w-[38%] max-w-105 rounded-xl bg-black/65 border border-white/20 p-4 text-white">
						<div className="text-xs opacity-70 mb-1 font-pixel">
							ANGELA (thought)
						</div>
						<TypeWriter
							text="Okay… act normal. Just walking to the date spot.
							Nothing dramatic. Man why didn't he pick me up."
							speed={20}
						/>
						<div className="text-[10px] opacity-60 mt-2 font-pixel">
							…walking…
						</div>
					</div>

					<button
						onClick={() => setPhase("dialogue")}
						className="absolute left-4 top-4 text-white/70 hover:text-white text-xs bg-black/40 border border-white/10 rounded-md px-2 py-1 font-pixel"
					>
						Skip
					</button>
				</div>
			)}

			{(phase === "dialogue" || phase === "end") && (
				<div className="absolute inset-0">
					<div className="left-0 top-0 h-full min-w-240 z-50 bg-white">
						{phase !== "end" && (
							<DisplaySpeaker speaker={node.speaker} />
						)}
						{phase === "end" && (
							<div className="left-0 top-0 h-full w-lg z-50 bg-background flex flex-col text-center justify-center">
								<span className="font-pixel text-4xl w-full">
									YIPEE HAPPY VALENTINES
								</span>
								<span className="font-pixel text-4xl w-full">
									DAY MY LOVE!!!
								</span>
							</div>
						)}
					</div>
					<div className="absolute right-0 top-0 h-full w-[42%] min-w-[320px] bg-black/20 backdrop-blur-[1px] border-l border-white/10">
						<div className="px-4 pb-4">
							{node.type === "line" && (
								<DialogueBox
									speaker={node.speaker}
									text={node.text}
									onNext={node.next ? next : undefined}
									showNextHint={!!node.next}
									onTypewriterState={(s) => {
										twRef.current = s;
										setIsTyping(!s.done);
									}}
									align="right"
								/>
							)}
							{node.type === "choice" && (
								<>
									<DialogueBox
										speaker={node.speaker}
										text={node.text}
										showNextHint={true}
										onTypewriterState={(s) => {
											twRef.current = s;
											setIsTyping(!s.done);
										}}
										align="right"
									/>
									<Choices
										choices={node.choices.map(
											(c) => c.text,
										)}
										onPick={choose}
										align="right"
									/>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

function DisplaySpeaker({ speaker }: { speaker?: string }) {
	const s = (speaker ?? "").toUpperCase();

	const src = s.includes("ANGELA")
		? angela
		: s.includes("AREN")
			? aren
			: null;

	if (!src) return null;

	return (
		<div className="w-125 rounded-lg border border-white/40 bg-black/30 p-5 h-full ">
			<img
				src={src}
				className="w-full rounded-md"
				alt={
					s.includes("ANGELA")
						? "angela"
						: s.includes("AREN")
							? "aren"
							: undefined
				}
				style={{ imageRendering: "pixelated" }}
			/>
		</div>
	);
}

function ResetButton({ onReset }: { onReset: () => void }) {
	return (
		<button
			onClick={onReset}
			className="rounded-md bg-black/50 border border-white/15
                 p-2 text-white/80 hover:text-white hover:bg-black/70"
			aria-label="Reset"
			type="button"
		>
			<RotateCcw size={30} />
		</button>
	);
}

export function TypeWriter({
	text,
	speed = 25,
	onState,
}: {
	text: string;
	speed?: number;
	onState?: (s: { done: boolean; revealAll: () => void }) => void;
}) {
	const { displayedText, done, revealAll } = useTypeWriter(text, speed);

	useEffect(() => {
		onState?.({ done: false, revealAll });
	}, [text]);

	useEffect(() => {
		onState?.({ done, revealAll });
	}, [done, revealAll, onState]);

	return (
		<span className="text-lg leading-snug font-pixel">{displayedText}</span>
	);
}

function VolumeControl({
	value,
	onChange,
}: {
	value: number; // 0..1
	onChange: (v: number) => void;
}) {
	return (
		<div className="flex items-center gap-3 rounded-md bg-black/50 border border-white/15 px-3 py-2">
			<span className="font-pixel text-white/80 text-xs">VOL</span>
			<input
				type="range"
				min={0}
				max={1}
				step={0.01}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-28 accent-white"
			/>
			<span className="font-pixel text-white/70 text-xs w-10 text-right">
				{Math.round(value * 100)}%
			</span>
		</div>
	);
}
