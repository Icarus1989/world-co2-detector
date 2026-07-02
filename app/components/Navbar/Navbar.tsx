"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppDataProvider";

import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import styles from "./Navbar.module.css";
import { SettingsDialogType } from "@/app/utilities/types/types";

const panelVariants: Variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 23,
			staggerChildren: 0.08,
			delayChildren: 0.05
		}
	},
	closed: {
		y: 260,
		opacity: 0,
		transition: {
			duration: 0.23,
			staggerChildren: 0.04,
			staggerDirection: -1
		}
	}
};

const itemVariants: Variants = {
	open: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 130,
			damping: 22
		}
	},
	closed: {
		x: 80,
		opacity: 0,
		transition: {
			duration: 0.18
		}
	}
};

function CloseIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M6.4 5.1 12 10.7l5.6-5.6 1.3 1.3L13.3 12l5.6 5.6-1.3 1.3L12 13.3l-5.6 5.6-1.3-1.3 5.6-5.6-5.6-5.6 1.3-1.3Z" />
		</svg>
	);
}

function SettingsIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			{" "}
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.0002 8C9.79111 8 8.00024 9.79086 8.00024 12C8.00024 14.2091 9.79111 16 12.0002 16C14.2094 16 16.0002 14.2091 16.0002 12C16.0002 9.79086 14.2094 8 12.0002 8ZM10.0002 12C10.0002 10.8954 10.8957 10 12.0002 10C13.1048 10 14.0002 10.8954 14.0002 12C14.0002 13.1046 13.1048 14 12.0002 14C10.8957 14 10.0002 13.1046 10.0002 12Z"
				fill="#bed4eb63"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>{" "}
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.2867 0.5C9.88583 0.5 8.6461 1.46745 8.37171 2.85605L8.29264 3.25622C8.10489 4.20638 7.06195 4.83059 6.04511 4.48813L5.64825 4.35447C4.32246 3.90796 2.83873 4.42968 2.11836 5.63933L1.40492 6.83735C0.67773 8.05846 0.954349 9.60487 2.03927 10.5142L2.35714 10.7806C3.12939 11.4279 3.12939 12.5721 2.35714 13.2194L2.03927 13.4858C0.954349 14.3951 0.67773 15.9415 1.40492 17.1626L2.11833 18.3606C2.83872 19.5703 4.3225 20.092 5.64831 19.6455L6.04506 19.5118C7.06191 19.1693 8.1049 19.7935 8.29264 20.7437L8.37172 21.1439C8.6461 22.5325 9.88584 23.5 11.2867 23.5H12.7136C14.1146 23.5 15.3543 22.5325 15.6287 21.1438L15.7077 20.7438C15.8954 19.7936 16.9384 19.1693 17.9553 19.5118L18.3521 19.6455C19.6779 20.092 21.1617 19.5703 21.8821 18.3606L22.5955 17.1627C23.3227 15.9416 23.046 14.3951 21.9611 13.4858L21.6432 13.2194C20.8709 12.5722 20.8709 11.4278 21.6432 10.7806L21.9611 10.5142C23.046 9.60489 23.3227 8.05845 22.5955 6.83732L21.8821 5.63932C21.1617 4.42968 19.678 3.90795 18.3522 4.35444L17.9552 4.48814C16.9384 4.83059 15.8954 4.20634 15.7077 3.25617L15.6287 2.85616C15.3543 1.46751 14.1146 0.5 12.7136 0.5H11.2867ZM10.3338 3.24375C10.4149 2.83334 10.7983 2.5 11.2867 2.5H12.7136C13.2021 2.5 13.5855 2.83336 13.6666 3.24378L13.7456 3.64379C14.1791 5.83811 16.4909 7.09167 18.5935 6.38353L18.9905 6.24984C19.4495 6.09527 19.9394 6.28595 20.1637 6.66264L20.8771 7.86064C21.0946 8.22587 21.0208 8.69271 20.6764 8.98135L20.3586 9.24773C18.6325 10.6943 18.6325 13.3057 20.3586 14.7523L20.6764 15.0186C21.0208 15.3073 21.0946 15.7741 20.8771 16.1394L20.1637 17.3373C19.9394 17.714 19.4495 17.9047 18.9905 17.7501L18.5936 17.6164C16.4909 16.9082 14.1791 18.1618 13.7456 20.3562L13.6666 20.7562C13.5855 21.1666 13.2021 21.5 12.7136 21.5H11.2867C10.7983 21.5 10.4149 21.1667 10.3338 20.7562L10.2547 20.356C9.82113 18.1617 7.50931 16.9082 5.40665 17.6165L5.0099 17.7501C4.55092 17.9047 4.06104 17.714 3.83671 17.3373L3.1233 16.1393C2.9058 15.7741 2.97959 15.3073 3.32398 15.0186L3.64185 14.7522C5.36782 13.3056 5.36781 10.6944 3.64185 9.24779L3.32398 8.98137C2.97959 8.69273 2.9058 8.2259 3.1233 7.86067L3.83674 6.66266C4.06106 6.28596 4.55093 6.09528 5.0099 6.24986L5.40676 6.38352C7.50938 7.09166 9.82112 5.83819 10.2547 3.64392L10.3338 3.24375Z"
				fill="#bed4eb63"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LinkedinIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.34 8.02h4.32V23H.34V8.02ZM8.07 8.02h4.14v2.04h.06c.58-1.1 1.99-2.26 4.1-2.26 4.38 0 5.19 2.88 5.19 6.63V23h-4.32v-7.6c0-1.81-.03-4.14-2.52-4.14-2.53 0-2.92 1.98-2.92 4.01V23H8.07V8.02Z" />
		</svg>
	);
}

function GithubIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.88 10.88 0 0 1 12 6.08c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14v3.14c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
		</svg>
	);
}

export function Navbar() {
	const { state, openSettingsOverlay, closeOverlay } = useAppData();
	const openMenu = state.activeOverlay === "settings";
	const [activeDialog, setActiveDialog] = useState<SettingsDialogType>(null);

	const { t } = useTranslation();

	function openDialog(settingsDialog: SettingsDialogType) {
		setActiveDialog(settingsDialog);
	}

	function closeDialog() {
		setActiveDialog(null);
	}

	return (
		<nav className={styles["navbar"]} aria-label={t("settings.navigation")}>
			<button
				type="button"
				className={styles["settingsBtn"]}
				aria-label={openMenu ? t("settings.closeMenu") : t("settings.openMenu")}
				aria-expanded={openMenu}
				onClick={openMenu ? closeOverlay : openSettingsOverlay}
			>
				{!openMenu ? <SettingsIcon /> : <CloseIcon />}
			</button>

			<AnimatePresence>
				{openMenu && (
					<motion.section
						className={styles["settingsPanel"]}
						variants={panelVariants}
						initial="closed"
						animate="open"
						exit="closed"
						aria-label={t("settings.panelTitle")}
					>
						<div className={styles["gearWatermark"]} aria-hidden="true">
							⚙
						</div>

						<div className={styles["panelHeader"]}>
							<p className={styles["eyebrow"]}>
								World Carbon Monoxide Detector
							</p>
							<h2 className={styles["panelTitle"]}>{t("settings.title")}</h2>
						</div>

						<div className={styles["settingsActions"]}>
							<motion.button
								type="button"
								className={styles["settingsCard"]}
								variants={itemVariants}
								onClick={() => openDialog("about")}
							>
								<span>{t("settings.about")}</span>
								<small>{t("settings.aboutDescription")}</small>
							</motion.button>

							<motion.button
								type="button"
								className={styles["settingsCard"]}
								variants={itemVariants}
								onClick={() => openDialog("language")}
							>
								<span>{t("settings.language")}</span>
								<small>IT / EN / NL / DE</small>
							</motion.button>
						</div>
					</motion.section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{activeDialog && (
					<motion.div
						className={styles["dialogBackdrop"]}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.article
							className={styles["dialog"]}
							initial={{ opacity: 0, y: 24, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 24, scale: 0.96 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
						>
							<header className={styles["dialogHeader"]}>
								<h3>
									{activeDialog === "about"
										? t("settings.aboutDialogTitle")
										: t("settings.languageDialogTitle")}
								</h3>

								<button
									type="button"
									className={styles["dialogCloseBtn"]}
									aria-label={t("common.close")}
									onClick={closeDialog}
								>
									<CloseIcon />
								</button>
							</header>

							{activeDialog === "about" && (
								<div className={styles["dialogBody"]}>
									<p>{t("settings.aboutProjectText")}</p>

									<p>{t("settings.start2impactText")}</p>

									<div className={styles["contactGrid"]}>
										<a
											className={styles["contactBox"]}
											href="https://www.linkedin.com/in/alex-valente-018586156/"
											target="_blank"
											rel="noreferrer"
											aria-label="Open LinkedIn profile"
										>
											<strong>LinkedIn</strong>

											<span className={styles["contactIcon"]}>
												<LinkedinIcon />
											</span>
										</a>

										<a
											className={styles["contactBox"]}
											href="https://github.com/Icarus1989"
											target="_blank"
											rel="noreferrer"
											aria-label="Open GitHub profile"
										>
											<strong>GitHub</strong>

											<span className={styles["contactIcon"]}>
												<GithubIcon />
											</span>
										</a>
									</div>
								</div>
							)}

							{activeDialog === "language" && (
								<div className={styles["dialogBody"]}>
									<p>{t("settings.selectLanguage")}</p>
									<LanguageSwitcher />
								</div>
							)}
						</motion.article>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}

// pulito manca ultimo check
