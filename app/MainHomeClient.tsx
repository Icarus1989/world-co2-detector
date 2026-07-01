"use client";

import { useState } from "react";
import {
	GeocodePlaceActionResult,
	MainHomeClientProps,
	SearchTargetType
} from "./utilities/types/types";
import { MainPrimary } from "./components/MainPrimary/MainPrimary";
import { Navbar } from "./components/Navbar/Navbar";
import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
import SearchContainer from "./features/search/SearchContainer";
import { AnimatePresence } from "framer-motion";
import ResultsModal from "./features/results/ResultsModal";
import { useAppData } from "./providers/AppDataProvider";
// import { geocodePlaceAction } from "./ServerActions/mbxGeocodingActions";
// import SearchContainer from "./components/SearchContainer/SearchContainer";

export function MainHomeClient(props: MainHomeClientProps) {
	//
	const { state, submitSearch, openResults, closeResults } = useAppData();

	const {
		analyzeLandsData,
		analyzeBoundaryLines,
		analyzeInternalBound,
		analyzeBreakLines,
		geocodePlaceAction,
		getAirQualityDatasetAction,
		getSixMonthsAQTrendAction
	} = props;

	// const [selectedTarget, setSelectedTarget] = useState<SearchTargetType | null>(
	// 	null
	// );

	// const [isResultsOpen, setIsResultsOpen] = useState<boolean>(false);

	function handleSearchSubmit(target: SearchTargetType) {
		// setSelectedTarget(() => {
		// 	return target;
		// });

		submitSearch(target);

		// setIsResultsOpen(() => {
		// 	return false;
		// });

		// da sistemare no object window
		window.setTimeout(() => {
			// setIsResultsOpen(true);
			openResults();
		}, 1200);
		// da sistemare
	}

	return (
		<MainPrimary>
			<Navbar />

			<CanvasContainer
				analyzeLandsData={analyzeLandsData}
				analyzeBoundaryLines={analyzeBoundaryLines}
				analyzeInternalBound={analyzeInternalBound}
				analyzeBreakLines={analyzeBreakLines}
				globeTarget={state.selectedTarget}
			/>

			{/* <SearchContainer onSearchSubmit={handleSearchSubmit} /> */}
			{/* <SearchContainer onSearchSubmit={handleSearchSubmit} /> */}
			{!state.isResultsOpen && (
				<SearchContainer
					geocodePlaceAction={geocodePlaceAction}
					onSearchSubmit={handleSearchSubmit}
				/>
			)}

			<AnimatePresence>
				{state.isResultsOpen && state.selectedTarget && (
					<div>
						<ResultsModal
							target={state.selectedTarget}
							getAirQualityDatasetAction={getAirQualityDatasetAction}
							getSixMonthsAQTrendAction={getSixMonthsAQTrendAction}
							onClose={closeResults}
						/>
					</div>
				)}
			</AnimatePresence>
		</MainPrimary>
	);
}
