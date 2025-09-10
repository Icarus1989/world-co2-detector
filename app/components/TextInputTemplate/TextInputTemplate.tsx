"use client";

import {
	ChangeEvent,
	Dispatch,
	FocusEventHandler,
	SetStateAction,
	useEffect,
	useRef,
	useState,
	FocusEvent,
	Fragment
} from "react";
import SvgMagnifierComponent from "../SvgTemplates/SvgComponents/SvgMagnifierComponent";
import SvgWindRoseComponent from "../SvgTemplates/SvgComponents/SvgWindRoseComponent";
import { motion } from "framer-motion";

import styles from "./TextInputTemplate.module.css";

import type {
	FormData,
	AnimationMapping,
	AnimatonStatus
} from "@/app/utilities/types/types";

import {
	useSearchAnimation,
	useSearchData
} from "@/app/searchContext/SearchContext";
import CoordsInputComponent from "../CoordsInputComponent/CoordsInputComponent";

export default function TextInputTemplate({
	fieldName,
	labels,
	handleChange,
	animationComp,
	setAnimationComp
}: {
	fieldName: string;
	labels: string[]; //lat lon | name
	handleChange: any;
	animationComp: AnimationMapping;
	setAnimationComp: Dispatch<SetStateAction<AnimationMapping>>; // riattivare
}) {
	// const groupInputs = typeof inputTypes === "string" ? "single" : "double";
	// const containerWidth =

	const containerRef = useRef<HTMLInputElement | null>(null);

	const [templateMeas, setTemplateMeas] = useState({
		width: 0,
		height: 0,
		radius: 0
	});

	const {
		animationHandling,
		playText,
		playLat,
		playLon,
		playBegin,
		playEnd,
		reverseText,
		reverseLat,
		reverseLon,
		reverseBegin,
		reverseEnd,
		stopText,
		stopLat,
		stopLon,
		stopBegin,
		stopEnd
	} = useSearchAnimation();

	const { data } = useSearchData();

	useEffect(() => {
		// console.log(containerRef.current?.clientWidth);
		const actualWidth =
			containerRef.current?.getBoundingClientRect().width || 0;
		const actualHeight =
			containerRef.current?.getBoundingClientRect().height || 0;
		const inputHeight = nameRef.current?.getBoundingClientRect().height || 0;
		// const container = containerRef.current.getBoundingClientRect();
		setTemplateMeas((prevValue) => {
			return {
				...prevValue,
				width: actualWidth,
				height: actualHeight,
				radius: inputHeight
			};
		});
	}, []);

	const nameRef = useRef<HTMLInputElement | null>(null);

	// const latRef = useRef<HTMLInputElement | null>(null);
	// const lonRef = useRef<HTMLInputElement | null>(null);

	// type FormData = {
	// 	name: string;
	// 	lat: string;
	// 	lon: string;
	// };

	// const [formData, setFormData] = useState<FormData>({
	// 	name: "",
	// 	lat: "",
	// 	lon: ""
	// });

	// console.log(latRef, lonRef);
	// console.log(containerRef);
	// console.log(labels.length);

	// const [playState, setPlayState] = useState({
	// 	status: "stop",
	// 	name:
	// });
	// useEffect(() => {}, []);

	function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
		// console.log("focus");
		if (event.target) {
			const target = event.target;
			// console.log(target);
			const name: string = target.name.split("-")[0];
			// console.log(name);
			const latStatus = animationHandling.coords.lat.status;
			const lonStatus = animationHandling.coords.lon.status;
			if (name === "lat" && lonStatus === "stop") {
				playLat();
			} else if (name === "lat" && lonStatus === "reverse") {
				reverseLon();
				stopLon();
				playLat();
			} else if (name === "lon" && latStatus === "reverse") {
				reverseLat();
				stopLat();
				playLon();
			} else if (name === "lon") {
				playLon();
			}

			// setAnimationComp((prevAnimComp: AnimationMapping) => {
			// 	console.log("setAnimaComp");
			// 	const nameObj: AnimatonStatus =
			// 		name === "lat" ? prevAnimComp.coords.lat : prevAnimComp.coords.lon;
			// 	nameObj.status = "play";
			// 	// console.log(nameObj);
			// 	return {
			// 		...prevAnimComp,
			// 		coords: {
			// 			...prevAnimComp.coords,
			// 			[name]: nameObj
			// 		}
			// 	};
			// });
		}
		// console.log(animationComp);
	}

	function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
		if (event.target) {
			const target = event.target;
			// console.log(target);
			const name: string = target.name.split("-")[0];
			// console.log(name);
			const latStatus = animationHandling.coords.lat.status;
			const lonStatus = animationHandling.coords.lon.status;
			if (name === "lat" && lonStatus === "stop") {
				// stopLon();
				reverseLat();
			} else if (name === "lat" && lonStatus === "play") {
				stopLat();
			} else if (name === "lon" && latStatus === "play") {
				stopLon();
			} else if (name === "lon" && latStatus === "stop") {
				// stopLat();
				reverseLon();
			}
		}
	}

	const [play, setPlay] = useState<boolean>(false);

	// console.log(formData);

	// useEffect(() => {
	// 	console.log("change animComp");
	// 	console.log(animationComp);
	// }, [animationComp]);

	// const latitude: string = data.lat.coord && String(data.lat.coord).slice(0, 2);

	const latData = data["lat"];
	const lonData = data["lon"];

	function calculateSymbol(inputType: string): "" | "°" | "'" | '"' {
		if (inputType === "degrees") {
			return "°";
		} else if (inputType === "minutes") {
			return "'";
		} else if (inputType === "seconds") {
			return '"';
		} else {
			return "";
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.3,
				delay: 0.1,
				ease: "linear",
				staggerChildren: 0.1
			}}
			ref={containerRef}
			id={`${fieldName}`}
			style={{ transformOrigin: "center" }}
			// onClick={() => {
			// 	return
			// }}
			className={styles[`${fieldName}-field`]}
		>
			{labels.length > 1 ? (
				<>
					{/* <span className={styles["label-text"]}>Coords-Text-Label: </span> */}
					{labels.map((labelName) => {
						// const group = data[ind];
						const actualData = labelName === "lat" ? latData : lonData;
						const tags: string[] = [...Object.keys(actualData)];
						return (
							<Fragment key={labelName}>
								<div className={styles[`${labelName}-container`]}>
									<div
										className={styles["coords-inputs-container"]}
										onFocus={(event: FocusEvent<HTMLInputElement, Element>) => {
											console.log("focus");
											handleFocus(event);
										}}
										onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
											console.log("blur");
											handleBlur(event);
										}}
									>
										{tags.map((tag) => {
											return (
												<Fragment key={`${labelName}-${tag}`}>
													<CoordsInputComponent
														labelName={labelName}
														labelTag={tag}
														labelSymbol={calculateSymbol(tag)}
														// <--- cambiare
														handleChange={handleChange}
													/>
												</Fragment>
											);
										})}
									</div>
								</div>
							</Fragment>
							// <motion.label
							// 	initial={{ left: labelName === "lat" ? "-200%" : "200%" }}
							// 	animate={{ left: "0%" }}
							// 	exit={{ left: labelName === "lat" ? "-200%" : "200%" }}
							// 	transition={{
							// 		duration: 0.3,
							// 		delay: 0.1,
							// 		ease: "linear",
							// 		staggerChildren: 0.1
							// 	}}
							// 	id={labelName}
							// 	key={labelName}
							// 	htmlFor={`${
							// 		labelName === "lat" ? data.lat.coord : data.lon.coord
							// 	}-input`}
							// 	className={styles[`${labelName}-label`]}
							// >
							// 	{/* trasformare in tre input per gradi primi e secondi ---> */}
							// 	<motion.input
							// 		id={labelName}
							// 		name={`${labelName === "lat" ? "lat" : "lon"}-input`}
							// 		type="number"
							// 		min={labelName === "lat" ? "-90.000" : "0.000"}
							// 		max={labelName === "lat" ? "90.000" : "180.000"}
							// 		// step="0.0000001"
							// 		value={
							// 			labelName === "lat"
							// 				? data.lat.coord
							// 					? data.lat.coord
							// 					: ""
							// 				: data.lon.coord
							// 				? data.lon.coord
							// 				: ""
							// 		}
							// 		onChange={handleChange}
							// 		onFocus={(event: FocusEvent<HTMLInputElement, Element>) => {
							// 			console.log("focus");
							// 			handleFocus(event);
							// 		}}
							// 		onBlur={(event: FocusEvent<HTMLInputElement, Element>) => {
							// 			console.log("blur");
							// 			handleBlur(event);
							// 		}}
							// 		// ref={labelName === "lat" ? latRef : lonRef}
							// 		// inputMode="numeric"
							// 		placeholder={
							// 			labelName === "lat" ? "Latitude..." : "Longitude..."
							// 		}
							// 		pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
							// 		className={styles[`${fieldName}-input`]}
							// 	/>
							// </motion.label>
						);
					})}
					<SvgWindRoseComponent
						// passedRef={latRef.current}
						containerRef={containerRef.current}
						svgWidth={templateMeas.width}
						svgHeight={templateMeas.height}
						strokeXWidth="1.5px"
						strokeCrossWidth="2.5px"
						animationComp={animationComp}
						setAnimationComp={setAnimationComp}
						// roseMinRadius={50}
						// roseMaxRadius={100}
					/>
				</>
			) : (
				<>
					<motion.label
						id={`${labels[0]}-input`}
						htmlFor={`${labels[0]}-input`}
						className={styles[`${fieldName}-field`]}
					>
						{/* <span className={styles["label-text"]}>
						Search-Text-Label (Search For:):{" "}
						Search For:
					</span> */}
						{/* Animazione testo City / Country / State */}
						{/* La parola City esploderà in un numero di stelle
					corrispondenti ai punti di generazione di ogni carattere
					della parola, vedi esempio p5, da qui di ricomporrà nella successiva
					parola Country e così via? */}
						<motion.input
							id={`${fieldName}-input`}
							name={`${fieldName}-input`}
							ref={nameRef}
							// initial={{ translateX: "-200%" }}
							// animate={{ translateX: "0%" }}
							// exit={{ translateX: "-200%" }}
							value={data.search.text}
							// <--- sistemare naming ovunque e qui
							onChange={handleChange}
							// onChange={(event) => {
							// 	const value = event.target.value;
							// 	setFormData((prevData: FormData) => {
							// 		return { ...prevData, [fieldName]: value };
							// 	});
							// }}
							type="search"
							placeholder="Search for..."
							className={styles[`${labels[0]}-input`]}
							// onBlur={} gestire ritorno a zoom normale dopo inserimento
						/>
					</motion.label>
					<SvgMagnifierComponent
						passedRef={nameRef.current}
						svgWidth={templateMeas.width}
						svgHeight={templateMeas.height}
						glassRadius={templateMeas.radius / 2}
					/>
				</>
			)}
			{/* Inserire misure del field */}
		</motion.div>
	);
}

{
	/* <span className={styles["label-text"]}>Coordinates: </span>
				<label htmlFor="lat">
					<input
						id="lat"
						type="text"
						// min="-90.0000000"
						// max="90.0000000"
						// step="0.0000001"
						inputMode="numeric"
						placeholder="0"
						pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
						className={styles["coords-input"]}
					/>
				</label> */
}
