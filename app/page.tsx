// import { Navbar } from "./components/Navbar/Navbar";
// import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
// import SearchContainer from "./components/SearchContainer/SearchContainer";
// import { MainPrimary } from "./components/MainPrimary/MainPrimary";

import { geocodePlaceAction } from "./ServerActions/mbxGeocodingActions";
import {
	getAirQualityDatasetAction,
	getSixMonthsAQTrendAction
} from "./ServerActions/AirQualityServerActions";

import {
	analyzeLandsData,
	analyzeInternalBound,
	analyzeBoundaryLines,
	analyzeBreakLines
} from "./ServerActions/ServerActions";
import { MainHomeClient } from "./MainHomeClient";

export default function Home() {
	return (
		<MainHomeClient
			analyzeLandsData={analyzeLandsData}
			analyzeBoundaryLines={analyzeBoundaryLines}
			analyzeInternalBound={analyzeInternalBound}
			analyzeBreakLines={analyzeBreakLines}
			geocodePlaceAction={geocodePlaceAction}
			getAirQualityDatasetAction={getAirQualityDatasetAction}
			getSixMonthsAQTrendAction={getSixMonthsAQTrendAction}
		/>
	);
}
