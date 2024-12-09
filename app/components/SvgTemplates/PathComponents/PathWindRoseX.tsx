"use client";

export default function PathWindRoseX({
	containerHeight,
	width,
	height,
	strokeWidth
}: {
	containerHeight: number;
	width: number;
	height: number;
	strokeWidth: string;
}) {
	const centerX = width / 2;
	const centerY = height / 2;
	return (
		<path
			// stroke="white"
			id="xPath"
			stroke="url('#roseGradient')"
			strokeWidth={strokeWidth}
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
			} L${centerX + containerHeight / 23}, ${centerY + containerHeight / 23}z`}
		/>
	);
}
