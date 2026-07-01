// import jsonData from "@/public/coastlines/ne_10m_coastline.json";
// import jsonRiversData from "@/public/geoData/riversOpt.json";
// import landData from "@/public/geoData/ne_110m_land.json";
// import testJson from "@/public/geoData/geoDataFromGeo.json";
import boundaryJSON from "@/public/geoData/boundaryLines.json";
import countriesJSON from "@/public/geoData/geoDataCountries.json";
import breaksDataJSON from "@/public/geoData/earthBreaks.json";

import coastLinesJSON from "@/public/geoData/coastline50.json";

import { getTargetCoordinates } from "../features/globe/globe.utils";

// import exrFile from "@/public/textures/"

// libraries
// import * as THREE from "three";
// import { EXRLoader } from "three/addons/loaders/EXRLoader.js";

// import { Earcut } from "three/src/extras/Earcut.js";
// import { drawThreeGeo } from "@/app/utilities/libraries/threeGeoJSON";
// libraries

// types
import { LandFeature } from "../utilities/types/types";
// types

import type {
	AirQualityActionResult,
	ContinentInfo,
	OpenAqNearbyStation,
	SearchTargetType
} from "../utilities/types/types";
import { features } from "process";
import { AxiosError } from "axios";
import { openAqClient } from "../lib/connections/axiosClient";
import { mapOpenMeteoResponseToDataset } from "../features/pollution/pollutionMappers";

async function getOpenAQData() {
	const apiKey = process.env.OPENAQ_API_KEY;
}

// async function getDataIQ() {
// 	const apiKey = process.env.IQAIR_API_KEY;
// }

async function getLuchtmeetnetData() {
	// let axios = require("axios");

	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: `https://api.luchtmeetnet.nl/open_api/components/NO2`,
		// url: `https://api.luchtmeetnet.nl/open_api/components/PM25`,
		headers: {}
	};

	// axios(config)
	// 	.then(function (response) {
	// 		console.log(JSON.stringify(response.data));
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
}

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
	// console.log(data);
	return data;
}

// export async function analyzeRiversData() {
// 	"use server";

// 	const data: any = jsonRiversData;
// 	return data;
// 	// una volta creata funzione lato client spostare più elaborazioni
// 	// dati possibili qui nel backend
// }

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
