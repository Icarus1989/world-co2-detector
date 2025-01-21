"use client";

import PathWindRoseX from "../PathComponents/PathWindRoseX";
import PathWindRoseCross from "../PathComponents/PathWindRoseCross";
import DefsWindRose from "../DefsComponents/DefsWindRose";

import styles from "../SvgTemplate.module.css";

export default function WindRoseIcon() {
	return (
		<svg
			viewBox={`0 0 32 32`}
			xmlns="http://www.w3.org/2000/svg"
			// className={styles["svg-icon"]}
		>
			<PathWindRoseX
				containerHeight={32}
				width={32}
				height={32}
				strokeWidth="0.5px"
			/>

			<PathWindRoseCross
				containerHeight={32}
				width={32}
				height={32}
				strokeCrossWidth="0.5px"
				animate={false}
			/>
			<DefsWindRose />
		</svg>
	);
}
