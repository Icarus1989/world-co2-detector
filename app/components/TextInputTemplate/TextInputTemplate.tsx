"use client";

import { useEffect, useRef, useState } from "react";
import SvgMagnifierComponent from "../SvgTemplate/SvgMagnifierComponent";
import SvgWindRoseComponent from "../SvgTemplate/SvgWindRoseComponent";
import styles from "./TextInputTemplate.module.css";

export default function TextInputTemplate({
	fieldName,
	labels
}: {
	fieldName: string;
	labels: string[]; //lat lon | name
}) {
	// const groupInputs = typeof inputTypes === "string" ? "single" : "double";
	// const containerWidth =

	const containerRef = useRef<HTMLInputElement | null>(null);

	const [templateMeas, setTemplateMeas] = useState({
		width: 0,
		height: 0,
		radius: 0
	});
	useEffect(() => {
		// console.log(containerRef.current?.clientWidth);
		const actualWidth = containerRef.current?.clientWidth || 0;
		const actualHeight = containerRef.current?.clientHeight || 0;
		const inputHeight = nameRef.current?.clientHeight || 0;
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

	const latRef = useRef<HTMLInputElement | null>(null);
	const lonRef = useRef<HTMLInputElement | null>(null);

	console.log(latRef, lonRef);
	console.log(containerRef);
	console.log(labels.length);

	return (
		<div
			ref={containerRef}
			id={`${fieldName}`}
			className={styles[`${fieldName}-field`]}
		>
			{labels.length > 1 ? (
				<>
					{/* <span className={styles["label-text"]}>Coords-Text-Label: </span> */}
					{labels.map((labelName) => {
						return (
							<label htmlFor={`${labelName}-input`}>
								<input
									id={labelName}
									type="text"
									// min="-90.0000000"
									// max="90.0000000"
									// step="0.0000001"
									value=""
									ref={labelName === "lat" ? latRef : lonRef}
									inputMode="numeric"
									placeholder={
										labelName === "lat" ? "Latitude..." : "Longitude..."
									}
									pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
									className={styles[`${fieldName}-input`]}
								/>
							</label>
						);
					})}
					<SvgWindRoseComponent
						passedRef={latRef.current}
						containerRef={containerRef.current}
						svgWidth={templateMeas.width}
						svgHeight={templateMeas.height}
						roseMinRadius={50}
						roseMaxRadius={100}
					/>
				</>
			) : (
				<>
					<label
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
						<input
							id={`${fieldName}-input`}
							name={`${fieldName}-input`}
							ref={nameRef}
							type="search"
							placeholder="Search for..."
							className={styles[`${labels[0]}-input`]}
							// onBlur={} gestire ritorno a zoom normale dopo inserimento
						/>
					</label>
					<SvgMagnifierComponent
						passedRef={nameRef.current}
						svgWidth={templateMeas.width}
						svgHeight={templateMeas.height}
						glassRadius={templateMeas.radius / 2}
					/>
				</>
			)}
			{/* Inserire misure del field */}
		</div>
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
