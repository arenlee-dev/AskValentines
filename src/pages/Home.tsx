import { ThemeToggle } from "@/components/ThemeToggle";
import bee from "@/assets/bee.png"
import heart from "@/assets/heart.png"
import { Game } from "@/components/Game";

export const Home = () => {
	return (
		<div className="min-h-screen min-w-screen bg-background text-foreground overflow-x-hidden">
			<div className="fixed top-4 right-4">
				<ThemeToggle />
			</div>
            <div className="flex items-center justify-center h-screen">
                <div className="relative bg-foreground h-200 w-300 rounded-[6vw] border-border border-15">
                    <img className="absolute size-30 left-5 object-contain animate-float" src={bee} alt="bee"/>
                    <img className="absolute size-30 right-5 top w-40 object-contain tranform -scale-x-100 animate-float" src={bee} alt="bee"/>
                    <Game />
                    <img className="absolute size-20 right-10 bottom-10 object-contain tranform -scale-x-100 animate-float" src={heart} alt="heart"/>
                    <img className="absolute size-20 bottom-10 left-10 object-contain animate-float" src={heart} alt="heart"/>
                </div>
            </div>
		</div>
	);
};
