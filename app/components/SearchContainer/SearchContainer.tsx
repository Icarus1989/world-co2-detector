"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchMenu from "../SearchMenu/SearchMenu";
import { initialSettings } from "@/app/searchContext/SearchContext";

import { SearchProvider } from "@/app/searchContext/SearchContext";

import styles from "./SearchContainer.module.css";
import MagnifierIcon from "../SvgTemplates/SvgIcons/SvgMagnifierIcon";

export default function SearchContainer() {
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	function handleOpenMenu() {
		setOpenMenu((prevValue) => {
			return !prevValue;
		});
	}

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
				when: "beforeChildren",
				staggerChildren: 0.05,
				staggerDirection: 1
			}
		}
	};

	const sectionVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				duration: 0.23
			}
			// transition: { delay: 0 }
			// transition: { duration: 4, staggerChildren: 1, staggerDirection: -1 }
		},
		exit: {
			opacity: 0,
			transition: {
				delay: 0,
				duration: 0.23
			}
		}
	};

	return (
		<div className={styles["search-container"]}>
			<AnimatePresence>
				{openMenu ? (
					// <AnimatePresence>
					<SearchProvider
						details={initialSettings.details}
						animationHandling={initialSettings.animationHandling}
					>
						<SearchMenu key="menu" handleOpenMenu={handleOpenMenu} />
					</SearchProvider>
				) : (
					// </AnimatePresence>
					// <AnimatePresence>
					<motion.section
						className={styles["open-btn-section"]}
						key="open-btn-section"
						variants={sectionVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.button
							onClick={() => {
								setOpenMenu((prevValue) => {
									return !prevValue;
								});
							}}
							className={styles["open-btn"]}
						>
							<MagnifierIcon />
						</motion.button>
					</motion.section>
					// </AnimatePresence>
				)}
			</AnimatePresence>
		</div>
	);
}
