import {
	SearchContainerProps,
	SearchTargetType
} from "@/app/utilities/types/types";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import MagnifierIcon from "@/app/components/SvgTemplates/SvgIcons/SvgMagnifierIcon";
import { useAppData } from "@/app/providers/AppDataProvider";
import SearchPanel from "./SearchPanel";
import styles from "./SearchContainer.module.css";

const openButtonVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.92
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.23,
			duration: 0.23
		}
	},
	exit: {
		opacity: 0,
		scale: 0.92,
		transition: {
			duration: 0.18
		}
	}
};

export default function SearchContainer({
	geocodePlaceAction,
	onSearchSubmit
}: SearchContainerProps) {
	const { state, openSearchOverlay, closeOverlay } = useAppData();

	// const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const isSearchOpen = state.activeOverlay === "search";
	const { t } = useTranslation();

	// function openSearchModal() {
	// 	setIsSearchOpen(() => {
	// 		return true;
	// 	});
	// }

	// function closeSearchModal() {
	// 	setIsSearchOpen(() => {
	// 		return false;
	// 	});
	// }

	function handleSearchModalSubmit(target: SearchTargetType) {
		onSearchSubmit(target);
		// closeSearchModal();
		closeOverlay();
	}

	return (
		<div className={styles["searchContainer"]}>
			<AnimatePresence mode="wait">
				{isSearchOpen ? (
					<SearchPanel
						key="search-panel"
						// onClose={closeSearchModal}
						onClose={closeOverlay}
						onSearchSubmit={handleSearchModalSubmit}
						geocodePlaceAction={geocodePlaceAction}
					/>
				) : (
					<motion.section
						key="open-search-button"
						className={styles["openBtnSection"]}
						variants={openButtonVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.button
							type="button"
							className={styles["openBtn"]}
							aria-label={t("search.open")}
							title={t("search.open")}
							whileTap={{ scale: 0.94 }}
							// onClick={openSearchModal}
							onClick={openSearchOverlay}
						>
							<MagnifierIcon />
						</motion.button>
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	);
}
