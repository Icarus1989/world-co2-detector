import axios, { AxiosHeaders } from "axios";

export const openMeteoAirClient = axios.create({
	baseURL: "https://air-quality-api.open-meteo.com/v1",
	timeout: 15000,
	headers: {
		Accept: "application/json"
	}
});

export const openAqClient = axios.create({
	baseURL: "https://api.openaq.org/v3",
	timeout: 12000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"X-API-Key": process.env.OPENAQ_API_KEY
		// "5cf658cd2f1b4ef172719be4b5798f39c1479c23377ce3e7fb13e972306358df"
	}
});

// openAqClient.interceptors.request.use((configuration) => {
// 	const apiKey =
// 		"5cf658cd2f1b4ef172719be4b5798f39c1479c23377ce3e7fb13e972306358df";

// 	if (apiKey) {
// 		configuration.headers = AxiosHeaders.from(configuration.headers);
// 		configuration.headers.set("X-API-Key", apiKey);
// 		configuration.headers.set("Content-Type", "application/json");
// 	}

// 	console.log("CONFIGURATION");
// 	console.log(configuration);

// 	return configuration;
// });

export const mapboxGLGeocodingClient = axios.create({
	baseURL: "https://api.mapbox.com/search/geocode/v6",
	timeout: 12000,
	headers: {
		Accept: "application/json"
	}
});

// riscrivere tutto il file con logica green like me
