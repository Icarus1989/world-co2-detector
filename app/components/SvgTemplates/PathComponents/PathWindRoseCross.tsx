"use client";

import { AnimationMapping } from "@/app/utilities/types/types";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import anime from "animejs/lib/anime.es.js";

import { useSearchAnimation } from "@/app/searchContext/SearchContext";

import styles from "../SvgTemplate.module.css";

export default function PathWindRoseCross({
	containerHeight,
	width,
	height,
	strokeCrossWidth,
	animate
}: {
	containerHeight: number;
	width: number;
	height: number;
	strokeCrossWidth: string;
	animate: boolean;
}) {
	// const [play, setPlay] = useState<boolean>(false);
	const centerX = width / 2;
	const centerY = height / 2;

	const startD = `M ${centerX}, ${centerY} m0, ${0 - containerHeight / 3} l${
		-containerHeight / 14
	}, ${containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
		0 - containerHeight / 3
	} l${containerHeight / 14}, ${
		containerHeight / 3.8
	} M${centerX}, ${centerY} m${containerHeight / 3}, 0 l${
		-containerHeight / 3.8
	} ${-containerHeight / 14} L${centerX}, ${centerY} m${
		containerHeight / 3
	}, 0 l${-containerHeight / 3.8} ${
		containerHeight / 14
	} M${centerX}, ${centerY} m0, ${containerHeight / 3} l${
		containerHeight / 14
	} ${-containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
		containerHeight / 3
	} l${-containerHeight / 14}, ${
		-containerHeight / 3.8
	} M${centerX}, ${centerY} m${-containerHeight / 3} 0 l${
		containerHeight / 3.8
	}, ${containerHeight / 14} L${centerX}, ${centerY} m${
		-containerHeight / 3
	}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14}z`;

	const endDLatitude = `M ${centerX}, ${centerY} m0, ${
		0 - containerHeight / 3
	} l${-containerHeight / 14}, ${
		containerHeight / 3.8
	} L${centerX}, ${centerY} m0, ${0 - containerHeight / 3} l${
		containerHeight / 14
	}, ${containerHeight / 3.8} M${centerX}, ${centerY} m${
		containerHeight / 2.3
	} 0, l${-containerHeight / 3} ${
		-containerHeight / 16
	} L${centerX}, ${centerY} m${containerHeight / 2.3}, 0 l${
		-containerHeight / 3
	} ${containerHeight / 16} M${centerX}, ${centerY} m0, ${
		containerHeight / 3
	} l${containerHeight / 14} ${
		-containerHeight / 3.8
	} L${centerX}, ${centerY} m0, ${containerHeight / 3} l${
		-containerHeight / 14
	}, ${-containerHeight / 3.8} M${centerX}, ${centerY} m${
		-containerHeight / 2.3
	} 0 l${containerHeight / 3}, ${
		containerHeight / 16
	} L${centerX}, ${centerY} m${-containerHeight / 2.3}, 0 l${
		containerHeight / 3
	}, ${-containerHeight / 16}z`;

	const endDLongitude = `M ${centerX}, ${centerY} m0, ${
		0 - containerHeight / 2.3
	} l${-containerHeight / 16}, ${
		containerHeight / 3
	} L${centerX}, ${centerY} m0, ${0 - containerHeight / 2.3} l${
		containerHeight / 16
	}, ${containerHeight / 3} M${centerX}, ${centerY} m${
		containerHeight / 3
	} 0, l${-containerHeight / 3.8} ${
		-containerHeight / 14
	} L${centerX}, ${centerY} m${containerHeight / 3}, 0 l${
		-containerHeight / 3.8
	} ${containerHeight / 14} M${centerX}, ${centerY} m0, ${
		containerHeight / 2.3
	} l${containerHeight / 16} ${
		-containerHeight / 3
	} L${centerX}, ${centerY} m0, ${containerHeight / 2.3} l${
		-containerHeight / 16
	}, ${-containerHeight / 3} M${centerX}, ${centerY} m${
		-containerHeight / 3
	} 0 l${containerHeight / 3.8}, ${
		containerHeight / 14
	} L${centerX}, ${centerY} m${-containerHeight / 3}, 0 l${
		containerHeight / 3.8
	}, ${-containerHeight / 14}z`;

	const pathRef = useRef<SVGPathElement | null>(null);

	const { animationHandling, stopLat, stopLon, reverseLat, reverseLon } =
		useSearchAnimation();

	useEffect(() => {
		// console.log("Animation Effect");

		const windRoseLat: anime.AnimeInstance = anime({
			targets: `#crossPath`,
			d: [
				{
					value: startD
				},
				{
					value: endDLatitude
				}
			],
			direction: "normal",
			delay: 10,
			autoplay: false,
			easing: "linear",
			duration: 230,
			loop: false
		});

		const windRoseLon: anime.AnimeInstance = anime({
			targets: `#crossPath`,
			d: [
				{
					value: startD
				},
				{
					value: endDLongitude
				}
			],
			direction: "normal",
			delay: 10,
			autoplay: false,
			easing: "linear",
			duration: 230,
			loop: false
		});

		if (animate) {
			if (animationHandling.coords.lat.status === "play") {
				// console.log("play lat");
				windRoseLat.play();
			} else if (animationHandling.coords.lat.status === "reverse") {
				reverseLat();
				stopLat();
			}

			if (animationHandling.coords.lon.status === "play") {
				// console.log("play lon");
				windRoseLon.play();
			} else if (animationHandling.coords.lon.status === "reverse") {
				reverseLon();
				stopLon();
			}
			if (
				animationHandling.coords.lon.status === "stop" &&
				animationHandling.coords.lat.status === "stop"
			) {
				const actualPath = pathRef.current?.getAttribute("d");
				if (actualPath !== startD) {
					const backAnimation: anime.AnimeInstance = anime({
						targets: `#crossPath`,
						d: [
							{
								value: actualPath
							},
							{
								value: startD
							}
						],
						delay: 50,
						autoplay: false,
						easing: "linear",
						duration: 230,
						loop: false
					});
					backAnimation.play();
				}
			}
		}

		// console.log(animationHandling);
	}, [animationHandling, endDLatitude, startD]);

	return (
		<path
			id="crossPath"
			ref={pathRef}
			className={styles["cross-path"]}
			// stroke="url('#roseGradient')"
			// stroke="url('#roseGradient')"
			stroke="white"
			// stroke="rgb(230,230,230,0.5)"
			// fill="url(#roseLinearGradient)"
			// stroke={<DefsWindRose />}
			strokeWidth={strokeCrossWidth}
			// strokeMiterlimit="4"
			strokeLinejoin="round"
			strokeOpacity="1"
			fill="white"
			d={`M ${centerX}, ${centerY} m0, ${0 - containerHeight / 3} l${
				-containerHeight / 14
			}, ${containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
				0 - containerHeight / 3
			} l${containerHeight / 14}, ${
				containerHeight / 3.8
			} M${centerX}, ${centerY} m${containerHeight / 3}, 0 l${
				-containerHeight / 3.8
			} ${-containerHeight / 14} L${centerX}, ${centerY} m${
				containerHeight / 3
			}, 0 l${-containerHeight / 3.8} ${
				containerHeight / 14
			} M${centerX}, ${centerY} m0, ${containerHeight / 3} l${
				containerHeight / 14
			} ${-containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
				containerHeight / 3
			} l${-containerHeight / 14}, ${
				-containerHeight / 3.8
			} M${centerX}, ${centerY} m${-containerHeight / 3} 0 l${
				containerHeight / 3.8
			}, ${containerHeight / 14} L${centerX}, ${centerY} m${
				-containerHeight / 3
			}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14}z`}
		/>
	);
}
