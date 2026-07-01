"use client";

import { useEffect, useRef } from "react";
import mapboxgl, {
	type SourceSpecification,
	type LngLatBoundsLike,
	type Map as MapboxMap
} from "mapbox-gl";

import { ResultsMapProps, SearchTargetType } from "@/app/utilities/types/types";

import styles from "./ResultsMap.module.css";

function findTargetCenter(target: SearchTargetType): [number, number] {
	if (
		typeof target.longitude === "number" &&
		Number.isFinite(target.longitude) &&
		typeof target.latitude === "number" &&
		Number.isFinite(target.latitude)
	) {
		return [target.longitude, target.latitude];
	}

	return [12.4964, 41.9028];
}

function createBboxGeoJson(bbox: [number, number, number, number]) {
	const [minLongitude, minLatitude, maxLongitude, maxLatitude] = bbox;

	return {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {},
				geometry: {
					type: "Polygon",
					coordinates: [
						[
							[minLongitude, minLatitude],
							[maxLongitude, minLatitude],
							[maxLongitude, maxLatitude],
							[minLongitude, maxLatitude],
							[minLongitude, minLatitude]
						]
					]
				}
			}
		]
	};
}

export default function ResultsMap({ target }: ResultsMapProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<MapboxMap | null>(null);

	useEffect(() => {
		const token =
			"pk.eyJ1IjoidGhpc2RvdGFsZXgiLCJhIjoiY2xmN2Zsa2pnMDF5cDNxcW1teWd6M2xscyJ9.xwp_PrnoJj6sZHNRhNmCoA";

		// <--- sostituire

		if (!token || !containerRef.current) {
			return;
		}

		mapboxgl.accessToken = token;

		const center = findTargetCenter(target);

		// Arrivato punto 5 Problema redirect map

		const map = new mapboxgl.Map({
			container: containerRef.current,
			// style: "mapbox://styles/mapbox/satellite-streets-v12",
			// style: "mapbox://styles/mapbox/navigation-night-v1",
			style: "mapbox://styles/mapbox/standard-satellite",

			center: center,
			zoom: target.bbox ? 11 : 12,
			pitch: 48,
			bearing: 0,
			interactive: false,
			attributionControl: true
			// projection: "globe"
		});

		mapRef.current = map;

		const markerElement = document.createElement("div");
		markerElement.className = styles["marker"];

		const marker = new mapboxgl.Marker({
			element: markerElement,
			anchor: "center"
		})
			.setLngLat(center)
			.addTo(map);

		map.on("load", () => {
			window.requestAnimationFrame(() => {
				map.resize();
			});

			if (target.bbox) {
				// const source: SourceSpecification = {
				// 	type: "geojson",
				// 	data: createBboxGeoJson(target.bbox) as any
				// };

				map.addSource("target-bbox", {
					type: "geojson",
					data: createBboxGeoJson(target.bbox) as GeoJSON.FeatureCollection
				});

				map.addLayer({
					id: "target-bbox-fill",
					type: "fill",
					source: "target-bbox",
					paint: {
						"fill-color": "#7df9ff",
						"fill-opacity": 0.04
					}
				});

				map.addLayer({
					id: "target-bbox-line",
					type: "line",
					source: "target-bbox",
					paint: {
						"line-color": "#7df9ff",
						"line-width": 2,
						"line-opacity": 0.42
					}
				});

				const [minLongitude, minLatitude, maxLongitude, maxLatitude] =
					target.bbox;

				map.fitBounds(
					[
						[minLongitude, minLatitude],
						[maxLongitude, maxLatitude]
					] as LngLatBoundsLike,
					{
						padding: { top: 120, right: 46, bottom: 120, left: 46 },
						pitch: 60,
						duration: 900,
						maxZoom: 12
					}
				);
			} else {
				map.flyTo({
					center: center,
					pitch: 48,
					bearing: 0,
					zoom: 11.8,
					duration: 900
				});
			}
		});

		return () => {
			marker.remove();
			map.remove();
			mapRef.current = null;
		};
	}, [target]);

	const hasToken = Boolean(
		"pk.eyJ1IjoidGhpc2RvdGFsZXgiLCJhIjoiY2xmN2Zsa2pnMDF5cDNxcW1teWd6M2xscyJ9.xwp_PrnoJj6sZHNRhNmCoA"
	);

	// <--- sostituire

	if (!hasToken) {
		return (
			<section className={styles["emptyState"]}>
				<span>Mapbox non configurato</span>
				<span>Problema token env</span>
			</section>
		);
	}

	return (
		<section
			className={styles["mapShell"]}
			aria-label={`Mappa di ${target.label}`}
		>
			<div ref={containerRef} className={styles["mapContainer"]} />
		</section>
	);
}
