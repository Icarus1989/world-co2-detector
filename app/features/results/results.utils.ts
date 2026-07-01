import {
	ChartPoint,
	PollutionSummary,
	SearchTargetType
} from "@/app/utilities/types/types";

function getTestAverageFromTarget(target: SearchTargetType) {
	const label = target.label.toLowerCase();

	if (label.includes("venezia")) {
		return 0.31;
	}
	if (label.includes("roma")) {
		return 0.42;
	}
	if (label.includes("milano")) {
		return 0.49;
	}
	if (label.includes("paris")) {
		return 0.36;
	}
	if (label.includes("london")) {
		return 0.34;
	}
	if (label.includes("tokyo")) {
		return 0.39;
	}
	if (label.includes("new york")) {
		return 0.33;
	}

	if (target.countryCode === "IT") {
		return 0.44;
	}
	if (target.countryCode === "FR") {
		return 0.35;
	}
	if (target.countryCode === "GB") {
		return 0.32;
	}
	if (target.countryCode === "US") {
		return 0.37;
	}
	if (target.countryCode === "JP") {
		return 0.4;
	}

	return 0.38;
}

export function createTestPollutionSummary(
	target: SearchTargetType
): PollutionSummary {
	return {
		locationLabel: target.label,
		parameter: "co",
		averageValue: getTestAverageFromTarget(target),
		unit: "µg/m³",
		startDate: target.startDate,
		endDate: target.endDate,
		dataSource: "Test data - OpenAQ integretion pending",
		status: "test"
	};
}

export function createTestChartData(target: SearchTargetType): ChartPoint[] {
	const baseValue = getTestAverageFromTarget(target);

	return [
		{ label: "Gen", value: Number((baseValue * 1.08).toFixed(2)) },
		{ label: "Feb", value: Number((baseValue * 0.96).toFixed(2)) },
		{ label: "Mar", value: Number((baseValue * 1.02).toFixed(2)) },
		{ label: "Apr", value: Number((baseValue * 0.91).toFixed(2)) },
		{ label: "Mag", value: Number((baseValue * 0.87).toFixed(2)) },
		{ label: "Giu", value: Number((baseValue * 0.94).toFixed(2)) }
	];
}

export function formatCoordinates(target: SearchTargetType) {
	if (
		typeof target.latitude !== "number" ||
		typeof target.longitude !== "number"
	) {
		return "Coordinate non disponibili";
	}

	return `${target.latitude.toFixed(4)}, ${target.longitude.toFixed(4)}`;
}
