"use client";

import { LandFeature } from "@/app/utilities/types/types";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Earcut } from "three/src/extras/Earcut.js";
import { drawThreeGeo } from "@/app/utilities/graphicLibraries/threeGeoJSON";

import type {
	AnimatedGlobeGroupProps,
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
import rakuBlackHeight from "@/public/textures/heightTextures/rakuBlackHeight.png";
import rakuBlackAmbOcc from "@/public/textures/ambientOcclusionTextures/rakuBlackAmbientOccMap.png";
import { getTargetCoordinates } from "@/app/features/globe/globe.utils";

function detectIsMobile3D() {
	if (typeof window === "undefined") {
		return false;
	}

	return window.matchMedia(
		"(max-width: 767px), (pointer: coarse), (hover: none)"
	).matches;
}

function useIsMobile3D() {
	const [isMobile3D, setIsMobile3D] = useState<boolean>(detectIsMobile3D);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			"(max-width: 767px), (pointer: coarse), (hover: none)"
		);

		function updateMobileState() {
			setIsMobile3D(mediaQuery.matches);
		}

		updateMobileState();

		mediaQuery.addEventListener("change", updateMobileState);

		return () => {
			mediaQuery.removeEventListener("change", updateMobileState);
		};
	}, []);

	return isMobile3D;
}

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
		</mesh>
	);
}

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

				const xyxPointsArraysTop = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				const radius: number = 0.09423;

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

					endGeometry.translate(endMeasures[0], endMeasures[1], endMeasures[2]);
					return endGeometry;
				});

				const tubesGeometries = xyxPointsArraysTop.map((arr, arrIndex) => {
					const vect3Arr: THREE.Vector3[] = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					const radius: number =
						arr.length > 223 ? 0.0263 : arr.length > 100 ? 0.0235 : 0.0203;

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
				console.log(error);
			}
		}

		startAnalyzeBoundary();

		const rakuBlackTexture = new THREE.TextureLoader().load(rakuBlackImg.src);

		async function startAnalyzeLand() {
			try {
				const data: any = await analyzeLandsData();
				const landsData: LandFeature[] = await data;
				const landPointsArraysMax = await landsData.map((elem: any) => {
					return drawThreeGeo(elem, 2.35, "sphere", {
						color: 0xffffff
					});
				});

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

		const { camera } = useThree();

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

	const isMobile3D = useIsMobile3D();

	const canvasDpr: [number, number] = isMobile3D ? [1, 1.25] : [1, 1.75];

	return (
		<Canvas
			frameloop="demand"
			dpr={canvasDpr}
			gl={{
				antialias: !isMobile3D,
				powerPreference: "high-performance",
				stencil: false,
				preserveDrawingBuffer: false
			}}
		>
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

			<GlobeOrbitControls isMobile3D={isMobile3D} />

			<AnimatedGlobeGroup
				globeTarget={globeTarget}
				landCoupleMeshes={landCoupleMeshes}
				boundaryLines={boundaryLines}
				internalLines={internalLines}
				breakLines={breakLines}
			/>
		</Canvas>
	);
}

function GlobeOrbitControls({ isMobile3D }: { isMobile3D: boolean }) {
	const { invalidate } = useThree();

	return (
		<OrbitControls
			autoRotate={false}
			enableDamping={!isMobile3D}
			dampingFactor={isMobile3D ? 0 : 0.035}
			enableZoom={false}
			enablePan={false}
			enableRotate={true}
			rotateSpeed={isMobile3D ? 0.35 : 0.55}
			minPolarAngle={Math.PI / 2}
			maxPolarAngle={Math.PI / 2}
			touches={{
				ONE: THREE.TOUCH.ROTATE
			}}
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

		const fromPoint = camera.position.clone().normalize();

		const nextQuaternion = new THREE.Quaternion().setFromUnitVectors(
			targetPointWithBaseRotation,
			fromPoint
		);

		targetQuaternionRef.current.copy(nextQuaternion);
		targetScaleRef.current.set(1.08, 1.08, 1.08);

		isAnimatingRef.current = true;
		invalidate();
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
						return <primitive key={elem.uuid} object={elem} />;
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

	const startPoint = new THREE.Vector3(0, 0, 0);
	const endPoint = new THREE.Vector3(position.x, position.y, position.z);

	const innerRadiusFactor = 0.75;
	const innerPoint = endPoint.clone().multiplyScalar(innerRadiusFactor);

	const direction = endPoint.clone().sub(innerPoint);
	const segLength = direction.length();

	if (segLength === 0) {
		return null;
	}

	const midPoint = endPoint.clone().add(innerPoint).multiplyScalar(0.5);

	const quaternion = new THREE.Quaternion().setFromUnitVectors(
		new THREE.Vector3(0, 1, 0),
		direction.clone().normalize()
	);
	return (
		<>
			<mesh position={[position.x, position.y, position.z]} renderOrder={999}>
				<sphereGeometry args={[0.0523, 32, 32]} />
				<meshStandardMaterial
					color="#237640"
					emissive="#50C878"
					emissiveIntensity={0.323}
					roughness={0.25}
					metalness={0.8}
					depthTest={true}
					depthWrite={true}
				/>
			</mesh>

			<mesh
				position={[midPoint.x, midPoint.y, midPoint.z]}
				quaternion={quaternion}
				renderOrder={998}
			>
				<cylinderGeometry args={[0.01, 0.01, segLength, 23, 1]} />
				<meshStandardMaterial
					color="#237640"
					emissive="#237640"
					emissiveIntensity={0.23}
					roughness={0.15}
					metalness={0.8}
					depthTest={true}
					depthWrite={true}
				/>
			</mesh>
		</>
	);
}
