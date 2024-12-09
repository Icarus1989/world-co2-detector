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
		<svg viewBox={`0 0 32 32`} xmlns="http://www.w3.org/2000/svg">
			<PathMagnifierTop
				centerX={centerX}
				centerY={centerY}
				alphaAng={alphaAng}
				betaAng={betaAng}
				radius={radius}
				fill={"none"}
				strokeWidth={"2px"}
			/>
			<PathMagnifierBottom
				centerX={centerX}
				centerY={centerY}
				alphaAng={alphaAng}
				betaAng={betaAng}
				gammaAng={gammaAng}
				deltaAng={deltaAng}
				radius={radius}
				strokeWidth={"2px"}
			/>
		</svg>
	);
}
