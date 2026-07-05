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
