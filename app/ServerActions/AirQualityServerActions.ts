"use server";

import {
	AirQualityActionResult,
	AirQualityDataset,
	AirQualityTrendPoint,
	GlobeCoordinates,
	OpenAqLastRead,
	OpenAqLocationDetails,
	OpenAqNearbyStation,
	OpenAqSensor,
	PollutCode,
	PollutSummary,
	SearchTargetType,
	SensorSelection,
	SixMonthsActionResult
} from "../utilities/types/types";
import { openAqClient } from "../lib/connections/axiosClient";
import { mapOpenMeteoResponseToDataset } from "../features/pollution/pollutionMappers";

const openMeteoVariables = [
	"carbon_monoxide",
	"pm10",
	"pm2_5",
	"nitrogen_dioxide",
	"ozone",
	"sulphur_dioxide",
	"european_aqi",
	"us_aqi"
];

const countryCoords: Record<string, GlobeCoordinates> = {
	IT: { latitude: 41.8719, longitude: 12.5674 },
	FR: { latitude: 46.2276, longitude: 2.2137 },
	NL: { latitude: 52.1326, longitude: 5.2913 },
	DE: { latitude: 51.1657, longitude: 10.4515 },
	BR: { latitude: -14.235, longitude: -51.9253 },
	GB: { latitude: 55.3781, longitude: -3.436 },
	JP: { latitude: 36.2048, longitude: 138.2529 },
	ES: { latitude: 40.4637, longitude: -3.7492 },
	CN: { latitude: 35.8617, longitude: 104.1954 },
	BE: { latitude: 50.5039, longitude: 4.4699 }
};

const openAqBaseUrl = "https://api.openaq.org/v3";

const openAqPolluts: Record<
	PollutCode,
	{
		label: string;
		openAqName: string;
		defaultUnit: string;
	}
> = {
	co: {
		label: "CO",
		openAqName: "co",
		defaultUnit: "µg/m³"
	},
	pm25: {
		label: "PM2.5",
		openAqName: "pm25",
		defaultUnit: "µg/m³"
	},
	pm10: {
		label: "PM10",
		openAqName: "pm10",
		defaultUnit: "µg/m³"
	},
	no2: {
		label: "NO₂",
		openAqName: "no2",
		defaultUnit: "µg/m³"
	},
	o3: {
		label: "O₃",
		openAqName: "o3",
		defaultUnit: "µg/m³"
	},
	so2: {
		label: "SO₂",
		openAqName: "so2",
		defaultUnit: "µg/m³"
	}
};

function setOpenAQRequestHeaders() {
	const apiKeyAQ = process.env.OPENAQ_API_KEY;

	if (!apiKeyAQ) {
		throw new Error("OPENAQ API Key not configured");
	}

	const headersOpt = new Headers();
	headersOpt.set("Accept", "application/json");
	headersOpt.set("Content-Type", "application/json");
	headersOpt.set("X-API-Key", apiKeyAQ);

	return headersOpt;
}

async function openAQFetch<T>(
	pathname: string,
	params?: Record<string, string | number | undefined>
): Promise<T> {
	const url = new URL(`${openAqBaseUrl}${pathname}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		});
	}

	const res = await fetch(url, {
		method: "GET",
		headers: setOpenAQRequestHeaders(),
		cache: "no-store"
	});

	if (!res.ok) {
		const text = await res.text();

		throw new Error(
			`OpenAQ request failed: ${res.status} ${res.statusText} ${text}`
		);
	}

	return res.json() as Promise<T>;
}

async function getLocationLatestCount(locationId: number) {
	try {
		const locData = await openAQFetch<{ results?: OpenAqLastRead[] }>(
			`/locations/${locationId}/latest`,
			{
				limit: 100
			}
		);

		return Array.isArray(locData.results) ? locData.results.length : 0;
	} catch (error) {
		console.log(error);
		return 0;
	}
}

function detectRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function getStringFromRecord(
	value: Record<string, unknown>,
	key: string
): string | null {
	const foundValue = value[key];

	if (typeof foundValue === "string" && foundValue.trim().length > 0) {
		return foundValue;
	}

	return null;
}

async function cleanAPIError(errorObj: unknown) {
	if (errorObj instanceof Error) {
		return errorObj.message;
	}

	if (detectRecord(errorObj)) {
		const directMessage =
			getStringFromRecord(errorObj, "message") ??
			getStringFromRecord(errorObj, "error") ??
			getStringFromRecord(errorObj, "reason");

		if (directMessage) {
			return directMessage;
		}

		const response = errorObj["response"];

		if (detectRecord(response)) {
			const statusText = getStringFromRecord(response, "statusText");

			const data = response["data"];

			if (detectRecord(data)) {
				const dataMessage =
					getStringFromRecord(data, "reason") ??
					getStringFromRecord(data, "error") ??
					getStringFromRecord(data, "message");

				if (dataMessage) {
					return dataMessage;
				}
			}

			if (statusText) {
				return statusText;
			}
		}
	}

	return "Errore sconosciuto durante il recupero dei dati.";
}

async function getNearbyStationsAQ(params: {
	latitude: number;
	longitude: number;
}): Promise<{
	stations: OpenAqNearbyStation[];
	warning: string | null;
}> {
	if (!process.env.OPENAQ_API_KEY) {
		return {
			stations: [],
			warning: "OPENAQ API Key not configured"
		};
	}

	try {
		const stationData = await openAQFetch<{ results?: any[] }>("/locations", {
			coordinates: `${params.latitude.toFixed(6)},${params.longitude.toFixed(
				6
			)}`,
			radius: 15000,
			limit: 10
		});

		const locations = Array.isArray(stationData.results)
			? stationData.results
			: [];

		const stations: OpenAqNearbyStation[] = locations
			.map((location: any) => {
				return {
					id: Number(location.id),
					name:
						location.name ??
						location.locality ??
						location.country?.name ??
						`Station ${location.id}`,
					latestCount: 0
				};
			})
			.filter((station: OpenAqNearbyStation) => Number.isFinite(station.id));

		const stationsWithLatest = await Promise.all(
			stations.slice(0, 6).map(async (station) => {
				return {
					...station,
					latestCount: await getLocationLatestCount(station.id)
				};
			})
		);

		return {
			stations: stationsWithLatest,
			warning: null
		};
	} catch (error) {
		return {
			stations: [],
			warning: `OpenAQ not available for this area...`
		};
	}
}

function getTargetCoordinates(target: SearchTargetType) {
	if (
		typeof target.latitude === "number" &&
		Number.isFinite(target.latitude) &&
		typeof target.longitude === "number" &&
		Number.isFinite(target.longitude)
	) {
		return {
			latitude: target.latitude,
			longitude: target.longitude
		};
	}

	if (target.countryCode) {
		const country = countryCoords[target.countryCode.toUpperCase()];

		if (country) {
			return {
				latitude: country.latitude,
				longitude: country.longitude
			};
		}
	}

	return null;
}

async function getAQLocationDetails(
	locationId: number
): Promise<OpenAqLocationDetails | null> {
	try {
		const detData = await openAQFetch<{ results?: OpenAqLocationDetails[] }>(
			`/locations/${locationId}`
		);

		return detData.results?.[0] ?? null;
	} catch {
		return null;
	}
}

async function getAQLocationLatest(locationId: number) {
	try {
		const latestData = await openAQFetch<{ results?: OpenAqLastRead[] }>(
			`/locations/${locationId}/latest`,
			{
				limit: 100
			}
		);

		return Array.isArray(latestData.results) ? latestData.results : [];
	} catch {
		return [];
	}
}

function getSensorPollutCode(sensor: OpenAqSensor): PollutCode | null {
	const paramName = sensor.parameter?.name?.toLowerCase();

	if (!paramName) {
		return null;
	}

	const match = Object.entries(openAqPolluts).find(([pollut, config]) => {
		return config.openAqName === paramName;
	});

	return match?.[0] as PollutCode | null;
}

async function selectBestSensors(stations: OpenAqNearbyStation[]): Promise<{
	selectedSensors: Partial<Record<PollutCode, SensorSelection>>;
	locationDetails: OpenAqLocationDetails[];
}> {
	const selectedSensors: Partial<Record<PollutCode, SensorSelection>> = {};
	const locationDetails: OpenAqLocationDetails[] = [];

	for (const station of stations) {
		const singleLocationDetails = await getAQLocationDetails(station.id);

		if (!singleLocationDetails) {
			continue;
		}

		locationDetails.push(singleLocationDetails);

		const sensors = Array.isArray(singleLocationDetails.sensors)
			? singleLocationDetails.sensors
			: [];

		sensors.map((sensor) => {
			const pollutCode = getSensorPollutCode(sensor);

			if (!pollutCode) {
				return;
			}

			if (!selectedSensors[pollutCode]) {
				selectedSensors[pollutCode] = {
					code: pollutCode,
					sensor: sensor,
					station: station
				};
			}
		});

		const allFound = Object.keys(openAqPolluts).every((pollutCode) => {
			return selectedSensors[pollutCode as PollutCode];
		});

		if (allFound) {
			break;
		}
	}
	return {
		selectedSensors: selectedSensors,
		locationDetails: locationDetails
	};
}

function getLatestSensorId(read: any) {
	return (
		read.sensorId ??
		read.sensorsId ??
		read.sensor_id ??
		read.sensors_id ??
		read.sensor?.id ??
		null
	);
}

function getLatestValueforSensor(params: {
	sensor: OpenAqSensor;
	latestByLocation: OpenAqLastRead[];
}) {
	const latestFromLoc = params.latestByLocation.find((read: any) => {
		return Number(getLatestSensorId(read)) === Number(params.sensor.id);
	});

	if (
		typeof latestFromLoc?.value === "number" &&
		Number.isFinite(latestFromLoc.value)
	) {
		return {
			value: latestFromLoc.value,
			datetime:
				latestFromLoc.datetime?.utc ??
				latestFromLoc.datetime?.local ??
				undefined
		};
	}

	if (
		typeof params.sensor.latest?.value === "number" &&
		Number.isFinite(params.sensor.latest.value)
	) {
		return {
			value: params.sensor.latest.value,
			datetime:
				params.sensor.latest.datetime?.utc ??
				params.sensor.latest.datetime?.local ??
				undefined
		};
	}

	return {
		value: null,
		datetime: undefined
	};
}

async function buildOpenAqDataset(params: {
	target: SearchTargetType;
	latitude: number;
	longitude: number;
	stations: OpenAqNearbyStation[];
	warnings: string[];
}): Promise<AirQualityDataset> {
	const { selectedSensors } = await selectBestSensors(params.stations);

	const latestCache = new Map<number, OpenAqLastRead[]>();

	async function getLatestforStation(stationId: number) {
		if (latestCache.has(stationId)) {
			return latestCache.get(stationId) ?? [];
		}

		const latest = await getAQLocationLatest(stationId);
		latestCache.set(stationId, latest);

		return latest;
	}

	const summaries = await Promise.all(
		Object.entries(openAqPolluts).map(async ([pCode, config]) => {
			const pollutCode = pCode as PollutCode;
			const selected = selectedSensors[pollutCode];

			if (!selected) {
				return {
					code: pollutCode,
					label: config.label,
					value: null,
					unit: config.defaultUnit,
					min: null,
					max: null,
					sampleCount: 0,
					source: "openaq" as const
				};
			}

			const latestByLocation = await getLatestforStation(selected.station.id);

			const latest = getLatestValueforSensor({
				sensor: selected.sensor,
				latestByLocation: latestByLocation
			});

			const summaryMin =
				typeof selected.sensor.summary?.min === "number"
					? Number(selected.sensor.summary.min.toFixed(2))
					: null;

			const summaryMax =
				typeof selected.sensor.summary?.max === "number"
					? Number(selected.sensor.summary.max.toFixed(2))
					: null;

			return {
				code: pollutCode,
				label: selected.sensor.parameter?.displayName ?? config.label,
				value: latest.value !== null ? Number(latest.value.toFixed(3)) : null,
				unit: selected.sensor.parameter?.units ?? config.defaultUnit,
				min: summaryMin,
				max: summaryMax,
				sampleCount: latest.value !== null ? 1 : 0,
				source: "openaq" as const
			};
		})
	);

	const missingPolluts = summaries
		.filter((singleSummary) => singleSummary.value === null)
		.map((summ) => summ.label);

	const warns = [...params.warnings];

	if (missingPolluts.length > 0) {
		warns.push(
			`OpenAQ non espone dati recenti per: ${missingPolluts.join(
				", "
			)} nell'area selezionata.`
		);
	}

	return {
		target: params.target,
		latitude: params.latitude,
		longitude: params.longitude,
		fetchedAt: new Date().toISOString(),
		primarySource: "openaq",
		summaries: summaries,
		indexes: [],
		trend: [],
		nearbyStations: params.stations,
		sourceNotes: ["OpenAQ: dati osservazionali da stazioni e sensori reali."],
		warnings: warns
	};
}

export async function getAirQualityDatasetAction(
	target: SearchTargetType
): Promise<AirQualityActionResult> {
	const coords = getTargetCoordinates(target);

	if (!coords) {
		return {
			ok: false,
			error:
				"Coordinate non disponibili, usa una città supportata o le coordinate."
		};
	}

	const openMeteoFallback = async (
		warns: string[] = [],
		nearbyStations: OpenAqNearbyStation[] = []
	) => {
		const oMDataset = await openMeteoFetchDataset({
			target: target,
			latitude: coords.latitude,
			longitude: coords.longitude,
			warnings: warns,
			nearbyStations: nearbyStations
		});

		const result: AirQualityActionResult = {
			ok: true,
			dataset: {
				...oMDataset,
				primarySource: "openmeteo" as const
			}
		};
		return result;
	};

	try {
		const openAqResult = await getNearbyStationsAQ(coords);

		const warns = openAqResult.warning ? [openAqResult.warning] : [];

		if (openAqResult.stations.length === 0) {
			return openMeteoFallback([
				...warns,
				"Nessuna stazione OpenAQ trovata entro il raggio configurato."
			]);
		}

		const aqDataset = await buildOpenAqDataset({
			target: target,
			latitude: coords.latitude,
			longitude: coords.longitude,
			stations: openAqResult.stations,
			warnings: warns
		});

		const missingPollutCodes = getMissingSummaryCodes(aqDataset);

		if (!hasSummaryValue(aqDataset)) {
			const openMeteoDataset = await openMeteoFetchDataset({
				target: target,
				latitude: coords.latitude,
				longitude: coords.longitude,
				nearbyStations: openAqResult.stations,
				warnings: [...aqDataset.warnings, "OpenAQ not find near stations."]
			});

			return {
				ok: true,
				dataset: {
					...openMeteoDataset,
					nearbyStations: openAqResult.stations,
					primarySource: "openmeteo" as const
				}
			};
		}

		if (missingPollutCodes.length > 0) {
			const openMeteoDataset = await openMeteoFetchDataset({
				target: target,
				latitude: coords.latitude,
				longitude: coords.longitude,
				nearbyStations: openAqResult.stations,
				warnings: [
					`Open-Meteo usato per completare i dati mancanti da OpenAQ: ${missingPollutCodes.join(
						", "
					)}.`
				]
			});

			const mergedDatasetAQOM = mergeDatasets({
				openAqDataset: aqDataset,
				openMeteoDataset: openMeteoDataset
			});

			return {
				ok: true,
				dataset: mergedDatasetAQOM
			};
		}

		return {
			ok: true,
			dataset: aqDataset
		};
	} catch (error) {
		try {
			return openMeteoFallback([
				`OpenAQ non disponibile: ${await cleanAPIError(error)}`
			]);
		} catch (fallbackError) {
			return {
				ok: false,
				error: await cleanAPIError(fallbackError)
			};
		}
	}
}

function createEmptyTrendPoint(date: string): AirQualityTrendPoint {
	return {
		date: date,
		co: null,
		pm25: null,
		pm10: null,
		no2: null,
		o3: null,
		so2: null
	};
}

function parseDateInput(date: string | undefined) {
	if (!date) {
		return new Date();
	}

	const [year, month, day] = date.split("-").map((num) => Number(num));

	if (!year || !month || !day) {
		return new Date();
	}

	return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function formatDateInput(date: Date) {
	return date.toISOString().slice(0, 10);
}

function formatMonthKey(date: Date) {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");

	return `${year}-${month}`;
}

function getSixMonthsKeysFromTarget(target: SearchTargetType) {
	const endDate = parseDateInput(target.endDate);

	const montshKeys: string[] = [];

	const baseMonth = new Date(
		Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), 1, 12, 0, 0)
	);

	for (let index = 5; index >= 0; index -= 1) {
		const currentMonth = new Date(baseMonth);
		currentMonth.setUTCMonth(baseMonth.getUTCMonth() - index);

		montshKeys.push(formatMonthKey(currentMonth));
	}

	return montshKeys;
}

function getSixMonthDateRange(target: SearchTargetType) {
	const monthKeys = getSixMonthsKeysFromTarget(target);
	const end = parseDateInput(target.endDate);

	return {
		monthKeys,
		startDate: `${monthKeys[0]}-01`,
		endDate: formatDateInput(end)
	};
}

function getTrendPoint(point: AirQualityTrendPoint) {
	if (!point.date || point.date.length < 7) {
		return null;
	}

	return point.date.slice(0, 7);
}

function aggregateTrendByMonth(params: {
	trend: AirQualityTrendPoint[];
	monthsKeys: string[];
}) {
	const pollutCodes: PollutCode[] = ["co", "pm25", "pm10", "no2", "o3", "so2"];

	const pollutsContainers = new Map<
		string,
		Record<PollutCode, { sum: number; count: number }>
	>();

	params.monthsKeys.map((singleKey) => {
		pollutsContainers.set(singleKey, {
			co: { sum: 0, count: 0 },
			pm25: { sum: 0, count: 0 },
			pm10: { sum: 0, count: 0 },
			no2: { sum: 0, count: 0 },
			o3: { sum: 0, count: 0 },
			so2: { sum: 0, count: 0 }
		});
	});

	params.trend.map((singlePoint) => {
		const monthKey = getTrendPoint(singlePoint);

		if (!monthKey || !pollutsContainers.has(monthKey)) {
			return;
		}

		const container = pollutsContainers.get(monthKey);

		if (!container) {
			return;
		}

		pollutCodes.map((singleCode) => {
			const value = singlePoint[singleCode];

			if (typeof value !== "number" || !Number.isFinite(value)) {
				return;
			}

			container[singleCode].sum += value;
			container[singleCode].count += 1;
		});
	});

	return params.monthsKeys.map((singleMonthKey) => {
		const singleContainer = pollutsContainers.get(singleMonthKey);
		const singlePoint = createEmptyTrendPoint(`${singleMonthKey}-01`);

		if (!singleContainer) {
			return singlePoint;
		}

		pollutCodes.forEach((singleCode) => {
			const item = singleContainer[singleCode];

			if (item.count === 0) {
				singlePoint[singleCode] = null;
				return;
			}

			singlePoint[singleCode] = Number((item.sum / item.count).toFixed(3));
		});

		return singlePoint;
	});
}

function hasValidSummaryValue(
	summary: AirQualityDataset["summaries"][number] | null | undefined
) {
	return (
		Boolean(summary) &&
		typeof summary?.value === "number" &&
		Number.isFinite(summary.value)
	);
}

function getMissingSummaryCodes(dataset: AirQualityDataset) {
	return dataset.summaries
		.filter((singleSummary) => {
			return !hasValidSummaryValue(singleSummary);
		})
		.map((singleSummary) => {
			return singleSummary.code;
		});
}

function mergeDatasets(params: {
	openAqDataset: AirQualityDataset;
	openMeteoDataset: AirQualityDataset;
}) {
	const totalPollutCodes: PollutCode[] = [];

	const mergedSummaries: PollutSummary[] = params.openAqDataset.summaries.map(
		(aqSingleSummary): PollutSummary => {
			if (hasValidSummaryValue(aqSingleSummary)) {
				return aqSingleSummary;
			}

			const openMeteoSummary = params.openMeteoDataset.summaries.find(
				(omSingleSummary) => {
					return omSingleSummary.code === aqSingleSummary.code;
				}
			);

			if (!openMeteoSummary || !hasValidSummaryValue(openMeteoSummary)) {
				return aqSingleSummary;
			}

			totalPollutCodes.push(aqSingleSummary.code);

			return {
				...openMeteoSummary,
				code: aqSingleSummary.code,
				label: aqSingleSummary.label || openMeteoSummary.label,
				source: "openmeteo" as const
			};
		}
	);

	const openAqValidCount =
		params.openAqDataset.summaries.filter(hasValidSummaryValue).length;

	const openMeteoCodesCount = totalPollutCodes.length;

	return {
		...params.openAqDataset,
		primarySource:
			openMeteoCodesCount > openAqValidCount
				? "openmeteo"
				: params.openAqDataset.primarySource,
		summaries: mergedSummaries,
		indexes:
			params.openMeteoDataset.indexes.length > 0
				? params.openMeteoDataset.indexes
				: params.openAqDataset.indexes,
		trend:
			params.openMeteoDataset.trend.length > 0
				? params.openMeteoDataset.trend
				: params.openAqDataset.trend,
		sourceNotes: [
			...params.openAqDataset.sourceNotes,
			"Open-Meteo usato come integrazione per gli inquinanti non disponibili da OpenAQ."
		],
		warnings: [
			...params.openAqDataset.warnings,
			...params.openMeteoDataset.warnings,
			totalPollutCodes.length > 0
				? `Dati completati con Open-Meteo per: ${totalPollutCodes.join(", ")}.`
				: "Open-Meteo consultato, ma non ha aggiunto ulteriori valori disponibili."
		]
	};
}

export async function getSixMonthsAQTrendAction(
	target: SearchTargetType
): Promise<SixMonthsActionResult> {
	const coords = getTargetCoordinates(target);

	if (!coords) {
		return {
			ok: false,
			error: "Coordinate non disponibili."
		};
	}

	const { monthKeys, startDate, endDate } = getSixMonthDateRange(target);

	try {
		const url = new URL(openMeteoBaseUrl);

		url.searchParams.set("latitude", String(coords.latitude));
		url.searchParams.set("longitude", String(coords.longitude));
		url.searchParams.set("start_date", startDate);
		url.searchParams.set("end_date", endDate);
		url.searchParams.set("hourly", openMeteoVariables.join(","));
		url.searchParams.set("timezone", "auto");

		const res = await fetch(url, {
			method: "GET",
			cache: "no-store"
		});

		if (!res.ok) {
			const text = await res.text();

			throw new Error(
				`Open-Meteo trend request failed: ${res.status} ${res.statusText} ${text}`
			);
		}

		const data = await res.json();

		const aqDataset = mapOpenMeteoResponseToDataset({
			target: {
				...target,
				startDate,
				endDate
			},
			response: data,
			fallbackLatitude: coords.latitude,
			fallbackLongitude: coords.longitude
		});

		const monthlyTrend = aggregateTrendByMonth({
			trend: aqDataset.trend,
			monthsKeys: monthKeys
		});

		return {
			ok: true,
			trend: monthlyTrend,
			startDate,
			endDate,
			source: "openmeteo"
		};
	} catch (error) {
		const err = await cleanAPIError(error);

		return {
			ok: false,
			error: err
		};
	}
}

const openMeteoBaseUrl =
	"https://air-quality-api.open-meteo.com/v1/air-quality";

async function openMeteoFetchDataset(params: {
	target: SearchTargetType;
	latitude: number;
	longitude: number;
	warnings?: string[];
	nearbyStations?: OpenAqNearbyStation[];
}): Promise<AirQualityDataset> {
	const url = new URL(openMeteoBaseUrl);

	url.searchParams.set("latitude", String(params.latitude));
	url.searchParams.set("longitude", String(params.longitude));
	url.searchParams.set("start_date", params.target.startDate);
	url.searchParams.set("end_date", params.target.endDate);
	url.searchParams.set("hourly", openMeteoVariables.join(","));
	url.searchParams.set("timezone", "auto");

	const res = await fetch(url, {
		method: "GET",
		cache: "no-cache"
	});

	if (!res.ok) {
		const resText = await res.text();

		throw new Error(
			`Open-Meteo request failed: ${res.status} ${res.statusText} ${resText}`
		);
	}

	const oMData = await res.json();

	return mapOpenMeteoResponseToDataset({
		target: params.target,
		response: oMData,
		fallbackLatitude: params.latitude,
		fallbackLongitude: params.longitude,
		nearbyStations: params.nearbyStations ?? [],
		warnings: params.warnings ?? []
	});
}

function hasSummaryValue(dataset: AirQualityDataset) {
	return dataset.summaries.some((singleSummary) => {
		return (
			typeof singleSummary.value === "number" &&
			Number.isFinite(singleSummary.value)
		);
	});
}
