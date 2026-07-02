import boundaryJSON from "@/public/geoData/boundaryLines.json";
import countriesJSON from "@/public/geoData/geoDataCountries.json";
import breaksDataJSON from "@/public/geoData/earthBreaks.json";
import coastLinesJSON from "@/public/geoData/coastline50.json";

import { LandFeature } from "../utilities/types/types";

export async function analyzeBreakLines() {
	"use server";

	const data = breaksDataJSON;

	return data;
}

export async function analyzeBoundaryLines() {
	"use server";

	const data = coastLinesJSON;

	const filteredData = data["features"].filter((elem: any) => {
		if (elem["geometry"]["coordinates"].length > 50) {
			return true;
		} else {
			return false;
		}
	});
	return { type: "FeatureCollection", features: filteredData };
}

export async function analyzeInternalBound() {
	"use server";

	const data = boundaryJSON;
	return data;
}

export async function analyzeLandData() {
	"use server";

	const data: any = countriesJSON;
	return data;
}

export async function analyzeLandsData() {
	"use server";

	const data: any = await countriesJSON;
	const landsData: LandFeature[] = await data["features"]
		.filter((elem: any) => {
			if (elem.geometry.coordinates) {
				return true;
			} else {
				return false;
			}
		})
		.map(
			(land: {
				geometry: {
					coordinates: [number, number][];
					type: string;
				};
			}) => {
				return land;
			}
		);

	return landsData;
}
