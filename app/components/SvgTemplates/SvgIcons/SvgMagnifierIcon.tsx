"use client";

import PathMagnifierTop from "../PathComponents/PathMagnifierTop";
import PathMagnifierBottom from "../PathComponents/PathMagnifierBottom";
import { useState } from "react";
import DefsWindRose from "../DefsComponents/DefsWindRose";

export default function MagnifierIcon() {
	const [dimensions, setDimensions] = useState({ boxWidth: 32, boxHeight: 32 });

	const alphaAng = 35 * (Math.PI / 180);
	// const alphaAng = 35 * (Math.PI / 180);

	const radius = 8;
	const centerX = dimensions.boxWidth / 2.3;
	const centerY = dimensions.boxHeight / 2.3;
	const betaAng = 45 * (Math.PI / 180);
	const gammaAng = 60 * (Math.PI / 180);
	const deltaAng = 40 * (Math.PI / 180);
	return (
		<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
			{/* <PathMagnifierTop
				centerX={centerX}
				centerY={centerY}
				alphaAng={alphaAng}
				betaAng={betaAng}
				radius={radius}
				fill={"none"}
				strokeWidth={"1.5px"}
				animate={false}
			/>
			<PathMagnifierBottom
				centerX={centerX}
				centerY={centerY}
				alphaAng={alphaAng}
				betaAng={betaAng}
				gammaAng={gammaAng}
				deltaAng={deltaAng}
				radius={radius}
				strokeWidth={"1.5px"}
				animate={false}
			/> */}

			{/* <g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke="#CCCCCC"
				stroke-width="0.256"
			></g> */}

			<path
				d="M40,40.6 C35.9,44.6 30.2,47.1 24,47.1 C11.3,47.1 1,36.8 1,24.1 C1,11.4 11.3,1.1 24,1.1 C36.7,1.1 47,11.4 47,24.1 C47,28.5 45.8,32.6 43.6,36.1 L43.7,36.2 L62.6,55.1 C63.4,55.9 62.5,58 60.7,59.8 L60.7,59.8 C58.9,61.6 56.7,62.5 56,61.7 L37,42.7"
				id="Magnifier"
				stroke="rgba(107, 123, 230, 0.9)"
				strokeWidth="4"
				fill="none"
			>
				{" "}
			</path>
		</svg>
	);
}
