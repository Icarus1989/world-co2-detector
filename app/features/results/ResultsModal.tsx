"use client";

import {
	AirQualityActionResult,
	AirQualityDataset,
	ResultTab,
	ResultsModalProps
} from "@/app/utilities/types/types";
import { motion } from "framer-motion";

import styles from "./ResultsModal.module.css";
import ResultsMap from "./ResultsMap";
import { useTranslation } from "react-i18next";
import { useAppData } from "@/app/providers/AppDataProvider";
import { useEffect, useMemo, useState } from "react";
import ResultsTrendTab from "./ResultsTrendTab";

const tabs: ResultTab[] = ["overview", "pollutants", "trend", "sources"];

function formatSourceLabel(source?: string | null) {
	if (!source) {
		return "N/D";
	}

	if (source === "openmeteo") {
		return "Open-Meteo";
	}

	if (source === "openaq") {
		return "OpenAQ";
	}

	return source;
}

function formatDisplayDate(date: string) {
	const [year, month, day] = date.split("-");

	if (!year || !month || !day) {
		return date;
	}

	return `${day}-${month}-${year}`;
}

function formatSummaryValue(
	summary: { value: number | null; unit: string } | null
) {
	if (!summary || summary.value === null || summary.value === undefined) {
		return "N/D";
	}

	return `${summary.value.toFixed(2)} ${summary.unit}`;
}

export default function ResultsModal({
	target,
	onClose,
	getAirQualityDatasetAction,
	getSixMonthsAQTrendAction
}: ResultsModalProps) {
	const { t } = useTranslation();
	const { state, setActiveResultTab } = useAppData();

	const [airQualityResult, setAirQualityResult] =
		useState<AirQualityActionResult | null>(null);

	const [isLoadingAQ, setIsLoadingAQ] = useState<boolean>(false);

	const aqDataset: AirQualityDataset | null =
		airQualityResult?.ok === true ? airQualityResult.dataset : null;

	const coSummary = useMemo(() => {
		return (
			aqDataset?.summaries.find(
				(singleSummary) => singleSummary.code === "co"
			) ?? null
		);
	}, [aqDataset]);

	const pm25Summary = useMemo(() => {
		return (
			aqDataset?.summaries.find(
				(singleSummary) => singleSummary.code === "pm25"
			) ?? null
		);
	}, [aqDataset]);

	const pm10Summary = useMemo(() => {
		return (
			aqDataset?.summaries.find(
				(singleSummary) => singleSummary.code === "pm10"
			) ?? null
		);
	}, [aqDataset]);

	useEffect(() => {
		let isLoading = true;

		async function loadAirQualityData() {
			setIsLoadingAQ(true);
			setAirQualityResult(null);

			const res = await getAirQualityDatasetAction(target);

			if (!isLoading) {
				return;
			}

			setAirQualityResult(res);
			setIsLoadingAQ(false);
		}

		loadAirQualityData();

		return () => {
			isLoading = false;
		};
	}, [target]);

	return (
		<motion.section
			className={styles["backdrop"]}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			aria-label="Risultati emissioni CO"
		>
			<motion.div
				className={styles["modal"]}
				initial={{ opacity: 0, y: 48, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 48, scale: 0.96 }}
				transition={{ duration: 0.28, ease: "easeOut" }}
			>
				<ResultsMap target={target} />

				<div className={styles["header"]}>
					<div>
						<p className={styles["eyebrow"]}>Carbon Monoxide Analysis</p>
						<h2 className={styles["headerTitle"]}>{target.label}</h2>
					</div>

					<button
						type="button"
						className={styles["closeBtn"]}
						onClick={onClose}
					>
						{t("results.close")}
					</button>
				</div>

				<nav className={styles["tabs"]} aria-label="Results sections">
					{tabs.map((singleTab) => {
						const isActive = state.activeResultTab === singleTab;
						return (
							<button
								key={singleTab}
								type="button"
								className={isActive ? styles["activeTab"] : styles["tab"]}
								aria-selected={isActive}
								aria-current={isActive ? "page" : undefined}
								onClick={() => setActiveResultTab(singleTab)}
							>
								{t(`results.${singleTab}`)}
							</button>
						);
					})}
				</nav>

				<section className={styles["tabContent"]}>
					{state.activeResultTab === "overview" && (
						<>
							<section className={styles["mainCard"]}>
								<div
									style={{
										width: "100%",
										display: "grid",
										placeItems: "center"
									}}
								>
									<span className={styles["metricLabel"]}>
										{t("results.averageCo")}
									</span>
									<p className={styles["metricValue"]}>
										{isLoadingAQ
											? "..."
											: coSummary?.value !== null &&
											  coSummary?.value !== undefined
											? coSummary?.value.toFixed(2)
											: "-"}
									</p>
									<span className={styles["metricUnit"]}>
										{coSummary?.unit ?? "µg/m³"}
									</span>
								</div>

								<div className={styles["statusBadge"]}>
									{isLoadingAQ
										? t("common.loading")
										: aqDataset
										? t("results.liveData")
										: t("results.noData")}
								</div>
							</section>

							<section className={styles["infoGrid"]}>
								<article
									className={`${styles["infoCard"]} ${styles["compactCard"]}`}
								>
									<span className={styles["infoCardTitle"]}>
										{t("results.period")}
									</span>

									<p className={styles["infoCardText"]}>
										{formatDisplayDate(target.startDate)} &#8594;{" "}
										{formatDisplayDate(target.endDate)}
									</p>
								</article>

								<article
									className={`${styles["infoCard"]} ${styles["particlesCard"]}`}
								>
									<span className={styles["infoCardTitle"]}>
										Particolato medio
									</span>

									<div className={styles["inlineMetrics"]}>
										<div className={styles["miniMetric"]}>
											<span className={styles["miniMetricLabel"]}>PM2.5</span>
											<p className={styles["miniMetricText"]}>
												{formatSummaryValue(pm25Summary)}
											</p>
										</div>

										<div className={styles["miniMetric"]}>
											<span className={styles["miniMetricLabel"]}>PM10</span>
											<p className={styles["miniMetricText"]}>
												{formatSummaryValue(pm10Summary)}
											</p>
										</div>
									</div>
								</article>

								<article
									className={`${styles["infoCard"]} ${styles["sourceOverviewCard"]}`}
								>
									<span className={styles["infoCardTitle"]}>Fonte dati</span>

									<div className={styles["sourceRows"]}>
										<div className={styles["sourceRow"]}>
											<span className={styles["sourceLabel"]}>Primaria</span>
											<strong className={styles["sourceValue"]}>
												{formatSourceLabel(aqDataset?.primarySource)}
											</strong>
										</div>

										<div className={styles["sourceRow"]}>
											<span className={styles["sourceLabel"]}>Stazioni</span>
											<strong className={styles["sourceValue"]}>
												{aqDataset?.nearbyStations?.length
													? `${aqDataset.nearbyStations.length} vicine`
													: "N/D"}
											</strong>
										</div>
									</div>
								</article>
							</section>

							{isLoadingAQ && (
								<p className={styles["note"]}>
									Caricamento dati qualità aria...
								</p>
							)}

							{airQualityResult?.ok === false && (
								<p className={styles["errorNote"]}>{airQualityResult.error}</p>
							)}
						</>
					)}

					{state.activeResultTab === "pollutants" && (
						<section className={styles["tabPanel"]}>
							<h3 className={styles["tabTitle"]}>Inquinanti totali rilevati</h3>
							{isLoadingAQ && <p>Caricamento inquinanti...</p>}

							{!isLoadingAQ && aqDataset && (
								<div className={styles["pollutantGrid"]}>
									{aqDataset.summaries.map((singleSummary) => {
										return (
											<article
												key={singleSummary.code}
												className={styles["pollutantCard"]}
											>
												<span className={styles["pollutantCardText"]}>
													{singleSummary.label}
												</span>
												<p
													className={styles["topValue"]}
													style={{ fontWeight: 700 }}
												>
													{singleSummary.value !== null
														? `${singleSummary.value.toFixed(2)} ${
																singleSummary.unit
														  }`
														: "-"}
												</p>
												<p className={styles["bottomValue"]}>
													Min {singleSummary.min ?? "-"} • Max{" "}
													{singleSummary.max ?? "-"} •{" "}
													{singleSummary.sampleCount} campioni
												</p>
											</article>
										);
									})}
								</div>
							)}
						</section>
					)}

					{state.activeResultTab === "trend" && (
						<section className={styles["chartSection"]}>
							{state.activeResultTab === "trend" && (
								<ResultsTrendTab
									target={target}
									getSixMonthsAQTrendAction={getSixMonthsAQTrendAction}
								/>
							)}
						</section>
					)}

					{state.activeResultTab === "sources" && (
						<section className={styles["tabPanel"]}>
							<h3 className={styles["tabTitle"]}>Fonti dati</h3>

							<div className={styles["sourceList"]}>
								<article className={styles["sourceDescription"]}>
									<p className={styles["sourceTitle"]}>
										Open-Meteo Air Quality
									</p>
									<p className={styles["sourceText"]}>
										Fonte primaria per serie temporali.
									</p>
								</article>

								<article className={styles["sourceDescription"]}>
									<p className={styles["sourceTitle"]}>OpenAQ</p>
									<p className={styles["sourceText"]}>
										Fonte osservazionale da stazioni/sensori.
									</p>
								</article>
							</div>

							{aqDataset?.warnings.map((singleWarn) => (
								<p key={singleWarn} className={styles["note"]}>
									{singleWarn}
								</p>
							))}
						</section>
					)}
				</section>
			</motion.div>
		</motion.section>
	);
}
