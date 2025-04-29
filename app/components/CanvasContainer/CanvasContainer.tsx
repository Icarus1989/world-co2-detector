import DateInputComponent from "../DateInputComponent/DateInputComponent";
import SvgTemplate from "../SvgTemplates/SvgComponents/SvgMagnifierComponent";
import TextInputTemplate from "../TextInputTemplate/TextInputTemplate";

import CanvasElement from "../GlobeComponents/CanvasComponent";
import styles from "./CanvasContainer.module.css";

import * as THREE from "three";

import type { ContinentInfo } from "@/app/utilities/types/types";

export function CanvasContainer({
	analyzeCoastLineData,
	analyzeCoastLandData,
	analyzeLandsData,
	analyzeRiversData
}: {
	analyzeCoastLineData: () => Promise<ContinentInfo[]>;
	analyzeCoastLandData: () => Promise<any>;
	analyzeLandsData: () => Promise<string>;
	analyzeRiversData: () => Promise<any>;
}) {
	return (
		<div className={styles["container"]}>
			{/* <SvgTemplate svgWidth={500} svgHeight={100} /> */}
			{/* <TextInputTemplate fieldName="name" labels={["name"]} />
			<TextInputTemplate fieldName="coords" labels={["lat", "lon"]} />
			<DateInputComponent /> */}
			<CanvasElement
				analyzeCoastLineData={analyzeCoastLineData}
				analyzeCoastLandData={analyzeCoastLandData}
				analyzeLandsData={analyzeLandsData}
				analyzeRiversData={analyzeRiversData}
			/>
		</div>
	);
}
