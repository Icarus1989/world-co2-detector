import SvgTemplate from "../SvgTemplate/SvgMagnifierComponent";
import TextInputTemplate from "../TextInputTemplate/TextInputTemplate";
import styles from "./CanvasContainer.module.css";

export function CanvasContainer() {
	return (
		<div className={styles["container"]}>
			{/* <SvgTemplate svgWidth={500} svgHeight={100} /> */}
			<TextInputTemplate fieldName="name" labels={["name"]} />
			<TextInputTemplate fieldName="coords" labels={["lat", "lon"]} />
		</div>
	);
}
