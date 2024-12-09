"use client";

export default function CloseIcon({
	containerWidth,
	containerHeight,
	strokeWidth
}: {
	containerWidth: number;
	containerHeight: number;
	strokeWidth: string;
}) {
	const centerX = containerWidth / 2;
	const centerY = containerHeight / 2;
	return (
		<svg viewBox={`0 0 32 32`} xmlns="http://www.w3.org/2000/svg">
			<path
				stroke="white"
				strokeWidth={strokeWidth}
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="none"
				d={`M0, 0 L${centerX}, ${centerY} L${containerWidth},0 M${centerX}, ${centerY} L0, ${containerHeight} M${centerX}, ${centerY} L${containerWidth}, ${containerHeight}`}
			/>
		</svg>
	);
}
