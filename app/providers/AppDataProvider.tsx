"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useReducer
} from "react";
import {
	AppDataAction,
	AppDataContextObj,
	AppDataState
} from "../utilities/types/types";

const initialDataState: AppDataState = {
	selectedTarget: null,
	isResultsOpen: false,
	activeResultTab: "overview",
	selectedPollutants: ["co", "pm25", "pm10"],
	activeOverlay: null
};

function appDataReducer(
	state: AppDataState,
	action: AppDataAction
): AppDataState {
	if (action.type === "search/submitted") {
		return {
			...state,
			selectedTarget: action.payload,
			isResultsOpen: false,
			activeResultTab: "overview",
			activeOverlay: null
		};
	} else if (action.type === "results/open") {
		return {
			...state,
			isResultsOpen: true,
			activeOverlay: null
		};
	} else if (action.type === "results/close") {
		return {
			...state,
			isResultsOpen: false
		};
	} else if (action.type === "ui/openSearch") {
		return {
			...state,
			activeOverlay: "search",
			isResultsOpen: false
		};
	} else if (action.type === "ui/openSettings") {
		return {
			...state,
			activeOverlay: "settings"
		};
	} else if (action.type === "ui/closeOverlay") {
		return {
			...state,
			activeOverlay: null
		};
	} else if (action.type === "results/tabChanged") {
		return {
			...state,
			activeResultTab: action.payload
		};
	} else if (action.type === "pollutants/toggled") {
		const alreadySelected: boolean = state.selectedPollutants.includes(
			action.payload
		);

		if (alreadySelected === true) {
			return {
				...state,
				selectedPollutants: state.selectedPollutants.filter(
					(item) => item !== action.payload
				)
			};
		} else {
			return {
				...state,
				selectedPollutants: [...state.selectedPollutants, action.payload]
			};
		}
	} else {
		return state;
	}
}

const AppDataContext = createContext<AppDataContextObj | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(appDataReducer, initialDataState);

	const value = useMemo<AppDataContextObj>(() => {
		return {
			state,
			submitSearch: (target) => {
				dispatch({ type: "search/submitted", payload: target });
			},
			openResults: () => {
				dispatch({ type: "results/open" });
			},
			closeResults: () => {
				dispatch({ type: "results/close" });
			},
			setActiveResultTab: (tab) => {
				dispatch({ type: "results/tabChanged", payload: tab });
			},
			togglePollutants: (poll) => {
				dispatch({ type: "pollutants/toggled", payload: poll });
			},
			openSearchOverlay: () => {
				dispatch({ type: "ui/openSearch" });
			},
			openSettingsOverlay: () => {
				dispatch({ type: "ui/openSettings" });
			},
			closeOverlay: () => {
				dispatch({ type: "ui/closeOverlay" });
			}
		};
	}, [state]);

	return (
		<AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
	);
}

export function useAppData() {
	const context = useContext(AppDataContext);

	if (!context) {
		throw new Error("useAppData must be inside AppDataProvider");
	}

	return context;
}

// pulito manca ultimo check
