"use client";

import styles from "./SvgTemplate.module.css";

export default function SvgWindRoseComponent({
	passedRef,
	containerRef,
	svgWidth,
	svgHeight,
	roseMinRadius,
	roseMaxRadius
}: {
	passedRef: HTMLInputElement | null;
	containerRef: HTMLDivElement | null;
	svgWidth: number;
	svgHeight: number;
	roseMinRadius: number;
	roseMaxRadius: number;
}) {
	const centerX = svgWidth / 2;
	const centerY = svgHeight / 2.5;
	const inputHeight = passedRef?.getBoundingClientRect().height || 0;
	const containerHeight = containerRef?.getBoundingClientRect().height || 0;
	return (
		<svg
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			xmlns="http://www.w3.org/2000/svg"
			className={styles["svg-container"]}
		>
			<path
				stroke="white"
				strokeWidth="2px"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="black"
				d={` M${centerX}, ${centerY} l${containerHeight / 5},${
					containerHeight / 5
				} L${centerX + containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY} m${containerHeight / 5},${
					containerHeight / 5
				} L${centerX - containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY} l${-containerHeight / 5},${
					containerHeight / 5
				} L${centerX - containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY}  m${-containerHeight / 5},${
					containerHeight / 5
				} L${centerX + containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY} l${-containerHeight / 5},${
					-containerHeight / 5
				} L${centerX - containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY}`}
			/>

			<path
				stroke="white"
				strokeWidth="2px"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="black"
				d={` M ${centerX}, ${centerY} l0, ${0 - containerHeight / 3} l${
					-containerHeight / 14
				}, ${containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
					0 - containerHeight / 3
				} l${containerHeight / 14}, ${
					containerHeight / 3.8
				} L${centerX}, ${centerY} l${containerHeight / 3} 0, l${
					-containerHeight / 3.8
				} ${-containerHeight / 14} L${centerX}, ${centerY} m${
					containerHeight / 3
				}, 0 l${-containerHeight / 3.8} ${
					containerHeight / 14
				} L${centerX}, ${centerY} l0, ${containerHeight / 3} l${
					containerHeight / 14
				} ${-containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
					containerHeight / 3
				} l${-containerHeight / 14}, ${
					-containerHeight / 3.8
				} L${centerX}, ${centerY} l${-containerHeight / 3} 0 l${
					containerHeight / 3.8
				}, ${containerHeight / 14} L${centerX}, ${centerY} m ${
					-containerHeight / 3
				}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14} `}
			/>
		</svg>
	);
}
