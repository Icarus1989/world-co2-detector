import Image from "next/image";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./page.module.css";
import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
import SearchMenu from "./components/SearchMenu/SearchMenu";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import { MainPrimary } from "./components/MainPrimary/MainPrimary";

export default function Home() {
	return (
		<MainPrimary>
			<Navbar />
			<CanvasContainer />
			{/* <SearchMenu /> */}
			<SearchContainer />
		</MainPrimary>
	);
}
