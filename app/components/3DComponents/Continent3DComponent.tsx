"use client";

// PROBABILMENTE DA ELIMINARE
// effettuare check

import * as THREE from "three";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";

export default function Continent3DComponent(
	{
		continentData,
		initialPoints,
		extrSettings
	}: {
		continentData: [number, number][] | null;
		initialPoints: { x: number; y: number };
		extrSettings: {
			curveSegments: number;
			depth: number;
			bevelEnabled: boolean;
			bevelSegments?: number;
			steps?: number;
			bevelSize?: number;
			bevelOffset?: number;
			bevelThickness?: number;
		};
	},
	props: ThreeElements["mesh"]
) {
	// const shapeRef = useRef<THREE.Mesh>(null!);

	const shape = new THREE.Shape();

	const extrudeSettings = extrSettings;

	if (continentData !== null) {
		shape.moveTo(initialPoints.x, initialPoints.y);
		const data = continentData;
		const continentCoords = data.map((group) => {
			return { x: group[0], y: group[1] };
		});

		const lastCoords: { x: number; y: number } =
			continentCoords[continentCoords.length - 1];

		for (let elem of continentCoords) {
			const x = elem["x"];
			const y = elem["y"];
			shape.lineTo(x / 23, y / 23);
		}

		// shape.moveTo(lastCoords.x, lastCoords.y);
	}

	const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	const material = new THREE.MeshStandardMaterial({
		color: "#2373c4",
		wireframe: false,
		roughness: 0.5,
		metalness: 0.8,
		depthTest: true,
		depthWrite: true
	});

	return (
		<mesh
			{...props}
			// ref={shapeRef}
			geometry={geometry}
			material={material}
		/>
	);
}
