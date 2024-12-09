import { Dispatch, SetStateAction } from "react";

export type FormData = {
	name: string;
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
