"use client";

import { useEffect } from "react";
import anime from "animejs";
import { useSearchAnimation } from "@/app/searchContext/SearchContext";

export default function PathMagnifierTop({
	centerX,
	centerY,
	alphaAng,
	betaAng,
	radius,
	fill,
	strokeWidth,
	animate
}: {
	centerX: number;
	centerY: number;
	alphaAng: number;
	betaAng: number;
	radius: number;
	fill: string;
	strokeWidth: string;
	animate: boolean;
}) {
	// const { animationHandling, stopLat, stopLon, reverseLat, reverseLon } =
	// 	useSearchAnimation();

	const startD = `M${centerX + Math.cos(alphaAng) * radius}, ${
		centerY + Math.sin(alphaAng) * radius
	} a${radius}, ${radius}, 0, 1, 0, ${
		-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius
	}, ${-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius}`;

	// const firstStepD = ``;
	// const lastStepD = ``;

	// useEffect(() => {
	// 	if (animate) {
	// 	}
	// }, [animationHandling]);

	return (
		<path
			stroke="white"
			strokeWidth={strokeWidth}
			// strokeMiterlimit="4"
			strokeLinejoin="round"
			strokeOpacity="1"
			// arcs | bevel |miter | miter-clip | round
			// strokeLinecap="round"
			fill={fill}
			style={{ zIndex: 3 }}
			// d="M111.59110991546882, 53.105828541230249 a12, 12, 0, 1, 0, -5.591109915468819,7.286472458769751"
			// formula per d
			d={`M${centerX + Math.cos(alphaAng) * radius}, ${
				centerY + Math.sin(alphaAng) * radius
			} a${radius}, ${radius}, 0, 1, 0, ${
				-(Math.cos(alphaAng) * radius) + Math.cos(betaAng) * radius
			}, ${-(Math.sin(alphaAng) * radius) + Math.sin(betaAng) * radius}`}
		/>
	);
}
