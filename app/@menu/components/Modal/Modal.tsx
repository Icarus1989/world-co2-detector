"use client";

import styles from "./Modal.module.css";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	console.log(children);

	const modalVariant: Variants = {
		animate: {
			// x: 0,
			// y: 0,
			// scaleX: 1,
			// scaleY: 1,
			opacity: 1,
			// position: "fixed",
			// bottom: "0dvh",
			// right: "7.5dvw",
			width: "100dvw",
			height: "100dvh",
			zIndex: "50",
			transformOrigin: "right",
			transition: {
				duration: 1,
				type: "spring",
				stiffness: 150,
				damping: 23,
				// x: {
				// 	stiffness: 1000,
				// 	velocity: -10
				// }
				// delayChildren: 0.1,
				staggerChildren: 0.3
				// delayChildren: 5
			}
		},
		hidden: {
			// x: 1000,
			// y: 1000,

			// scaleX: 0,
			// scaleY: 0.2,
			opacity: 0,
			width: "0dvw",
			height: "100dvh",
			// ATTENZIONE
			// bottom e right da indicare qui con coordinate
			// del link nel menu per originare l'animazione dal button
			// occorre context + provider o redux per salvare a click e
			// leggere qui + inserire nella height 0dvh qui sopra
			transformOrigin: "right",
			transition: {
				duration: 1,
				type: "spring",
				stiffness: 150,
				damping: 23,
				x: { stiffness: 1000, velocity: -100 }
				// delayChildren: 1.0,
				// staggerChildren: 2.0
				// staggerDirection: -0.2
			}
		}
	};
	return (
		<>
			<AnimatePresence>
				<motion.div
					className={styles["modal-container"]}
					variants={modalVariant}
					initial="hidden"
					animate="animate"
					exit="hidden"
				>
					<div className={styles["modal-view"]}>
						<p>Modal</p>
						<button
							onClick={() => {
								router.back();
							}}
						>
							Close modal
						</button>
						<div>{children}</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
