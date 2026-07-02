import { useTranslation } from "react-i18next";

import styles from "./LanguageSwitcher.module.css";

const languagesOpts = [
	{ code: "it", label: "IT" },
	{ code: "en", label: "EN" },
	{ code: "nl", label: "NL" },
	{ code: "de", label: "DE" }
] as const;

export function LanguageSwitcher() {
	const { i18n } = useTranslation();

	async function changeLanguage(language: "it" | "en" | "nl" | "de") {
		await i18n.changeLanguage(language);
	}

	return (
		<div className={styles["switcher"]} aria-label="Language selector">
			{languagesOpts.map((singleLanguage) => {
				const isActive = i18n.language.startsWith(singleLanguage.code);
				return (
					<button
						key={singleLanguage.code}
						type="button"
						className={
							i18n.language.startsWith(singleLanguage.code)
								? styles["activeBtn"]
								: styles["btn"]
						}
						aria-pressed={isActive}
						onClick={() => changeLanguage(singleLanguage.code)}
					>
						{singleLanguage.label}
					</button>
				);
			})}
		</div>
	);
}

// pulito ultimo check
