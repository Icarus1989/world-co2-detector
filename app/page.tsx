import Image from "next/image";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./page.module.css";
import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
import InteractiveText from "./components/InteractiveText/InteractiveText";
import { MainPrimary } from "./components/MainPrimary/MainPrimary";

export default function Home() {
	return (
		<MainPrimary>
			<Navbar />
			<CanvasContainer />
			<InteractiveText />
		</MainPrimary>
	);
}
