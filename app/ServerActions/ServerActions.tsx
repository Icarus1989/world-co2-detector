import jsonData from "@/public/coastlines/ne_10m_coastline.json";

import type { ContinentInfo } from "../utilities/types/types";

async function getOpenAQData() {
	const apiKey = process.env.OPENAQ_API_KEY;
}

async function getDataIQ() {
	const apiKey = process.env.IQAIR_API_KEY;
}

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

export async function analyzeCoastLineData() {
	"use server";

	const data: any = jsonData;
	console.log("Here");

	// type ContinentInfo = {
	// 	continent: [number, number][];
	// };

	const list: ContinentInfo[] = [];

	data["features"].map((elem: any, index: number) => {
		if (elem["geometry"]["coordinates"].length > 800) {
			// console.log(elem["geometry"]["coordinates"]);
			const value: [number, number][] = elem["geometry"]["coordinates"]
				.filter((couple: [number, number], index: number) => {
					if (index % 2 === 0) {
						return false;
					} else {
						return true;
					}
				})
				.filter((couple: [number, number], index: number) => {
					if (index % 2 === 0) {
						return false;
					} else {
						return true;
					}
				})
				.filter((couple: [number, number], index: number) => {
					if (index % 2 === 0) {
						return false;
					} else {
						return true;
					}
				})
				.filter((couple: [number, number], index: number) => {
					if (index % 2 === 0) {
						return false;
					} else {
						return true;
					}
				});
			// .filter((couple: [number, number], index: number) => {
			// 	if (index % 2 === 0) {
			// 		return false;
			// 	} else {
			// 		return true;
			// 	}
			// });
			// forse levare un filter
			list.push({ continent: value });
		}
	});
	console.log(list.length);
	// 10 continenti
	// list
	// 	.sort((elemA: any, elemB: any) => {
	// 		return elemA["coordinates"].length - elemB["coordinates"].length;
	// 	})
	// 	.map((elem) => console.log(elem["coordinates"]));
	return list;
}
