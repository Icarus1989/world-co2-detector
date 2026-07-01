// const landPointsArraysMax = await landsData.map((elem: any) => {
// 	return drawThreeGeo(elem, 2.85, "sphere", {
// 		color: 0xffffff
// 	});
// });

// const landPointsArraysMed = await landsData.map((elem: any) => {
// 	return drawThreeGeo(elem, 2.823, "sphere", {
// 		color: 0xffffff
// 	});
// });

// const landPointsArraysMin = await landsData.map((elem: any) => {
// 	return drawThreeGeo(elem, 2.3, "sphere", {
// 		color: 0xffffff
// 	});
// });

// const xyxPointsArrays = landPointsArraysMax.map((elem) => {
// 	const pointsArr = elem.map((item) => {
// 		return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
// 	});
// 	return pointsArr;
// });

// const xyzPointsArraysMed = landPointsArraysMed.map((elem) => {
// 	const pointsArr = elem.map((item) => {
// 		return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
// 	});
// 	return pointsArr;
// });

// const xyxPointsArraysBottom = landPointsArraysMin.map((elem) => {
// 	const pointsArr = elem.map((item) => {
// 		return [item["geom"]["x"], item["geom"]["y"], item["geom"]["z"]];
// 	});
// 	return pointsArr;
// });

// const divisions = 100;

// const upperGeometryArr = xyzPointsArraysMed.map((arr) => {
// 	const vect3Arr = arr.map((item) => {
// 		return new THREE.Vector3(item[0], item[1], item[2]);
// 	});

// 	const curveTop = new THREE.CatmullRomCurve3(vect3Arr);
// 	curveTop.curveType = "catmullrom";
// 	curveTop.closed = false;

// 	const upperPoints = curveTop.getPoints(divisions);
// 	const upperGeometry = new THREE.BufferGeometry().setFromPoints(upperPoints);
// 	return upperGeometry;
// });

// const lowerGeometryArr = xyxPointsArraysBottom.map((arr) => {
// 	const vect3Arr = arr.reverse().map((item) => {
// 		return new THREE.Vector3(0, 0, 0);
// 	});

// 	const curveBottom = new THREE.CatmullRomCurve3(vect3Arr);
// 	curveBottom.curveType = "catmullrom";
// 	curveBottom.closed = false;

// 	const lowerPoints = curveBottom.getPoints(divisions);
// 	const lowerGeom = new THREE.BufferGeometry().setFromPoints(lowerPoints);
// 	return lowerGeom;
// });

// // const conesGeometries = upperGeometryArr.map((geom, index) => {
// // 	const coneGeometry = new THREE.ConeGeometry(1, 1, divisions, 1, true);

// // 	coneGeometry.attributes.position.array.set(
// // 		geom.attributes.position.array,
// // 		(divisions + 1) * 3
// // 	);
// // 	coneGeometry.attributes.position.array.set(
// // 		lowerGeometryArr[index].attributes.position.array,
// // 		0
// // 	);

// // 	return coneGeometry;

// // 	// return {
// // 	// 	upper: upperGeometryArr,
// // 	// 	lower: lowerGeometryArr
// // 	// };
// // });

// const surfacesGeometries = await xyxPointsArrays.map((pointsArr) => {
// 	const newVertices: number[] = [];

// 	pointsArr.map((item) => {
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

// 	// return geometry;

// 	// passare i singoli dati necessari alle geometries e
// 	// comporre BufferGeometries e Mesh nel Client
// 	// --->
// 	return {
// 		position: float32Vert,
// 		indices: totalIndeces,
// 		uvs: data,
// 		normals: totalIndeces
// 	};

// 	// lo stesso procedimento per cones
// });

// // const coupleMeshes: {
// // 	surfaces: THREE.Mesh<
// // 		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
// // 		THREE.MeshStandardMaterial,
// // 		THREE.Object3DEventMap
// // 	>[];
// // 	edges: THREE.Mesh<
// // 		THREE.CylinderGeometry,
// // 		THREE.MeshStandardMaterial,
// // 		THREE.Object3DEventMap
// // 	>[];
// // } = {
// // 	surfaces: surfacesMeshes,
// // 	edges: conesMeshes
// // };

// return JSON.stringify({
// 	surfaces: surfacesGeometries,
// 	// edgesUpper: upperGeometryArr,
// 	// edgesLower: lowerGeometryArr
// 	points: {
// 		base: xyxPointsArrays,
// 		medium: xyzPointsArraysMed,
// 		bottom: xyxPointsArraysBottom
// 	}
// });
//
// }

// export async function loadEXR(): Promise<THREE.TextureJSON> {
// 	"use server";
// 	// const data = await fetch("@/public/textures/NightSky.exr");
// 	// console.log(data);
// 	console.log("start exrloader");
// 	let data;
// 	const dataTexture: THREE.DataTexture = await new EXRLoader().loadAsync(
// 		"@/public/textures/NightSky2K.exr",
// 		(texture) => {
// 			console.log(texture);
// 			// console.log(texData);
// 			if (texture) {
// 				return texture;
// 			}
// 		}
// 		// (event) => {
// 		// 	// onProgress
// 		// 	console.log(event);
// 		// }
// 	);
// 	return dataTexture.toJSON();
// }

// Inserire i try...catch dove mancanti

// export async function analyzeCoastLineData() {
// 	"use server";

// 	const data: any = jsonData;
// 	console.log("Here");

// 	// type ContinentInfo = {
// 	// 	continent: [number, number][];
// 	// };

// 	const list: ContinentInfo[] = [];

// 	// const filterData = data["features"].map((elem: any, index: number) => {
// 	// 	if (elem["geometry"]["coordinates"].length > 800) {
// 	// 		// console.log(elem["geometry"]["coordinates"]);
// 	// 		const value: [number, number][] = elem["geometry"]["coordinates"]
// 	// 			.filter((couple: [number, number], index: number) => {
// 	// 				if (index % 2 === 0) {
// 	// 					return false;
// 	// 				} else {
// 	// 					return true;
// 	// 				}
// 	// 			})
// 	// 			.filter((couple: [number, number], index: number) => {
// 	// 				if (index % 2 === 0) {
// 	// 					return false;
// 	// 				} else {
// 	// 					return true;
// 	// 				}
// 	// 			})
// 	// 			.filter((couple: [number, number], index: number) => {
// 	// 				if (index % 2 === 0) {
// 	// 					return false;
// 	// 				} else {
// 	// 					return true;
// 	// 				}
// 	// 			})
// 	// 			.filter((couple: [number, number], index: number) => {
// 	// 				if (index % 2 === 0) {
// 	// 					return false;
// 	// 				} else {
// 	// 					return true;
// 	// 				}
// 	// 			});
// 	// 		// .filter((couple: [number, number], index: number) => {
// 	// 		// 	if (index % 2 === 0) {
// 	// 		// 		return false;
// 	// 		// 	} else {
// 	// 		// 		return true;
// 	// 		// 	}
// 	// 		// });
// 	// 		// forse levare un filter
// 	// 		list.push({ continent: value });
// 	// 	}
// 	// });

// 	const filterData = data["features"].filter((elem: any, index: number) => {
// 		if (elem["geometry"]["coordinates"].length > 80) {
// 			return true;

// 			// console.log(elem["geometry"]["coordinates"]);
// 			// const value: [number, number][] = elem["geometry"]["coordinates"]
// 			// 	.filter((couple: [number, number], index: number) => {
// 			// 		if (index % 2 === 0) {
// 			// 			return false;
// 			// 		} else {
// 			// 			return true;
// 			// 		}
// 			// 	})
// 			// 	.filter((couple: [number, number], index: number) => {
// 			// 		if (index % 2 === 0) {
// 			// 			return false;
// 			// 		} else {
// 			// 			return true;
// 			// 		}
// 			// 	})
// 			// 	.filter((couple: [number, number], index: number) => {
// 			// 		if (index % 2 === 0) {
// 			// 			return false;
// 			// 		} else {
// 			// 			return true;
// 			// 		}
// 			// 	})
// 			// 	.filter((couple: [number, number], index: number) => {
// 			// 		if (index % 2 === 0) {
// 			// 			return false;
// 			// 		} else {
// 			// 			return true;
// 			// 		}
// 			// 	});
// 			// // .filter((couple: [number, number], index: number) => {
// 			// // 	if (index % 2 === 0) {
// 			// // 		return false;
// 			// // 	} else {
// 			// // 		return true;
// 			// // 	}
// 			// // });
// 			// // forse levare un filter
// 			// list.push({ continent: value });
// 		} else {
// 			return false;
// 		}
// 	});
// 	console.log(list.length);
// 	// 10 continenti
// 	// list
// 	// 	.sort((elemA: any, elemB: any) => {
// 	// 		return elemA["coordinates"].length - elemB["coordinates"].length;
// 	// 	})
// 	// 	.map((elem) => console.log(elem["coordinates"]));
// 	return filterData;
// }
