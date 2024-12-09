"use client";

import {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	ChangeEvent,
	ReactElement
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import TextInputTemplate from "../../TextInputTemplate/TextInputTemplate";

import WindRoseIcon from "../../SvgTemplates/SvgIcons/SvgWindRoseIcon";

import styles from "../SearchMenu.module.css";

import { SearchTextProps } from "@/app/utilities/types/types";

const btnVariants = {
	hidden: {
		scale: 0.8,
		opacity: 0,
		transition: {
			duration: 0.5,
			delay: 0
		}
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0
		}
	}
};

export default function SearchCoordsComponent(
	props: SearchTextProps
): ReactElement {
	// console.log("change coords");
	const [activeSection, setActiveSection] = useState(props.active);

	// type AnimatonStatus = {
	// 	status: "play" | "stop" | "reverse";
	// };

	// type AnimationMapping = {
	// 	search: {
	// 		mag: AnimatonStatus;
	// 	};
	// 	coords: {
	// 		lat: AnimatonStatus;
	// 		lon: AnimatonStatus;
	// 	};
	// 	date: {
	// 		start: AnimatonStatus;
	// 		end: AnimatonStatus;
	// 	};
	// };

	useEffect(() => {
		setActiveSection(props.active);
	}, [props.active]);

	// console.log(activeSection);

	const ref = useRef(null);

	return (
		<>
			{props.active ? (
				<TextInputTemplate
					fieldName="coords"
					labels={["lat", "lon"]}
					formData={props.formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) => {
						return props.handleChange(event);
					}}
					animationComp={props.animationComp}
					setAnimationComp={props.setAnimationComp}
				/>
			) : (
				<motion.button
					name="second"
					onClick={(event: MouseEvent<HTMLButtonElement>) => {
						props.handleClick(event);
					}}
					variants={btnVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className={styles["coords-btn"]}
				>
					<WindRoseIcon />
				</motion.button>
			)}
		</>
		// </MotionSectionComponent>
	);
}
