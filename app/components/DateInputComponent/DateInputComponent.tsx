"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import SvgCalendarComponent from "../SvgTemplates/SvgComponents/SvgCalendarComponent";
import styles from "./DateInputComponent.module.css";

import { motion } from "framer-motion";
import { FormData, AnimationMapping } from "@/app/utilities/types/types";

export default function DateInputComponent({
	formData,
	handleChange,
	animationComp,
	setAnimationComp
}: {
	formData: FormData;
	handleChange: any;
	animationComp: AnimationMapping;
	setAnimationComp: Dispatch<SetStateAction<AnimationMapping>>;
}) {
	const beginRef = useRef<HTMLLabelElement | null>(null);
	const endRef = useRef<HTMLLabelElement | null>(null);

	const [containerMeas, setContainerMeas] = useState({
		beginLabel: {
			width: 0,
			height: 0
		},
		endLabel: {
			width: 0,
			height: 0
		}
	});
	useEffect(() => {
		// console.log(containerRef.current?.clientWidth);
		const beginLabelWidth = beginRef.current?.clientWidth || 0;
		const beginLabelHeight = beginRef.current?.clientHeight || 0;
		const endLabelWidth = endRef.current?.clientWidth || 0;
		const endLabelHeight = endRef.current?.clientHeight || 0;
		// const inputHeight = nameRef.current?.clientHeight || 0;
		// const container = containerRef.current.getBoundingClientRect();
		setContainerMeas((prevValue) => {
			return {
				...prevValue,
				beginLabel: {
					...prevValue.beginLabel,
					width: beginLabelWidth,
					height: beginLabelHeight
				},
				endLabel: {
					...prevValue.endLabel,
					width: endLabelWidth,
					height: endLabelHeight
				}
			};
		});
	}, []);

	// console.log("measures: ");
	// console.log(containerMeas.beginLabel);
	// console.log(containerMeas.endLabel);

	const spanRef = beginRef.current?.querySelector("span");
	console.log(spanRef);

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
			// transition={{ staggerChildren: 0.2 }}
			className={styles["time-field"]}
		>
			<motion.label
				htmlFor="begin-date"
				className={styles["time-label"]}
				ref={beginRef}
			>
				<span className={styles["label-text"]}>From:</span>
				<motion.input
					initial={{ rotateX: "-360deg" }}
					animate={{ rotateX: "0deg", transition: { duration: 0.5 } }}
					exit={{ rotateX: "-360deg" }}
					style={{ transformOrigin: "top" }}
					type="month"
					id="begin-date"
					value={formData.begin}
					// placeholder="2023-10"
					name="begin-date"
					// placeholder="--/--/----"
					// inputMode="numeric"
					min="1990-01"
					max="2024-11"
					// pattern="mm-yyyy"
					pattern="yyyy-mm"
					onChange={handleChange}
					onFocus={(event) => {
						event.preventDefault();
						event.target.showPicker();
					}}
					// onBlur={(event) => {
					// 	return event.target.
					// }}
					// max="2024-10-23"
					className={styles["time-input"]}
				/>
				<SvgCalendarComponent
					labelElement={beginRef.current}
					svgWidth={containerMeas.beginLabel.width}
					svgHeight={containerMeas.beginLabel.height}
					percentage={20.3}
				/>
			</motion.label>
			{/* Creare Component Svg con disegno calendario da 
				combinare a questi due input */}
			<motion.label
				htmlFor="end-date"
				className={styles["time-label"]}
				ref={endRef}
			>
				<span className={styles["label-text"]}>To:</span>
				<motion.input
					initial={{ rotateX: "-360deg" }}
					animate={{
						rotateX: "0deg",
						transition: { duration: 0.5, delay: 0.1 }
					}}
					exit={{ rotateX: "-360deg" }}
					style={{ transformOrigin: "top" }}
					type="month"
					id="end-date"
					value={formData.end}
					name="end-date"
					// inputMode="numeric"
					// placeholder="--/--/----"
					min="1990-01"
					max="2024-11"
					pattern="yyyy-mm"
					onChange={handleChange}
					onFocus={(event) => {
						event.preventDefault();
						event.target.showPicker();
					}}
					// onBlur={(event) => {
					// 	return event.target.
					// }}
					// pattern="mm-yyyy"
					className={styles["time-input"]}
				/>
				<SvgCalendarComponent
					labelElement={endRef.current}
					svgWidth={containerMeas.endLabel.width}
					svgHeight={containerMeas.endLabel.height}
					percentage={20.3}
				/>
			</motion.label>
		</motion.div>
	);
}
