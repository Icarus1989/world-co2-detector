"use client";

import { LandFeature } from "@/app/utilities/types/types";

import { useState, useRef, useEffect, FC, use } from "react";

import * as THREE from "three";

import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Earcut } from "three/src/extras/Earcut.js";

import { drawThreeGeo } from "@/app/utilities/graphicLibraries/threeGeoJSON";

import type {
	AnimatedGlobeGroupProps,
	ContinentInfo,
	SearchTargetType
} from "@/app/utilities/types/types";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";

// textures
import goldOpaqueImg from "@/public/textures/imgTextures/goldImg.jpg";
import goldOpaqueImgNormal from "@/public/textures/normalsTextures/goldNormals.jpg";
import goldOpaqueImgRoughness from "@/public/textures/roughnessTexture/goldRoughness.jpg";
import goldOpaqueImgMetalness from "@/public/textures/metalnessTextures/goldMetalness.jpg";

import rakuBlackImg from "@/public/textures/imgTextures/rakuBlack.png";
import rakuBlackNormal from "@/public/textures/normalsTextures/rakuBlackNormal.png";
// import rakuBlackRoughness from "@/public/textures/roughnessTexture/rakuBlackRoughness.png";
import rakuBlackHeight from "@/public/textures/heightTextures/rakuBlackHeight.png";
import rakuBlackAmbOcc from "@/public/textures/ambientOcclusionTextures/rakuBlackAmbientOccMap.png";
import {
	getQuaternionForTarget,
	getTargetCoordinates,
	latLonToVector3
} from "@/app/features/globe/globe.utils";

const equatDiameter = 12756.274 / 10000;
const polarDiameter = 12713.504 / 10000;

function NewEarthWaterMesh({
	width,
	height,
	...props
}: {
	width: number;
	height: number;
}) {
	const earthGeometry = new THREE.SphereGeometry(2.28, 512, 512);

	const rakuBlackTexture = useTexture(rakuBlackImg.src);
	const rakuBlackNormMap = useTexture(rakuBlackNormal.src);
	const rakuBlackHeightMap = useTexture(rakuBlackHeight.src);
	const rakuBlackAmbOccMap = useTexture(rakuBlackAmbOcc.src);

	return (
		<mesh scale={[0.8, 0.8, 0.8]} geometry={earthGeometry} frustumCulled={true}>
			<meshPhysicalMaterial
				color={0x23a8e0}
				emissive={0x011235}
				emissiveIntensity={0.75}
				roughness={0.8}
				metalness={0.01}
				map={rakuBlackTexture}
				normalMap={rakuBlackNormMap}
				displacementMap={rakuBlackHeightMap}
				displacementScale={0}
				aoMap={rakuBlackAmbOccMap}
				aoMapIntensity={1}
				clearcoatMap={rakuBlackNormMap}
				clearcoatNormalMap={rakuBlackNormMap}
				thickness={10}
				flatShading={false}
				ior={1.5}
				transmission={0.05}
				opacity={1}
				clearcoat={1}
				clearcoatRoughness={0.3}
				depthTest={true}
				depthWrite={true}
				alphaTest={1}
				fog={true}
				reflectivity={0.23}
				sheen={0.1}
			/>

			{/* </AnimatedDistortMaterial> */}
		</mesh>
	);
}

type groupedType = {
	grouped: string | "";
	data: {
		geom: {
			x: number;
			y: number;
			z: number;
		};
	}[];
};

interface containerObj {
	[key: string]: groupedType[];
}

let indicator = 0;

const baseLandRotation = new THREE.Euler(
	THREE.MathUtils.degToRad(-25 - 23.5),
	0,
	THREE.MathUtils.degToRad(-100),
	"XYZ"
);

const baseLandRotationArray: [number, number, number] = [
	THREE.MathUtils.degToRad(-25 - 23.5),
	0,
	THREE.MathUtils.degToRad(-100)
];

const baseWaterRotationArray: [number, number, number] = [
	THREE.MathUtils.degToRad(23.5),
	0,
	0
];

export default function CanvasElement({
	analyzeLandsData,
	analyzeBoundaryLines,
	analyzeInternalBound,
	analyzeBreakLines,
	globeTarget
}: {
	analyzeLandsData: () => Promise<string>;
	analyzeBoundaryLines: () => Promise<any>;
	analyzeInternalBound: () => Promise<any>;
	analyzeBreakLines: () => Promise<any>;
	globeTarget: SearchTargetType | null;
}) {
	// NOTA: determinare un type per analyzeCoastLandData
	// NOTA: sistemare naming funzioni e variabili

	const [landCoupleMeshes, setLandCoupleMeshes] = useState<{
		surfaces: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshStandardMaterial,
			THREE.Object3DEventMap
		>[];
	} | null>(null);

	const [boundaryLines, setBoundaryLines] = useState<{
		visibleBound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
		baseBound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null>(null);

	const [internalLines, setInternalLines] = useState<{
		bound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null>(null);

	const [breakLines, setBreakLines] = useState<{
		bound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null>(null);

	useEffect(() => {
		let ignore = false;

		type BoundaryFeature = {
			type: string;
			properties: {
				featurecla: string | null;
				min_label: number | null;
				min_zoom: number | null;
				name: string;
				name_alt: string | null;
				name_en: string | null;
				note: string | null;
				scalerank: number | null;
			};
			geometry: {
				type: string;
				coordinates: [number, number][];
			};
		};

		const goldOpaqueTexture = new THREE.TextureLoader().load(goldOpaqueImg.src);

		const goldOpaqueNormals = new THREE.TextureLoader().load(
			goldOpaqueImgNormal.src
		);

		const goldOpaqueRoughness = new THREE.TextureLoader().load(
			goldOpaqueImgRoughness.src
		);

		const goldOpaqueMetalness = new THREE.TextureLoader().load(
			goldOpaqueImgMetalness.src
		);

		const goldMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xb58629,
			envMap: goldOpaqueTexture,
			envMapIntensity: 1.0,
			normalMap: goldOpaqueNormals,
			metalness: 0.97,
			metalnessMap: goldOpaqueMetalness,
			roughness: 0.0323,
			roughnessMap: goldOpaqueRoughness,
			sheenRoughnessMap: goldOpaqueRoughness,
			sheenRoughness: 0.23,
			bumpMap: goldOpaqueRoughness,
			reflectivity: 1.0,
			specularIntensity: 1,
			wireframe: false,
			depthTest: true,
			depthWrite: true,
			opacity: 1,
			alphaTest: 1,
			fog: true
		});

		async function startAnalyzeBreakLines() {
			try {
				const boundaryData: { features: BoundaryFeature[]; type: "Feature" } =
					await analyzeBreakLines();

				const boundaryFeaturesArr = await boundaryData["features"];

				const filteredBoundary = boundaryFeaturesArr.filter(
					(elem: BoundaryFeature) => {
						if (elem.geometry) {
							return true;
						} else {
							return false;
						}
					}
				);

				const landPointsArraysMax = await filteredBoundary.map((elem: any) => {
					return drawThreeGeo(elem, 2.19, "sphere", {
						color: 0xffffff
					});
				});

				// diametro *

				const xyxPointsArraysTop = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const radius: number = 0.09423;
				// diametro *

				const startSphereGeometries = xyxPointsArraysTop.map((arr, index) => {
					const startMeasures = arr[0];
					const startGeometry = new THREE.SphereGeometry(radius, 32, 16);
					startGeometry.translate(
						startMeasures[0],
						startMeasures[1],
						startMeasures[2]
					);
					return startGeometry;
				});

				const endSphereGeometries = xyxPointsArraysTop.map((arr, index) => {
					const endMeasures = arr[arr.length - 1];
					const endGeometry = new THREE.SphereGeometry(radius, 32, 16);
					endGeometry.translate(endMeasures[0], endMeasures[1], endMeasures[2]);
					return endGeometry;
				});

				const tubesGeometries = xyxPointsArraysTop.map((arr, arrIndex) => {
					const vect3Arr: THREE.Vector3[] = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
					curveTop.curveType = "catmullrom";
					const geometry = new THREE.TubeGeometry(
						curveTop,
						(arr.length - 1) * 2,
						radius,
						20,
						false
					);
					return geometry;
				});

				const tubeMeshes = tubesGeometries.map((geometry) => {
					return new THREE.Mesh(geometry, goldMaterial);
				});

				const sphereMeshes = [
					...startSphereGeometries,
					...endSphereGeometries
				].map((geometry) => {
					return new THREE.Mesh(geometry, goldMaterial);
				});

				const totalMeshes = [...sphereMeshes, ...tubeMeshes];

				const meshesObj: {
					bound: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshPhysicalMaterial,
						THREE.Object3DEventMap
					>[];
				} = {
					bound: totalMeshes
				};

				if (!ignore) {
					setBreakLines(meshesObj);
				}
			} catch (error) {
				console.log("error boundary");
				console.log(error);
			}
		}

		startAnalyzeBreakLines();

		async function startAnalyzeInternalBound() {
			try {
				const boundaryData: { features: BoundaryFeature[]; type: "Feature" } =
					await analyzeInternalBound();

				const boundaryFeaturesArr = await boundaryData["features"];

				const filteredBoundary = boundaryFeaturesArr.filter(
					(elem: BoundaryFeature) => {
						if (elem.geometry) {
							return true;
						} else {
							return false;
						}
					}
				);

				const landPointsArraysMax = await filteredBoundary.map((elem: any) => {
					return drawThreeGeo(elem, 2.333, "sphere", {
						color: 0xffffff
					});
				});

				const xyxPointsArraysTop = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const initialArray = xyxPointsArraysTop[0];

				const updateFirstElem = initialArray[0].filter((item, index) => {
					if (index !== 0) {
						return true;
					} else {
						return false;
					}
				});

				const cleanArr = initialArray[0].slice(1);

				const updateInitial = [...updateFirstElem, ...cleanArr];
				const updateInitialArray = [updateInitial, ...initialArray.slice(1)];

				const startSphereGeometries = xyxPointsArraysTop.map((arr, index) => {
					const startMeasures = arr[0];
					const startGeometry = new THREE.SphereGeometry(
						initialArray.length > 223
							? 0.0263
							: initialArray.length > 100
							? 0.0235
							: 0.0203,
						32,
						16
					);
					// diametro *

					startGeometry.translate(
						startMeasures[0],
						startMeasures[1],
						startMeasures[2]
					);
					return startGeometry;
				});

				const endSphereGeometries = xyxPointsArraysTop.map((arr, index) => {
					const endMeasures = arr[arr.length - 1];
					const endGeometry = new THREE.SphereGeometry(
						initialArray.length > 223
							? 0.0263
							: initialArray.length > 100
							? 0.0235
							: 0.0203,
						32,
						16
					);
					// diametro *

					endGeometry.translate(endMeasures[0], endMeasures[1], endMeasures[2]);
					return endGeometry;
				});

				const tubesGeometries = xyxPointsArraysTop.map((arr, arrIndex) => {
					const vect3Arr: THREE.Vector3[] = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					const radius: number =
						arr.length > 223 ? 0.0263 : arr.length > 100 ? 0.0235 : 0.0203;
					// diametro *

					const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
					curveTop.curveType = "catmullrom";
					const geometry = new THREE.TubeGeometry(
						curveTop,
						(arr.length - 1) * 2,
						radius,
						20,
						false
					);
					return geometry;
				});

				const tubeMeshes = tubesGeometries.map((geometry) => {
					return new THREE.Mesh(geometry, goldMaterial);
				});

				const sphereMeshes = [
					...startSphereGeometries,
					...endSphereGeometries
				].map((geometry) => {
					return new THREE.Mesh(geometry, goldMaterial);
				});

				const totalMeshes = [...sphereMeshes, ...tubeMeshes];

				const meshesObj: {
					bound: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshPhysicalMaterial,
						THREE.Object3DEventMap
					>[];
				} = {
					bound: totalMeshes
				};

				if (!ignore) {
					setInternalLines(meshesObj);
				}
			} catch (error) {
				console.log("error boundary");
				console.log(error);
			}
		}

		startAnalyzeInternalBound();

		const extGoldMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xb58629,
			emissive: 0xb58629,
			emissiveIntensity: 0.0,
			envMap: goldOpaqueTexture,
			envMapIntensity: 1.0,
			normalMap: goldOpaqueNormals,
			metalness: 0.97,
			metalnessMap: goldOpaqueMetalness,
			roughness: 0.0323,
			roughnessMap: goldOpaqueRoughness,
			sheenRoughnessMap: goldOpaqueRoughness,
			sheenRoughness: 0.23,
			bumpMap: goldOpaqueRoughness,
			reflectivity: 1.0,
			specularIntensity: 1,
			wireframe: false,
			depthTest: true,
			depthWrite: true,
			opacity: 1,
			alphaTest: 1,
			fog: true
		});

		const intGoldMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xb58629,
			emissive: 0xb58629,
			emissiveIntensity: 0,

			normalMap: goldOpaqueNormals,
			metalness: 0.97,
			metalnessMap: goldOpaqueMetalness,
			displacementScale: 0,
			roughness: 0.0323,
			roughnessMap: goldOpaqueRoughness,
			sheenRoughnessMap: goldOpaqueRoughness,
			sheenRoughness: 0.223,
			bumpMap: goldOpaqueRoughness,
			reflectivity: 1.0,
			specularIntensity: 1,
			wireframe: false,
			depthTest: true,
			depthWrite: true,
			opacity: 1,
			alphaTest: 1,
			fog: true
		});

		async function startAnalyzeBoundary() {
			try {
				const boundaryData: { features: BoundaryFeature[]; type: "Feature" } =
					await analyzeBoundaryLines();

				const boundaryFeaturesArr = await boundaryData["features"];

				const filteredBoundary = boundaryFeaturesArr.filter(
					(elem: BoundaryFeature) => {
						if (elem.geometry) {
							return true;
						} else {
							return false;
						}
					}
				);

				const landPointsArraysMax = await filteredBoundary.map((elem: any) => {
					return drawThreeGeo(elem, 2.3223, "sphere", {
						color: 0xffffff
					});
				});
				// diametro *

				const landPointsArraysMin = await filteredBoundary.map((elem: any) => {
					return drawThreeGeo(elem, 2.3023, "sphere", {
						color: 0xffffff
					});
				});

				const xyxPointsArraysTop = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const xyxPointsArraysBottom = landPointsArraysMin.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const tubesGeometries = xyxPointsArraysTop.map((arr) => {
					const vect3Arr = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					const radius = 0.0223;

					const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
					curveTop.curveType = "catmullrom";
					const geometry = new THREE.TubeGeometry(
						curveTop,
						(arr.length - 1) * 2,
						radius,
						20,
						true
					);
					return geometry;
				});

				const tubesGeometriesBase = xyxPointsArraysBottom.map((arr) => {
					const vect3Arr = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					const radius = 0.0423;

					const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
					curveTop.curveType = "catmullrom";
					const geometry = new THREE.TubeGeometry(
						curveTop,
						(arr.length - 1) * 2,
						radius,
						20,
						true
					);
					return geometry;
				});

				const tubeMeshes = tubesGeometries.map((geometry) => {
					return new THREE.Mesh(geometry, extGoldMaterial);
				});

				const tubeMeshesBase = tubesGeometriesBase.map((geometry) => {
					return new THREE.Mesh(geometry, intGoldMaterial);
				});

				const meshesObj: {
					visibleBound: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshPhysicalMaterial,
						THREE.Object3DEventMap
					>[];
					baseBound: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshPhysicalMaterial,
						THREE.Object3DEventMap
					>[];
				} = {
					visibleBound: tubeMeshes,
					baseBound: tubeMeshesBase
				};

				if (!ignore) {
					setBoundaryLines(meshesObj);
				}
			} catch (error) {
				console.log("error boundary");
				console.log(error);
			}
		}

		startAnalyzeBoundary();

		const rakuBlackTexture = new THREE.TextureLoader().load(rakuBlackImg.src);

		async function startAnalyzeLand() {
			const texture = new THREE.TextureLoader().load(rakuBlackNormal.src);

			try {
				const data: any = await analyzeLandsData();
				const landsData: LandFeature[] = await data;
				const landPointsArraysMax = await landsData.map((elem: any) => {
					return drawThreeGeo(elem, 2.35, "sphere", {
						color: 0xffffff
					});
				});
				// diametro *

				const xyxPointsArrays = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const geometries = xyxPointsArrays.map((arr) => {
					const newVertices: number[] = [];

					arr.map((item) => {
						newVertices.push(item[0], item[1], item[2]);
					});

					const data = Earcut.triangulate(newVertices, undefined, 3);

					const float32Vert = new Float32Array([
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices,
						...newVertices
					]);
					const indicesPart1 = [...data];
					// const indicesPart2 = data.toReversed();
					const indicesPart2 = data.reverse();
					const totalIndeces = [
						...indicesPart1,
						...indicesPart2,
						...indicesPart1,
						...indicesPart2,
						...indicesPart1,
						...indicesPart2
					];

					const indices = new Uint16Array(totalIndeces);
					const uvs = new Float32Array([...totalIndeces]);

					const normals = float32Vert.slice();

					const geometry = new THREE.BufferGeometry();

					geometry.setIndex(new THREE.BufferAttribute(indices, 1));

					geometry.setAttribute(
						"position",
						new THREE.BufferAttribute(float32Vert, 3)
					);

					geometry.setAttribute(
						"normal",
						new THREE.Float32BufferAttribute(normals, 3)
					);

					geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 3));

					return geometry;
				});

				const lacherMaterial = new THREE.MeshPhysicalMaterial({
					color: 0x011235,
					map: rakuBlackTexture,
					emissive: 0x011235,
					emissiveIntensity: 0.75,
					roughness: 0.8,
					metalness: 0.01,
					ior: 1.5,
					transmission: 0.1,
					opacity: 1,
					clearcoat: 0.5,
					clearcoatRoughness: 0.3,
					depthTest: true,
					depthWrite: true,
					alphaTest: 1,
					fog: true,
					thickness: 10,
					reflectivity: 0.23,
					sheen: 0.1,
					flatShading: false
				});

				const meshes = geometries.map((geometry) => {
					return new THREE.Mesh(geometry, lacherMaterial);
				});

				const coupleMeshes: {
					surfaces: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshStandardMaterial,
						THREE.Object3DEventMap
					>[];
				} = {
					surfaces: meshes
				};

				if (!ignore) {
					setLandCoupleMeshes(coupleMeshes);
				}
			} catch (error) {
				console.log("land error");
				console.log(error);
			}
		}
		startAnalyzeLand();

		return () => {
			ignore = true;
		};
	}, []);

	function SunLight({ position }: { position: [number, number, number] }) {
		const dirLightRef = useRef<THREE.DirectionalLight | null>(null!);

		const { gl, camera, scene } = useThree();

		const dirLight = new THREE.DirectionalLight(0xa0b0f0, 20.23);
		dirLight.position.set(position[0], position[1], position[2]).normalize();

		useFrame(() => {
			if (dirLightRef.current) {
				dirLightRef.current.position.copy(camera.position);
			}
		});

		return (
			<>
				<primitive object={dirLight} ref={dirLightRef} />
			</>
		);
	}

	// function TargetMarker({ target }: { target: SearchTargetType | null }) {
	// 	const coordinates = getTargetCoordinates(target);

	// 	if (!coordinates) {
	// 		return null;
	// 	}

	// 	const position = latLonToVector3(
	// 		coordinates.latitude,
	// 		coordinates.longitude,
	// 		2.55
	// 	);

	// 	return (
	// 		<mesh position={[position.x, position.y, position.z]}>
	// 			<sphereGeometry args={[0.055, 32, 32]} />
	// 			<meshStandardMaterial
	// 				color="#7df9ff"
	// 				emissive="#38d9ff"
	// 				emissiveIntensity={2}
	// 				roughness={0.25}
	// 				metalness={0.2}
	// 			/>
	// 		</mesh>
	// 	);
	// }

	// Arrivato scorsa chat
	//  punto 6. Rotazione: usa lo stesso punto del marker --->

	return (
		<Canvas frameloop="demand">
			<Stars
				radius={30}
				depth={223}
				count={460}
				factor={10}
				saturation={0}
				fade
				speed={0.7}
			/>

			<ambientLight color={0xffffff} intensity={2.023} />

			<SunLight position={[0, 0, 0]} />

			<GlobeOrbitControls />

			<AnimatedGlobeGroup
				globeTarget={globeTarget}
				landCoupleMeshes={landCoupleMeshes}
				boundaryLines={boundaryLines}
				internalLines={internalLines}
				breakLines={breakLines}
			/>

			{/* <fogExp2 attach="fog" args={[0x000000, 0.000023]} /> */}
			{/* <NewEarthWaterMesh width={2.78} height={2.78} /> */}
		</Canvas>
	);
}

function GlobeOrbitControls() {
	const { invalidate } = useThree();

	return (
		<OrbitControls
			autoRotate={false}
			// rotateSpeed={0.23}
			enableDamping={true}
			dampingFactor={0.04}
			enableZoom={false}
			enablePan={false}
			enableRotate={true}
			minPolarAngle={Math.PI / 2}
			maxPolarAngle={Math.PI / 2}
			onChange={() => invalidate()}
		/>
	);
}

function AnimatedGlobeGroup(props: AnimatedGlobeGroupProps) {
	const {
		globeTarget,
		landCoupleMeshes,
		boundaryLines,
		internalLines,
		breakLines
	} = props;

	const groupRef = useRef<THREE.Group | null>(null);

	const { camera, invalidate } = useThree();
	const isAnimatingRef = useRef<boolean>(false);

	const targetQuaternionRef = useRef(new THREE.Quaternion());
	const targetScaleRef = useRef(new THREE.Vector3(1, 1, 1));

	useEffect(() => {
		const targetLocalPoint = getTargetPointWithDrawThreeGeo(globeTarget, 1);

		if (!targetLocalPoint) {
			return;
		}

		const targetPointWithBaseRotation = targetLocalPoint
			.clone()
			.applyEuler(baseLandRotation)
			.normalize();

		// const fromPoint = new THREE.Vector3(0, 0, 1);

		const fromPoint = camera.position.clone().normalize();

		const nextQuaternion = new THREE.Quaternion().setFromUnitVectors(
			targetPointWithBaseRotation,
			fromPoint
		);

		// const nextQuaternion = getQuaternionForTarget({
		// 	target: globeTarget,
		// 	baseRotation: baseLandRotation
		// });

		// if (!nextQuaternion) {
		// 	return;
		// }

		targetQuaternionRef.current.copy(nextQuaternion);
		targetScaleRef.current.set(1.08, 1.08, 1.08);

		isAnimatingRef.current = true;
		invalidate();

		// if (nextQuaternion) {
		// 	return;
		// }

		// targetQuaternionRef.current.identity();
		// targetScaleRef.current.set(1, 1, 1);
	}, [globeTarget]);

	useFrame(() => {
		if (!groupRef.current) {
			return;
		}

		groupRef.current.quaternion.slerp(targetQuaternionRef.current, 0.045);
		groupRef.current.scale.lerp(targetScaleRef.current, 0.035);

		const quaternionAngle = groupRef.current.quaternion.angleTo(
			targetQuaternionRef.current
		);

		const scaleDistance = groupRef.current.scale.distanceTo(
			targetScaleRef.current
		);

		if (quaternionAngle < 0.002 && scaleDistance < 0.002) {
			groupRef.current.quaternion.copy(targetQuaternionRef.current);
			groupRef.current.scale.copy(targetScaleRef.current);
			isAnimatingRef.current = false;
			return;
		}

		invalidate();
	});

	return (
		<group ref={groupRef}>
			<group rotation={baseLandRotationArray} scale={[0.8, 0.8, 0.8]}>
				{landCoupleMeshes !== null &&
					landCoupleMeshes["surfaces"].map((mesh, index) => {
						return <primitive key={`${mesh.uuid}${index}`} object={mesh} />;
					})}

				{boundaryLines !== null &&
					boundaryLines["visibleBound"].map((elem, index) => {
						return <primitive key={elem.uuid} object={elem} />;
					})}

				{boundaryLines !== null &&
					boundaryLines["baseBound"].map((elem, index) => {
						return (
							// <>
							<primitive key={elem.uuid} object={elem} />
						);
					})}

				{internalLines !== null &&
					internalLines["bound"].map((elem, index) => {
						return <primitive key={elem.uuid} object={elem} />;
					})}

				{breakLines !== null &&
					breakLines["bound"].map((elem, index) => {
						return <primitive key={elem.uuid} object={elem} />;
					})}

				<TargetMarker target={globeTarget} />
				<spotLight args={[0xa0b0f0, 20.23]} />
			</group>

			<group rotation={baseWaterRotationArray}>
				<NewEarthWaterMesh width={2.78} height={2.78} />
			</group>
		</group>
	);
}

function getTargetPointWithDrawThreeGeo(
	target: SearchTargetType | null,
	radius: number
) {
	const coords = getTargetCoordinates(target);

	if (!coords) {
		return null;
	}

	const pointFeature: GeoJSON.Feature = {
		type: "Feature",
		properties: {},
		geometry: {
			type: "Point",
			coordinates: [coords.longitude, coords.latitude]
		}
	};

	const points = drawThreeGeo(pointFeature, radius, "sphere", {
		color: 0xffffff
	});

	const firstPoint = points?.[0]?.geom;

	if (!firstPoint) {
		return null;
	}

	return new THREE.Vector3(firstPoint.x, firstPoint.y, firstPoint.z);
}

function TargetMarker({ target }: { target: SearchTargetType | null }) {
	const position = getTargetPointWithDrawThreeGeo(target, 3);

	if (!position) {
		return null;
	}

	return (
		<>
			<mesh position={[position.x, position.y, position.z]} renderOrder={999}>
				<sphereGeometry args={[0.03, 32, 32]} />
				<meshStandardMaterial
					color="#7df9ff"
					emissive="#38d9ff"
					// emissiveIntensity={2.4}
					roughness={0.25}
					metalness={0.2}
					depthTest={false}
					depthWrite={false}
				/>
			</mesh>

			<mesh position={[position.x, position.y, position.z]} renderOrder={999}>
				<sphereGeometry args={[0.05, 32, 32]} />
				<meshBasicMaterial
					color="#ff2323"
					// opacity={0.823}
					// emissive="#ff2323"
					// emissiveIntensity={2.3}
					// roughness={0.75}
					// metalness={0.1}
					// depthTest={false}
					// depthWrite={false}
				/>
			</mesh>
		</>
	);
}

// ---> ELIMINARE CONSOLE.LOG <---

// usare BufferGeometryLoader per avere una callback durante il caricamento
// per avere una progress bar o spinner

// diametro *
// 2.75
// const earthGeometry = new THREE.SphereGeometry(2.75, 64);

// const rakuBlackRoughMap = useTexture(rakuBlackRoughness.src);

// rakuBlackTexture.wrapS = THREE.RepeatWrapping;
// rakuBlackTexture.wrapT = THREE.RepeatWrapping;
// rakuBlackTexture.repeat.set(1, 1);

// rotation-x={THREE.MathUtils.degToRad(23.5)}
// rotation-y={THREE.MathUtils.degToRad(0)}

// ottimo blu --->
// color={0x23a8e0}
// emissiveIntensity={0.1}
// map={rakuBlackTexture}
// normalMap={rakuBlackNormMap}
// displacementMap={rakuBlackHeightMap}
// displacementScale={0}
// aoMap={rakuBlackAmbOccMap}
// aoMapIntensity={1}
// clearcoatMap={rakuBlackNormMap}
// clearcoatNormalMap={rakuBlackNormMap}
// alphaTest={1}
// clearcoat={0.65}
// clearcoatRoughness={0.203}
// wireframe={false}
// roughness={0.523}
// metalness={0.01}
// opacity={1}
// fog={true}
// // ...colore
// thickness={10}
// flatShading={false}
// ior={1.5}
// depthTest={true}
// depthWrite={true}
// visible={true}
// transparent={false}
// alphaHash={true}
// transmission={0.1}
// bumpScale={0}

// console.log(totalMeshes);

// diametro *

// 2.842

// const cleanXyxPointsArrays = [
// 	updateInitialArray,
// 	...xyxPointsArraysTop.slice(1)
// ];

// const radius = arr.length > 1000 ? 0.0235 : 0.0203;
// const radius = arr.length * 0.000203;
// console.log(arr.length);

// const radius = arr.length > 1000 ? 0.0423 : 0.0223;
// Test Radius

// diametro *

// const radius: number =
// 	arr.length > 223 ? 0.0263 : arr.length > 100 ? 0.0235 : 0.0203;
// diametro *
// tubegeometry = new THREE.TubeGeometry(path, tubolarsegments, radius, radialsegments)

// const radius = arr.length > 1000 ? 0.0423 : 0.0223;
// Test Radius

// diametro *

// const timer = Date.now() * 0.00025;

// dirLight.position.set(-2.23, 0, 0);

// dirLightRef.current.position.set(-0.323, 0, 1);

// dirLightRef.current.position.set(0, 0, 0);
// dirLight.position.set(-0.323, 0, 1).normalize();

// capire questo

{
	/* sphereGeometry */
}

// const geometry = mesh.geometry;

// rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
// rotation-z={THREE.MathUtils.degToRad(-100)}
// rotation-y={THREE.MathUtils.degToRad(0)}

// <>

// <Canvas frameloop="demand">

// autoRotateSpeed={0.23}
// zoom0={1.5}
// minZoom={1}
// maxZoom={2}
// zoomSpeed={0.23}
{
	/* <ambientLight color={0xffffff} intensity={1} /> */
}

{
	/* {landCoupleMeshes !== null &&
				landCoupleMeshes["surfaces"].map((mesh, index) => {
					const geometry = mesh.geometry;

					return (
						<primitive
							key={`${mesh.uuid}${index}`}
							object={mesh}
							rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
							rotation-z={THREE.MathUtils.degToRad(-100)}
							rotation-y={THREE.MathUtils.degToRad(0)}
						/>
					);
				})}

			{boundaryLines !== null &&
				boundaryLines["visibleBound"].map((elem, index) => {
					return (
						// <>
						<primitive
							key={elem.uuid}
							object={elem}
							rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
							rotation-z={THREE.MathUtils.degToRad(-100)}
							rotation-y={THREE.MathUtils.degToRad(0)}
							// scale={[equatDiameter, polarDiameter, equatDiameter]}
						/>
					);
				})}

			{boundaryLines !== null &&
				boundaryLines["baseBound"].map((elem, index) => {
					return (
						// <>
						<primitive
							key={elem.uuid}
							object={elem}
							rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
							rotation-z={THREE.MathUtils.degToRad(-100)}
							rotation-y={THREE.MathUtils.degToRad(0)}
							// scale={[equatDiameter, polarDiameter, equatDiameter]}
						/>
					);
				})}

			{internalLines !== null &&
				internalLines["bound"].map((elem, index) => {
					return (
						// <>
						<primitive
							key={elem.uuid}
							object={elem}
							rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
							rotation-z={THREE.MathUtils.degToRad(-100)}
							rotation-y={THREE.MathUtils.degToRad(0)}
						/>
					);
				})}

			{breakLines !== null &&
				breakLines["bound"].map((elem, index) => {
					return (
						// <>
						<primitive
							key={elem.uuid}
							object={elem}
							rotation-x={THREE.MathUtils.degToRad(-25 - 23.5)}
							rotation-z={THREE.MathUtils.degToRad(-100)}
							rotation-y={THREE.MathUtils.degToRad(0)}
						/>
					);
				})} */
}
