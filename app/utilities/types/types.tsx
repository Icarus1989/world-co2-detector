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

export type SearchModeType = "place" | "coordinates" | "country";

export type SearchTargetType = {
	mode: SearchModeType;
	label: string;
	startDate: string;
	endDate: string;
	latitude?: number;
	longitude?: number;
	countryCode?: string;
	bbox?: [number, number, number, number];
};

export type SearchFormStateType = {
	mode: SearchModeType;
	place: string;
	countryCode: string;
	latitude: string;
	longitude: string;
	startDate: string;
	endDate: string;
};

export type CanvasContainerProps = {
	analyzeLandsData: () => Promise<any>;
	analyzeBoundaryLines: () => Promise<any>;
	analyzeInternalBound: () => Promise<any>;
	analyzeBreakLines: () => Promise<any>;
	globeTarget: SearchTargetType | null;
};

export type SearchContainerProps = {
	geocodePlaceAction: (
		params: GeocodePlaceActionParams
	) => Promise<GeocodePlaceActionResult>;
	onSearchSubmit: (target: SearchTargetType) => void;
};

export type SearchPanelProps = {
	onClose: () => void;
	onSearchSubmit: (target: SearchTargetType) => void;
	geocodePlaceAction: (
		params: GeocodePlaceActionParams
	) => Promise<GeocodePlaceActionResult>;
};

export type DemoPlace = {
	label: string;
	latitude: number;
	longitude: number;
	countryCode: string;
	bbox?: [number, number, number, number];
};

export type GlobeCoordinates = {
	latitude: number;
	longitude: number;
};

export type PollutionSummary = {
	locationLabel: string;
	parameter: "co";
	averageValue: number | null;
	unit: string;
	startDate: string;
	endDate: string;
	dataSource: string;
	status: "test" | "success" | "empty" | "error";
};

export type ChartPoint = {
	label: string;
	value: number;
};

export type ResultsModalProps = {
	target: SearchTargetType;
	getAirQualityDatasetAction: (
		target: SearchTargetType
	) => Promise<AirQualityActionResult>;
	getSixMonthsAQTrendAction: (
		target: SearchTargetType
	) => Promise<SixMonthsActionResult>;
	onClose: () => void;
};

export type ResultsMapProps = {
	target: SearchTargetType;
};

export type ResultTab = "overview" | "map" | "pollutants" | "trend" | "sources";

export type PollutCode = "co" | "pm25" | "pm10" | "no2" | "o3" | "so2";

export type AppDataState = {
	selectedTarget: SearchTargetType | null;
	isResultsOpen: boolean;
	activeResultTab: ResultTab;
	selectedPollutants: PollutCode[];
	activeOverlay: ActiveOverlayType;
};

export type AppDataAction =
	| { type: "search/submitted"; payload: SearchTargetType }
	| { type: "results/open" }
	| { type: "results/close" }
	| { type: "results/tabChanged"; payload: ResultTab }
	| { type: "pollutants/toggled"; payload: PollutCode }
	| { type: "ui/openSearch" }
	| { type: "ui/openSettings" }
	| { type: "ui/closeOverlay" };

export type AppDataContextObj = {
	state: AppDataState;
	submitSearch: (target: SearchTargetType) => void;
	openResults: () => void;
	closeResults: () => void;
	setActiveResultTab: (tab: ResultTab) => void;
	togglePollutants: (poll: PollutCode) => void;
	openSearchOverlay: () => void;
	openSettingsOverlay: () => void;
	closeOverlay: () => void;
};

export type MainHomeClientProps = {
	analyzeLandsData: () => Promise<any>;
	analyzeBoundaryLines: () => Promise<any>;
	analyzeInternalBound: () => Promise<any>;
	analyzeBreakLines: () => Promise<any>;

	geocodePlaceAction: (
		params: GeocodePlaceActionParams
	) => Promise<GeocodePlaceActionResult>;

	getAirQualityDatasetAction: (
		target: SearchTargetType
	) => Promise<AirQualityActionResult>;

	getSixMonthsAQTrendAction: (
		target: SearchTargetType
	) => Promise<SixMonthsActionResult>;
};

export type PollutSource = "openaq" | "openmeteo";

export type PollutReading = {
	pollutant: PollutCode;
	value: number | null;
	unit: string;
	source: PollutCode;
	datetime?: string;
};

export type PollutDataset = {
	locationLabel: string;
	latitude?: number;
	longitude?: number;
	startDate: string;
	endDate: string;
	readings: PollutReading[];
	sourceNotes: string[];
};

export type PollutSummary = {
	code: PollutCode;
	label: string;
	value: number | null;
	unit: string;
	min: number | null;
	max: number | null;
	sampleCount: number;
	source: PollutSource;
};

export type AirQualityIndexSummary = {
	code: "european_aqi" | "us_aqi";
	label: string;
	value: number | null;
	min: number | null;
	max: number | null;
	sampleCount: number;
	source: PollutSource;
};

export type AirQualityTrendPoint = {
	date: string;
	co: number | null;
	pm25: number | null;
	pm10: number | null;
	no2: number | null;
	o3: number | null;
	so2: number | null;
};

export type OpenAqNearbyStation = {
	id: number;
	name: string;
	latestCount: number;
};

export type AirQualityDataset = {
	target: SearchTargetType;
	latitude: number;
	longitude: number;
	fetchedAt: string;
	primarySource: PollutSource;
	summaries: PollutSummary[];
	indexes: AirQualityIndexSummary[];
	trend: AirQualityTrendPoint[];
	nearbyStations: OpenAqNearbyStation[];
	sourceNotes: string[];
	warnings: string[];
};

export type AirQualityActionResult =
	| { ok: true; dataset: AirQualityDataset }
	| { ok: false; error: string };

export type OpenMeteoHourlyResponse = {
	latitude: number;
	longitude: number;
	hourly_units: Record<string, string>;
	hourly?: {
		time?: string[];
		carbon_monoxide?: Array<number | null>;
		pm10?: Array<number | null>;
		pm2_5?: Array<number | null>;
		nitrogen_dioxide?: Array<number | null>;
		ozone?: Array<number | null>;
		sulphur_dioxide?: Array<number | null>;
		european_aqi?: Array<number | null>;
		us_aqi?: Array<number | null>;
	};
};

export type SixMonthsActionResult =
	| {
			ok: true;
			trend: AirQualityTrendPoint[];
			startDate: string;
			endDate: string;
			source: PollutSource;
	  }
	| {
			ok: false;
			error: string;
	  };

export type ResultsTrendTabProps = {
	target: SearchTargetType;
	getSixMonthsAQTrendAction: (
		target: SearchTargetType
	) => Promise<SixMonthsActionResult>;
};

export type GeocodePlaceActionResult =
	| {
			ok: true;
			target: SearchTargetType;
	  }
	| {
			ok: false;
			error: string;
	  };

export type GeocodePlaceActionParams = {
	query: string;
	startDate: string;
	endDate: string;
	countryCode?: string;
	language?: "it" | "en";
};

export type MapboxFeature = {
	type?: string;
	geometry?: {
		type?: string;
		coordinates?: [number, number];
	};
	bbox?: [number, number, number, number];
	properties?: {
		name?: string;
		name_preferred?: string;
		full_address?: string;
		place_formatted?: string;
		feature_type?: string;
		context?: {
			country?: {
				country_code?: string;
				name?: string;
			};
		};
		coordinates?: {
			longitude?: number;
			latitude?: number;
		};
	};
};

export type SettingsDialogType = "about" | "language" | null;

export type ActiveOverlayType = "search" | "settings" | null;

export type AnimatedGlobeGroupProps = {
	globeTarget: SearchTargetType | null;
	landCoupleMeshes: {
		surfaces: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshStandardMaterial,
			THREE.Object3DEventMap
		>[];
	} | null;
	boundaryLines: {
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
	} | null;
	internalLines: {
		bound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null;
	breakLines: {
		bound: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.MeshPhysicalMaterial,
			THREE.Object3DEventMap
		>[];
	} | null;
};

export type OpenAqSensor = {
	id: number;
	name?: string;
	parameter?: {
		id?: number;
		name?: string;
		units?: string;
		displayName?: string;
	};
	latest?: {
		value?: number;
		datetime?: {
			utc?: string;
			local?: string;
		};
	};
	summary?: {
		min?: number;
		max?: number;
		avg?: number;
		average?: number;
	};
};

export type OpenAqLastRead = {
	value?: number;
	sensorId?: number;
	locationId?: number;
	datetime?: {
		utc?: string;
		local?: string;
	};
};

export type OpenAqLocationDetails = {
	id: number;
	name?: string;
	locality?: string;
	country?: {
		name?: string;
	};
	sensors?: OpenAqSensor[];
};

export type SensorSelection = {
	code: PollutCode;
	sensor: OpenAqSensor;
	station: OpenAqNearbyStation;
};

export type BoundaryFeature = {
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
