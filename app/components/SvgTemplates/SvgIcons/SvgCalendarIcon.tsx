"use client";

export default function CalendarIcon({
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

	const startX = containerWidth / 5;
	const startY = containerWidth / 20;
	const edge = (containerWidth * 60) / 100;
	const junction = 5;

	// const day = new Date(Date.now()).getDate();
	const day = 23;
	return (
		<svg viewBox={`0 0 32 32`} xmlns="http://www.w3.org/2000/svg">
			<path
				stroke="white"
				strokeWidth={strokeWidth}
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="none"
				// d={`M0, 0 L${centerX}, ${centerY} L${containerWidth},0 M${centerX}, ${centerY} L0, ${containerHeight} M${centerX}, ${centerY} L${containerWidth}, ${containerHeight}`}
				d={`M${startX}, ${startY} l${edge},0 a${junction},${junction},0,0,1,${junction},${junction} l0, ${edge} a${junction},${junction},0,0,1,${-junction},${junction} l${-edge},0 a${junction},${junction},0,0,1,${-junction},${-junction} l0,${-edge} a${junction},${junction},0,0,1,${junction},${-junction} M${
					junction / 4
				},${junction * 2} l${(containerWidth * 90) / 100},0`}
			/>
			<path
				id="invisiblePath"
				stroke="transparent"
				strokeWidth="1px"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				fill="none"
				d={`M${1.5 * junction},${containerHeight - 1.3 * junction} l${
					(containerWidth * 90) / 100
				},0`}
				// centrare textPath
			/>
			<text style={{ fontWeight: 700, fontSize: "15px" }}>
				<textPath
					style={{ fill: "white" }}
					// strokeWidth={3}
					href="#invisiblePath"
				>{`${day}`}</textPath>
			</text>
		</svg>
	);
}
