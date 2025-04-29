import { Dispatch, SetStateAction } from "react";
import * as THREE from "three";

export type FormData = {
	search: string;
	lat: string;
	lon: string;
	begin: string;
	end: string;
};

export type ActiveSearch = {
	first: boolean;
	second: boolean;
	third: boolean;
};

export type SearchTextProps = {
	id: string;
	active: boolean;
	activeBtn: ActiveSearch;
	handleClick: any;
	setActiveBtn: Dispatch<SetStateAction<ActiveSearch>>;
	formData: FormData;
	handleChange: any;
	handleSubmit: any;
	animationComp: AnimationMapping;
	setAnimationComp: Dispatch<SetStateAction<AnimationMapping>>;
	// setFormData: Dispatch<SetStateAction<FormData>>;
	// setSections: Dispatch<SetStateAction<ReactNode[]>>;
};

export type AnimatonStatus = {
	status: "play" | "stop" | "reverse";
};

export type AnimationMapping = {
	search: {
		mag: AnimatonStatus;
	};
	coords: {
		lat: AnimatonStatus;
		lon: AnimatonStatus;
	};
	date: {
		begin: AnimatonStatus;
		end: AnimatonStatus;
	};
};

export type TextData = {
	text: string;
};

// export type CoordKeys = "degrees" | "minutes" | "seconds" | "dir";

export type DegreeKey = "degrees";

export type DegreeSpec = {
	degrees: number | null;
};

export type MinuteSpec = {
	minutes: number | null;
};

export type SecondSpec = {
	seconds: number | null;
};

export type CoordsData = DegreeSpec & MinuteSpec & SecondSpec;

export type LatSpecs = {
	dir: "N" | "S" | null;
};

export type LonSpecs = {
	dir: "E" | "W" | null;
};

// export type CoordsData = {
// 	coord: number | null;
// };

export type DateData = {
	date: Date;
};

export interface DataComposition {
	search: TextData;
	lat: LatSpecs & CoordsData;
	lon: LonSpecs & CoordsData;
	begin: DateData;
	end: DateData;
}

export type ContinentInfo = {
	continent: [number, number][];
};

export type StructureData = {
	geom: THREE.BufferGeometry;
	// material: THREE.LineBasicMaterial;
};

export type FeatureCollection = {
	type: string;
	features: {
		type: string;
		properties: {
			name: string;
			isoa3: string;
			continent: string;
			region: string;
			subregion: string;
			regionwb: string;
		};
		geometry: {
			type: string;
			coordinates: [number, number][][];
		};
	}[];
};

export type LandFeature = {
	type: string;
	features: {
		type: string;
		geometry: {
			type: string;
			coordinates: [number, number][][];
		};
	};
};
