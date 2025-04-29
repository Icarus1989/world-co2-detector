import Image from "next/image";
import { Navbar } from "./components/Navbar/Navbar";
import styles from "./page.module.css";
import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
import SearchMenu from "./components/SearchMenu/SearchMenu";
import SearchContainer from "./components/SearchContainer/SearchContainer";
import { MainPrimary } from "./components/MainPrimary/MainPrimary";

import {
	analyzeCoastLineData,
	analyzeLandData,
	analyzeLandsData,
	analyzeRiversData
} from "./ServerActions/ServerActions";
import coastLineData from "@/public/coastlines/ne_10m_coastline.json";

export default function Home() {
	// analyzeCoastLineData(coastLineData);
	return (
		<MainPrimary>
			<Navbar />
			<CanvasContainer
				analyzeCoastLineData={analyzeCoastLineData}
				analyzeCoastLandData={analyzeLandData}
				analyzeLandsData={analyzeLandsData}
				analyzeRiversData={analyzeRiversData}
			/>
			{/* <SearchMenu /> */}
			<SearchContainer />
		</MainPrimary>
	);
}
