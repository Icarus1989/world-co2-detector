"use client";

// type ActiveSearch = {
// 	first: boolean;
// 	second: boolean;
// 	third: boolean;
// };
import type {
	ActiveSearch,
	SearchTextProps
} from "@/app/utilities/types/types";

import {
	Dispatch,
	SetStateAction,
	ReactNode,
	useState,
	useEffect,
	useRef,
	MouseEventHandler,
	MouseEvent,
	ChangeEvent,
	ReactElement
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import TextInputTemplate from "../../TextInputTemplate/TextInputTemplate";
import MagnifierIcon from "../../SvgTemplates/SvgIcons/SvgMagnifierIcon";

import styles from "../SearchMenu.module.css";

import { FormData } from "@/app/utilities/types/types";

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

export default function SearchTextComponent(
	props: SearchTextProps
): ReactElement {
	// console.log("change search");
	const [activeSection, setActiveSection] = useState(props.active);

	useEffect(() => {
		setActiveSection(props.active);
	}, [props.active]);

	// console.log(activeSection);

	const ref = useRef(null);

	return (
		// <AnimatePresence>
		<>
			{props.active ? (
				<TextInputTemplate
					fieldName="search"
					labels={["search"]}
					formData={props.formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) => {
						return props.handleChange(event);
					}}
					handleSubmit={(event: ChangeEvent<HTMLInputElement>) => {
						return props.handleSubmit(event);
					}}
					animationComp={props.animationComp}
					setAnimationComp={props.setAnimationComp}
				/>
			) : (
				<motion.button
					name="first"
					onClick={props.handleClick}
					variants={btnVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className={styles["search-btn"]}
				>
					<MagnifierIcon />
				</motion.button>
			)}
		</>
		// </AnimatePresence>
	);
}
