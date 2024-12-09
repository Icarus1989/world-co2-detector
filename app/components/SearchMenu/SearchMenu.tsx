"use client";

import {
	Fragment,
	useState,
	useEffect,
	useRef,
	ComponentProps,
	ReactNode,
	Dispatch,
	SetStateAction,
	SelectHTMLAttributes,
	MouseEvent,
	MouseEventHandler,
	JSX,
	ReactElement,
	JSXElementConstructor,
	ChangeEvent
} from "react";
import TextInputTemplate from "../TextInputTemplate/TextInputTemplate";
import DateInputComponent from "../DateInputComponent/DateInputComponent";
import styles from "./SearchMenu.module.css";
import SvgMagnifierComponent from "../SvgTemplates/SvgComponents/SvgMagnifierComponent";
import PathMagnifier from "../SvgTemplates/PathComponents/PathMagnifierBottom";
import MagnifierIcon from "../SvgTemplates/SvgIcons/SvgMagnifierIcon";
import CloseIcon from "../SvgTemplates/SvgIcons/SvgCloseIcon";

import SearchTextComponent from "./SearchText/SearchTextComponent";
import SearchCoordsComponent from "./SearchCoords/SearchCoordsComponent";
import SearchDateComponent from "./SearchDate/SearchDateComponent";

import { motion, AnimatePresence, delay, usePresence } from "framer-motion";
import WindRoseIcon from "../SvgTemplates/SvgIcons/SvgWindRoseIcon";

import type { FormData, AnimationMapping } from "@/app/utilities/types/types";

type ActiveSearch = {
	first: boolean;
	second: boolean;
	third: boolean;
};

const formVariants = {
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
			duration: 0.23,
			staggerChildren: 0.1,
			staggerDirection: 1
		}
	},
	visible: {
		// scale: 1,
		opacity: 1,
		transition: {
			delay: 0,
			duration: 0.23,
			when: "beforeChildren",
			staggerChildren: 0.1,
			staggerDirection: -1
		}
	},
	exit: {
		// scale: 0.9,
		opacity: 0,
		transition: {
			delay: 0,
			duration: 0.23,
			when: "afterChildren",
			staggerChildren: 0.1,
			staggerDirection: 1
		}
	}
};

const sectionVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1
		// transition: { delay: 0 }
	},
	exit: {
		opacity: 0
		// transition: { duration: 4, staggerChildren: 1, staggerDirection: -1 }
	}
};

export default function SearchMenu({
	handleOpenMenu
}: {
	handleOpenMenu: any;
}) {
	const [activeBtn, setActiveBtn] = useState<ActiveSearch>({
		first: true,
		second: false,
		third: false
	});

	// esportare in file a se state per types --->

	// type FormData = {
	// 	name: string;
	// 	lat: string;
	// 	lon: string;
	// 	begin: string;
	// 	end: string;
	// };

	// import type { FormData } from "@/app/utilities/types/types";

	const [formData, setFormData] = useState<FormData>({
		name: "",
		lat: "",
		lon: "",
		begin: "2023-10",
		end: "2024-10"
	});

	const [animationComp, setAnimationComp] = useState<AnimationMapping>({
		search: {
			mag: { status: "stop" }
		},
		coords: {
			lat: { status: "stop" },
			lon: { status: "stop" }
		},
		date: {
			begin: { status: "stop" },
			end: { status: "stop" }
		}
	});

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const name = event.target.name.split("-")[0];
		const value = event.target.value;
		// console.log(name);
		// console.log(value);
		if (value.length > 0) {
			setFormData((prevData) => {
				return { ...prevData, [name]: value };
			});
		} else {
			return;
		}
	}

	const [sections, setSections] = useState<ReactElement[]>([
		<CloseSectionComponent
			id="close"
			key="close"
			active={false}
			// activeBtn={activeBtn}
			handleClick={handleOpenMenu}
			// setActiveBtn={setActiveBtn}
		/>,
		<SearchDateComponent
			id="date"
			key="date"
			active={activeBtn.third}
			activeBtn={activeBtn}
			handleClick={handleClick}
			setActiveBtn={setActiveBtn}
			formData={formData}
			handleChange={(event: ChangeEvent<HTMLInputElement>) =>
				handleChange(event)
			}
			animationComp={animationComp}
			setAnimationComp={setAnimationComp}
		/>,
		<SearchCoordsComponent
			id="coords"
			key="coords"
			active={activeBtn.second}
			activeBtn={activeBtn}
			handleClick={handleClick}
			setActiveBtn={setActiveBtn}
			formData={formData}
			handleChange={(event: ChangeEvent<HTMLInputElement>) =>
				handleChange(event)
			}
			animationComp={animationComp}
			setAnimationComp={setAnimationComp}
		/>,
		<SearchTextComponent
			id="search"
			key="search"
			active={activeBtn.first}
			activeBtn={activeBtn}
			handleClick={handleClick}
			setActiveBtn={setActiveBtn}
			formData={formData}
			handleChange={(event: ChangeEvent<HTMLInputElement>) =>
				handleChange(event)
			}
			animationComp={animationComp}
			setAnimationComp={setAnimationComp}
			// setSections={setSections}
		/>
	]);

	// const [isPresent, safeToRemove] = usePresence();

	function handleClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
		// console.log(event.target);
		// const btnName: string = target.name;
		// const btns = Array.from(Object.keys(activeBtn));
		// const [disabledOne, disabledTwo] = btns.filter((elem) => elem !== btnName);
		// setActiveBtn((prevValue) => {
		// 	return {
		// 		...prevValue,
		// 		[btnName]: true,
		// 		[disabledOne]: false,
		// 		[disabledTwo]: false
		// 	};
		// });

		const btn: HTMLButtonElement | null =
			event.currentTarget.closest("button") || null;
		const btnName: string = btn?.name || "";

		const btns = Array.from(Object.keys(activeBtn));
		const [disabledOne, disabledTwo] = btns.filter((elem) => elem !== btnName);
		setActiveBtn((prevValue) => {
			if (btn?.name) {
				return {
					...prevValue,
					[btnName]: true,
					[disabledOne]: false,
					[disabledTwo]: false
				};
			}
			return { ...prevValue };
		});
		// setActiveBtn
		// setSections((prevSections: ReactNode[]) => {
		// 	// const activeSection = prevSections.filter((elem: ReactNode) => {
		// 	// 	console.log(elem);
		// 	// 	if (elem) {
		// 	// 		return elem["props"];
		// 	// 	}
		// 	// });
		// 	// const activeSection: ReactNode = prevSections.filter((elem) => {
		// 	// 	return elem;
		// 	// })

		// 	console.log("prevSections");
		// 	console.log(prevSections);
		// 	console.log("sections");
		// 	console.log(sections);

		// 	console.log("activeSection");

		// 	// console.log(activeELement);

		// 	// console.log(activeSection);
		// 	// return []
		// 	return [...prevSections];
		// });

		// console.log(
		// 	sections.filter((elem: React.ReactNode) => {
		// 		const props: React.ComponentProps<HTMLElement> = elem.props;
		// 		// elem?.props;
		// 		console.log(elem?.props);
		// 		return elem?.props?.active;
		// 	})
		// );
	}

	useEffect(() => {
		setSections(() => {
			const baseArr: ReactElement[] = [
				<CloseSectionComponent
					id="close"
					key="close"
					active={false}
					handleClick={handleOpenMenu}
				/>,
				<SearchDateComponent
					id="date"
					key="date"
					active={activeBtn.third}
					activeBtn={activeBtn}
					handleClick={handleClick}
					setActiveBtn={setActiveBtn}
					formData={formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) =>
						handleChange(event)
					}
					animationComp={animationComp}
					setAnimationComp={setAnimationComp}
				/>,
				<SearchCoordsComponent
					id="coords"
					key="coords"
					active={activeBtn.second}
					activeBtn={activeBtn}
					handleClick={handleClick}
					setActiveBtn={setActiveBtn}
					formData={formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) =>
						handleChange(event)
					}
					animationComp={animationComp}
					setAnimationComp={setAnimationComp}
				/>,
				<SearchTextComponent
					id="search"
					key="search"
					active={activeBtn.first}
					activeBtn={activeBtn}
					handleClick={handleClick}
					setActiveBtn={setActiveBtn}
					formData={formData}
					handleChange={(event: ChangeEvent<HTMLInputElement>) =>
						handleChange(event)
					}
					animationComp={animationComp}
					setAnimationComp={setAnimationComp}
					// setSections={setSections}
				/>
			];
			const enabledElem:
				| ReactElement<any, string | JSXElementConstructor<any>>
				| undefined = baseArr.find((elem: ReactElement) => {
				return elem.props.active;
			});
			const disabledArr: ReactElement[] = baseArr.filter((elem, index) => {
				const activeElem: boolean = elem?.props.active;
				return index !== 0 && !activeElem;
			});
			const updatedArr: ReactElement[] = [baseArr[0], ...disabledArr];
			if (enabledElem) {
				updatedArr.push(enabledElem);
				// console.log(updatedArr);
				return updatedArr;
			}
			return baseArr;
		});
		console.log("sections update");
	}, [activeBtn.first, activeBtn.second, activeBtn.third, formData]);

	// console.log(formData);

	// useEffect(() => {
	// 	console.log("change present");
	// 	!isPresent && setTimeout(safeToRemove, 500);
	// }, [isPresent]);

	return (
		// <AnimatePresence>
		<motion.ul
			className={styles["form-container"]}
			key="menu"
			variants={formVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			{sections.map((elem: ReactElement) => {
				// console.log(elem);

				// if (!elem) {
				// 	return <></>;
				// } else {
				// ricavare id da elem per key
				return (
					<motion.li
						key={`key${elem.props.id}`}
						className={styles["list-elem"]}
						// exit={{
						// 	opacity: 0,
						// 	transition: {
						// 		when: "beforeChildren",
						// 		duration: 2.3,
						// 		staggerChildren: 0.1,
						// 		staggerDirection: 1
						// 	}
						// }}
					>
						<MotionSectionComponent id={`sec${elem.props.id}`}>
							{elem}
						</MotionSectionComponent>
					</motion.li>
				);
				// }

				// const actualElem = Object.entries(elem);
			})}
		</motion.ul>
		// </AnimatePresence>
	);
}

function MotionSectionComponent({
	children,
	id
}: // id
// active,
// handleClick
{
	children: ReactNode;
	id: string;
	// active: boolean;
	// handleClick: any;
}): ReactElement {
	const sectionRef = useRef<HTMLDivElement>(null);

	const [isPresent, safeToRemove] = usePresence();

	useEffect(() => {
		!isPresent && setTimeout(safeToRemove, 230);
	}, [isPresent]);
	return (
		<AnimatePresence>
			<motion.div
				key={`${id}`}
				// id={id}
				className={styles["menu-section"]}
				variants={sectionVariants}
				ref={sectionRef}
				// initial="hidden"
				// animate="visible"
				// exit="hidden"
				// exit={{
				// 	opacity: 0,
				// 	transition: {
				// 		when: "beforeChildren",
				// 		duration: 0.4,
				// 		staggerChildren: 0.1,
				// 		staggerDirection: 1
				// 	}
				// }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

function CloseSectionComponent({
	id,
	active,
	handleClick
}: {
	id: string;
	active: boolean;
	handleClick: any;
}): ReactElement {
	// const [measures, setMeasures] = useState({
	// 	width: 0,
	// 	height: 0
	// })
	return (
		<>
			{/* <AnimatePresence> */}
			<motion.button
				id={`${id}`}
				onClick={() => {
					handleClick();
				}}
				className={styles["close-btn"]}
			>
				<CloseIcon containerWidth={32} containerHeight={32} strokeWidth="6px" />
			</motion.button>
			{/* </AnimatePresence> */}
		</>
	);
}
