import { DemoPlace, SearchTargetType } from "@/app/utilities/types/types";

const demoPlaces: Record<string, DemoPlace> = {
	venezia: {
		label: "Venezia, Italia",
		latitude: 45.4408,
		longitude: 12.3155,
		countryCode: "IT",
		bbox: [12.1668, 45.2315, 12.5964, 45.5779]
	},
	venice: {
		label: "Venezia, Italia",
		latitude: 45.4408,
		longitude: 12.3155,
		countryCode: "IT",
		bbox: [12.1668, 45.2315, 12.5964, 45.5779]
	},
	roma: {
		label: "Roma, Italia",
		latitude: 41.9028,
		longitude: 12.4964,
		countryCode: "IT",
		bbox: [12.2345, 41.6556, 12.8558, 42.1412]
	},
	rome: {
		label: "Roma, Italia",
		latitude: 41.9028,
		longitude: 12.4964,
		countryCode: "IT",
		bbox: [12.2345, 41.6556, 12.8558, 42.1412]
	},
	milano: {
		label: "Milano, Italia",
		latitude: 45.4642,
		longitude: 9.19,
		countryCode: "IT",
		bbox: [8.9176, 45.3568, 9.3557, 45.5358]
	},
	milan: {
		label: "Milano, Italia",
		latitude: 45.4642,
		longitude: 9.19,
		countryCode: "IT",
		bbox: [8.9176, 45.3568, 9.3557, 45.5358]
	},
	paris: {
		label: "Paris, France",
		latitude: 48.8566,
		longitude: 2.3522,
		countryCode: "FR",
		bbox: [2.2241, 48.8156, 2.4699, 48.9022]
	},
	london: {
		label: "London, United Kingdom",
		latitude: 51.5072,
		longitude: -0.1276,
		countryCode: "GB",
		bbox: [-0.5103, 51.2868, 0.334, 51.6919]
	},
	tokyo: {
		label: "Tokyo, Japan",
		latitude: 35.6762,
		longitude: 139.6503,
		countryCode: "JP",
		bbox: [139.5594, 35.5195, 139.919, 35.8178]
	},
	"new york": {
		label: "New York, United States",
		latitude: 40.7128,
		longitude: -74.006,
		countryCode: "US",
		bbox: [-74.2591, 40.4774, -73.7004, 40.9176]
	}
};

function queryStabilization(value: string) {
	return value
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function resolveDemoPlace(query: string): DemoPlace | null {
	const stabQuery = queryStabilization(query);

	if (!stabQuery) {
		return null;
	}

	return demoPlaces[stabQuery] ?? null;
}

export function createPlaceSearchTarget(params: {
	place: DemoPlace;
	startDate: string;
	endDate: string;
}): SearchTargetType {
	return {
		mode: "place",
		label: params.place.label,
		latitude: params.place.latitude,
		longitude: params.place.longitude,
		countryCode: params.place.countryCode,
		bbox: params.place.bbox,
		startDate: params.startDate,
		endDate: params.endDate
	};
}
