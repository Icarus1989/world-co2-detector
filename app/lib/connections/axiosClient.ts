import axios from "axios";

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
	}
});

export const mapboxGLGeocodingClient = axios.create({
	baseURL: "https://api.mapbox.com/search/geocode/v6",
	timeout: 12000,
	headers: {
		Accept: "application/json"
	}
});
