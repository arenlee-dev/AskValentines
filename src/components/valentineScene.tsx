export type Choice = {
	text: string;
	next: string;
	setFlags?: Record<string, boolean>;
};

export type Node =
	| {
			id: string;
			type: "line";
			speaker?: string;
			text: string;
			next?: string;
			setFlags?: Record<string, boolean>;
	  }
	| {
			id: string;
			type: "choice";
			speaker?: string;
			text: string;
			choices: Choice[];
	  };

export const valentineScene: Record<string, Node> = {
	start: {
		id: "start",
		type: "line",
		speaker: "ANGELA (thought)",
		text: "Okay… he said “meet me here after sunset.” That’s either romantic… or he's got something dumb to show me.",
		next: "arrive",
	},

	arrive: {
		id: "arrive",
		type: "line",
		speaker: "ANGELA (thought)",
		text: "Breathe, Angela. Act normal. (He look so angelic just standing there)",
		next: "youEnter",
	},

	youEnter: {
		id: "youEnter",
		type: "line",
		speaker: "ANGELA (thought)",
		text: "Oh no. He’s doing the behind-the-back thing. This is serious.",
		next: "greeting",
	},

	greeting: {
		id: "greeting",
		type: "choice",
		speaker: "AREN",
		text: "Hey… you made it.",
		choices: [
			{
				text: "You’re acting suspicious. Are you hiding anything? FLOWERS?",
				next: "sus",
				setFlags: { choseDragon: true },
			},
			{ text: "Hi. I’m happy I’m here with you.", next: "happy" },
			{
				text: "If this is about Jake Sulley, I’m ready.",
				next: "frogs",
				setFlags: { choseFrogs: true },
			},
		],
	},

	sus: {
		id: "sus",
		type: "line",
		speaker: "ANGELA",
		text: "You’re acting suspicious. Are you hiding anything? FLOWERS?",
		next: "sus2",
	},
	sus2: {
		id: "sus2",
		type: "line",
		speaker: "AREN",
		text: "Worse. I’m hiding… my feelings.",
		next: "askBuild",
	},

	happy: {
		id: "happy",
		type: "line",
		speaker: "ANGELA",
		text: "Hi. I’m happy I’m here with you.",
		next: "happy2",
	},
	happy2: {
		id: "happy2",
		type: "line",
		speaker: "AREN",
		text: "Good… because I’ve been thinking about this all day.",
		next: "askBuild",
	},

	frogs: {
		id: "frogs",
		type: "line",
		speaker: "ANGELA",
		text: "If this is about Jake Sulley, I’m ready.",
		next: "frogs2",
	},
	frogs2: {
		id: "frogs2",
		type: "line",
		speaker: "AREN",
		text: "Not Jake… but I did practice what I wanted to say about… a hundred times.",
		next: "askBuild",
	},

	askBuild: {
		id: "askBuild",
		type: "line",
		speaker: "AREN",
		text: "Angela… I wanted to ask you something. Like, properly. In person.",
		next: "askChoice",
	},

	askChoice: {
		id: "askChoice",
		type: "choice",
		speaker: "ANGELA",
		text: "(My heart is doing backflips.)",
		choices: [
			{
				text: "You’re scaring me a little.",
				next: "cuteFear",
			},
			{ text: "Go on. I’m listening.", next: "listen" },
			{ text: "If you say ‘we're going to pandora’ I accept.", next: "quest" },
		],
	},

	cuteFear: {
		id: "cuteFear",
		type: "line",
		speaker: "AREN",
		text: "Sorry— I just… really care about you.",
		next: "theAsk",
	},

	listen: {
		id: "listen",
		type: "line",
		speaker: "AREN",
		text: "Okay. Okay. So… I like you. A lot. And I like being your boyfriend.",
		next: "theAsk",
	},

	quest: {
		id: "quest",
		type: "line",
		speaker: "AREN",
		text: "No angela we're not seeing indian Jake Sulley.",
		next: "theAsk",
	},

	theAsk: {
		id: "theAsk",
		type: "line",
		speaker: "AREN",
		text: "Will you be my Valentine?",
		next: "finalChoice",
	},

	finalChoice: {
		id: "finalChoice",
		type: "choice",
		speaker: "ANGELA",
		text: "(Say something cute. Do not melt.)",
		choices: [
			{ text: "Yes! Obviously yes!", next: "yesA" },
			{
				text: "Only if I get to hold your hand the whole time.",
				next: "yesB",
			},
			{
				text: "Fine but when can I meet Jake Sulley",
				next: "yesC",
				setFlags: { demandedFrogFact: true },
			},
		],
	},

	yesA: {
		id: "yesA",
		type: "line",
		speaker: "ANGELA",
		text: "Yes! Obviously yes!",
		next: "end",
	},

	yesB: {
		id: "yesB",
		type: "line",
		speaker: "ANGELA",
		text: "Only if I get to hold your hand the whole time.",
		next: "end",
	},

	yesC: {
		id: "yesC",
		type: "line",
		speaker: "AREN",
		text: "Never...",
		next: "end",
	},

	end: {
		id: "end",
		type: "line",
		speaker: "SYSTEM",
		text: "QUEST COMPLETED: “I wub u babayaga” (+1 Heart, +100 Cozy Points)",
	},
};
