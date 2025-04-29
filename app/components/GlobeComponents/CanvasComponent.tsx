"use client";

// import testFile from "@/public/geoData/yukon.json";

import {
	StructureData,
	FeatureCollection,
	LandFeature
} from "@/app/utilities/types/types";

import { useState, useRef, useEffect, FC, use } from "react";

import * as THREE from "three";

// import image from "@/public/textures/2k_earth_nightmap.jpg";
// import imageDay from "@/public/textures/8k_earth_daymap.jpg";
// import blackCeramic from "@/public/testtexture/black-marble-patterned-texture-background-marble-thailand-abstract-natural-marble-black-white-design.jpg";
// import blueMarble from "@/public/testtexture/marble_39_basecolor-1K.png";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/Addons.js";
import {
	Canvas,
	useFrame,
	ThreeElements,
	useLoader,
	useThree
} from "@react-three/fiber";

import { Earcut } from "three/src/extras/Earcut.js";
// import earcut

// import rawGeoData from "@/public/geoData/geoDataSpecsTwo.json";
import rawGeoData from "@/public/geoData/rivers.json";
// import rawGeoData from "@/public/geoData/geoDataSpecsThree.json";
// import rawGeoData from "@/public/coastlines/ne_10m_coastline.json";

import { drawThreeGeo } from "@/app/utilities/libraries/threeGeoJSON";

import Continent3DComponent from "../3DComponents/Continent3DComponent";
import jsonData from "@/public/geoData/ne_110m_land.json";

// import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

// import textureEarth from "../../textures/2k_earth_nightmap.jpg";

// import textureImage from "@/public/2k_earth_nightmap.jpg";

// algoritmo divisione territori MultiPolygon

// const fileConst = testFile;

// const objsTerr = fileConst["features"][0]["geometry"]["coordinates"].map(
// 	(elem) => {
// 		// elem parentesi grafe blu
// 		return {
// 			type: "Feature",
// 			properties: {
// 				GU_A3: "CAN-633",
// 				NAME: "British Columbia"
// 			},
// 			geometry: {
// 				type: "MultiPolygon",
// 				coordinates: [elem]
// 			}
// 		};
// 	}
// );

// // objsTerr.map((elem) => console.log(elem));

// const newObj = {
// 	type: "FeatureCollection",
// 	features: [...objsTerr]
// };

// console.log(newObj);

const generalExtrSettings = {
	curveSegments: 12,
	depth: 0.1023,
	bevelEnabled: false,
	steps: 123,
	bevelSize: 0,
	bevelOffset: 0
};

function createGeometry({
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
		// extrudePath?: THREE.QuadraticBezierCurve;
	};
}) {
	const shape = new THREE.Shape();

	// const shapeCurve = new THREE.Curve()

	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(-0.001, 0, 0.01),
		new THREE.Vector3(-0.0003, 0.0003, 0.0003),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0.0002, -0.0002, 0.0002),
		new THREE.Vector3(0.001, 0, 0.001)
	]);

	const points = curve.getPoints(50);
	const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);

	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// Create the final object to add to the scene
	const splineObject = new THREE.Line(curveGeometry, material);

	const extrudeSettings =
		// {
		extrSettings;
	// extrudePath: curve
	// };

	if (continentData !== null) {
		shape.moveTo(initialPoints.x, initialPoints.y);
		const data = continentData;
		const continentCoords = data.map((group) => {
			return { x: group[0], y: group[1] };
		});

		const lastCoords: { x: number; y: number } =
			continentCoords[continentCoords.length - 1];

		// const arrBuffer = new ArrayBuffer(continentCoords.length);
		// const arrData = new Float64Array(arrBuffer);

		const vertices = [];

		for (let elem of continentCoords) {
			const x = elem["x"];
			const y = elem["y"];
			shape.lineTo(x / 23, y / 23);
			vertices.push(x / 23, y / 23);
		}

		const vertGeometry = new THREE.BufferGeometry();
		vertGeometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(vertices, 2)
		);

		// console.log(typeof shape.getPoints());

		// const arr = new Float32Array(shape.getPoints());

		// new riattivare --->
		// const center = new THREE.Vector2(initialPoints.x, initialPoints.y);
		// const rad = (180 / 180) * Math.PI;
		// const points = shape
		// 	.getPoints()
		// 	.map((vertices) => vertices.rotateAround(center, rad));
		// const newShape = new THREE.Shape(points);
		// const geometry = new THREE.ExtrudeGeometry(newShape, extrudeSettings);
		// return geometry;
		// <--- new riattivare

		// shape.moveTo(lastCoords.x, lastCoords.y);
	}
	const geometry = new THREE.ExtrudeGeometry(shape, extrSettings);
	return geometry;

	// GUARDARE shapes in extrudeGeometry docs

	// const g = new THREE.ExtrudeGeometry()
}

const material = new THREE.MeshStandardMaterial({
	color: "#2373c4",
	wireframe: false,
	roughness: 0.5,
	metalness: 0.8,
	depthTest: true,
	depthWrite: true
});

import type { ContinentInfo } from "@/app/utilities/types/types";
import {
	DragControls,
	OrbitControls,
	PerspectiveCamera,
	PresentationControls,
	Caustics,
	MeshRefractionMaterial,
	useEnvironment
} from "@react-three/drei";
import Background from "three/src/renderers/common/Background.js";
import getStarfield from "@/app/utilities/effects/starfield";

// import { MeshRefractionMaterial } from "@react-three/drei/materials/MeshRefractionMaterial.js";

const equatDiameter = 12756.274 / 10000;
const polarDiameter = 12713.504 / 10000;

// usare BufferGeometryLoader per avere una callback durante il caricamento
// per avere una progress bar o spinner

function EarthShapeExt(
	// { europeData }: { europeData: [number, number][] | null },
	props: ThreeElements["mesh"]
) {
	// const shapeRef = useRef<THREE.Mesh>(null!);

	// const state = useThree();

	// // console.log(state.size.height);

	// const diameter: number =
	// 	((state.size.width > state.size.height
	// 		? state.size.height
	// 		: state.size.width) *
	// 		2) /
	// 	3;
	// console.log(diameter);

	// Diametro base Circonferenza
	const sphereShape = new THREE.SphereGeometry(2.75, 16, 8);
	const earthShape = new THREE.IcosahedronGeometry(2.75, 4);

	// console.log(earthShape.attributes);

	// const vertices = earthShape.getAttribute("position").array;
	// console.log(vertices);

	// const verticesOfCube = [
	// 	-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
	// 	-1, 1, 1
	// ];

	// const earthShape = new THREE.IcosahedronGeometry(2.75, 6);

	// DA RIVALUTARE 28/04

	// const verticesOfCube = [
	// 	-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
	// 	-1, 1, 1
	// ];

	// const indices = [
	// 	2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
	// 	3, 7, 7, 6, 2
	// ];

	// console.log(indices.length);

	// const totalIndeces = [...indices];

	// const indicesOfFaces = new Uint16Array(totalIndeces);

	// const normals = totalIndeces;
	// earthShape.setAttribute(
	// 	"normal",
	// 	new THREE.Float32BufferAttribute(normals, 1)
	// );

	// const float32Vert = new Float32Array(verticesOfCube);

	// const uvs = new Float32Array(totalIndeces);
	// earthShape.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 1));
	// // const earthShape = new THREE.PolyhedronGeometry(
	// // 	verticesOfCube,
	// // 	indices,
	// // 	2.75,
	// // 	6
	// // );

	// // const positionAttribute = sphereShape.getAttribute("index");

	// console.log(earthShape.attributes);

	// const vertexArr = [];

	// earthShape.setAttribute(
	// 	"position",
	// 	new THREE.BufferAttribute(earthShape.attributes.position.array, 3)
	// );

	// // for (
	// // 	let vertexIndex = 0;
	// // 	vertexIndex < positionAttribute.count;
	// // 	vertexIndex++
	// // ) {
	// // 	vertexArr.push(vertex.fromBufferAttribute(positionAttribute, vertexIndex));
	// // 	// earthShape.setAttribute(
	// // 	// 	"position",
	// // 	// 	new THREE.BufferAttribute(vertex, 3)
	// // 	// );
	// // 	// now do something with vertex
	// // }

	// // const indices = new Uint16Array([
	// // 	2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
	// // 	3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4
	// // ]);
	// // // const indices = new Uint16Array(earthShape.getAttribute("normal").array);
	// earthShape.setIndex(new THREE.BufferAttribute(vertices, 1));

	// const t = (1 + Math.sqrt(5)) / 2;

	// const vertices = [
	// 	-1,
	// 	t,
	// 	0,
	// 	1,
	// 	t,
	// 	0,
	// 	-1,
	// 	-t,
	// 	0,
	// 	1,
	// 	-t,
	// 	0,
	// 	0,
	// 	-1,
	// 	t,
	// 	0,
	// 	1,
	// 	t,
	// 	0,
	// 	-1,
	// 	-t,
	// 	0,
	// 	1,
	// 	-t,
	// 	t,
	// 	0,
	// 	-1,
	// 	t,
	// 	0,
	// 	1,
	// 	-t,
	// 	0,
	// 	-1,
	// 	-t,
	// 	0,
	// 	1
	// ];

	const indices = new Uint16Array([
		0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10,
		2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5,
		2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
	]);

	// const materialRef = useRef<THREE.ShaderMaterial | null>(null);

	// const earthShapeIndexed = BufferGeometryUtils.toCreasedNormals(earthShape, 0);
	// const earthShapeIndexed = BufferGeometryUtils.toTrianglesDrawMode(
	// 	earthShape,
	// 	THREE.TrianglesDrawMode
	// );

	// earthShapeIndexed.setIndex(new THREE.BufferAttribute(indices, 1));

	// earthShapeIndexed.setAttribute(
	// 	"position",
	// 	new THREE.BufferAttribute(new Float32Array(vertices), 3)
	// );

	// const earthShapeIndexed = BufferGeometryUtils.mergeVertices(earthShape, 0);

	// const earthShapeNotIndex = earthShapeIndexed.toNonIndexed();
	earthShape.computeVertexNormals();

	// earthShape.setIndex(new THREE.BufferAttribute(indices, 1));
	// console.log(indices);

	// DA RIVALUTARE 28/04
	// earthShapeIndexed.computeVertexNormals();

	// 24/04 controllare logica dal codice sorgentedi MeshRefractionMaterial

	// earthShape.toNonIndexed();

	// earthShape.scale(equatDiameter, polarDiameter, equatDiameter);

	// const textureEarth = useLoader(THREE.TextureLoader, blackCeramic.src);

	// const earthMaterial = new THREE.LineBasicMaterial({
	// 	color: "#F0F0F0"
	// 	// transparent: true,
	// 	// opacity: 0.1
	// });

	// const earthMaterial = new THREE.MeshStandardMaterial({
	// 	color:
	// })

	// const earthMaterial = new THREE.MeshRefractionMaterial()

	// const earthMaterial = new THREE.MeshPhysicalMaterial({
	// 	// color: 0x2373c4,
	// 	// blu zaffiro
	// 	// color: 0x0a2395,
	// 	// emissive: 0x0a2395,
	// 	color: 0x055f23,
	// 	emissive: 0x055f23,
	// 	emissiveIntensity: 0.35,
	// 	// map: textureEarth,
	// 	clearcoat: 3,
	// 	clearcoatRoughness: 0,
	// 	vertexColors: false,
	// 	// ior: 1,
	// 	reflectivity: 1,
	// 	specularIntensity: 1,
	// 	transparent: true,
	// 	opacity: 0.8,
	// 	alphaTest: 0.01,
	// 	flatShading: true,
	// 	wireframe: false,
	// 	roughness: 0.9,
	// 	metalness: 0.1,
	// 	fog: true,
	// 	visible: true,
	// 	depthTest: true,
	// 	depthWrite: true
	// });

	// const earthMesh = new THREE.Mesh(earthShape, earthMaterial);
	// // earthMesh.castShadow = true;

	// earthMesh.position.set(0, 0, 0);
	// const options = { ...generalExtrSettings };

	const env = useEnvironment({
		files:
			"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
	});

	// const materialRefr = new MeshRefractionMaterial({
	// 	envMap: env,
	// 			bounces={2.3}
	// 			ior={2.3}
	// 			aberrationStrength={0}
	// 			color={0x2373c4}
	// 			fastChroma={true}})

	// const env = new THREE.TextureLoader().load(
	// 	"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
	// );

	// const env = useLoader(
	// 	THREE.TextureLoader,
	// 	"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
	// );

	// const texture = useLoader(
	// 	RGBELoader,
	// 	"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
	// );
	// env.mapping = THREE.EquirectangularReflectionMapping;

	return (
		<>
			{/* <mesh
				{...props}
				uuid="earth-shape"
				ref={shapeRef}
				geometry={earthShape}
				material={earthMaterial}
				position={[0, 0, -3]}
			></mesh>
			<mesh {...props} geometry={geomBox} material={redMaterial}></mesh> */}

			{/* <Caustics
				backfaces
				color={config.color}
				position={[0, -0.5, 0]}
				lightSource={[5, 5, -10]}
				worldRadius={0.1}
				ior={1.8}
				backfaceIor={1.1}
				intensity={0.1}
			> */}
			{/* <primitive
				ref={shapeRef}
				object={earthMesh}
				// scale={[equatDiameter, polarDiameter, equatDiameter]}
			> */}

			<mesh geometry={earthShape} position={[0, 0, 0]}>
				<MeshRefractionMaterial
					// ref={materialRef}
					envMap={env}
					bounces={2.3}
					ior={2.3}
					aberrationStrength={0}
					color={0x2373c4}
					fastChroma={true}
					toneMapped={false}
					needsUpdate={true}
					// vertexColors={true}
				/>
			</mesh>
			{/* <MeshRefractionMaterial
						envMap={texture}
						{...config}
						toneMapped={false}
					/> */}
			{/* </primitive> */}
			{/* </Caustics> */}
			{/* <primitive ref={boxRef} object={europeMesh}></primitive> */}
		</>
	);
}

function EarthShapeMed(props: ThreeElements["mesh"]) {
	const shapeRef = useRef<THREE.Mesh>(null!);

	const state = useThree();

	const diameter: number =
		((state.size.width > state.size.height
			? state.size.height
			: state.size.width) *
			2) /
		3;

	const earthShape = new THREE.DodecahedronGeometry(2.55, 4);

	// creare ulteriore icosaedro più piccolo e dare trasparenza al medio

	const earthMaterial = new THREE.MeshPhysicalMaterial({
		// color: 0x2373c4,
		// color: 0x04af93,
		color: 0x50c878,
		emissive: 0x50c878,
		emissiveIntensity: 1,
		vertexColors: false,
		reflectivity: 23,
		specularIntensity: 2.3,
		transparent: true,
		opacity: 0.95,
		flatShading: true,
		wireframe: false,
		roughness: 0.1,
		metalness: 0.9,
		fog: true,
		visible: true,
		depthTest: true,
		depthWrite: true
	});

	const earthMesh = new THREE.Mesh(earthShape, earthMaterial);
	// earthMesh.castShadow = true;

	earthMesh.position.set(0, 0, 0);
	// const options = { ...generalExtrSettings };

	return (
		<>
			<primitive
				ref={shapeRef}
				object={earthMesh}
				// scale={[equatDiameter, polarDiameter, equatDiameter]}
			></primitive>
		</>
	);
}

function EarthShapeInt(props: ThreeElements["mesh"]) {
	const shapeRef = useRef<THREE.Mesh>(null!);

	const state = useThree();

	const diameter: number =
		((state.size.width > state.size.height
			? state.size.height
			: state.size.width) *
			2) /
		3;

	const earthShape = new THREE.DodecahedronGeometry(2.5, 1);

	// creare ulteriore icosaedro più piccolo e dare trasparenza al medio

	const earthMaterial = new THREE.MeshPhysicalMaterial({
		// color: 0x2373c4,
		color: 0x03109d,
		emissive: 0x03109d,
		emissiveIntensity: 5,
		// PerspectiveCamera

		// map: textureEarth,
		// clearcoat: 1,
		// clearcoatRoughness: 0,
		vertexColors: false,
		// ior: 1,
		reflectivity: 23,
		specularIntensity: 2.3,
		transparent: true,
		opacity: 0.85,
		flatShading: true,
		wireframe: false,
		roughness: 0.1,
		metalness: 0.9,
		fog: true,
		visible: true,
		depthTest: true,
		depthWrite: true
		// map: testTexture

		// map: ,

		// vertexColors: true
	});

	const earthMesh = new THREE.Mesh(earthShape, earthMaterial);
	// earthMesh.castShadow = true;

	earthMesh.position.set(0, 0, 0);
	// const options = { ...generalExtrSettings };

	return (
		<>
			<primitive
				ref={shapeRef}
				object={earthMesh}
				// scale={[equatDiameter, polarDiameter, equatDiameter]}
			></primitive>
		</>
	);
}

// Creare altra sfera sottostante uguale ma più piccola senza trasparenza
// dare trasparenza a quella più grande

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

function makeGroups(
	// groupsObj: containerObj,
	groupsArr: groupedType[],
	group?: string
) {
	const datas = groupsArr.map((elem: groupedType) => {
		const coordsArr = elem["data"].map((item) => {
			return [item.geom.x, item.geom.y, item.geom.z];
		});
		return coordsArr;
	});

	// let newArr = [];
	const groupedElems: groupedType[] = [];
	// groupedElems.push(datas[0]);
	const otherElems = [];

	let indication = 0;

	function findSimilar(
		searchArr: groupedType[],
		startElem: groupedType,
		name?: string
	) {
		// startElem["grouped"] = `${indication}`;

		const actualCoords = startElem["data"].map((item) => item["geom"]);
		const firstActualCoords = actualCoords[0];
		const lastActualCoords = actualCoords[actualCoords.length - 1];

		// console.log(searchArr.slice(1));

		const arr: groupedType[] = [];

		// trova primo array di tre elements: precedente attuale successivo

		if (arr.length === 0) {
			arr.push(startElem);

			// da correggere: impedire che venga reinserito lo stesso array

			for (let i = 0; i < searchArr.length; i++) {
				const coords = searchArr[i]["data"].map((item) => item["geom"]);
				const firstCoords = coords[0];
				const lastCoords = coords[coords.length - 1];
				if (
					lastCoords.x === firstActualCoords.x &&
					lastCoords.y === firstActualCoords.y &&
					firstCoords.x !== lastActualCoords.x &&
					firstCoords.y !== lastActualCoords.y
				) {
					arr.unshift(searchArr[i]);
					searchArr.splice(i, 1);
				} else if (
					firstCoords.x === lastActualCoords.x &&
					firstCoords.y === lastActualCoords.y &&
					lastCoords.x !== firstActualCoords.x &&
					lastCoords.y !== firstActualCoords.y
				) {
					arr.push(searchArr[i]);
					searchArr.splice(i, 1);
				}
				// else if (
				// 	firstCoords.x !== lastActualCoords.x &&
				// 	firstCoords.y !== lastActualCoords.y &&
				// 	lastCoords.x !== firstActualCoords.x &&
				// 	lastCoords.y !== firstActualCoords.y
				// ) {
				// 	continue;
				// }
				else {
					continue;
				}
			}
			searchArr.splice(searchArr.indexOf(startElem), 1);
		}

		function createNext(
			creatingArr: groupedType[],
			startElement?: groupedType
		) {
			const focusElement = startElement
				? startElem
				: creatingArr[creatingArr.length - 1];

			const focusCoords = focusElement["data"].map((item) => item["geom"]);
			const firstfocusCoords = focusCoords[0];
			const lastfocusCoords = focusCoords[focusCoords.length - 1];

			let indexValue = 0;

			const find = searchArr.find((elem, index) => {
				const elemCoords = elem["data"].map((item) => item["geom"]);
				const firstElemCoords = elemCoords[0];
				if (
					lastfocusCoords.x === firstElemCoords.x &&
					lastfocusCoords.y === firstElemCoords.y
				) {
					return true;
				} else {
					return false;
				}
			});

			if (find) {
				// ins push
				creatingArr.push(find);
				// console.log(arr.indexOf(find));
				searchArr.splice(searchArr.indexOf(find), 1);
				createNext(creatingArr);
				// eliminare da copia di arr l'element trovato
				// richiamare funzione
				// return find;
			} else {
				return;
			}
		}

		createNext(arr);
		// console.log(arr);

		// const newArr = datas.slice(0);
		return arr;
	}

	const result: containerObj = {};

	for (let i = 0; i < groupsArr.length; i++) {
		const similarGroup = findSimilar(groupsArr, groupsArr[i]);
		// console.log(groupsArr.length);
		// const arraysGrouped =
		// const arraysGroup = similarGroup.length > 0 ? similarGroup[0].concat() : similarGroup[0]
		result[i] = similarGroup;
		// console.log(similarGroup);
	}

	// console.log(testing);
	// obj[`${groupsArr.indexOf(groupsArr[23])}`] = testing;
	// // inserire nell'object
	// // eliminare dall'array della ricerca gli elements già abbinati o analizzati
	// console.log(obj);
	// return similarGroup;
	return result;
}

// console.log(obj);

// console.log(arr)

export default function CanvasElement({
	analyzeCoastLineData,
	analyzeCoastLandData,
	analyzeLandsData,
	analyzeRiversData
}: {
	analyzeCoastLineData: () => Promise<ContinentInfo[]>;
	analyzeCoastLandData: () => Promise<any>;
	analyzeLandsData: () => Promise<string>;
	analyzeRiversData: () => Promise<any>;
}) {
	// NOTA: determinare un type per analyzeCoastLandData
	// NOTA: sistemare naming funzioni e variabili

	// console.log(analyzeCoastLineData);
	// console.log(jsonData);

	// const list: [number, number][] = [];

	// jsonData["features"].map((elem: any) => {
	// 	if (elem["geometry"]["coordinates"].length > 6000) {
	// 		list.push(elem["geometry"]["coordinates"]);
	// 	}
	// });
	// console.log(list[0]);

	// const shapeRef = useRef<THREE.Mesh>(null!);

	const basicState: ContinentInfo = { continent: [[0, 0]] };

	// console.log(typeof rawGeoData);

	type ResData = {
		structures: THREE.CylinderGeometry;
		surface: THREE.BufferGeometry;
		middlePoint: { x: number; y: number; z: number };
		name?: string;
		isoa3?: string;
		continent?: string;
		region?: string;
		subregion?: string;
		regionwb?: string;
	};

	// const continentsNames = new Set();

	// const continentData = {};
	// orderedData.map((country) => continentsNames.add(country.continent));

	// console.log(orderedData);

	type Surfaces = {
		surface: ConvexGeometry;
	};

	type geomObj = {
		geom: {
			x: number;
			y: number;
			z: number;
		};
	};

	type dataSurfaces = {
		[key: string]: geomObj[];
	};

	// const [stateGeoData, setStateGeoData] = useState<ResData[] | null>(null);
	// const [surfacesData, setSurfacesData] = useState<Surfaces[] | null>(null);

	// const [stateSurfaces, setStateSurfaces] = useState<dataSurfaces | null>(null);
	// const [stateVertices, setStateVertices] = useState<THREE.Mesh[] | null>(null);

	// const [landMeshes, setLandMeshes] = useState<THREE.Mesh[] | null>(null);
	const [landCoupleMeshes, setLandCoupleMeshes] = useState<{
		surfaces: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshStandardMaterial,
			THREE.Object3DEventMap
		>[];
		edges: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null>(null);

	const [starsMeshes, setStarsMeshes] = useState<THREE.Points<
		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		THREE.PointsMaterial,
		THREE.Object3DEventMap
	> | null>(null);

	const [riversLines, setRiversLines] = useState<
		| {
				rivers: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
		  }[]
		| null
	>(null);
	// creare nuova funzione nel backend
	// passare qui

	// ** Ottenere dati qui salvando su state ***
	const [data, setData] = useState<ContinentInfo[] | null>(null);
	useEffect(() => {
		// let ignore = false;
		// async function startAnalyze() {
		// 	try {
		// 		// const arr = await analyzeCoastLineData();
		// 		// console.log(arr);
		// 		// problema types --->
		// 		const res: ResData = orderedData;
		// 		// const res: StructureData[] = drawThreeGeo(rawGeoData, 2, "sphere", {
		// 		// 	color: 0x80ff80
		// 		// });
		// 		// console.log(res);
		// 		if (!ignore) {
		// 			// setData(arr);
		// 			setStateGeoData(res);
		// 		}
		// 	} catch (error) {
		// 		console.log("Error - no data need modal");
		// 		if (!ignore) {
		// 			setData([basicState]);
		// 		}
		// 	}
		// }
		// startAnalyze();
		// return () => {
		// 	ignore = true;
		// };
		let ignore = false;
		async function startAnalyze() {
			if (typeof rawGeoData !== undefined) {
				try {
					// const res: ResData = orderedData;

					const newData = await analyzeCoastLineData();
					// console.log(newData);

					const recompData = {
						type: "FeatureCollection",
						features: [...newData]
					};

					// console.log(orderedData);
					// : [];

					// --------------------------

					const countriesRawData: any = rawGeoData;
					const reducedData: FeatureCollection = {
						type: "FeatureCollection",
						features: countriesRawData.features.map((elem: any) => {
							// console.log(elem);
							return {
								type: elem.type,
								properties: {
									name: elem.properties["NAME"],
									isoa3: elem.properties["ISO_A3"],
									continent: elem.properties["CONTINENT"],
									region: elem.properties["REGION_UN"],
									subregion: elem.properties["SUBREGION"],
									regionwb: elem.properties["REGION_WB"]
								},
								geometry: { ...elem.geometry }
							};
						})
					};

					type FeatureUpdate = {
						type: string;
						features: FeatureCollection[];
					};

					const refinedDataCollection: FeatureCollection[] = reducedData[
						"features"
					].map((country) => {
						return {
							type: "FeatureCollection",
							features: [{ ...country }]
						};
					});

					// console.log(refinedDataCollection);

					const newRefined: any = recompData["features"].map((country) => {
						return {
							type: "FeatureCollection",
							features: [{ ...country }]
						};
					});

					// const data3dMeas = newRefined.map(
					// 	(elem: FeatureCollection, index: number) => {
					// 		const geomArr: {
					// 			geom: { x: number; y: number; z: number };
					// 		}[] = drawThreeGeo(elem, 2.7, "sphere", {
					// 			color: 0xffffff
					// 		});
					// 		return {
					// 			grouped: "",
					// 			data: geomArr
					// 		};
					// 	}
					// );

					// // console.log(data3dMeas);

					// const groups: containerObj = {};

					// const grouped = makeGroups(data3dMeas);

					// // const testArrAfrica: [number, number, number][] = [];
					// // grouped[8].map((elem) => {
					// // 	return elem["data"].map((item) => {
					// // 		return testArrAfrica.push([
					// // 			item.geom.x,
					// // 			item.geom.y,
					// // 			item.geom.z
					// // 		]);
					// // 	});
					// // });
					// // console.log(testArrAfrica);

					// // const surfacesArray = Object.values(grouped).map((elem) => {
					// // 	const completeArr = elem.join();
					// // 	console.log(completeArr);
					// // });

					// // map su grouped
					// // per ogni gruppo unire array
					// // da array concatenati ottenere vectors3
					// // da vectors3 ottenere convexGeometry

					// const dataForSurfaces: dataSurfaces = {};

					// for (const [key, value] of Object.entries(grouped)) {
					// 	const arrr: groupedType[] = value;
					// 	const values: geomObj[][] = arrr.map((elem) => elem["data"]);
					// 	const geomObjArr: geomObj[] = [];

					// 	for (let i = 0; i < values.length; i++) {
					// 		// console.log(item);

					// 		geomObjArr.push(...values[i]);
					// 	}
					// 	// setStateSurfaces((prevValue) => {
					// 	// 	if (prevValue !== null) {
					// 	// 		return [...prevValue, { [`${key}`]: geomObjArr }];
					// 	// 	} else {
					// 	// 		return [{ [`${key}`]: geomObjArr }];
					// 	// 	}
					// 	// });
					// 	// console.log(geomObjArr.length);

					// 	dataForSurfaces[`${key}`] = geomObjArr;
					// 	// dataForSurfaces[key] = [value[0]["data"]];
					// }

					// console.log(dataForSurfaces);

					// console.log(stateSurfaces);

					// for (const [key, value] of Object.entries(grouped)) {
					// 	let totalValue;
					// 	const elemValue = value.map((elem, index) => {
					// 		return elem["data"];
					// 	});
					// 	let firstValue: {
					// 		geom: {
					// 			x: number;
					// 			y: number;
					// 			z: number;
					// 		};
					// 	}[] = [];
					// 	if (elemValue.length > 1) {
					// 		// const elemValue = value.map((elem, index) => {
					// 		// 	return elem["data"];
					// 		// });
					// 		// for (let arrValue of elemValue) {
					// 		// 	firstValue.concat(arrValue);
					// 		// }
					// 		firstValue.concat(...elemValue);
					// 	} else {
					// 		firstValue = elemValue[0];
					// 	}

					// 	dataForSurfaces[key] = firstValue;
					// }

					// console.log(dataForSurfaces);

					// console.log(newRefined);
					const dataForSurfacesRedBorder: {
						surface: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
					}[] = newRefined.map((elem: any, index: number) => {
						const geomArr: {
							geom: { x: number; y: number; z: number };
						}[] = drawThreeGeo(newRefined[index], 3, "sphere", {
							color: 0xffffff
						});

						// console.log(geomArr);

						if (
							geomArr.length > 0 &&
							geomArr !== undefined &&
							geomArr !== null
						) {
							if (geomArr.length > 1) {
								let sumX = 0;
								let sumY = 0;
								let sumZ = 0;

								const verts: number[] = [];
								const vector3Arr = geomArr.map((elem, index) => {
									sumX += elem.geom.x;
									sumY += elem.geom.y;
									sumZ += elem.geom.z;

									verts.push(elem.geom.x, elem.geom.y, elem.geom.z);
									return new THREE.Vector3(
										elem.geom.x,
										elem.geom.y,
										elem.geom.z
									);
								});

								// const divisions = 100;
								// const curve = new THREE.CatmullRomCurve3(vector3Arr);
								// curve.closed = false;

								// // PROVARE A FAR RAGGRUPARE I CONTINENTI NEL geomArr usando
								// // le coordinate simili

								// // const extrGeom = new THREE.ExtrudeGeometry(curve, )

								// // HERERRRERE
								// const lowerPoints = curve.getPoints(divisions);
								// const lowerGeometry =
								// 	new THREE.BufferGeometry().setFromPoints(lowerPoints);

								// const upperPoints = lowerPoints.map((point) => {
								// 	return new THREE.Vector3(
								// 		sumX / geomArr.length,
								// 		sumY / geomArr.length,
								// 		sumZ / geomArr.length
								// 	);
								// });
								// const upperGeometry =
								// 	new THREE.BufferGeometry().setFromPoints(upperPoints);

								// const cylinderGeometry = new THREE.CylinderGeometry(
								// 	1,
								// 	1,
								// 	1,
								// 	divisions,
								// 	3,
								// 	false
								// );

								// cylinderGeometry.attributes.position.array.set(
								// 	lowerGeometry.attributes.position.array,
								// 	0
								// );
								// cylinderGeometry.attributes.position.array.set(
								// 	upperGeometry.attributes.position.array,
								// 	(divisions + 1) * 3
								// );

								// const points = curve.getPoints(100);

								const geom = new THREE.BufferGeometry().setFromPoints(
									vector3Arr
								);

								return {
									surface: geom
								};
							}
						}
					});

					// const newOrderedData: any = newRefined.map(
					// 	(elem: any, index: number) => {
					// 		const geomArr: {
					// 			geom: { x: number; y: number; z: number };
					// 		}[] = drawThreeGeo(newRefined[index], 2.6, "sphere", {
					// 			color: 0xffffff
					// 		});

					// 		if (
					// 			geomArr.length > 0 &&
					// 			geomArr !== undefined &&
					// 			geomArr !== null
					// 		) {
					// 			if (geomArr.length > 1) {
					// 				// const bufferInstances: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] =
					// 				// 	geomArr.map((elem) => elem.geom);
					// 				// // console.log(bufferInstances);
					// 				// const mergeGeom = BufferGeometryUtils.mergeGeometries(
					// 				// 	bufferInstances,
					// 				// 	true
					// 				// );
					// 				// const xValues: number[] = [];
					// 				// const yValues: number[] = [];
					// 				// const zValues: number[] = [];

					// 				let sumX = 0;
					// 				let sumY = 0;
					// 				let sumZ = 0;

					// 				// const newGeomArr = [...geomArr, geomArr[0]];

					// 				const verts: number[] = [];
					// 				const vector3Arr = geomArr.map((elem, index) => {
					// 					// arr.push(elem.geom.x, elem.geom.y, elem.geom.z);

					// 					sumX += elem.geom.x;
					// 					sumY += elem.geom.y;
					// 					sumZ += elem.geom.z;

					// 					verts.push(elem.geom.x, elem.geom.y, elem.geom.z);
					// 					return new THREE.Vector3(
					// 						elem.geom.x,
					// 						elem.geom.y,
					// 						elem.geom.z
					// 					);
					// 				});

					// 				// const geometry = new LineGeometry();
					// 				// geometry.setAttribute(
					// 				// 	"position",
					// 				// 	new THREE.Float32BufferAttribute(verts, 3)
					// 				// );
					// 				// geometry.setPositions(verts);
					// 				// geometry.computeVertexNormals();
					// 				// geometry.morphTargetsRelative = true;

					// 				// const geometry = new THREE.BufferGeometry().setFromPoints(
					// 				// 	vector3Arr
					// 				// );
					// 				// const mergeVert =
					// 				// 	BufferGeometryUtils.mergeVertices(geometry);
					// 				// const convexGeom = new ConvexGeometry(vector3Arr);
					// 				const divisions = 100;
					// 				const curve = new THREE.CatmullRomCurve3(vector3Arr);
					// 				curve.closed = false;

					// 				const upperPoints = curve.getPoints(divisions);
					// 				const upperGeometry =
					// 					new THREE.BufferGeometry().setFromPoints(upperPoints);

					// 				const lowerPoints = upperPoints.map((point) => {
					// 					return new THREE.Vector3(0, 0, 0);
					// 				});
					// 				const lowerGeometry =
					// 					new THREE.BufferGeometry().setFromPoints(lowerPoints);

					// 				const cylinderGeometry = new THREE.CylinderGeometry(
					// 					1,
					// 					1,
					// 					1,
					// 					divisions,
					// 					1,
					// 					false
					// 				);

					// 				cylinderGeometry.attributes.position.array.set(
					// 					upperGeometry.attributes.position.array,
					// 					(divisions + 1) * 3
					// 				);
					// 				cylinderGeometry.attributes.position.array.set(
					// 					lowerGeometry.attributes.position.array,
					// 					0
					// 				);

					// 				// const newGeometries = upperGeometryArr.map((geom, index) => {
					// 				// 	const cylinderGeometry = new THREE.CylinderGeometry(
					// 				// 		1,
					// 				// 		1,
					// 				// 		1,
					// 				// 		100,
					// 				// 		1,
					// 				// 		false
					// 				// 	);

					// 				// 	cylinderGeometry.attributes.position.array.set(
					// 				// 		geom.attributes.position.array,
					// 				// 		(divisions + 1) * 3
					// 				// 	);
					// 				// 	cylinderGeometry.attributes.position.array.set(
					// 				// 		lowerGeometryArr[index].attributes.position.array,
					// 				// 		1
					// 				// 	);

					// 				// 	return cylinderGeometry;
					// 				// });

					// 				// cylinderGeometry.attributes.
					// 				// cylinderGeometry.par.openEnded = false;

					// 				// orientation

					// 				const vectorToPointOnSphere = new THREE.Vector3();
					// 				// TROVARE MODO DI INCLINARE CONTINENTI VERSO IL CENTRO
					// 				// const sphericalCoord = new THREE.Spherical(2);

					// 				// orientation
					// 				// cylinderGeometry.computeVertexNormals();

					// 				// console.log(cylinderGeometry.attributes);

					// 				// const upperGeometry = new THREE.BufferGeometry().setFromPoints()
					// 				// const geometry =

					// 				// function sum(arr) {
					// 				// 	let total = 0;
					// 				// 	for (let elem of arr) {
					// 				// 		total += elem;
					// 				// 	}
					// 				// 	return total;
					// 				// }

					// 				return {
					// 					middlePoint: {
					// 						x: sumX / geomArr.length,
					// 						y: sumY / geomArr.length,
					// 						z: sumZ / geomArr.length
					// 					},
					// 					structures: cylinderGeometry,
					// 					surface: upperGeometry
					// 				};
					// 			} else if (geomArr.length === 1) {
					// 				// modificare per adattare a sopra
					// 				const geomComposition = geomArr[0]["geom"];
					// 				// const lineSegm = new THREE.Line();
					// 				// arr.push(geomComposition.x, geomComposition.y, geomComposition.z);
					// 				const vector3 = new THREE.Vector3(
					// 					geomComposition.x,
					// 					geomComposition.y,
					// 					geomComposition.z
					// 				);

					// 				// const geometry = new LineGeometry();
					// 				// geometry.setPositions([
					// 				// 	geomComposition.x,
					// 				// 	geomComposition.y,
					// 				// 	geomComposition.z
					// 				// ]);

					// 				const divisions = 100;
					// 				const curve = new THREE.CatmullRomCurve3([vector3]);
					// 				curve.closed = false;

					// 				const points = curve.getPoints(divisions);

					// 				const geometry = new THREE.BufferGeometry().setFromPoints(
					// 					points
					// 				);

					// 				return {
					// 					middlePoint: {
					// 						x: geomComposition.x,
					// 						y: geomComposition.y,
					// 						z: geomComposition.z
					// 					},
					// 					structures: geometry,
					// 					surface: geometry
					// 				};
					// 			} else {
					// 				return;
					// 			}
					// 		}
					// 	}
					// );

					//
					// IDEA EARTH onda marea viola con
					//  SCHIOCCO DI DITA RILEVANDO SUONO O BUTTON
					// SE NON ACCESSO MICROFONO
					//

					// attivare disattivare microfono con button con
					// icona onda (mare) con contorno circolare di onda
					// sonora

					// const arr: number[] = [];

					// provare a dare un type --->
					// const orderedData: any =
					// 	// refinedDataCollection.length > 0
					// 	refinedDataCollection.map(
					// 		(countryData: FeatureCollection, index: number) => {
					// 			const countryProps = {
					// 				...countryData.features[0].properties
					// 			};

					// 			// const geomArr: StructureData[] = drawThreeGeo(
					// 			// 	refinedDataCollection[index],
					// 			// 	3,
					// 			// 	"sphere",
					// 			// 	{
					// 			// 		color: 0xffffff
					// 			// 	}
					// 			// );

					// 			const geomArr: {
					// 				geom: { x: number; y: number; z: number };
					// 			}[] = drawThreeGeo(
					// 				refinedDataCollection[index],
					// 				2.6,
					// 				"sphere",
					// 				{
					// 					color: 0xffffff
					// 				}
					// 			);
					// 			// const geomArrSmall: StructureData[] = drawThreeGeo(
					// 			// 	refinedDataCollection[index],
					// 			// 	2.9,
					// 			// 	"sphere",
					// 			// 	{
					// 			// 		color: 0xffffff
					// 			// 	}
					// 			// );

					// 			// console.log(geomArr);
					// 			if (
					// 				geomArr.length > 0 &&
					// 				geomArr !== undefined &&
					// 				geomArr !== null
					// 			) {
					// 				if (geomArr.length > 1) {
					// 					// const bufferInstances: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] =
					// 					// 	geomArr.map((elem) => elem.geom);
					// 					// // console.log(bufferInstances);
					// 					// const mergeGeom = BufferGeometryUtils.mergeGeometries(
					// 					// 	bufferInstances,
					// 					// 	true
					// 					// );
					// 					const verts: number[] = [];
					// 					const vector3Arr = geomArr.map((elem, index) => {
					// 						// arr.push(elem.geom.x, elem.geom.y, elem.geom.z);

					// 						verts.push(elem.geom.x, elem.geom.y, elem.geom.z);
					// 						return new THREE.Vector3(
					// 							elem.geom.x,
					// 							elem.geom.y,
					// 							elem.geom.z
					// 						);
					// 					});
					// 					// const geometry = new LineGeometry();
					// 					// geometry.setAttribute(
					// 					// 	"position",
					// 					// 	new THREE.Float32BufferAttribute(verts, 3)
					// 					// );
					// 					// geometry.setPositions(verts);
					// 					// geometry.computeVertexNormals();
					// 					// geometry.morphTargetsRelative = true;

					// 					// const geometry = new THREE.BufferGeometry().setFromPoints(
					// 					// 	vector3Arr
					// 					// );
					// 					// const mergeVert =
					// 					// 	BufferGeometryUtils.mergeVertices(geometry);
					// 					// const convexGeom = new ConvexGeometry(vector3Arr);
					// 					const divisions = 100;
					// 					const curve = new THREE.CatmullRomCurve3(vector3Arr);
					// 					curve.closed = false;

					// 					const upperPoints = curve.getPoints(divisions);
					// 					const upperGeometry =
					// 						new THREE.BufferGeometry().setFromPoints(upperPoints);

					// 					const lowerPoints = upperPoints.map((point) => {
					// 						return new THREE.Vector3(0, 0, 0);
					// 					});
					// 					const lowerGeometry =
					// 						new THREE.BufferGeometry().setFromPoints(lowerPoints);

					// 					const cylinderGeometry = new THREE.CylinderGeometry(
					// 						1,
					// 						1,
					// 						1,
					// 						divisions,
					// 						3,
					// 						false
					// 					);

					// 					cylinderGeometry.attributes.position.array.set(
					// 						upperGeometry.attributes.position.array,
					// 						0
					// 					);
					// 					cylinderGeometry.attributes.position.array.set(
					// 						lowerGeometry.attributes.position.array,
					// 						(divisions + 1) * 3
					// 					);
					// 					// cylinderGeometry.par.openEnded = false;

					// 					// orientation

					// 					const vectorToPointOnSphere = new THREE.Vector3();

					// 					// orientation
					// 					// cylinderGeometry.computeVertexNormals();

					// 					// console.log()

					// 					// const upperGeometry  =new THREE.BufferGeometry().setFromPoints()
					// 					// const geometry =
					// 					return {
					// 						...countryProps,
					// 						structures: cylinderGeometry
					// 					};
					// 				} else {
					// 					return;
					// 				}
					// 			}
					// 		}
					// 	);

					// const arr32 = new Uint8Array(arr);

					// console.log(arr32);

					// console.log(earthShape);

					// const circumference = 2 * Math.PI;

					// const testTexture = new THREE.Data3DTexture(
					// 	arr32,
					// 	circumference,
					// 	circumference,
					// 	circumference
					// );

					// console.log(testTexture);

					// ArrayBufferView is an abstract type that is the base for the following types:
					// DataView, BigInt64Array, BigUint64Array, Float32Array, Float64Array,
					// Int8Array, Int16Array, Int32Array, Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array.

					// testTexture.needsUpdate = true;

					// console.log(grouped[8]);
					// console.log(dataForSurfaces);

					// NO TORNARE A CREARE OBJECTS 3D
					// -------------------------------------------

					const newVertices: number[] = [];

					// Object.values(dataForSurfaces)?.map((elem) => {
					// 	elem.map((item) =>
					// 		newVertices.push(item.geom.x, item.geom.y, item.geom.z)
					// 	);
					// });

					// const vect3Arr = Object.values(dataForSurfaces)?.map((elem) => {
					// 	elem.map(
					// 		(item) => new THREE.Vector3(item.geom.x, item.geom.y, item.geom.z)
					// 	);
					// });

					// HeREEE

					// testing

					// const data = Earcut.triangulate(newVertices, undefined, 3);

					// const float32Vert = new Float32Array(newVertices);
					// const indices = new Uint16Array(data);
					// const normals = new Float32Array(data);

					// const geometry = new THREE.BufferGeometry();
					// geometry.setAttribute(
					// 	"position",
					// 	new THREE.BufferAttribute(float32Vert, 3)
					// );
					// geometry.setAttribute(
					// 	"normal",
					// 	new THREE.BufferAttribute(normals, 1)
					// );
					// geometry.setIndex(new THREE.BufferAttribute(indices, 1));

					// // const convexGeom = new ConvexGeometry(vect3Arr);
					// // return vect3Arr;
					// // return geometry;

					// // testing

					// // const float32Vert = new Float32Array(newVertices);

					// // const indices = new Uint16Array([
					// // 	0,
					// // 	1,
					// // 	2, // Triangle 1: A -> B -> C
					// // 	2,
					// // 	1,
					// // 	3 // Triangle 2: C -> B -> D
					// // ]);

					// // UV-Coordinates
					// // const uvs = new Float32Array([
					// // 	0,
					// // 	0, // UV A
					// // 	0,
					// // 	1, // UV B
					// // 	1,
					// // 	0, // UV C
					// // 	1,
					// // 	1 // UV D
					// // ]);

					// const material = new THREE.MeshStandardMaterial({
					// 	color: 0x2373c4,
					// 	// emissive: 0xffffff,
					// 	// map: new THREE.TextureLoader().load(
					// 	// 	"https://threejs.org/examples/textures/uv_grid_opengl.jpg"
					// 	// ),
					// 	wireframe: false,
					// 	roughness: 0.5,
					// 	metalness: 0.8,
					// 	depthTest: true,
					// 	depthWrite: true
					// 	// side: THREE.DoubleSide
					// });

					// // test: inserire all'interno dell'array di vertices il punto medio
					// // ogni due altri punti, in modo da creare un triangolo ogni due
					// // punti dell'array

					// // const verticesGeometry = new THREE.BufferGeometry();
					// // verticesGeometry.setAttribute(
					// // 	"position",
					// // 	new THREE.BufferAttribute(float32Vert, 3)
					// // );
					// // verticesGeometry.setAttribute(
					// // 	"uv",
					// // 	new THREE.BufferAttribute(uvs, 2)
					// // );
					// // verticesGeometry.setIndex(new THREE.BufferAttribute(indices, 1));

					// const vertMesh = new THREE.Mesh(geometry, material);

					if (!ignore) {
						// setData(arr);
						// COASTLINE
						// setStateGeoData(newOrderedData);
						// setSurfacesData(dataForSurfacesRedBorder);
						// setStateSurfaces(dataForSurfaces);
						// setStateVertices(vertMesh);
					}
				} catch (error) {
					console.log("Error - no data need modal");
					console.log(error);
					if (!ignore) {
						setData([basicState]);
					}
				}
			}
		}
		// startAnalyze();

		type RiverFeature = {
			type: string;
			properties: {
				featurecla: string | null;
				min_label: number | null;
				min_zoom: number | null;
				name: string | null;
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

		async function startAnalyzeRivers() {
			try {
				const riversData: { features: RiverFeature[]; type: string } =
					await analyzeRiversData();

				const riverFeaturesArr = await riversData["features"];

				const filteredRivers = riverFeaturesArr.filter((elem: RiverFeature) => {
					if (elem.geometry) {
						return true;
					} else {
						return false;
					}
				});
				const riversGeomArr = filteredRivers.map((elem: RiverFeature) => {
					const geomArr: {
						geom: { x: number; y: number; z: number };
					}[] = drawThreeGeo(elem, 2.85, "sphere", {
						color: 0xffffff
					});

					if (geomArr.length > 1 && geomArr !== undefined && geomArr !== null) {
						// if (geomArr.length > 1) {
						// const filteredArr = geomArr.splice(1);

						const newVertices: number[] = [];

						geomArr.map((elem) => {
							newVertices.push(elem.geom.x, elem.geom.y, elem.geom.z);
							return new THREE.Vector3(elem.geom.x, elem.geom.y, elem.geom.z);
						});

						const data = Earcut.triangulate(newVertices, undefined, 3);

						const float32Vert = new Float32Array(newVertices);
						const indicesPart1 = [...data];

						const indicesPart2 = data.toReversed();

						const totalIndeces = [...indicesPart1, ...indicesPart2];

						const indices = new Uint16Array(totalIndeces);
						const uvs = new Float32Array(data);
						const normals = totalIndeces;

						// const curve = new THREE.CatmullRomCurve3(vector3Arr);
						// curve.closed = true;
						// curve.curveType = "catmullrom";

						// const points = curve.getPoints(50);

						// const geom = new THREE.BufferGeometry().setFromPoints(points);

						const geom = new THREE.BufferGeometry();

						geom.setAttribute(
							"position",
							new THREE.BufferAttribute(float32Vert, 3)
						);

						geom.setIndex(new THREE.BufferAttribute(indices, 1));

						geom.setAttribute(
							"normal",
							new THREE.Float32BufferAttribute(normals, 1)
						);

						geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 1));

						return {
							rivers: geom
						};
						// }
					} else {
						const geom = new THREE.BufferGeometry().setFromPoints([
							new THREE.Vector3(0, 0, 0)
						]);
						return {
							rivers: geom
						};
					}
				});

				// const geometries = xyxPointsArrays.map((arr) => {
				// 	const newVertices: number[] = [];
				// 	arr.map((item) => {
				// 		newVertices.push(item[0], item[1], item[2]);
				// 	});

				// 	const data = Earcut.triangulate(newVertices, undefined, 3);

				// 	const float32Vert = new Float32Array(newVertices);
				// 	const indicesPart1 = [...data];

				// 	const indicesPart2 = data.toReversed();

				// 	const totalIndeces = [...indicesPart1, ...indicesPart2];

				// 	const indices = new Uint16Array(totalIndeces);
				// 	const uvs = new Float32Array(data);
				// 	const normals = totalIndeces;

				// 	const geometry = new THREE.BufferGeometry();

				// 	geometry.setAttribute(
				// 		"position",
				// 		new THREE.BufferAttribute(float32Vert, 3)
				// 	);

				// 	geometry.setIndex(new THREE.BufferAttribute(indices, 1));

				// 	geometry.setAttribute(
				// 		"normal",
				// 		new THREE.Float32BufferAttribute(normals, 1)
				// 	);

				// 	geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 1));

				// 	return geometry;
				// });

				// const riversArrFiltered = riversGeomArr.filter((elem) => {
				// 	if (elem?.rivers === undefined) {
				// 		return false;
				// 	} else {
				// 		return true;
				// 	}
				// });
				// risolvere undefined del type --->

				if (!ignore) {
					setRiversLines(riversGeomArr);
				}

				// 16/04 da qui
			} catch (error) {
				console.log("rivers error.");
				console.log(error);
			}
		}

		startAnalyzeRivers();

		// type LandFeature = {
		// 	type: string;
		// 	features: {
		// 		type: string;
		// 		geometry: {
		// 			type: string;
		// 			coordinates: [number, number][][];
		// 		};
		// 	};
		// };

		async function startAnalyzeLand() {
			try {
				// const newData = await analyzeCoastLandData();
				// const landsData: LandFeature[] = await newData["features"]
				// 	.filter((elem: any) => {
				// 		if (elem.geometry.coordinates) {
				// 			return true;
				// 		} else {
				// 			return false;
				// 		}
				// 	})
				// 	.map(
				// 		(land: {
				// 			geometry: {
				// 				coordinates: [number, number][];
				// 				type: string;
				// 			};
				// 		}) => {
				// 			return land;
				// 		}
				// 	);

				const data: any = await analyzeLandsData();
				const landsData: LandFeature[] = await data;

				const landPointsArraysMax = await landsData.map((elem: any) => {
					return drawThreeGeo(elem, 2.85, "sphere", {
						color: 0xffffff
					});
				});

				// console.log(landPointsArraysMax);

				const landPointsArraysMed = await landsData.map((elem: any) => {
					// const data = Earcut.triangulate(elem, undefined, 3);
					return drawThreeGeo(elem, 2.823, "sphere", {
						color: 0xffffff
					});
				});

				// const landPointsArraysMed = await landsData.map((elem: any) => {
				// 	return drawThreeGeo(elem, 1.23, "sphere", {
				// 		color: 0xffffff
				// 	});
				// });

				const landPointsArraysMin = await landsData.map((elem: any) => {
					return drawThreeGeo(elem, 2.3, "sphere", {
						color: 0xffffff
					});
				});
				// .map((elem) => {
				// 	const redifined = elem.map((item) => {
				// 		return {
				// 			geom: {
				// 				x: item.geom.x / 10,
				// 				y: item.geom.y / 10,
				// 				z: item.geom.z / 10
				// 			}
				// 		};
				// 	});
				// 	return redifined;
				// });

				// const landPointsArrays = landPointsArraysMax.map((arr, index) => {
				// 	return arr.concat(
				// 		// landPointsArraysMedMax[index],
				// 		// landPointsArraysMed[index],

				// 		landPointsArraysMin[index]

				// 		// landPointsArraysMedMax[index]
				// 	);
				// });
				// .filter((elem, index) => {
				// 	if (index > 100) {
				// 		return true;
				// 	} else {
				// 		return false;
				// 	}
				// });

				// console.log(landPointsArrays);

				const xyxPointsArrays = landPointsArraysMax.map((elem) => {
					const pointsArr = elem.map((item) => {
						return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
					});
					return pointsArr;
				});

				// const xyxPointsArraysTop = landPointsArraysMax.map((elem) => {
				// 	const pointsArr = elem.map((item) => {
				// 		return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
				// 	});
				// 	return pointsArr;
				// });

				const xyzPointsArraysMed = landPointsArraysMed.map((elem) => {
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

				// AAA

				const divisions = 100;

				const upperGeometryArr = xyzPointsArraysMed.map((arr) => {
					const vect3Arr = arr.map((item) => {
						return new THREE.Vector3(item[0], item[1], item[2]);
					});

					// vect3Arr.map((vec) => vec.normalize());

					// const convexGeom = new ConvexGeometry(vect3Arr);

					const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
					curveTop.curveType = "catmullrom";
					curveTop.closed = false;

					const upperPoints = curveTop.getPoints(divisions);
					const upperGeometry = new THREE.BufferGeometry().setFromPoints(
						upperPoints
					);
					return upperGeometry;
				});

				const lowerGeometryArr = xyxPointsArraysBottom.map((arr) => {
					const vect3Arr = arr.reverse().map((item) => {
						return new THREE.Vector3(0, 0, 0);
					});

					// const convexGeom = new ConvexGeometry(vect3Arr);

					const curveBottom = new THREE.CatmullRomCurve3(vect3Arr);
					curveBottom.curveType = "catmullrom";
					curveBottom.closed = false;

					const lowerPoints = curveBottom.getPoints(divisions);
					const lowerGeom = new THREE.BufferGeometry().setFromPoints(
						lowerPoints
					);
					return lowerGeom;
				});

				const cylinderGeometries = upperGeometryArr.map((geom, index) => {
					const cylinderGeometry = new THREE.ConeGeometry(
						1,
						1,
						divisions,
						1,
						true
					);

					cylinderGeometry.attributes.position.array.set(
						geom.attributes.position.array,
						(divisions + 1) * 3
					);
					cylinderGeometry.attributes.position.array.set(
						lowerGeometryArr[index].attributes.position.array,
						0
					);

					return cylinderGeometry;
				});

				const geometries = xyxPointsArrays.map((arr) => {
					// se non si trova altra soluzione
					// creare geometry per ogni gruppo, provare a dividere
					// non unificare e poi inserire in un array per le mesh?
					// Forse agire su xyxPointsArrays
					const newVertices: number[] = [];
					// const vect3Arr = arr.map((item) => {
					// 	newVertices.push(item[0], item[1], item[2]);
					// 	// newVertices.push(item[2], item[1], item[0]);
					// 	return new THREE.Vector3(item[0], item[1], item[2]);
					// });
					arr.map((item) => {
						newVertices.push(item[0], item[1], item[2]);
					});
					// const vect3ArrNorm = vect3Arr.map((elem) => {
					// 	return elem.subVectors(
					// 		new THREE.Vector3(0, 0, 0),
					// 		new THREE.Vector3(0, 0, 0)
					// 	);

					const data = Earcut.triangulate(newVertices, undefined, 3);

					const float32Vert = new Float32Array(newVertices);
					const indicesPart1 = [...data];
					// const indicesPart2 = [
					// 	...data.slice(data.length / 4 - 1),
					// 	...data.slice(1, data.length / 4)
					// ];
					const indicesPart2 = data.toReversed();
					// const indicesPart3 = [
					// 	...indicesPart1.slice(indicesPart2.length - 1 / 2),
					// 	...indicesPart2.slice(indicesPart1.length - 1 / 2)
					// ].toReversed();
					const totalIndeces = [...indicesPart1, ...indicesPart2];
					// for (let i = 0; i < indicesPart1.length; i++) {
					// 	totalIndeces.push(indicesPart2[i], indicesPart1[i]);
					// }

					const indices = new Uint16Array(totalIndeces);
					// const revIndices = new Uint16Array(data.reverse());
					const uvs = new Float32Array(data);
					const normals = totalIndeces;

					const geometry = new THREE.BufferGeometry();
					// console.log(geometry);

					geometry.setAttribute(
						"position",
						new THREE.BufferAttribute(float32Vert, 3)
					);
					// geometry.attributes.uv.array = uvs;
					// geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
					geometry.setIndex(new THREE.BufferAttribute(indices, 1));
					// geometry.setIndex(new THREE.BufferAttribute(revIndices, 1));

					geometry.setAttribute(
						"normal",
						new THREE.Float32BufferAttribute(normals, 1)
					);

					geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 1));

					// geometry.getAttribute("uv").needsUpdate = true;

					// const convexGeom = new ConvexGeometry(vect3Arr);
					// return vect3Arr;
					return geometry;
				});

				// 	const convexGeom = new ConvexGeometry(vect3Arr);

				// 	// const divisions = 100;
				// 	// const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
				// 	// // curve.curveType = "catmullrom";
				// 	// curveTop.closed = false;

				// 	// const upperPoints = curveTop.getPoints(divisions);
				// 	// const upperGeometry = new THREE.BufferGeometry().setFromPoints(
				// 	// 	upperPoints
				// 	// );

				// 	// const lowerPoints = upperPoints.map((point) => {
				// 	// 	return new THREE.Vector3(0, 0, 0);
				// 	// });
				// 	// const lowerGeometry = new THREE.BufferGeometry().setFromPoints(
				// 	// 	lowerPoints
				// 	// );

				// 	// const cylinderGeometry = new THREE.CylinderGeometry(
				// 	// 	1,
				// 	// 	1,
				// 	// 	1,
				// 	// 	divisions,
				// 	// 	3,
				// 	// 	false
				// 	// );

				// 	// cylinderGeometry.attributes.position.array.set(
				// 	// 	upperGeometry.attributes.position.array,
				// 	// 	(divisions + 1) * 3
				// 	// );
				// 	// cylinderGeometry.attributes.position.array.set(
				// 	// 	lowerGeometry.attributes.position.array,
				// 	// 	(divisions + 1) * 3
				// 	// );

				// 	// const extrudeSettings = {
				// 	// 	steps: 2,
				// 	// 	depth: 16,
				// 	// 	bevelEnabled: true,
				// 	// 	bevelThickness: 1,
				// 	// 	bevelSize: 1,
				// 	// 	bevelOffset: 0,
				// 	// 	bevelSegments: 1
				// 	// };

				// 	// const frames = curve.computeFrenetFrames(100, true);

				// 	// const extrGeom = new THREE.ExtrudeGeometry(
				// 	// 	frames.tangents,
				// 	// 	extrudeSettings
				// 	// );
				// 	// const float32Vert = new Float32Array(newVertices);
				// 	// const indices = new Uint16Array([0, 1, 2, 2, 1, 3]);
				// 	// const uvs = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]);

				// 	// const geometry = new THREE.BufferGeometry();
				// 	// geometry.setAttribute(
				// 	// 	"position",
				// 	// 	new THREE.BufferAttribute(float32Vert, 3)
				// 	// );
				// 	// geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
				// 	// geometry.setIndex(new THREE.BufferAttribute(indices, 1));
				// 	return convexGeom;
				// });

				// const material = new THREE.MeshStandardMaterial({
				// 	color: 0x2373c4,
				// 	wireframe: false,
				// 	roughness: 0.5,
				// 	metalness: 0.8,
				// 	depthTest: true,
				// 	depthWrite: true
				// 	// side: THREE.DoubleSide
				// });

				// const texture = useLoader(THREE.TextureLoader, blackCeramic.src);

				const material = new THREE.MeshPhysicalMaterial({
					color: 0x232323,
					// color: 0x2323a0,
					// emissive: 0x000000,
					// map: texture,
					iridescence: 0,
					// reflectivity: 0.8,
					clearcoat: 0.5,
					clearcoatRoughness: 0.1,
					// emissiveIntensity: 0.2,
					wireframe: false,
					roughness: 1,
					metalness: 0,
					depthTest: true,
					depthWrite: true,
					opacity: 1,
					alphaTest: 1,
					fog: true
					// iridescenceIOR: 1.03
					// ior: 1.5
					// side: THREE.DoubleSide
				});

				// const cylindersMaterial = new THREE.MeshPhysicalMaterial({
				// 	color: 0x2373c4,
				// 	emissive: 0x2373c4,
				// 	wireframe: false,
				// 	roughness: 0.5,
				// 	metalness: 0.8,
				// 	iridescence: 10,
				// 	depthTest: true,
				// 	depthWrite: true,
				// 	transparent: true,
				// 	opacity: 0.1,
				// 	alphaTest: 0.1

				// 	// fog: true,
				// 	// side: THREE.DoubleSide
				// });
				// <--- trasparenti / immersi acqua

				const cylindersMaterial = new THREE.MeshPhysicalMaterial({
					// color: 0x2373c4,
					// emissive: 0x2373c4,
					// // emissiveIntensity: 2.3,
					// color: 0x091f86,
					// emissive: 0x091f86,
					color: 0x0a2395,
					emissive: 0x0a2395,
					emissiveIntensity: 4,
					reflectivity: 2.3,
					wireframe: false,
					clearcoat: 1,
					clearcoatRoughness: 0,
					roughness: 1,
					metalness: 0.1,
					iridescence: 1,
					depthTest: true,
					depthWrite: true,
					transparent: true,
					opacity: 0.3,
					// opacity: 0.2,
					alphaTest: 0.1
					// transmission: 0.1

					// fog: true,
					// side: THREE.DoubleSide
				});

				const meshes = geometries.map((geometry) => {
					return new THREE.Mesh(geometry, material);
				});

				const cylinderMeshes = cylinderGeometries.map((geometry) => {
					return new THREE.Mesh(geometry, cylindersMaterial);
				});

				// const coupleMeshes: {
				// 	surfaces: THREE.Mesh<
				// 		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
				// 		THREE.MeshStandardMaterial,
				// 		THREE.Object3DEventMap
				// 	>[];
				// 	edges: THREE.Mesh<
				// 		THREE.CylinderGeometry,
				// 		THREE.MeshStandardMaterial,
				// 		THREE.Object3DEventMap
				// 	>[];
				// };

				const coupleMeshes: {
					surfaces: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshStandardMaterial,
						THREE.Object3DEventMap
					>[];
					edges: THREE.Mesh<
						THREE.BufferGeometry<THREE.NormalBufferAttributes>,
						THREE.MeshPhysicalMaterial,
						THREE.Object3DEventMap
					>[];
				} = {
					surfaces: meshes,
					edges: cylinderMeshes
				};

				// console.log(meshes);

				if (!ignore) {
					// da qui
					setLandCoupleMeshes(coupleMeshes);
					// setLandMeshes(meshes);

					// invertire ordine della parte bassa della geometria
				}
			} catch (error) {
				console.log("land error");
				console.log(error);
			}
		}
		startAnalyzeLand();

		async function setStars() {
			const stars = await getStarfield();
			if (!ignore) {
				setStarsMeshes(stars);
			}
		}

		setStars();

		// async function startAnalyzeLands() {
		// 	try {
		// 		const data = await analyzeLandsData();
		// 		const parsedData = await JSON.parse(data);

		// 		const surfacesGeometries: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] =
		// 			await parsedData["surfaces"].map(
		// 				(elem: {
		// 					position: Float32Array;
		// 					indices: Uint16Array;
		// 					uvs: Float32Array;
		// 					normals: number[];
		// 				}) => {
		// 					const geometry = new THREE.BufferGeometry();

		// 					const float32Vert = new Float32Array(elem["position"]);

		// 					const indices = new Uint16Array(elem["indices"]);
		// 					// const revIndices = new Uint16Array(data.reverse());
		// 					const uvs = new Float32Array(elem["uvs"]);
		// 					const normals = elem["normals"];

		// 					geometry.setAttribute(
		// 						"position",
		// 						new THREE.BufferAttribute(float32Vert, 3)
		// 					);
		// 					geometry.setIndex(new THREE.BufferAttribute(indices, 1));

		// 					geometry.setAttribute(
		// 						"normal",
		// 						new THREE.Float32BufferAttribute(normals, 1)
		// 					);

		// 					geometry.setAttribute(
		// 						"uv",
		// 						new THREE.Float32BufferAttribute(uvs, 1)
		// 					);

		// 					return geometry;
		// 				}
		// 			);

		// 		const surfacesMaterial = new THREE.MeshPhysicalMaterial({
		// 			color: 0x232323,
		// 			iridescence: 0,
		// 			clearcoat: 0.5,
		// 			clearcoatRoughness: 0.1,
		// 			wireframe: false,
		// 			roughness: 1,
		// 			metalness: 0,
		// 			depthTest: true,
		// 			depthWrite: true,
		// 			opacity: 1,
		// 			alphaTest: 1,
		// 			fog: true
		// 		});

		// 		const surfacesMeshes = surfacesGeometries.map(
		// 			(geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>) => {
		// 				return new THREE.Mesh(geometry, surfacesMaterial);
		// 			}
		// 		);

		// 		const divisions = 100;

		// 		// const upperGeometryArr = parsedData["edgesUpper"];
		// 		// const lowerGeometryArr = parsedData["edgesLower"];

		// 		const xyxPointsArrays = await parsedData["base"];
		// 		const xyzPointsArraysMed = await parsedData["medium"];
		// 		const xyxPointsArraysBottom = await parsedData["bottom"];

		// 		// const { upperGeometryArr, lowerGeometryArr } = await parsedData[
		// 		// 	"edges"
		// 		// ];

		// 		const upperGeometryArr = xyzPointsArraysMed.map((arr: number[][]) => {
		// 			const vect3Arr = arr.map((item) => {
		// 				return new THREE.Vector3(item[0], item[1], item[2]);
		// 			});

		// 			const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
		// 			curveTop.curveType = "catmullrom";
		// 			curveTop.closed = false;

		// 			const upperPoints = curveTop.getPoints(divisions);
		// 			const upperGeometry = new THREE.BufferGeometry().setFromPoints(
		// 				upperPoints
		// 			);
		// 			return upperGeometry;
		// 		});

		// 		const lowerGeometryArr = xyxPointsArraysBottom.map(
		// 			(arr: number[][]) => {
		// 				const vect3Arr = arr.reverse().map((item) => {
		// 					return new THREE.Vector3(0, 0, 0);
		// 				});

		// 				const curveBottom = new THREE.CatmullRomCurve3(vect3Arr);
		// 				curveBottom.curveType = "catmullrom";
		// 				curveBottom.closed = false;

		// 				const lowerPoints = curveBottom.getPoints(divisions);
		// 				const lowerGeom = new THREE.BufferGeometry().setFromPoints(
		// 					lowerPoints
		// 				);
		// 				return lowerGeom;
		// 			}
		// 		);

		// 		console.log(upperGeometryArr);

		// 		const conesGeometries: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] =
		// 			upperGeometryArr.map(
		// 				(
		// 					geom: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		// 					index: number
		// 				) => {
		// 					const coneGeometry = new THREE.ConeGeometry(
		// 						1,
		// 						1,
		// 						divisions,
		// 						1,
		// 						true
		// 					);

		// 					const singleGeom = geom;

		// 					coneGeometry.attributes.position.array.set(
		// 						singleGeom.attributes.position.array,
		// 						// problema qui
		// 						(divisions + 1) * 3
		// 					);
		// 					coneGeometry.attributes.position.array.set(
		// 						lowerGeometryArr[index].attributes.position.array,
		// 						0
		// 					);

		// 					return coneGeometry;

		// 					// return {
		// 					// 	upper: upperGeometryArr,
		// 					// 	lower: lowerGeometryArr
		// 					// };
		// 				}
		// 			);

		// 		const conesMaterial = new THREE.MeshPhysicalMaterial({
		// 			color: 0x0a2395,
		// 			emissive: 0x0a2395,
		// 			emissiveIntensity: 4,
		// 			reflectivity: 2.3,
		// 			wireframe: false,
		// 			clearcoat: 1,
		// 			clearcoatRoughness: 0,
		// 			roughness: 1,
		// 			metalness: 0.1,
		// 			iridescence: 1,
		// 			depthTest: true,
		// 			depthWrite: true,
		// 			transparent: true,
		// 			opacity: 0.3,
		// 			alphaTest: 0.1
		// 		});

		// 		const conesMeshes = conesGeometries.map((geometry) => {
		// 			return new THREE.Mesh(geometry, conesMaterial);
		// 		});

		// 		const coupleMeshes: {
		// 			surfaces: THREE.Mesh<
		// 				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		// 				THREE.MeshStandardMaterial,
		// 				THREE.Object3DEventMap
		// 			>[];
		// 			edges: THREE.Mesh<
		// 				THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		// 				THREE.MeshPhysicalMaterial,
		// 				THREE.Object3DEventMap
		// 			>[];
		// 		} = {
		// 			surfaces: surfacesMeshes,
		// 			edges: conesMeshes
		// 		};

		// 		if (!ignore) {
		// 			setLandCoupleMeshes(coupleMeshes);
		// 		}
		// 	} catch (error) {
		// 		console.log("new lands error");
		// 		console.log(error);
		// 	}
		// }

		// startAnalyzeLands();

		return () => {
			ignore = true;
		};
	}, []);

	function SunLight({ position }: { position: [number, number, number] }) {
		const dirLightRef = useRef(null);

		return (
			<>
				<directionalLight
					ref={dirLightRef}
					intensity={3}
					color={"#FFFFFF"}
					position={position}
				/>
				{dirLightRef.current && (
					<directionalLightHelper args={[dirLightRef.current, 23, 0xf0f0f0]} />
				)}
			</>
		);
	}

	return (
		<Canvas frameloop="demand">
			{/* <ambientLight color={0xf0f0f0} intensity={12.3} /> */}
			{/* <pointLight
				color={0xffffff}
				distance={2.3}
				intensity={12.3}
				position={[3, 0, 0]}
			/> */}
			{/* <hemisphereLight color={0xffffff} groundColor={0x000000} intensity={23} /> */}
			{/* <directionalLight
				intensity={2}
				color={"#FFFFFF"}
				position={[3.23, 0, 0]}
			/> */}
			{/* <directionalLight intensity={3} color={"#F0F0F0"} position={[1, 1, 1]} /> */}
			{/* <directionalLight
				intensity={2.3}
				color={"#FFFFFF"}
				position={[0, 0.23, 0]}
			/> */}
			{/* <directionalLightHelper /> */}
			{/* <directionalLight
				intensity={2.6}
				color={"#FFFFFF"}
				position={[2.23, 0, 0]}
			/> */}
			<SunLight position={[2.23, 0, 0]} />
			{/* <SunLight position={[-2.23, 0, 0]} /> */}
			{/* <directionalLight
				intensity={2.6}
				color={"#FFFFFF"}
				position={[-2.23, 0, 0]}
			/> */}
			{/* <spotLight color={0xffffff} position={[0, 0, 0]} intensity={12.3} /> */}
			<OrbitControls
				// autoRotate={true}
				// rotateSpeed={0.5}
				enableDamping={true}
				dampingFactor={0.05}
			/>
			{/* <PerspectiveCamera />  */}
			{/* <PresentationControls
				global
				config={{ mass: 2, tension: 230 }}
				snap={false}
				rotation={[0, 0, 0]}
				polar={[-Math.PI / 3, Math.PI / 3]}
				azimuth={[-Math.PI / 1.4, Math.PI / 2]}
			> */}
			{/* {stateGeoData?.map((elem) => {
				if (elem !== null) {
					return <primitive object={}></primitive>
				}
			})} */}
			{/* 	if (continentData !== null) {
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
	}); */}
			{/* <--- Adattare, trovare il modo  ---> */}
			{/* {stateGeoData !== null ? (
				stateGeoData.map((structure: StructureData) => {
					if (structure.line !== undefined) {
						const lineMaterial = new THREE.LineBasicMaterial({
							color: 0x2373c4,
							linewidth: 2
						});
						const line = new THREE.Line(structure.line, lineMaterial);
						// console.log(line);
						// PROVARE mergeBufferGeometries
						return (
							<primitive
								key={line.uuid}
								object={line}
								scale={[equatDiameter, polarDiameter, equatDiameter]}
							/>
						);
					} else if (structure.particle !== undefined) {
						const particleMaterial = new THREE.PointsMaterial({
							color: 0x2373c4
						});
						const particle = new THREE.Points(
							structure.particle,
							particleMaterial
						);
						return (
							<primitive
								key={particle.uuid}
								object={particle}
								scale={[equatDiameter, polarDiameter, equatDiameter]}
							/>
						);
					}
				})
			) : (
				<></>
			)} */}

			{/* HERERRRERE */}
			{/* 
			{stateVertices !== null && 
			
			} */}

			{/* {landMeshes !== null &&
				landMeshes.map((mesh) => {
					return (
						<primitive
							key={mesh.uuid}
							object={mesh}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
						/>
					);
				})} */}
			{/* {starsMeshes !== null && (
				<primitive key={starsMeshes.uuid} object={starsMeshes} />
			)} */}
			{landCoupleMeshes !== null &&
				landCoupleMeshes["surfaces"].map((mesh, index) => {
					return (
						<primitive
							key={`${mesh.uuid}${index}`}
							object={mesh}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
						/>
					);
				})}
			{landCoupleMeshes !== null &&
				landCoupleMeshes["edges"].map((mesh, index) => {
					return (
						<primitive
							key={`${mesh.uuid}${index}`}
							object={mesh}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
						/>
					);
				})}
			{riversLines !== null &&
				riversLines
					// .filter((elem, index) => {
					// 	if (index % 3 === 0) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// })
					// .filter((elem, index) => {
					// 	if (index % 5 !== 0) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// })
					// qui *** partire da solo questo con rivers
					// .filter((elem, index) => {
					// 	if (index % 3 === 0) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// })
					// qui ***

					// .filter((elem, index) => {
					// 	if (index % 2 === 0) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// })
					// valutare cosa tenere
					.map((elem, index) => {
						// const material = new THREE.LineBasicMaterial({
						// 	color: 0xffffff,
						// 	linewidth: 10
						// });
						const whiteMaterial = new THREE.MeshPhysicalMaterial({
							// gold
							// color: 0xffdf00,
							// white
							color: 0xf0f0f0,
							// color: 0xc0ba01,
							iridescence: 0,
							// clearcoat: 0.5,
							// clearcoatRoughness: 0.1,
							reflectivity: 0.8,
							wireframe: false,
							roughness: 0.1,
							metalness: 0.9,
							depthTest: true,
							depthWrite: true,
							opacity: 1,
							alphaTest: 1,
							fog: true
						});
						const goldMaterial = new THREE.MeshPhysicalMaterial({
							// gold
							color: 0xffdf00,
							// white
							// color: 0xf0f0f0,
							// color: 0xc0ba01,
							iridescence: 0,
							// clearcoat: 0.5,
							// clearcoatRoughness: 0.1,
							reflectivity: 0.8,
							wireframe: false,
							roughness: 0.1,
							metalness: 0.9,
							depthTest: true,
							depthWrite: true,
							opacity: 1,
							alphaTest: 1,
							fog: true
						});
						if (index % 2 === 0) {
							const decorativeMesh = new THREE.Mesh(
								elem["rivers"],
								goldMaterial
							);
							return (
								<primitive
									key={`${decorativeMesh.uuid}${index}`}
									object={decorativeMesh}
									rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
								/>
							);
						} else {
							const decorativeMesh = new THREE.Mesh(
								elem["rivers"],
								whiteMaterial
							);
							return (
								<primitive
									key={`${decorativeMesh.uuid}${index}`}
									object={decorativeMesh}
									rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
								/>
							);
						}
						// const line = new THREE.Mesh(
						// 	elem["rivers"],
						// 	new THREE.MeshPhysicalMaterial({
						// 		color: 0xf0f0f0,
						// 		roughness: 0.9,
						// 		metalness: 0.2
						// 	})
						// );
					})}
			{/* 
			{stateSurfaces !== null &&
				Object.values(stateSurfaces)?.map((elem) => {
					let sumX = 0;
					let sumY = 0;
					let sumZ = 0;

					//
					const vertices: number[] = [];
					//
					const vector3Arr = elem.map((item, index) => {
						// arr.push(elem.geom.x, elem.geom.y, elem.geom.z);
						vertices.push(item.geom.x, item.geom.y, item.geom.z);
						sumX += item.geom.x;
						sumY += item.geom.y;
						sumZ += item.geom.z;
						return new THREE.Vector3(item.geom.x, item.geom.y, item.geom.z);
					});

					const middleX = sumX / elem.length;
					const middleY = sumY / elem.length;
					const middleZ = sumZ / elem.length;

					// vector3Arr.map((item, index) => {
					// 	vertices.splice(index, 0, middleX, middleY, middleZ);
					// 	const middleVector = new THREE.Vector3(middleX, middleY, middleZ);
					// 	vector3Arr.splice(index, 0, middleVector);
					// });

					// const vertices =

					// modificare da esempio trovato

					const divisions = 100;
					const curve = new THREE.CatmullRomCurve3(vector3Arr);
					curve.closed = false;

					const upperPoints = curve.getPoints(divisions);
					const upperGeometry = new THREE.BufferGeometry().setFromPoints(
						upperPoints
					);

					const lowerPoints = upperPoints.map((point) => {
						return new THREE.Vector3(0, 0, 0);
					});
					const lowerGeometry = new THREE.BufferGeometry().setFromPoints(
						lowerPoints
					);

					const cylinderGeometry = new THREE.CylinderGeometry(
						1,
						1,
						1,
						divisions,
						3,
						false
					);

					// const curve = new THREE.CatmullRomCurve3(vector3Arr);
					// curve.closed = false;

					// // const upperPoints = curve.getPoints(divisions);
					// // const upperGeometry = new THREE.BufferGeometry().setFromPoints(
					// // 	upperPoints
					// // );

					// const lowerPoints = curve.getPoints(divisions);
					// const lowerGeometry = new THREE.BufferGeometry().setFromPoints(
					// 	lowerPoints
					// );

					// const upperPoints = lowerPoints.map((point) => {
					// 	return new THREE.Vector3(
					// 		sumX / elem.length,
					// 		sumY / elem.length,
					// 		sumZ / elem.length
					// 	);
					// });
					// const upperGeometry = new THREE.BufferGeometry().setFromPoints(
					// 	upperPoints
					// );

					// const cylinderGeometry = new THREE.CylinderGeometry(
					// 	1,
					// 	1,
					// 	1,
					// 	divisions,
					// 	3,
					// 	false
					// );

					cylinderGeometry.attributes.position.array.set(
						upperGeometry.attributes.position.array,
						(divisions + 1) * 3
					);
					cylinderGeometry.attributes.position.array.set(
						lowerGeometry.attributes.position.array,
						0
					);
					const geometry = new THREE.BufferGeometry().setFromPoints(vector3Arr);
					// const convexGeom = new ConvexGeometry(vector3Arr);

					const float32Vert = new Float32Array(vertices);

					const indices = new Uint16Array([
						0,
						1,
						2, // Triangle 1: A -> B -> C
						2,
						1,
						3 // Triangle 2: C -> B -> D
					]);

					// UV-Coordinates
					const uvs = new Float32Array([
						0,
						0, // UV A
						0,
						1, // UV B
						1,
						0, // UV C
						1,
						1 // UV D
					]);

					const material = new THREE.MeshStandardMaterial({
						color: 0x2373c4,
						// emissive: 0xffffff,
						wireframe: false,
						roughness: 0.5,
						metalness: 0.8,
						depthTest: true,
						depthWrite: true
						// side: THREE.DoubleSide
					});

					const verticesGeometry = new THREE.BufferGeometry();
					verticesGeometry.setAttribute(
						"position",
						new THREE.BufferAttribute(float32Vert, 3)
					);
					verticesGeometry.setAttribute(
						"uv",
						new THREE.BufferAttribute(uvs, 2)
					);
					verticesGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
					verticesGeometry.computeVertexNormals();

					// const points = curve.getPoints(100);

					// const geom = new THREE.BufferGeometry();
					// geom.setFromPoints(points);

					// console.log(verticesGeometry)

					const convexGeom = new ConvexGeometry(vector3Arr);
					verticesGeometry.computeVertexNormals();
					const mesh = new THREE.Mesh(convexGeom, material);
					return (
						// <>
						<primitive
							key={verticesGeometry.uuid}
							object={mesh}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
							// rotation-x={1}
							// scale={[equatDiameter, polarDiameter, equatDiameter]}
						/>
					);
				})} */}

			{/* {stateVertices !== null && (
				<primitive
					key={stateVertices.uuid}
					object={stateVertices}
					// position={[0, 0, 0]}
					// rotateX={Math.PI / 4}
					// rotation-x={0.5}
					rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
					// rotation-x={1}
					// scale={[equatDiameter, polarDiameter, equatDiameter]}
				/>
			)} */}
			{/* {surfacesData !== null &&
				surfacesData?.map((elem, index) => {
					const geometry = elem["surface"];
					// console.log(geometry);
					const material = new THREE.MeshStandardMaterial({
						color: 0x2373c4,
						// emissive: 0xffffff,
						wireframe: false,
						roughness: 0.5,
						metalness: 0.8,
						depthTest: true,
						depthWrite: true
					});

					const lineMaterial = new THREE.LineBasicMaterial({
						color: 0xff0000
						// linewidth: 3
					});

					const curveObject = new THREE.LineSegments(geometry, lineMaterial);
					// const mesh = new THREE.Mesh(geometry, material);

					return (
						// <>
						<primitive
							key={geometry.uuid}
							object={curveObject}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
							// rotation-x={1}
							// scale={[equatDiameter, polarDiameter, equatDiameter]}
						/>
					);
				})} */}
			{/* {stateGeoData !== null &&
				stateGeoData?.map((elem, index) => {
					// if (index === 23) {
					const geometry = elem["structures"];
					const middlePoint = elem["middlePoint"];
					const material = new THREE.MeshStandardMaterial({
						color: 0x2373c4,
						// emissive: 0xffffff,
						wireframe: false,
						roughness: 0.5,
						metalness: 0.8,
						depthTest: true,
						depthWrite: true
					});

					// const surfaceGeometry = elem["surface"];
					const mesh = new THREE.Mesh(geometry, material);
					// const surfaceMesh = new THREE.Mesh(surfaceGeometry, material);

					return (
						// <>
						<primitive
							key={geometry.uuid}
							object={mesh}
							// position={[0, 0, 0]}
							// rotateX={Math.PI / 4}
							// rotation-x={0.5}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
							// rotation-x={1}
							// scale={[equatDiameter, polarDiameter, equatDiameter]}
						/>
					);
					// }
					// else {
					// 	return;
					// }
				})} */}

			{/* {stateGeoData !== null &&
				stateGeoData?.map((elem, index) => {
					// const bufferGeometry = elem["structures"];
					// if (index === 23) {
					const geometry = elem["structures"];
					const middlePoint = elem["middlePoint"];
					// console.log(middlePoint);
					const material = new THREE.MeshStandardMaterial({
						color: 0x2373c4,
						// emissive: 0xffffff,
						wireframe: false,
						roughness: 0.5,
						metalness: 0.8,
						depthTest: true,
						depthWrite: true
					});

					const surfaceGeometry = elem["surface"];
					// const arr = surfaceGeometry.attributes.array;

					// const surf = new THREE.BufferGeometry().setFromPoints(points);
					// console.log(surfaceGeometry);
					// surfaceGeometry.computeVertexNormals();
					// const mesh = new THREE.Mesh(geometry, material);
					const surfaceMesh = new THREE.Mesh(surfaceGeometry, material);

					return (
						// <>
						<primitive
							key={`surf${surfaceGeometry.uuid}`}
							object={surfaceMesh}
							rotation-x={THREE.MathUtils.degToRad(-45 - 23.5)}
						/>
					);
				})} */}
			{/* <EarthShapeInt /> */}
			{/* <EarthShapeMed /> */}
			<spotLight
				position={[10, 10, 10]}
				// angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<EarthShapeExt />
			{/* </PresentationControls> */}
			{/* 
			<spotLight
				position={[-18, 23, 20]}
				angle={-0.85}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/> */}
			{/* <PerspectiveCamera /> */}
			{/* <perspectiveCamera position={[0, 0, 5]} /> */}
		</Canvas>
	);
}

// ---> ELIMINARE CONSOLE.LOG <---

// const ThreeScene: FC = () => {
// 	const sceneRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		if (typeof window !== undefined) {
// 			const scene = new THREE.Scene();
// 			const camera = new THREE.PerspectiveCamera(
// 				75,
// 				window.innerWidth / window.innerHeight,
// 				0.1,
// 				1000
// 			);
// 			const renderer = new THREE.WebGLRenderer();
// 			renderer.setSize(window.innerWidth, window.innerHeight);
// 			sceneRef.current?.appendChild(renderer.domElement);
// 			camera.position.z = 5;

// 			const geometry = new THREE.BoxGeometry();
// 			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 			const cube = new THREE.Mesh(geometry, material);
// 			scene.add(cube);

// 			renderer.render(scene, camera);
// 		}
// 	}, []);
// 	return <div ref={sceneRef}></div>;
// };

// export default ThreeScene;
