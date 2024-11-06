"use client";

import { useState } from "react";
import Link from "next/link";
import {
	motion,
	animate,
	Variants,
	AnimatePresence,
	delay,
	stagger
} from "framer-motion";
// import Menu from "@/app/@menu/page";

import styles from "./Navbar.module.css";

const variants = {
	open: {
		x: 0,
		// opacity: 1,
		transition: {
			duration: 2.3,
			x: {
				stiffness: 1000,
				velocity: -10
			},
			delayChildren: 0.1,
			staggerChildren: 0.3
			// delayChildren: 5
		}
	},
	closed: {
		x: +1000,
		// opacity: 0,
		transition: {
			duration: 2.3,
			x: { stiffness: 1000, velocity: -100 }
			// delayChildren: 1.0,
			// staggerChildren: 2.0
			// staggerDirection: -0.2
		}
	}
};

const liVariants = {
	open: {
		x: 0,
		// top: 23,
		opacity: 1,
		transition: {
			duration: 2.3,
			x: { stiffness: 1000, velocity: -100 },
			delay: stagger(2)
		}
	},
	closed: {
		x: 100,
		// y: 50,
		opacity: 0,
		transition: {
			duration: 2.3,
			x: { stiffness: 1000 },
			delay: stagger(2)
		}
	}
};

const itemVariants: Variants = {
	open: {
		opacity: 1,
		y: 0,
		x: 0,
		transition: { type: "spring", stiffness: 100, damping: 23 }
	},
	closed: {
		opacity: 0,
		y: 0,
		x: 500,
		transition: { duration: 0.5, staggerDirection: -1 }
	},
	tapItem: { scale: 1.05 },
	clicked: {
		position: "fixed",
		top: "-30dvh",
		left: "-7.5dvw",
		width: "95dvw",
		height: "90dvh",
		borderRadius: "35px",
		zIndex: "50",
		transition: {
			duration: 2,
			height: {
				stiffness: 100,
				damping: 23
			}
		}
	}
};

// export function Navbar({ modal }: { modal: React.ReactNode }) {
export function Navbar() {
	const [openMenu, setOpenMenu] = useState(false);
	// spostare in context o redux per poter accedere alla value
	// nel Component InteractiveText e farlo scomparire all'apertura
	// del menu

	console.log(openMenu);

	return (
		<nav className={styles["navbar"]}>
			<button
				className={styles["menu-btn"]}
				onClick={() => {
					setOpenMenu((prevValue) => {
						return !prevValue;
					});
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					width="16"
					height="16"
					style={{ fill: "white" }}
				>
					<path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
				</svg>
			</button>
			<AnimatePresence>
				{openMenu && (
					<motion.ul
						className={styles["menu-list"]}
						variants={variants}
						initial="closed"
						animate="open"
						exit="closed"
						// style={{ y: -1000 }}
					>
						<motion.li
							className={styles["menu-elem"]}
							id="about-li"
							variants={itemVariants}
							whileFocus={{ opacity: 0 }}
						>
							<motion.div className={styles["route-bkg"]} id="about-route-bkg">
								<Link
									href="/about"
									className={styles["menu-link"]}
									// onClick={(event) => {
									// 	animate(
									// 		"#about-route-bkg",
									// 		{
									// 			position: "fixed",
									// 			bottom: "0dvh",
									// 			right: "7.5dvw",
									// 			width: "95dvw",
									// 			height: "80dvh",
									// 			borderRadius: "35px",
									// 			zIndex: "50",
									// 			transformOrigin: "center"
									// 		},
									// 		{
									// 			type: "spring",
									// 			velocity: 2
									// 			// duration: 1
									// 			// height: {
									// 			// 	stiffness: 100,
									// 			// 	damping: 23
									// 			// }
									// 		}
									// 	);
									// }}
								>
									About
								</Link>
							</motion.div>
						</motion.li>
						<motion.li
							className={styles["menu-elem"]}
							id="saved-li"
							variants={itemVariants}
							whileFocus={{ opacity: 0 }}
						>
							<motion.div
								className={styles["route-bkg"]}
								// onTap={(event) => {
								// 	animate(
								// 		"#saved-li",
								// 		{
								// 			position: "fixed",
								// 			top: "-30dvh",
								// 			left: "-7.5dvw",
								// 			width: "95dvw",
								// 			height: "90dvh",
								// 			borderRadius: "35px",
								// 			zIndex: "50"
								// 		},
								// 		{
								// 			type: "spring",
								// 			duration: 2,
								// 			height: {
								// 				stiffness: 100,
								// 				damping: 23
								// 			}
								// 		}
								// 	);
								// }}
							>
								<Link href="/saved" className={styles["menu-link"]}>
									Saved
								</Link>
							</motion.div>
						</motion.li>
						<motion.li
							className={styles["menu-elem"]}
							id="settings-li"
							variants={itemVariants}
							whileFocus={{ opacity: 0 }}
						>
							<motion.div className={styles["route-bkg"]}>
								<Link href="/settings" className={styles["menu-link"]}>
									Settings
								</Link>
							</motion.div>
						</motion.li>
					</motion.ul>
				)}
				{/* {openMenu && menu} */}
			</AnimatePresence>
			{/* {about}
			{saved}
			{settings} */}
			{/* {menu} */}
		</nav>
	);
}
