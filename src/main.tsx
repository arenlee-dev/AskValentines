import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const params = new URLSearchParams(window.location.search);
const p = params.get("p");
if (p) {
	window.history.replaceState({}, "", import.meta.env.BASE_URL + p);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
