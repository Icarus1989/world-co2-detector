import {
	AirQualityDataset,
	AirQualityIndexSummary,
	AirQualityTrendPoint,
	OpenAqNearbyStation,
	OpenMeteoHourlyResponse,
	PollutCode,
	PollutSummary,
	SearchTargetType
} from "@/app/utilities/types/types";

const pollConfiguration: Record<
	PollutCode,
	{
		label: string;
		openMeteoKey: keyof NonNullable<OpenMeteoHourlyResponse["hourly"]>;
	}
> = {
	co: {
		label: "CO",
		openMeteoKey: "carbon_monoxide"
	},
	pm25: {
		label: "PM2.5",
		openMeteoKey: "pm2_5"
	},
	pm10: {
		label: "PM10",
		openMeteoKey: "pm10"
	},
	no2: {
		label: "NO₂",
		openMeteoKey: "nitrogen_dioxide"
	},
	o3: {
		label: "O₃",
		openMeteoKey: "ozone"
	},
	so2: {
		label: "SO₂",
		openMeteoKey: "sulphur_dioxide"
	}
};

function getValidNumbers(values: Array<number | null | undefined>) {
	return values.filter(
		(value): value is number =>
			typeof value === "number" && Number.isFinite(value)
	);
}

function averageValues(values: number[]) {
	if (values.length === 0) {
		return null;
	}

	const total = values.reduce((acc, value) => acc + value, 0);
	return Number((total / values.length).toFixed(2));
}

function minValue(values: number[]) {
	if (values.length === 0) {
		return null;
	}

	return Number(Math.min(...values).toFixed(2));
}

function maxValue(values: number[]) {
	if (values.length === 0) {
		return null;
	}

	return Number(Math.max(...values).toFixed(2));
}

function createPollutSummary(params: {
	code: PollutCode;
	response: OpenMeteoHourlyResponse;
}): PollutSummary {
	const configuration = pollConfiguration[params.code];
	const values = getValidNumbers(
		params.response.hourly?.[configuration.openMeteoKey] as Array<
			number | null | undefined
		>
	);

	return {
		code: params.code,
		label: configuration.label,
		value: averageValues(values),
		unit: params.response.hourly_units?.[configuration.openMeteoKey] ?? "µg/m³",
		min: minValue(values),
		max: maxValue(values),
		sampleCount: values.length,
		source: "openmeteo"
	};
}

function createIndexSummary(params: {
	code: "european_aqi" | "us_aqi";
	label: string;
	response: OpenMeteoHourlyResponse;
}): AirQualityIndexSummary {
	const values = getValidNumbers(params.response.hourly?.[params.code] ?? []);

	return {
		code: params.code,
		label: params.label,
		value: averageValues(values),
		min: minValue(values),
		max: maxValue(values),
		sampleCount: values.length,
		source: "openmeteo"
	};
}

function buildTrend(response: OpenMeteoHourlyResponse): AirQualityTrendPoint[] {
	const times = response.hourly?.time ?? [];

	const grouped = new Map<
		string,
		Record<PollutCode, number[]> & { count: number }
	>();

	times.forEach((time, index) => {
		const date = time.slice(0, 10);

		if (!grouped.has(date)) {
			grouped.set(date, {
				co: [],
				pm25: [],
				pm10: [],
				no2: [],
				o3: [],
				so2: [],
				count: 0
			});
		}

		const day = grouped.get(date);

		if (!day) {
			return;
		}

		Object.entries(pollConfiguration).forEach(
			([singleCode, singleConfiguration]) => {
				const value =
					response.hourly?.[singleConfiguration.openMeteoKey]?.[index];

				if (typeof value === "number" && Number.isFinite(value)) {
					day[singleCode as PollutCode].push(value);
				}
			}
		);

		day.count += 1;
	});

	return Array.from(grouped.entries()).map(([singleDate, values]) => {
		return {
			date: singleDate,
			co: averageValues(values.co),
			pm25: averageValues(values.pm25),
			pm10: averageValues(values.pm10),
			no2: averageValues(values.no2),
			o3: averageValues(values.o3),
			so2: averageValues(values.so2)
		};
	});
}

export function mapOpenMeteoResponseToDataset(params: {
	target: SearchTargetType;
	response: OpenMeteoHourlyResponse;
	fallbackLatitude: number;
	fallbackLongitude: number;
	nearbyStations?: OpenAqNearbyStation[];
	warnings?: string[];
}): AirQualityDataset {
	const coSummary = createPollutSummary({
		code: "co",
		response: params.response
	});
	const pm25Summary = createPollutSummary({
		code: "pm25",
		response: params.response
	});
	const pm10Summary = createPollutSummary({
		code: "pm10",
		response: params.response
	});
	const no2Summary = createPollutSummary({
		code: "no2",
		response: params.response
	});
	const o3Summary = createPollutSummary({
		code: "o3",
		response: params.response
	});
	const so2Summary = createPollutSummary({
		code: "so2",
		response: params.response
	});

	const euIndex = createIndexSummary({
		code: "european_aqi",
		label: "European AQI",
		response: params.response
	});

	const usIndex = createIndexSummary({
		code: "us_aqi",
		label: "US AQI",
		response: params.response
	});

	return {
		target: params.target,
		latitude: params.response.latitude ?? params.fallbackLatitude,
		longitude: params.response.longitude ?? params.fallbackLongitude,
		fetchedAt: new Date().toISOString(),
		primarySource: "openmeteo",
		summaries: [
			coSummary,
			pm25Summary,
			pm10Summary,
			no2Summary,
			o3Summary,
			so2Summary
		],
		indexes: [
			createIndexSummary({
				code: "european_aqi",
				label: "European AQI",
				response: params.response
			}),
			createIndexSummary({
				code: "us_aqi",
				label: "US AQI",
				response: params.response
			})
		],
		trend: buildTrend(params.response),
		nearbyStations: params.nearbyStations ?? [],
		sourceNotes: [""],
		warnings: params.warnings ?? []
	};
}
