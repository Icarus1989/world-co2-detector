"use server";

import { AxiosError } from "axios";
import {
	GeocodePlaceActionParams,
	GeocodePlaceActionResult,
	MapboxFeature
} from "../utilities/types/types";
import { mapboxGLGeocodingClient } from "../lib/connections/axiosClient";

function decodeApiError(error: unknown) {
	if (error instanceof AxiosError) {
		return (
			error.response?.data?.message ??
			error.response?.data?.error ??
			error.response?.statusText ??
			error.message
		);
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Errore sconosciuto durante la geocodifica.";
}

function selectMBXToken() {
	console.log("Errore lettura env");
	return (
		process.env.MAPBOX_ACCESS_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_TOKEN
	);
}

function getFeatureCoordinates(feature: MapboxFeature) {
	const longitude =
		feature.properties?.coordinates?.longitude ??
		feature.geometry?.coordinates?.[0];

	const latitude =
		feature.properties?.coordinates?.latitude ??
		feature.geometry?.coordinates?.[1];

	if (
		typeof latitude !== "number" ||
		typeof longitude !== "number" ||
		!Number.isFinite(latitude) ||
		!Number.isFinite(longitude)
	) {
		return null;
	}

	return { latitude, longitude };
}

export async function getFeatureLabel(
	feature: MapboxFeature,
	fallbackName: string
) {
	const name =
		feature.properties?.full_address ??
		feature.properties?.name_preferred ??
		feature.properties?.name ??
		fallbackName;

	const formattedPlace = feature.properties?.place_formatted;

	if (formattedPlace && !name.includes(formattedPlace)) {
		return `${name}, ${formattedPlace}`;
	}

	return name;
}

export async function getFeatureCountryCode(feature: MapboxFeature) {
	return feature.properties?.context?.country?.country_code?.toUpperCase();
}

export async function geocodePlaceAction(
	params: GeocodePlaceActionParams
): Promise<GeocodePlaceActionResult> {
	const token = selectMBXToken();
	const query = params.query.trim();

	if (!token) {
		console.log("Problema API Key Mapbox");
		return {
			ok: false,
			error: "Problema API Key Mapbox"
		};
	}

	if (query.length < 2) {
		console.log("Servono almeno 2 caratteri per iniziare la ricerca...");
		return {
			ok: false,
			error: "Servono almeno 2 caratteri per iniziare la ricerca..."
		};
	}

	try {
		const { data } = await mapboxGLGeocodingClient.get("/forward", {
			params: {
				q: query,
				access_token: `${token}`,
				language: params.language ?? "it",
				limit: 1,
				autocomplete: false,
				types: "place,locality,district,region,country,address",
				country: params.countryCode || undefined
			}
		});

		const mbxFeature: MapboxFeature | undefined = data?.features?.[0];

		if (!mbxFeature) {
			return {
				ok: false,
				error: `Nessun risultato trovato per •${query}•`
			};
		}

		const coordinates = getFeatureCoordinates(mbxFeature);

		if (!coordinates) {
			return {
				ok: false,
				error: `Coordinate non disponibili per •${query}•`
			};
		}

		return {
			ok: true,
			target: {
				mode: "place",
				label: await getFeatureLabel(mbxFeature, query),
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
				countryCode: await getFeatureCountryCode(mbxFeature),
				bbox: mbxFeature.bbox,
				startDate: params.startDate,
				endDate: params.endDate
			}
		};
	} catch (error) {
		return {
			ok: false,
			error: decodeApiError(error)
		};
	}
}
