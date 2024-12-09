"use client";

import styles from "../SvgTemplate.module.css";

import DefsWindRose from "../DefsComponents/DefsWindRose";
import PathWindRoseCross from "../PathComponents/PathWindRoseCross";
import PathWindRoseX from "../PathComponents/PathWindRoseX";

import { Dispatch, SetStateAction } from "react";
import { AnimationMapping } from "@/app/utilities/types/types";

export default function SvgWindRoseComponent({
	// passedRef,
	containerRef,
	svgWidth,
	svgHeight,
	strokeXWidth,
	strokeCrossWidth,
	animationComp,
	setAnimationComp
}: // roseMinRadius,
// roseMaxRadius
{
	// passedRef: HTMLInputElement | null;
	containerRef: HTMLDivElement | null;
	svgWidth: number;
	svgHeight: number;
	strokeXWidth: string;
	strokeCrossWidth: string;
	animationComp: AnimationMapping;
	setAnimationComp: Dispatch<SetStateAction<AnimationMapping>>;
	// roseMinRadius: number;
	// roseMaxRadius: number;
}) {
	const centerX = svgWidth / 2;
	const centerY = svgHeight / 2;
	// const inputHeight = passedRef?.getBoundingClientRect().height || 0;
	const containerHeight = containerRef?.getBoundingClientRect().height || 0;
	return (
		<svg
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			xmlns="http://www.w3.org/2000/svg"
			className={styles["svg-container"]}
		>
			{/* <path
				// stroke="white"
				id="xPath"
				stroke="url('#roseGradient')"
				strokeWidth={strokeXWidth}
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="white"
				// fillRule="nonzero"
				d={` M${centerX}, ${centerY} l${containerHeight / 5.5},${
					containerHeight / 5.5
				} L${centerX + containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY} m${containerHeight / 5.5},${
					containerHeight / 5.5
				} L${centerX - containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY} l${-containerHeight / 5.5},${
					containerHeight / 5.5
				} L${centerX - containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY}  m${-containerHeight / 5.5},${
					containerHeight / 5.5
				} L${centerX + containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY} l${-containerHeight / 5.5},${
					-containerHeight / 5.5
				} L${centerX - containerHeight / 23}, ${
					centerY + containerHeight / 23
				} M${centerX}, ${centerY} m${-containerHeight / 5.5},${
					-containerHeight / 5.5
				} L${centerX + containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY} l${containerHeight / 5.5},${
					-containerHeight / 5.5
				} L${centerX - containerHeight / 23}, ${
					centerY - containerHeight / 23
				} M${centerX}, ${centerY} m${containerHeight / 5.5},${
					-containerHeight / 5.5
				} L${centerX + containerHeight / 23}, ${
					centerY + containerHeight / 23
				}z`}
			/> */}
			<PathWindRoseX
				containerHeight={containerHeight}
				width={svgWidth}
				height={svgHeight}
				strokeWidth={strokeXWidth}
			/>

			{/* <path
				id="crossPath"
				// stroke="url('#roseGradient')"
				stroke="url('#roseGradient')"
				// stroke={<DefsWindRose />}
				strokeWidth={strokeCrossWidth}
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
				}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14}z `}
			/> */}
			<PathWindRoseCross
				containerHeight={containerHeight}
				width={svgWidth}
				height={svgHeight}
				strokeCrossWidth={strokeCrossWidth}
				animate={true}
			/>
			{/* <defs>
				<radialGradient id="roseGradient">
					<stop offset="1%" stopColor="rgba(230, 230, 230, 1.0)" />
					<stop offset="23%" stopColor="rgba(0, 0, 0, 1.0)" />
					<stop offset="30%" stopColor="rgba(230, 230, 230, 0.9)" />
					<stop offset="45%" stopColor="rgba(230, 230, 230, 1.0)" />
				</radialGradient>
			</defs> */}
			<DefsWindRose />
		</svg>
	);
}
