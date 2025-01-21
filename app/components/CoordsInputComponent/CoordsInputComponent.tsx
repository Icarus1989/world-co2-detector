"use client";

import { motion } from "framer-motion";
import { useSearchData } from "@/app/searchContext/SearchContext";

import styles from "./CoordsInputComponent.module.css";

export default function CoordsInputComponent({
	labelName,
	labelTag,
	labelSymbol,
	handleChange
}: {
	labelName: string;
	labelTag: string; // degrees, minutes, seconds
	labelSymbol: string;
	handleChange: any;
}) {
	const { data } = useSearchData();

	function newHandleFocus() {
		// element[0].focus();
	}

	type InfoStructure = {
		placeholder: string;
		max?: string;
		min?: string;
	};

	function calcInfo(group: string, tag: string) {
		if (tag === "degrees") {
			if (group === "lat") {
				return {
					placeholder: "00",
					max: "90",
					min: "-90"
				};
			} else {
				return {
					placeholder: "000",
					max: "180",
					min: "0"
				};
			}
		} else if (tag === "minutes") {
			return {
				placeholder: "00",
				max: "59",
				min: "0"
			};
		} else if (tag === "seconds") {
			return {
				placeholder: "00.000",
				max: "59.999",
				min: "0"
			};
		} else if (tag === "dir") {
			if (group === "lat") {
				return {
					placeholder: "N"
				};
			} else {
				return {
					placeholder: "E"
				};
			}
		} else {
			return {
				placeholder: "-",
				max: "-",
				min: "-"
			};
		}
	}

	const inputInfo: InfoStructure = calcInfo(labelName, labelTag);

	return (
		<>
			{labelTag === "dir" ? (
				<motion.select
					initial={{ left: labelName === "lat" ? "-200%" : "200%" }}
					animate={{ left: "0%" }}
					exit={{ left: labelName === "lat" ? "-200%" : "200%" }}
					transition={{
						duration: 0.3,
						delay: 0.1,
						ease: "linear",
						staggerChildren: 0.1
					}}
					id={`${labelName}-${labelTag}`}
					name={`${labelName}-${labelTag}-select`}
					defaultValue={inputInfo.placeholder}
					className={styles[`${labelName}-${labelTag}-select`]}
					onChange={handleChange}
				>
					{labelName === "lat" ? (
						<>
							<option value="N">N</option>
							<option value="S">S</option>
						</>
					) : (
						<>
							<option value="E">E</option>
							<option value="W">W</option>
						</>
					)}
				</motion.select>
			) : (
				<motion.label
					initial={{ left: labelName === "lat" ? "-200%" : "200%" }}
					animate={{ left: "0%" }}
					exit={{ left: labelName === "lat" ? "-200%" : "200%" }}
					transition={{
						duration: 0.3,
						delay: 0.1,
						ease: "linear",
						staggerChildren: 0.1
					}}
					id={`${labelName}-${labelTag}`}
					key={`${labelName}-${labelTag}`}
					htmlFor={`${labelName}-${labelTag}-input`}
					className={styles[`${labelName}-${labelTag}-label`]}
				>
					<motion.input
						id={labelName}
						name={`${labelName}-${labelTag}-input`}
						type="number"
						// Controllare su real device che compaia la tastiera numerica non querty
						min={inputInfo.min}
						max={inputInfo.max}
						placeholder={inputInfo.placeholder}
						className={styles[`${labelName}-${labelTag}-input`]}
						// value={
						// 	data[labelName]["coords"][labelTag]
						// }
						onChange={handleChange}
					/>
					{labelSymbol}
				</motion.label>
			)}
		</>
	);
}
