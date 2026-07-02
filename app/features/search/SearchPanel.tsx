import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
	SearchFormStateType,
	SearchModeType,
	SearchPanelProps
} from "@/app/utilities/types/types";

import { createPlaceSearchTarget, resolveDemoPlace } from "./search.utils";
import { countryOptions, findCountryOptions } from "./searchConstants";

import styles from "./SearchPanel.module.css";

const initialFormState: SearchFormStateType = {
	mode: "place",
	place: "",
	countryCode: "IT",
	latitude: "",
	longitude: "",
	startDate: "2025-01-01",
	endDate: "2025-06-30"
};

export default function SearchPanel({
	onClose,
	onSearchSubmit,
	geocodePlaceAction
}: SearchPanelProps) {
	const [formState, setFormState] =
		useState<SearchFormStateType>(initialFormState);

	const [formError, setFormError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const { t, i18n } = useTranslation();

	const submitPermission = useMemo(() => {
		if (!formState.startDate || !formState.endDate) {
			return false;
		}

		if (formState.mode === "place") {
			return formState.place.trim().length >= 2;
		}

		if (formState.mode === "coordinates") {
			return (
				formState.latitude.trim() !== "" && formState.longitude.trim() !== ""
			);
		}

		if (formState.mode === "country") {
			return formState.countryCode.trim().length === 2;
		}

		return false;
	}, [formState]);

	function updateFormField(name: keyof SearchFormStateType, value: string) {
		setFormState((prevFormState) => {
			return { ...prevFormState, [name]: value };
		});
	}

	function setterFormMode(mode: SearchModeType) {
		setFormError(null);

		setFormState((prevFormState) => {
			return { ...prevFormState, mode: mode };
		});
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setFormError(null);
		setIsSubmitting(true);

		try {
			if (!submitPermission) {
				setFormError(t("search.incompleteFields"));
				return;
			}

			if (formState.mode === "place") {
				const selectedLanguage = i18n.language.startsWith("it") ? "it" : "en";

				const res = await geocodePlaceAction({
					query: formState.place,
					startDate: formState.startDate,
					endDate: formState.endDate,
					language: selectedLanguage
				});

				if (!res.ok) {
					const testPlace = resolveDemoPlace(formState.place);

					if (testPlace) {
						onSearchSubmit(
							createPlaceSearchTarget({
								place: testPlace,
								startDate: formState.startDate,
								endDate: formState.endDate
							})
						);

						return;
					}

					setFormError(res.error);
					return;
				}

				onSearchSubmit(res.target);
				return;
			}

			if (formState.mode === "coordinates") {
				const latitude = Number(formState.latitude);
				const longitude = Number(formState.longitude);

				if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
					setFormError(t("search.invalidLatitude"));
					return;
				}

				if (
					!Number.isFinite(longitude) ||
					longitude < -180 ||
					longitude > 180
				) {
					setFormError(t("search.invalidLongitude"));
					return;
				}

				onSearchSubmit({
					mode: "coordinates",
					label: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
					latitude: latitude,
					longitude: longitude,
					startDate: formState.startDate,
					endDate: formState.endDate
				});

				return;
			}

			if (formState.mode === "country") {
				const selectedCountry = findCountryOptions(formState.countryCode);

				if (!selectedCountry) {
					setFormError(t("search.incompleteFields"));
					return;
				}

				onSearchSubmit({
					mode: "country",
					label: selectedCountry.labelKey,
					countryCode: selectedCountry.code,
					latitude: selectedCountry.latitude,
					longitude: selectedCountry.longitude,
					startDate: formState.startDate,
					endDate: formState.endDate
				});
			}
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Errore durante la ricerca. Riprova tra qualche secnodo.";

			setFormError(message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<motion.form
			id="panelForm"
			className={styles["panel"]}
			initial={{ opacity: 0, y: 32, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 32, scale: 0.96 }}
			transition={{ duration: 0.23, ease: "easeOut" }}
			onSubmit={handleSubmit}
		>
			<div className={styles["header"]}>
				<div>
					<p className={styles["eyebrow"]}>World Carbon mOnoxide Detector</p>
					<h2 className={styles["headerTitle"]}>{t("search.title")}</h2>
				</div>
				<button type="button" className={styles["closeBtn"]} onClick={onClose}>
					{t("common.close")}
				</button>
			</div>

			<div
				className={styles["tabs"]}
				role="tablist"
				aria-label="Tipo di ricerca"
			>
				<button
					type="button"
					className={
						formState.mode === "place" ? styles["activeTab"] : styles["tab"]
					}
					onClick={() => setterFormMode("place")}
				>
					{t("search.place")}
				</button>

				<button
					type="button"
					className={
						formState.mode === "coordinates"
							? styles["activeTab"]
							: styles["tab"]
					}
					onClick={() => {
						setterFormMode("coordinates");
					}}
				>
					{t("search.coordinates")}
				</button>

				<button
					type="button"
					className={
						formState.mode === "country" ? styles["activeTab"] : styles["tab"]
					}
					onClick={() => {
						setterFormMode("country");
					}}
				>
					{t("search.country")}
				</button>
			</div>

			<section className={styles["fields"]}>
				{formState.mode === "place" && (
					<label className={styles["field"]}>
						<span>{t("search.place")}</span>
						<input
							type="text"
							value={formState.place}
							placeholder={t("search.placePlaceholder")}
							onChange={(event) => {
								return updateFormField("place", event.target.value);
							}}
						/>
					</label>
				)}

				{formState.mode === "coordinates" && (
					<div className={styles["grid"]}>
						<label className={styles["field"]}>
							<span>{t("search.latitude")}</span>
							<input
								type="number"
								step="any"
								value={formState.latitude}
								placeholder="45.4408"
								onChange={(event) => {
									return updateFormField("latitude", event.target.value);
								}}
							/>
						</label>

						<label className={styles["field"]}>
							<span>{t("search.longitude")}</span>
							<input
								type="number"
								step="any"
								value={formState.longitude}
								placeholder="12.3155"
								onChange={(event) =>
									updateFormField("longitude", event.target.value)
								}
							/>
						</label>
					</div>
				)}

				{formState.mode === "country" && (
					<label className={styles.field}>
						<span>{t("search.country")}</span>
						<select
							value={formState.countryCode}
							onChange={(event) =>
								updateFormField("countryCode", event.target.value)
							}
						>
							{countryOptions.map((singleCountry) => (
								<option
									key={`${singleCountry.code}`}
									value={singleCountry.code}
								>
									{t(singleCountry.labelKey)}
								</option>
							))}
						</select>
					</label>
				)}

				<div className={styles["grid"]}>
					<label className={styles["field"]}>
						<span>{t("search.startDate")}</span>

						<input
							type="date"
							name="startDate"
							value={formState.startDate}
							max={formState.endDate}
							onChange={(event) => {
								updateFormField("startDate", event.target.value);
							}}
						/>
					</label>

					<label className={styles["field"]}>
						<span>{t("search.endDate")}</span>
						<input
							type="date"
							name="endDate"
							value={formState.endDate}
							min={formState.startDate}
							onChange={(event) => {
								return updateFormField("endDate", event.target.value);
							}}
						/>
					</label>
				</div>
			</section>

			{formError && <p className={styles["error"]}>{formError}</p>}

			<button
				type="submit"
				className={styles["submitBtn"]}
				disabled={!submitPermission || isSubmitting}
			>
				{isSubmitting ? t("search.submitting") : t("search.submit")}
			</button>
		</motion.form>
	);
}
