"use client";

export default function StartIcon({
	containerWidth,
	containerHeight,
	strokeWidth
}: {
	containerWidth: number;
	containerHeight: number;
	strokeWidth: number;
}) {
	const centerX = containerWidth / 2;
	const centerY = containerHeight / 2;
	return (
		<svg viewBox={`0 0 32 32`} xmlns="http://www.w3.org/2000/svg">
			<path
				stroke="white"
				strokeWidth={`${strokeWidth}px`}
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="none"
				d={`M${strokeWidth * 2}, ${strokeWidth} L${strokeWidth * 2}, ${
					containerHeight - strokeWidth
				} L${containerWidth - strokeWidth},${containerHeight / 2} L${
					strokeWidth * 2
				}, ${strokeWidth}z`}
			/>
		</svg>
	);
}
