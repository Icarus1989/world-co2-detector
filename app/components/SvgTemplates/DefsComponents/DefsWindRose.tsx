"use client";

export default function DefsWindRose() {
	return (
		<defs>
			<radialGradient id="roseGradient">
				<stop offset="1%" stopColor="rgba(230, 230, 230, 0)" />
				{/* <stop offset="12%" stopColor="rgba(0, 0, 0, 0.5)" /> */}
				<stop offset="23%" stopColor="rgba(0, 0, 0, 0)" />
				<stop offset="35%" stopColor="rgba(230, 230, 230, 0.5)" />
				<stop offset="40%" stopColor="rgba(230, 230, 230, 1.0)" />
			</radialGradient>
			<linearGradient id="roseCrossGradient">
				<stop offset="23%" stopColor="rgba(230, 230, 230, 1.0)" />
				<stop offset="40%" stopColor="rgba(94, 125, 160, 1.0)" />
				<stop offset="60%" stopColor="rgba(230, 230, 230, 1.0)" />
			</linearGradient>
			<radialGradient id="roseXGradient">
				<stop offset="1%" stopColor="rgba(230, 230, 230, 0)" />
				{/* <stop offset="12%" stopColor="rgba(0, 0, 0, 0.5)" /> */}
				<stop offset="23%" stopColor="rgba(0, 0, 0, 0)" />
				<stop offset="62%" stopColor="rgba(230, 230, 230, 0.1)" />
				<stop offset="63%" stopColor="rgba(230, 230, 230, 1.0)" />
			</radialGradient>
			<linearGradient id="roseLinearGradient" gradientTransform="rotate(1800)">
				<stop offset="49%" stopColor="rgba(230, 230, 230, 0)" />
				<stop offset="49.9%" stopColor="rgba(230, 230, 230, 1.0)" />
				<stop offset="50.1%" stopColor="rgba(230, 230, 230, 1.0)" />
				<stop offset="51%" stopColor="rgba(230, 230, 230, 0)" />
			</linearGradient>
		</defs>
	);
}
