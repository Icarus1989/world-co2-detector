"use client";

import { AnimationMapping } from "@/app/utilities/types/types";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import anime from "animejs/lib/anime.es.js";

import { useSearchAnimation } from "@/app/searchContext/SearchContext";

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
	const [play, setPlay] = useState<boolean>(false);
	const centerX = width / 2;
	const centerY = height / 2;

	const startD = `M ${centerX}, ${centerY} l0, ${0 - containerHeight / 3} l${
		-containerHeight / 14
	}, ${containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
		0 - containerHeight / 3
	} l${containerHeight / 14}, ${
		containerHeight / 3.8
	} L${centerX}, ${centerY} l${containerHeight / 3} 0, l${
		-containerHeight / 3.8
	} ${-containerHeight / 14} L${centerX}, ${centerY} m${
		containerHeight / 3
	}, 0 l${-containerHeight / 3.8} ${
		containerHeight / 14
	} L${centerX}, ${centerY} l0, ${containerHeight / 3} l${
		containerHeight / 14
	} ${-containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
		containerHeight / 3
	} l${-containerHeight / 14}, ${
		-containerHeight / 3.8
	} L${centerX}, ${centerY} l${-containerHeight / 3} 0 l${
		containerHeight / 3.8
	}, ${containerHeight / 14} L${centerX}, ${centerY} m ${
		-containerHeight / 3
	}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14}z`;

	const endDLatitude = `M ${centerX}, ${centerY} l0, ${
		0 - containerHeight / 3
	} l${-containerHeight / 14}, ${
		containerHeight / 3.8
	} L${centerX}, ${centerY} m0, ${0 - containerHeight / 3} l${
		containerHeight / 14
	}, ${containerHeight / 3.8} L${centerX}, ${centerY} l${
		containerHeight / 2.3
	} 0, l${-containerHeight / 3} ${
		-containerHeight / 16
	} L${centerX}, ${centerY} m${containerHeight / 2.3}, 0 l${
		-containerHeight / 3
	} ${containerHeight / 16} L${centerX}, ${centerY} l0, ${
		containerHeight / 3
	} l${containerHeight / 14} ${
		-containerHeight / 3.8
	} L${centerX}, ${centerY} m0, ${containerHeight / 3} l${
		-containerHeight / 14
	}, ${-containerHeight / 3.8} L${centerX}, ${centerY} l${
		-containerHeight / 2.3
	} 0 l${containerHeight / 3}, ${
		containerHeight / 16
	} L${centerX}, ${centerY} m ${-containerHeight / 2.3}, 0 l${
		containerHeight / 3
	}, ${-containerHeight / 16}z`;

	const endDLongitude = `M ${centerX}, ${centerY} l0, ${
		0 - containerHeight / 2.3
	} l${-containerHeight / 16}, ${
		containerHeight / 3
	} L${centerX}, ${centerY} m0, ${0 - containerHeight / 2.3} l${
		containerHeight / 16
	}, ${containerHeight / 3} L${centerX}, ${centerY} l${
		containerHeight / 3
	} 0, l${-containerHeight / 3.8} ${
		-containerHeight / 14
	} L${centerX}, ${centerY} m${containerHeight / 3}, 0 l${
		-containerHeight / 3.8
	} ${containerHeight / 14} L${centerX}, ${centerY} l0, ${
		containerHeight / 2.3
	} l${containerHeight / 16} ${
		-containerHeight / 3
	} L${centerX}, ${centerY} m0, ${containerHeight / 2.3} l${
		-containerHeight / 16
	}, ${-containerHeight / 3} L${centerX}, ${centerY} l${
		-containerHeight / 3
	} 0 l${containerHeight / 3.8}, ${
		containerHeight / 14
	} L${centerX}, ${centerY} m ${-containerHeight / 3}, 0 l${
		containerHeight / 3.8
	}, ${-containerHeight / 14}z`;

	// const latStatus = animationComp?.coords.lat.status;
	// const lonStatus = animationComp?.coords.lon.status;

	// useEffect(() => {
	// 	console.log("test animComp from Path");
	// 	// console.log(animationComp);
	// }, [latStatus]);

	const pathRef = useRef<SVGPathElement | null>(null);

	const { animationHandling, stopLat, stopLon, reverseLat, reverseLon } =
		useSearchAnimation();

	useEffect(() => {
		console.log("Animation Effect");

		// console.log(animationHandling);

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

		// const windRoseLatReverse: anime.AnimeInstance = anime({
		// 	targets: `#crossPath`,
		// 	d: [
		// 		{
		// 			value: endDLatitude
		// 		},
		// 		{
		// 			value: startD
		// 		}
		// 	],
		// 	delay: 50,
		// 	autoplay: false,
		// 	easing: "linear",
		// 	duration: 230,
		// 	loop: false
		// });

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

		// const windRoseLonReverse: anime.AnimeInstance = anime({
		// 	targets: `#crossPath`,
		// 	d: [
		// 		{
		// 			value: endDLongitude
		// 		},
		// 		{
		// 			value: startD
		// 		}
		// 	],
		// 	delay: 50,
		// 	autoplay: false,
		// 	easing: "linear",
		// 	duration: 230,
		// 	loop: false
		// });

		// if (animationComp !== null) {
		// console.log(latStatus);

		// Attivazione animazioni con Context + Provider

		// async function handleFinished(animation: anime.AnimeInstance) {
		// 	const played = animation.play();
		// 	console.log(played);
		// 	const finished = await animation.finished;
		// 	console.log(finished);
		// 	console.log(animation);
		// }

		if (animate) {
			if (animationHandling.coords.lat.status === "play") {
				console.log("play lat");
				windRoseLat.play();
				// if (windRoseLat.completed) {
				// 	stopLat();
				// }
			} else if (animationHandling.coords.lat.status === "reverse") {
				// windRoseLatReverse.play();
				reverseLat();
				stopLat();
				// windRoseLat.reverse();
				// windRoseLat.restart();
				// console.log(windRoseLat);
				// if (windRoseLatReverse.completed) {
				// 	stopLat();
				// }
				// windRoseLat.seek(1);

				// alla fine impostare stop su animationHandling.coords.lat.status
				// windRoseLat.restart();
				// windRoseLat.reverse();

				// windRoseLat.reverse();
			}
			// else if (animationHandling.coords.lat.status === "stop") {
			// 	const actualPath = pathRef.current?.style.d;
			// 	console.log(actualPath);
			// }

			if (animationHandling.coords.lon.status === "play") {
				console.log("play lon");
				windRoseLon.play();
				// if (windRoseLon.completed) {
				// stopLon();
				// }
			} else if (animationHandling.coords.lon.status === "reverse") {
				// windRoseLonReverse.play();
				reverseLon();
				stopLon();
			}
			// else if (animationHandling.coords.lon.status === "stop") {

			// }

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
				// console.log("stop animation");
				// console.log(windRoseLat);
				// console.log(windRoseLon);
				// if (
				// 	windRoseLat.completed !== false ||
				// 	windRoseLon.completed !== false
				// ) {
				// 	const actualPath = pathRef.current?.getAttribute("d");
				// 	console.log(actualPath);
				// }
			}
		}

		// }
		// if(){}
		console.log(animationHandling);
	}, [animationHandling, endDLatitude, startD]);

	return (
		<path
			id="crossPath"
			ref={pathRef}
			// stroke="url('#roseGradient')"
			stroke="url('#roseGradient')"
			// stroke={<DefsWindRose />}
			strokeWidth={strokeCrossWidth}
			// strokeMiterlimit="4"
			strokeLinejoin="round"
			strokeOpacity="1"
			fill="black"
			d={`M ${centerX}, ${centerY} l0, ${0 - containerHeight / 3} l${
				-containerHeight / 14
			}, ${containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
				0 - containerHeight / 3
			} l${containerHeight / 14}, ${
				containerHeight / 3.8
			} L${centerX}, ${centerY} l${containerHeight / 3} 0, l${
				-containerHeight / 3.8
			} ${-containerHeight / 14} L${centerX}, ${centerY} m${
				containerHeight / 3
			}, 0 l${-containerHeight / 3.8} ${
				containerHeight / 14
			} L${centerX}, ${centerY} l0, ${containerHeight / 3} l${
				containerHeight / 14
			} ${-containerHeight / 3.8} L${centerX}, ${centerY} m0, ${
				containerHeight / 3
			} l${-containerHeight / 14}, ${
				-containerHeight / 3.8
			} L${centerX}, ${centerY} l${-containerHeight / 3} 0 l${
				containerHeight / 3.8
			}, ${containerHeight / 14} L${centerX}, ${centerY} m ${
				-containerHeight / 3
			}, 0 l${containerHeight / 3.8}, ${-containerHeight / 14}z`}
		/>
	);
}
