"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../SvgTemplate.module.css";

export default function SvgCalendarComponent({
	labelElement,
	svgWidth,
	svgHeight,
	percentage
}: {
	labelElement: HTMLSpanElement | null;
	// containerRef: HTMLDivElement | null;
	svgWidth: number;
	svgHeight: number;
	percentage: number;
}) {
	// console.log(labelElement);

	const [dimensions, setDimensions] = useState({
		arcBig: {
			startXLeft: 0,
			startXRight: 0,
			startY: 0,
			endXLeft: 0,
			endXRight: 0,
			endY: 0
		},
		arcSmall: {
			smallXStartLeft: 0,
			smallXStartRight: 0,
			smallYStartLeft: 0,
			smallYEndLeft: 0
		}
	});
	// Inserire assegnazione misure nello state
	// ed impostare in useEffect
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		const spanElement = labelElement?.querySelector("span");
		const inputElement = labelElement?.querySelector("input");
		const svgMeasures = svgRef.current?.getBoundingClientRect();
		const spanMeasures = spanElement?.getBoundingClientRect();
		const inputMeasures = inputElement?.getBoundingClientRect();
		// console.log(spanMeasures);
		const startXLeft =
			spanMeasures && svgMeasures
				? spanMeasures.x -
				  svgMeasures.x +
				  (percentage / 100) * spanMeasures.width
				: 0;

		const startYLeftRight =
			spanMeasures && svgMeasures
				? spanMeasures.bottom -
				  spanMeasures.height * (percentage / 100) -
				  svgMeasures.y
				: 0;
		// console.log("x left: " + startXLeft);
		// console.log("y left right: " + startYLeftRight);
		// const startYLeft =
		const startXRight =
			spanMeasures && svgMeasures
				? spanMeasures.right -
				  (percentage / 100) * spanMeasures.width -
				  svgMeasures.x
				: // svgMeasures.x +
				  //   (spanMeasures.x - svgMeasures.x) +
				  //   spanMeasures.width -
				  //   (percentage / 100) * spanMeasures.width
				  0;
		// console.log(startXRight);
		// console.log("y left right: " + startYLeftRight);

		const endXLeft = startXLeft;

		const endXRight = startXRight;

		const endY =
			spanMeasures && inputMeasures && svgMeasures
				? inputMeasures.y +
				  spanMeasures.height * (percentage / 100) -
				  svgMeasures.y
				: 0;

		// console.log("end Y: " + endY);

		const smallXStartLeft = startXLeft;

		const smallXStartRight = startXRight;

		const smallYStartLeft =
			spanMeasures && svgMeasures ? spanMeasures.bottom - svgMeasures.y : 0;

		const smallYEndLeft =
			inputMeasures && svgMeasures ? inputMeasures.y - svgMeasures.y : 0;

		setDimensions((prevValue) => {
			return {
				...prevValue,
				arcBig: {
					...prevValue.arcBig,
					startXLeft: startXLeft,
					startXRight: startXRight,
					startY: startYLeftRight,
					endXLeft: endXLeft,
					endXRight: endXRight,
					endY: endY
				},
				arcSmall: {
					...prevValue.arcSmall,
					smallXStartLeft: smallXStartLeft,
					smallXStartRight: smallXStartRight,
					smallYStartLeft: smallYStartLeft,
					smallYEndLeft: smallYEndLeft
				}
			};
		});
	}, [percentage, labelElement]);

	// console.log(dimensions);

	return (
		<svg
			viewBox={`0 0 ${svgWidth} ${svgHeight}`}
			xmlns="http://www.w3.org/2000/svg"
			ref={svgRef}
			className={styles["svg-container"]}
		>
			<path
				stroke="white"
				strokeWidth="3px"
				fill="none"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				filter="drop-shadow(1px 2px 1px black)"
				d={`M${dimensions.arcBig.startXLeft}, ${dimensions.arcBig.startY} A${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) * 1.23
				},${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 1.1
				}, 0, 0, 0, ${dimensions.arcBig.endXLeft}, ${dimensions.arcBig.endY} `}
				// d={`M${startXLeft}, ${startYLeftRight} L${endXLeft}, ${endY}`}
			/>
			<path
				stroke="white"
				strokeWidth="3px"
				fill="none"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				filter="drop-shadow(1px 2px 1px black)"
				d={`M${dimensions.arcBig.startXRight}, ${dimensions.arcBig.startY} A${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) * 1.23
				}, ${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 1.1
				}, 0, 0, 0, ${dimensions.arcBig.endXRight}, ${dimensions.arcBig.endY} `}
				// d={`M${startXRight}, ${startYLeftRight} L${endXRight}, ${endY}`}
			/>
			<path
				stroke="white"
				strokeWidth="3px"
				fill="none"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				// filter="drop-shadow(1px 2px 1px black)"
				d={`M${
					dimensions.arcSmall.smallXStartLeft +
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 2.3
				}, ${dimensions.arcSmall.smallYStartLeft} A${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) * 1.8
				},${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 1.1
				}, 0, 0, 1, ${
					dimensions.arcSmall.smallXStartLeft +
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 2.3
				}, ${dimensions.arcSmall.smallYEndLeft}`}
				// d={`M${startXLeft}, ${startYLeftRight} L${endXLeft}, ${endY}`}
			/>

			<path
				stroke="white"
				strokeWidth="3px"
				fill="none"
				// strokeMiterlimit="4"
				strokeLinejoin="round"
				strokeOpacity="1"
				// filter="drop-shadow(1px 2px 1px black)"
				d={`M${
					dimensions.arcSmall.smallXStartRight +
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 2.3
				}, ${dimensions.arcSmall.smallYStartLeft} A${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) * 1.8
				},${
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 1.1
				}, 0, 0, 1, ${
					dimensions.arcSmall.smallXStartRight +
					(dimensions.arcBig.endY - dimensions.arcBig.startY) / 2.3
				}, ${dimensions.arcSmall.smallYEndLeft}`}
				// d={`M${startXLeft}, ${startYLeftRight} L${endXLeft}, ${endY}`}
			/>
		</svg>
	);
}
