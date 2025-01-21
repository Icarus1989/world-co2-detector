import DateInputComponent from "../DateInputComponent/DateInputComponent";
import SvgTemplate from "../SvgTemplates/SvgComponents/SvgMagnifierComponent";
import TextInputTemplate from "../TextInputTemplate/TextInputTemplate";

import CanvasElement from "../GlobeComponents/CanvasComponent";
import styles from "./CanvasContainer.module.css";

import type { ContinentInfo } from "@/app/utilities/types/types";

export function CanvasContainer({
	analyzeCoastLineData
}: {
	analyzeCoastLineData: () => Promise<ContinentInfo[]>;
}) {
	return (
		<div className={styles["container"]}>
			{/* <SvgTemplate svgWidth={500} svgHeight={100} /> */}
			{/* <TextInputTemplate fieldName="name" labels={["name"]} />
			<TextInputTemplate fieldName="coords" labels={["lat", "lon"]} />
			<DateInputComponent /> */}
			<CanvasElement analyzeCoastLineData={analyzeCoastLineData} />
		</div>
	);
}
