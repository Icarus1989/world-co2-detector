import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}): THREE.Points<
	THREE.BufferGeometry<THREE.NormalBufferAttributes>,
	THREE.PointsMaterial,
	THREE.Object3DEventMap
> {
	function randomSpherePoint() {
		const radius = Math.random() * 25 + 25;
		const u = Math.random();
		const v = Math.random();
		const theta = 2 * Math.PI * u;
		const phi = Math.acos(2 * v - 1);
		let x = radius * Math.sin(phi) * Math.cos(theta);
		let y = radius * Math.sin(phi) * Math.sin(theta);
		let z = radius * Math.cos(phi);

		return {
			pos: new THREE.Vector3(x, y, z),
			hue: 0.6, // radius * 0.02 + 0.5
			minDist: radius
		};
	}
	const verts = [];
	const colors = [];
	const positions = [];
	let col;
	for (let i = 0; i < numStars; i += 1) {
		let p = randomSpherePoint();
		const { pos, hue } = p;
		positions.push(p);
		col = new THREE.Color().setHSL(hue, 0.2, Math.random());
		verts.push(pos.x, pos.y, pos.z);
		colors.push(col.r, col.g, col.b);
	}
	const geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> =
		new THREE.BufferGeometry();
	geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
	geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	const material = new THREE.PointsMaterial({
		size: 0.2,
		vertexColors: true,
		fog: false
		// map: sprite,
	});
	const points: THREE.Points<
		THREE.BufferGeometry<THREE.NormalBufferAttributes>,
		THREE.PointsMaterial,
		THREE.Object3DEventMap
	> = new THREE.Points(geometry, material);
	return points;
}
