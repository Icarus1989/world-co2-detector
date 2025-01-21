"use client";

import { useEffect, useRef } from "react";
import styles from "../SvgTemplate.module.css";
import PathMagnifierBottom from "../PathComponents/PathMagnifierBottom";
import PathMagnifierTop from "../PathComponents/PathMagnifierTop";

export default function SvgMagnifierComponent({
	passedRef,
	svgWidth,
	svgHeight,
	glassRadius
}: {
	passedRef: HTMLInputElement | null;
	svgWidth: number;
	svgHeight: number;
	glassRadius: number;
}) {
	// const centerX = svgWidth * (75 / 100);
	const centerX = passedRef
		? passedRef?.getBoundingClientRect().right - glassRadius
		: 0;
	// const centerX = 0;
	const alphaAng = 35 * (Math.PI / 180);
	// const alphaAng = 35 * (Math.PI / 180);

	const radius = glassRadius;
	const centerY = svgHeight / 2;
	const betaAng = 45 * (Math.PI / 180);
	const gammaAng = 60 * (Math.PI / 180);
	const deltaAng = 40 * (Math.PI / 180);

	// const svgRef = useRef(null);

	// useEffect(() => {
	// 	console.log(svgRef.current.parentElement);
	// }, []);

	// console.log("svg measures: ");
	// console.log(svgWidth);
	// console.log(svgHeight);

	// console.log(
	// 	`M${centerX + Math.cos(alphaAng) * radius}, ${
	// 		centerY + Math.sin(alphaAng) * radius
	// 	} a${radius}, ${radius}, 0, 1, 0, ${
	// 		-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius
	// 	}, ${-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius}`
	// );

	return (
		<svg
			// ref={svgRef}
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			xmlns="http://www.w3.org/2000/svg"
			className={styles["svg-container"]}
			onClick={() => {
				passedRef?.focus();
			}}
		>
			{/* <path
				stroke="white"
				strokeWidth="4px"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				// arcs | bevel |miter | miter-clip | round
				// strokeLinecap="round"
				fill="url('#magnGradient')"
				style={{ zIndex: 3 }}
				// d="M111.59110991546882, 53.105828541230249 a12, 12, 0, 1, 0, -5.591109915468819,7.286472458769751"
				// formula per d
				d={`M${centerX + Math.cos(alphaAng) * radius}, ${
					centerY + Math.sin(alphaAng) * radius
				} a${radius}, ${radius}, 0, 1, 0, ${
					-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius
				}, ${-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius}`}
			/> */}
			<PathMagnifierTop
				centerX={centerX}
				centerY={centerY}
				alphaAng={alphaAng}
				betaAng={betaAng}
				radius={radius}
				fill={"url('#magnGradient')"}
				strokeWidth={"4px"}
				animate={true}
			/>
			<PathMagnifierBottom
				centerX={centerX}
				centerY={centerY}
				radius={radius}
				alphaAng={alphaAng}
				betaAng={betaAng}
				gammaAng={gammaAng}
				deltaAng={deltaAng}
				strokeWidth={"4px"}
				animate={true}
			/>
			{/* <path
				stroke="white"
				strokeWidth="4px"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1.0"
				// arcs | bevel |miter | miter-clip | round
				// strokeLinecap="round"
				fill="none"
				style={{ zIndex: 4 }}
				d={`M${centerX + Math.cos(alphaAng) * radius}, ${
					centerY + Math.sin(alphaAng) * radius
				} m${-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius}, ${
					-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius
				} m${-(Math.cos(betaAng) * radius) + Math.cos(gammaAng) * radius}, ${
					-(Math.sin(betaAng) * radius) + Math.sin(gammaAng) * radius
				} l${Math.cos(deltaAng) * 1.23 * radius}, ${
					Math.sin(deltaAng) * 1.23 * radius
				} l${Math.cos(-betaAng) * 0.5 * radius},${
					Math.sin(-betaAng) * 0.5 * radius
				} l${-Math.cos(deltaAng) * 1.23 * radius}, ${
					Math.sin(-deltaAng) * 1.3 * radius
				}`}
			/> */}
			<defs>
				<radialGradient id="magnGradient" cx="44%" cy="50%">
					{/* <stop offset="5%" stop-color="rgba(255, 255, 255, 0.1)" />
					<stop offset="23%" stop-color="rgba(255, 255, 255, 0.15)" />
					<stop offset="33%" stop-color="rgba(255, 255, 255, 0.18)" /> */}
					<stop offset="60%" stopColor="rgba(255, 255, 255, 0)" />
					<stop offset="90%" stopColor="rgba(255, 255, 255, 0.23)" />
					<stop offset="94%" stopColor="rgba(255, 255, 255, 0.4)" />
					{/* <stop offset="98%" stop-color="rgba(72,132,196, 0)" /> */}
					{/* <stop offset="85%" stop-color="rgba(72,132,196, 0.2)" /> */}
					{/* <stop offset="95%" stop-color="rgba(72,132,196, 0.05)" /> */}
				</radialGradient>
			</defs>
		</svg>

		// il d dell'animazione comincerà con m seguito dalle coordinate
		// del punto sottostante l'input
	);
}

// d={`M${centerX + Math.cos(alphaAng) * radius}, ${
// 					centerY + Math.sin(alphaAng) * radius
// 				} a${radius}, ${radius}, 0, 1, 0, ${
// 					-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius
// 				}, ${-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius} m${
// 					-(Math.cos(betaAng) * radius) + Math.cos(gammaAng) * radius
// 				}, ${-(Math.sin(betaAng) * radius) + Math.sin(gammaAng) * radius} l${
// 					Math.cos(deltaAng) * 1.23 * radius
// 				}, ${Math.sin(deltaAng) * 1.23 * radius}  l${
// 					Math.cos(-betaAng) * 0.5 * radius
// 				},${Math.sin(-betaAng) * 0.5 * radius} l${
// 					-Math.cos(deltaAng) * 1.23 * radius
// 				}, ${Math.sin(-deltaAng) * 1.3 * radius}`}
