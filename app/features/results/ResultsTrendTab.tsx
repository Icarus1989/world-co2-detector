import {
	AirQualityTrendPoint,
	PollutCode,
	ResultsTrendTabProps,
	SixMonthsActionResult
} from "@/app/utilities/types/types";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ResultsTrendTab.module.css";

const pollutOptions: Array<{ code: PollutCode; label: string }> = [
	{ code: "co", label: "CO" },
	{ code: "pm25", label: "PM2.5" },
	{ code: "pm10", label: "PM10" },
	{ code: "no2", label: "NO₂" },
	{ code: "o3", label: "O₃" },
	{ code: "so2", label: "SO₂" }
];

function getPointValue(point: AirQualityTrendPoint, pollut: PollutCode) {
	return point[pollut];
}

function formatDateLabel(date: string, language: string) {
	const localLanguage = language.startsWith("it") ? "it-IT" : "en-US";
	const monthDate = new Date(`${date.slice(0, 7)}-15T12:00:00`);

	return monthDate.toLocaleDateString(localLanguage, {
		month: "short"
	});
}

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

export default function ResultsTrendTab({
	target,
	getSixMonthsAQTrendAction
}: ResultsTrendTabProps) {
	const [selectedPollut, setSelectedPollut] = useState<PollutCode>("co");
	const [monthsResult, setMonthsResult] =
		useState<SixMonthsActionResult | null>(null);
	const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

	const { t, i18n } = useTranslation();

	useEffect(() => {
		let isMounted = true;

		async function loadTrend() {
			setIsTabLoading(true);
			setMonthsResult(null);

			try {
				const actionResult = await getSixMonthsAQTrendAction(target);

				if (!isMounted) {
					return;
				}

				setMonthsResult(actionResult);
			} catch (error) {
				console.log(error);
			} finally {
				if (isMounted) {
					setIsTabLoading(false);
				}
			}
		}

		loadTrend();

		return () => {
			isMounted = false;
		};
	}, [target, getSixMonthsAQTrendAction]);

	const chartPoints = useMemo(() => {
		if (!monthsResult?.ok) {
			return [];
		}

		return monthsResult.trend.slice(-6);
	}, [monthsResult]);

	const maxValue = useMemo(() => {
		const allValues = chartPoints
			.map((singlePoint) => {
				return getPointValue(singlePoint, selectedPollut);
			})
			.filter(
				(singleValue): singleValue is number => typeof singleValue === "number"
			);

		if (allValues.length === 0) {
			return 1;
		}

		return Math.max(...allValues, 1);
	}, [chartPoints, selectedPollut]);

	return (
		<section className={styles["container"]}>
			<header className={styles["header"]}>
				<div className={styles["headerText"]}>
					<h3 className={styles["tabTitle"]}>{t("results.sixMonthsTrend")}</h3>

					{monthsResult?.ok && (
						<p className={styles["metaText"]}>
							{monthsResult.startDate} &#8594; {monthsResult.endDate} •{" "}
							{t("common.source")} {formatSourceLabel(monthsResult.source)}
						</p>
					)}
				</div>
			</header>

			<div className={styles["selector"]} aria-label="Seleziona inquinante">
				{pollutOptions.map((singleOpt) => {
					const isActive = selectedPollut === singleOpt.code;

					return (
						<button
							key={singleOpt.code}
							type="button"
							className={
								isActive ? styles["activePollut"] : styles["pollutBtn"]
							}
							aria-pressed={isActive}
							onClick={() => setSelectedPollut(singleOpt.code)}
						>
							{singleOpt.label}
						</button>
					);
				})}
			</div>

			{isTabLoading && (
				<div className={styles["stateBox"]}>
					<p>{t("common.loading")}</p>
				</div>
			)}

			{monthsResult?.ok === false && (
				<div className={styles["errorBox"]}>
					<p>{monthsResult.error}</p>
				</div>
			)}

			{monthsResult?.ok && chartPoints.length === 0 && (
				<div className={styles["stateBox"]}>
					<p>{t("common.noData")}</p>
				</div>
			)}

			{monthsResult?.ok && chartPoints.length > 0 && (
				<div className={styles["chart"]} aria-label="Grafico qualità aria">
					{chartPoints.map((singlePoint) => {
						const singleValue = getPointValue(singlePoint, selectedPollut);

						const height =
							typeof singleValue === "number"
								? `${Math.max((singleValue / maxValue) * 100, 6)}%`
								: "0%";

						return (
							<div
								key={`${singlePoint.date}-${selectedPollut}`}
								className={styles["chartItem"]}
							>
								<div className={styles["barTrack"]}>
									<div
										className={
											typeof singleValue === "number"
												? styles["bar"]
												: `${styles["bar"]} ${styles["emptyBar"]}`
										}
										style={{ height: height }}
									/>
								</div>

								<span className={styles["dateLabel"]}>
									{formatDateLabel(singlePoint.date, i18n.language)}
								</span>

								<p className={styles["dateValue"]}>
									{typeof singleValue === "number"
										? singleValue.toFixed(1)
										: "-"}
								</p>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
