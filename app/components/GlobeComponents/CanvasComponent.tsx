"use client";

import { useState, useRef, useEffect, FC } from "react";

import * as THREE from "three";

import image from "@/public/textures/2k_earth_nightmap.jpg";
import imageDay from "@/public/textures/8k_earth_daymap.jpg";

import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";

import Continent3DComponent from "../3DComponents/Continent3DComponent";
// import jsonData from "@/public/coastlines/ne_10m_coastline.json";

// import textureEarth from "../../textures/2k_earth_nightmap.jpg";

// import textureImage from "@/public/2k_earth_nightmap.jpg";

function EuropeShape(
	{
		geoData
	}: {
		geoData: ContinentInfo[] | null;
	},
	props: ThreeElements["mesh"]
) {
	const shapeRef = useRef<THREE.Mesh>(null!);
	// const sphere = new THREE.SphereGeometry(1.23);

	const equatDiameter = 12756.274 / 10000;
	const polarDiameter = 12713.504 / 10000;
	// console.log(equatDiameter, polarDiameter);
	// const shape = new THREE.SphereGeometry(1, 32, 16);
	// shape.scale(equatDiameter, polarDiameter, equatDiameter);

	// test continent shape

	const shape = new THREE.Shape();

	// const data = geoData;

	if (geoData !== null) {
		shape.moveTo(1, 2.3);
		const data = geoData;
		// console.log(data[0]);

		const continentCoords = data[16]["continent"].map((group) => {
			// console.log(group[0]);
			return { x: group[0], y: group[1] };
		});

		// shape.moveTo(0, 0);
		// shape.moveTo(continentCoords[0]["x"], continentCoords[0]["y"]);

		// console.log(continentCoords);

		for (let elem of continentCoords) {
			const x = elem["x"];
			const y = elem["y"];
			shape.lineTo(x / 23, y / 23);
		}

		// shape.scale(0.2, 0.2, 0.2);
	}

	const extrudeSettings = {
		curveSegments: 12,
		depth: 0.1023,
		bevelEnabled: false,
		// bevelSegments: 123,
		steps: 123,
		bevelSize: 0,
		bevelOffset: 0
		// bevelThickness: 1
		// extrudePath:
		// bevelEnabled: true,
		// bevelThickness: 1,
		// bevelSize: 1,
		// bevelOffset: 1,
		// bevelSegments: 1
	};

	// console.log(shape);

	const points = shape.getPoints();

	const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	// const geometry = new THREE.BufferGeometry().setFromPoints(points);
	// console.log(geometry.parameters);
	const material = new THREE.LineBasicMaterial({ color: 0xffffff });
	const line = new THREE.Line(geometry, material);

	const textureEarth = useLoader(THREE.TextureLoader, imageDay.src);
	// 	new THREE.TextureLoader().load(
	// 	"@/public/"
	// );
	// textureEarth.colorSpace = THREE.SRGBColorSpace;
	//
	const shapeMaterial = new THREE.MeshStandardMaterial({
		color: "#2373c4",
		// emissive: "#FFFFFF",
		wireframe: false,
		roughness: 0.5,
		metalness: 0.8,
		depthTest: true,
		depthWrite: true

		// map: textureEarth

		// vertexColors: true
	});

	// shape.computeBoundingBox();

	const gradientMaterial = new THREE.ShaderMaterial({
		uniforms: {
			color1: {
				value: new THREE.Color("#4a09d6")
			},
			color2: {
				value: new THREE.Color("#F01010")
			}
		},
		vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
		fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
		wireframe: false,
		vertexColors: true,
		fog: true
	});

	// const tempMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	// const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());

	// useFrame((state, delta) => {
	// 	// shapeRef.current.rotation.y += delta / 2;
	// 	// shapeRef.current.rotation.y -= delta;
	// 	shapeRef.current.rotation.y += delta / 3;
	// 	// shapeRef.current.rotation.x += delta / 2;
	// });
	return (
		<mesh
			{...props}
			ref={shapeRef}
			geometry={geometry}
			// material={shapeMaterial}
			material={shapeMaterial}
		>
			{/* <boxGeometry args={[1, 1, 1]} /> */}
			{/* {sphere} */}
			{/* <sphereGeometry args={[1.23]} />
			<meshBasicMaterial color={"0xffff00"} /> */}
		</mesh>
	);
}

const generalExtrSettings = {
	curveSegments: 12,
	depth: 0.1023,
	bevelEnabled: false,
	steps: 123,
	bevelSize: 0,
	bevelOffset: 0
};

function Europe3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 2.3, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function JapanNorth3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 5.7, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function UK3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -0.1, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Ireland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -0.2, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Iceland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -0.6, y: 2.8 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Svalbard3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 0.7, y: 3.5 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function NovajaIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 2.5, y: 3.2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function GreenLand3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -2.3, y: 3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function NewfoundlandIsland3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -2.3, y: 2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function SouthPoleCentral3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 1.8, y: -4 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function FireIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.0, y: -2.35 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function SouthAmericaNorth3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.1, y: -0.2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Australia3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 6, y: -1.4 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function NewZeland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 7.5, y: -1.9 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Tazmania3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 6.3, y: -1.9 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function PapuaNuovaGuinea3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 6.2, y: -0.2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function SundaIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 4.9, y: -0.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function VancouverIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -5.5, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function StLawrenceIsland3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -7.5, y: 2.8 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function BaffinIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.0, y: 2.8 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function NorthWestHIsland3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.8, y: 3.5 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Japan3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 5.8, y: 1.6 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function CentralAndAmericaAndUS3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -4.8, y: 1.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function CanadaAndAlaska3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.1, y: 1.8 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function CanadaIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -4.0, y: 2.0 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function CanadaIslandTwo3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -4.0, y: 3.0 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function CanadaIslandThree3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -5.0, y: 3.2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Cuba3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.3, y: 0.9 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Haiti3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: -3.1, y: 0.82 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function IndoChina3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 3.0, y: 1.5 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Manila3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 5.3, y: 0.8 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function PhilipIsland3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 5.4, y: 0.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

//

function Indonesia3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 4.6, y: 0 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Sumatra3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 4.6, y: -0.2 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Brunei3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 4.6, y: 0 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Madagascar3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 2.0, y: -0.7 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function MiddleNorthAfrica3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 1.5, y: 0 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function MiddleSouthAfrica3DShape({
	data
}: {
	data: [number, number][] | null;
}) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 1, y: 1 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

function Asia3DShape({ data }: { data: [number, number][] | null }) {
	return (
		<Continent3DComponent
			continentData={data}
			initialPoints={{ x: 1.3, y: 2.3 }}
			extrSettings={generalExtrSettings}
		/>
	);
}

import type { ContinentInfo } from "@/app/utilities/types/types";

export default function CanvasElement({
	analyzeCoastLineData
}: {
	analyzeCoastLineData: () => Promise<ContinentInfo[]>;
}) {
	// console.log(analyzeCoastLineData);
	// console.log(jsonData);

	// const list: [number, number][] = [];

	// jsonData["features"].map((elem: any) => {
	// 	if (elem["geometry"]["coordinates"].length > 6000) {
	// 		list.push(elem["geometry"]["coordinates"]);
	// 	}
	// });
	// console.log(list[0]);

	const basicState: ContinentInfo = { continent: [[0, 0]] };

	const [data, setData] = useState<ContinentInfo[] | null>(null);
	useEffect(() => {
		let ignore = false;
		async function startAnalyze() {
			try {
				const arr = await analyzeCoastLineData();
				// console.log(arr);
				if (!ignore) {
					setData(arr);
				}
			} catch (error) {
				console.log("Error - no data need modal");
				if (!ignore) {
					setData([basicState]);
				}
			}
		}
		startAnalyze();

		return () => {
			ignore = true;
		};
	}, []);
	// console.log(data);
	return (
		<Canvas>
			<ambientLight color={"#F0F0F0"} intensity={23} />
			<spotLight
				position={[18, 2.3, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight
				position={[1, 23, 10]}
				color={0xffffff}
				intensity={100}
				distance={100}
			/>
			{/* 45, width / height, 1, 1000 */}
			{/* <EuropeShape geoData={data} /> */}
			{/* SOUTHPOLE */}
			<SouthPoleCentral3DShape
				data={
					data
						? [
								...data[0]["continent"],
								...data[1]["continent"],
								...data[70]["continent"]
						  ]
						: null
				}
			/>
			{/* SOUTHPOLE */}
			{/* <SouthPoleCentral3DShape data={data ? data[0]["continent"] : null} /> */}
			{/* <SouthPoleWest3DShape data={data ? data[1]["continent"] : null} /> */}
			{/* Ok */}
			{/* AUSTRALIA */}
			{/* ----- */}
			{/* West OK */}
			<Australia3DShape
				data={data ? [...data[5]["continent"], ...data[6]["continent"]] : null}
			/>
			{/* East OK */}
			{/* AUSTRALIA */}
			{/* ----- */}
			{/* GREENLAND */}
			<GreenLand3DShape
				data={
					data ? [...data[55]["continent"], ...data[56]["continent"]] : null
				}
			/>
			{/* GREENLAND */}
			{/* ----- */}
			{/* AFRICA */}
			<MiddleNorthAfrica3DShape
				data={
					data
						? [
								// ...data[8]["continent"],
								// ...data[8]["continent"],
								// ...data[18]["continent"],
								...data[21]["continent"],
								...data[26]["continent"],

								...data[19]["continent"]
						  ]
						: null
				}
			/>
			<MiddleSouthAfrica3DShape
				data={
					data
						? [
								...data[7]["continent"],
								// ...data[8]["continent"],
								...data[8]["continent"],
								...data[18]["continent"]
								// ...data[19]["continent"],
								// ...data[21]["continent"],
								// ...data[26]["continent"]
						  ]
						: null
				}
			/>
			<Madagascar3DShape data={data ? data[4]["continent"] : null} />
			{/* AFRICA */}
			{/* ----- */}
			{/* ASIA */}
			{/* India 35 IndoChinaLand 32 ExtrEastAsia 33 EastMongolia 34 EastRussia 72
			NorthAsiaEast 51 NorthAsiaCentral 46 NorthAsia 54 . WestAsia 44
			NorthWestAsia 45 -* EastAsia 59 */}
			<Asia3DShape
				data={
					data
						? [
								// ...data[59]["continent"],

								...data[44]["continent"],

								...data[22]["continent"],

								...data[32]["continent"],
								...data[33]["continent"],
								...data[34]["continent"],
								...data[35]["continent"],
								...data[46]["continent"],

								...data[51]["continent"],

								...data[72]["continent"],

								...data[54]["continent"],
								...data[45]["continent"]

								// ...data[39]["continent"]
								// ...data[43]["continent"],
								// ...data[48]["continent"]
						  ]
						: null
				}
			/>
			{/* ASIA */}
			{/* ----- */}
			{/* EUROPE */}
			<Europe3DShape
				data={
					data
						? [
								...data[43]["continent"],
								...data[39]["continent"],
								...data[48]["continent"]
						  ]
						: null
				}
			/>
			{/* EUROPE */}
			{/* ----- */}
			{/* CENTRAL AMERICA & US */}
			<CentralAndAmericaAndUS3DShape
				data={
					data
						? [
								...data[25]["continent"],
								...data[23]["continent"],
								// ...data[30]["continent"]
								// ...data[47]["continent"]
								// ...data[49]["continent"],
								// ...data[29]["continent"],
								...data[47]["continent"],
								...data[31]["continent"],
								...data[24]["continent"]
						  ]
						: null
				}
			/>
			<CanadaAndAlaska3DShape
				data={
					data
						? [
								// ...data[25]["continent"],
								// ...data[23]["continent"],
								...data[29]["continent"],
								...data[49]["continent"],

								...data[30]["continent"]
								//
								// ...data[31]["continent"],
								// ...data[24]["continent"]
						  ]
						: null
				}
			/>
			{/* CENTRAL AMERICA & US */}
			{/* ----- */}
			{/* SOUTH AMERICA */}
			<SouthAmericaNorth3DShape
				data={
					data
						? [
								...data[17]["continent"],
								...data[3]["continent"],
								...data[2]["continent"],
								...data[12]["continent"],
								...data[13]["continent"]
						  ]
						: null
				}
			/>
			<FireIsland3DShape data={data ? data[68]["continent"] : null} />
			{/* SOUTH AMERICA */}
			{/* ----- */}

			{/* <SundaIsland3DShape data={data ? data[9]["continent"] : null} /> */}

			<PapuaNuovaGuinea3DShape data={data ? data[10]["continent"] : null} />
			<Indonesia3DShape data={data ? data[11]["continent"] : null} />

			<Sumatra3DShape data={data ? data[14]["continent"] : null} />
			<Brunei3DShape data={data ? data[15]["continent"] : null} />
			{/* <PhilipIsland3DShape data={data ? data[16]["continent"] : null} /> */}

			<Manila3DShape data={data ? data[20]["continent"] : null} />

			<Japan3DShape data={data ? data[27]["continent"] : null} />

			<Japan3DShape data={data ? data[28]["continent"] : null} />

			<NewfoundlandIsland3DShape data={data ? data[36]["continent"] : null} />
			{/* <JapanNorth3DShape data={data ? data[37]["continent"] : null} /> */}
			<Ireland3DShape data={data ? data[38]["continent"] : null} />
			<UK3DShape data={data ? data[40]["continent"] : null} />
			<Iceland3DShape data={data ? data[41]["continent"] : null} />
			{/* <StLawrenceIsland3DShape data={data ? data[42]["continent"] : null} /> */}
			<CanadaIsland3DShape data={data ? data[50]["continent"] : null} />
			<BaffinIsland3DShape data={data ? data[52]["continent"] : null} />
			{/* <NovajaIsland3DShape data={data ? data[53]["continent"] : null} /> */}
			<Haiti3DShape data={data ? data[57]["continent"] : null} />
			{/* <VancouverIsland3DShape data={data ? data[58]["continent"] : null} /> */}
			<CanadaIslandTwo3DShape data={data ? data[60]["continent"] : null} />
			<CanadaIslandTwo3DShape data={data ? data[61]["continent"] : null} />
			{/* <CanadaIslandThree3DShape data={data ? data[62]["continent"] : null} /> */}
			<NorthWestHIsland3DShape data={data ? data[63]["continent"] : null} />
			<NorthWestHIsland3DShape data={data ? data[64]["continent"] : null} />
			<NorthWestHIsland3DShape data={data ? data[65]["continent"] : null} />
			<Tazmania3DShape data={data ? data[66]["continent"] : null} />
			{/* <Svalbard3DShape data={data ? data[67]["continent"] : null} /> */}
			{/* Check */}
			{/* Check */}
			<Cuba3DShape data={data ? data[69]["continent"] : null} />
			{/* <IndoChina3DShape data={data ? data[71]["continent"] : null} /> */}
			<NewZeland3DShape data={data ? data[73]["continent"] : null} />
			<NewZeland3DShape data={data ? data[74]["continent"] : null} />
			{/* <pointLight
				position={[1, 23, 35]}
				color={0xffffff}
				intensity={100}
				distance={100}
			/> */}
			<spotLight
				position={[-18, 23, 20]}
				angle={-0.85}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
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
