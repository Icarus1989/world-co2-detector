"use client";

import styles from "../SvgTemplate.module.css";

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
			// stroke="rgb(230, 230, 230, 1.0)"
			id="xPath"
			stroke="url('#roseXGradient')"
			strokeWidth={strokeWidth}
			// strokeMiterlimit="4"
			strokeLinejoin="round"
			strokeOpacity="1"
			fill="url('#roseXGradient')"
			// className={styles["x-path"]}
			// fillRule="nonzero"
			d={` M${centerX}, ${centerY} l${containerHeight / 5.5},${
				containerHeight / 5.5
			} L${centerX + containerHeight / 23}, ${
				centerY - containerHeight / 23
			} M${centerX}, ${centerY} M${containerHeight / 5.5 + centerX},${
				containerHeight / 5.5 + centerY
			} L${centerX - containerHeight / 23}, ${
				centerY + containerHeight / 23
			} M${centerX}, ${centerY} m${-containerHeight / 5.5},${
				containerHeight / 5.5
			} L${centerX - containerHeight / 23}, ${
				centerY - containerHeight / 23
			} M${centerX}, ${centerY}  l${-containerHeight / 5.5},${
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
