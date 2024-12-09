"use client";

export default function PathMagnifierBottom({
	centerX,
	centerY,
	alphaAng,
	betaAng,
	gammaAng,
	radius,
	deltaAng,
	strokeWidth
}: {
	centerX: number;
	centerY: number;
	alphaAng: number;
	betaAng: number;
	gammaAng: number;
	radius: number;
	deltaAng: number;
	strokeWidth: string;
}) {
	const startD = `M${centerX + Math.cos(alphaAng) * radius}, ${
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
	}`;
	return (
		<path
			stroke="white"
			strokeWidth={strokeWidth}
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
		/>
	);
}
