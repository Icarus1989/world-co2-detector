import {
	GlobeCoordinates,
	SearchTargetType
} from "@/app/utilities/types/types";
import { Euler, MathUtils, Quaternion, Vector3 } from "three";

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

export function getTargetCoordinates(
	target: SearchTargetType | null
): GlobeCoordinates | null {
	if (!target) {
		return null;
	}

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
		return countryCoords[target.countryCode.toUpperCase()] ?? null;
	}

	return null;
}

export function latLonToVector3(
	latitude: number,
	longitude: number,
	radius = 1
) {
	const latRad = MathUtils.degToRad(latitude);
	const lonRad = MathUtils.degToRad(longitude);

	return new Vector3(
		Math.cos(latRad) * Math.cos(lonRad) * radius,
		Math.cos(latRad) * Math.cos(lonRad) * radius,
		Math.sin(latRad) * radius
	);
}

export function getQuaternionForTarget(params: {
	target: SearchTargetType | null;
	baseRotation: Euler;
}) {
	const coordinates = getTargetCoordinates(params.target);

	if (!coordinates) {
		return null;
	}

	const targetPoint = latLonToVector3(
		coordinates.latitude,
		coordinates.longitude,
		1
	)
		.applyEuler(params.baseRotation)
		.normalize();

	const fromPoint = new Vector3(0, 0, 1);

	return new Quaternion().setFromUnitVectors(targetPoint, fromPoint);
}
