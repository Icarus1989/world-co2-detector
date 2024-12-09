"use client";

import {
	useState,
	useEffect,
	useRef,
	MouseEvent,
	ReactElement,
	ChangeEvent
} from "react";
import { AnimatePresence } from "framer-motion";

import DateInputComponent from "../../DateInputComponent/DateInputComponent";
import styles from "../SearchMenu.module.css";
import { motion } from "framer-motion";
import { SearchTextProps } from "@/app/utilities/types/types";

import CalendarIcon from "../../SvgTemplates/SvgIcons/SvgCalendarIcon";

export default function SearchDateComponent(
	props: SearchTextProps
): ReactElement {
	// console.log("change calendar");

	const [activeSection, setActiveSection] = useState(props.active);

	useEffect(() => {
		setActiveSection(props.active);
	}, [props.active]);

	// console.log(activeSection);

	const ref = useRef(null);

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

	return (
		<>
			{activeSection ? (
				<DateInputComponent
					formData={props.formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) =>
						props.handleChange(event)
					}
					animationComp={props.animationComp}
					setAnimationComp={props.setAnimationComp}
				/>
			) : (
				<motion.button
					name="third"
					onClick={(event: MouseEvent<HTMLButtonElement>) => {
						props.handleClick(event);
					}}
					variants={btnVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className={styles["calendar-btn"]}
				>
					<CalendarIcon
						containerWidth={32}
						containerHeight={32}
						strokeWidth="2px"
					/>
				</motion.button>
			)}
		</>
	);
}
