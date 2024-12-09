"use client";

export default function DefsWindRose() {
	return (
		<defs>
			<radialGradient id="roseGradient">
				<stop offset="1%" stopColor="rgba(230, 230, 230, 1.0)" />
				{/* <stop offset="12%" stopColor="rgba(0, 0, 0, 0.5)" /> */}
				<stop offset="23%" stopColor="rgba(0, 0, 0, 1.0)" />
				<stop offset="30%" stopColor="rgba(230, 230, 230, 0.9)" />
				<stop offset="45%" stopColor="rgba(230, 230, 230, 1.0)" />
			</radialGradient>
		</defs>
	);
}
