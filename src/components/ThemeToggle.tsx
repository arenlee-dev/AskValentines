import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	const toggleTheme = () => {
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDarkMode(false);
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDarkMode(true);
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				"max-sm:hidden rounded-full transition-colors duration-300",
				"focus:outline-hidden"
			)}
		>
			{" "}
			{isDarkMode ? (
				<Sun size={25} className="text-yellow-300" />
			) : (
				<Moon size={25} className="text-blue-900" />
			)}
		</button>
	);
};
