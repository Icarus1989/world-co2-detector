import { CanvasContainerProps } from "@/app/utilities/types/types";
import CanvasElement from "../GlobeComponents/CanvasComponent";
import styles from "./CanvasContainer.module.css";

export function CanvasContainer({
	analyzeLandsData,
	analyzeBoundaryLines,
	analyzeInternalBound,
	analyzeBreakLines,
	globeTarget
}: CanvasContainerProps) {
	return (
		<div className={styles["container"]}>
			<CanvasElement
				analyzeLandsData={analyzeLandsData}
				analyzeBoundaryLines={analyzeBoundaryLines}
				analyzeInternalBound={analyzeInternalBound}
				analyzeBreakLines={analyzeBreakLines}
				globeTarget={globeTarget}
			/>
		</div>
	);
}

// pulito manca ultimo check
