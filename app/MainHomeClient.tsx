"use client";

import { MainHomeClientProps, SearchTargetType } from "./utilities/types/types";
import { MainPrimary } from "./components/MainPrimary/MainPrimary";
import { Navbar } from "./components/Navbar/Navbar";
import { CanvasContainer } from "./components/CanvasContainer/CanvasContainer";
import SearchContainer from "./features/search/SearchContainer";
import { AnimatePresence } from "framer-motion";
import ResultsModal from "./features/results/ResultsModal";
import { useAppData } from "./providers/AppDataProvider";

export function MainHomeClient(props: MainHomeClientProps) {
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

	function handleSearchSubmit(target: SearchTargetType) {
		submitSearch(target);

		window.setTimeout(() => {
			openResults();
		}, 1200);
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

// da rifinire mnca ultimo check
