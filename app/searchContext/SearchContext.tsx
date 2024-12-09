"use client";

import {
	createContext,
	useReducer,
	useState,
	useEffect,
	useContext,
	useCallback,
	ReactElement,
	ChangeEvent
} from "react";
import { AnimationMapping, AnimatonStatus } from "../utilities/types/types";

type SearchDetails = {
	data: {
		text: string;
		handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	};
	animationHandling: AnimationMapping;
};

const enum reducerActionType {
	PLAY_LAT,
	PLAY_LON,
	PLAY_TEXT,
	PLAY_BEGIN,
	PLAY_END,
	STOP_LAT,
	STOP_LON,
	STOP_TEXT,
	STOP_BEGIN,
	STOP_END,
	REVERSE_LAT,
	REVERSE_LON,
	REVERSE_TEXT,
	REVERSE_BEGIN,
	REVERSE_END
}

type ReducerAction = {
	type: reducerActionType;
	payload?: AnimatonStatus;
};

export const initialSettings: SearchDetails = {
	data: {
		text: "",
		handleTextInput: (event: ChangeEvent<HTMLInputElement>) => {
			return console.log(event.target);
		}
	},
	animationHandling: {
		search: {
			mag: { status: "stop" }
		},
		coords: {
			lat: { status: "stop" },
			lon: { status: "stop" }
		},
		date: {
			begin: { status: "stop" },
			end: { status: "stop" }
		}
	}
};

function settingsReducer(
	state: SearchDetails,
	action: ReducerAction
): SearchDetails {
	if (action.type === reducerActionType.PLAY_TEXT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				search: {
					mag: { status: "play" }
				}
			}
		};
	} else if (action.type === reducerActionType.PLAY_LAT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lat: { status: "play" }
				}
			}
		};
	} else if (action.type === reducerActionType.PLAY_LON) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lon: { status: "play" }
				}
			}
		};
	} else if (action.type === reducerActionType.PLAY_BEGIN) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					begin: { status: "play" }
				}
			}
		};
	} else if (action.type === reducerActionType.PLAY_END) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					end: { status: "play" }
				}
			}
		};
	} else if (action.type === reducerActionType.REVERSE_TEXT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				search: {
					mag: { status: "reverse" }
				}
			}
		};
	} else if (action.type === reducerActionType.REVERSE_LAT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lat: { status: "reverse" }
				}
			}
		};
	} else if (action.type === reducerActionType.REVERSE_LON) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lon: { status: "reverse" }
				}
			}
		};
	} else if (action.type === reducerActionType.REVERSE_BEGIN) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					begin: { status: "reverse" }
				}
			}
		};
	} else if (action.type === reducerActionType.REVERSE_END) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					end: { status: "reverse" }
				}
			}
		};
	} else if (action.type === reducerActionType.STOP_TEXT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				search: {
					mag: { status: "stop" }
				}
			}
		};
	} else if (action.type === reducerActionType.STOP_LAT) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lat: { status: "stop" }
				}
			}
		};
	} else if (action.type === reducerActionType.STOP_LON) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				coords: {
					...state["animationHandling"]["coords"],
					lon: { status: "stop" }
				}
			}
		};
	} else if (action.type === reducerActionType.STOP_BEGIN) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					begin: { status: "stop" }
				}
			}
		};
	} else if (action.type === reducerActionType.STOP_END) {
		return {
			...state,
			animationHandling: {
				...state["animationHandling"],
				date: {
					...state["animationHandling"]["date"],
					end: { status: "stop" }
				}
			}
		};
	} else {
		throw new Error();
	}
	// else if (action.type === "play_lat") {
	// } else if (action.type === "play_lon") {
	// } else if (action.type === "play_begin") {
	// } else if (action.type === "play_end") {
	// } else {
	// }
}

// const [initialSettings, setInitialSettings] = useState<SearchDetails>({
// 	data: {},
// 	handleAnimation: {
// 		search: {
// 			mag: { status: "stop" }
// 		},
// 		coords: {
// 			lat: { status: "stop" },
// 			lon: { status: "stop" }
// 		},
// 		date: {
// 			start: { status: "stop" },
// 			end: { status: "stop" }
// 		}
// 	}
// });

const useSearchContext = (initState: SearchDetails) => {
	const [settings, dispatch] = useReducer(settingsReducer, initState);

	const playText = useCallback(
		() => dispatch({ type: reducerActionType.PLAY_TEXT }),
		[]
	);
	const playLat = useCallback(
		() => dispatch({ type: reducerActionType.PLAY_LAT }),
		[]
	);
	const playLon = useCallback(
		() => dispatch({ type: reducerActionType.PLAY_LON }),
		[]
	);
	const playBegin = useCallback(
		() => dispatch({ type: reducerActionType.PLAY_BEGIN }),
		[]
	);
	const playEnd = useCallback(
		() => dispatch({ type: reducerActionType.PLAY_END }),
		[]
	);

	const reverseText = useCallback(
		() => dispatch({ type: reducerActionType.REVERSE_TEXT }),
		[]
	);
	const reverseLat = useCallback(
		() => dispatch({ type: reducerActionType.REVERSE_LAT }),
		[]
	);
	const reverseLon = useCallback(
		() => dispatch({ type: reducerActionType.REVERSE_LON }),
		[]
	);
	const reverseBegin = useCallback(
		() => dispatch({ type: reducerActionType.REVERSE_BEGIN }),
		[]
	);
	const reverseEnd = useCallback(
		() => dispatch({ type: reducerActionType.REVERSE_END }),
		[]
	);

	const stopText = useCallback(
		() => dispatch({ type: reducerActionType.STOP_TEXT }),
		[]
	);
	const stopLat = useCallback(
		() => dispatch({ type: reducerActionType.STOP_LAT }),
		[]
	);
	const stopLon = useCallback(
		() => dispatch({ type: reducerActionType.STOP_LON }),
		[]
	);
	const stopBegin = useCallback(
		() => dispatch({ type: reducerActionType.STOP_BEGIN }),
		[]
	);
	const stopEnd = useCallback(
		() => dispatch({ type: reducerActionType.STOP_END }),
		[]
	);

	return {
		settings,
		playText,
		playLat,
		playLon,
		playBegin,
		playEnd,
		reverseText,
		reverseLat,
		reverseLon,
		reverseBegin,
		reverseEnd,
		stopText,
		stopLat,
		stopLon,
		stopBegin,
		stopEnd
	};
};

type UseSearchContextType = ReturnType<typeof useSearchContext>;

const initialContextSettings: UseSearchContextType = {
	settings: initialSettings,
	playText: () => {},
	playLat: () => {},
	playLon: () => {},
	playBegin: () => {},
	playEnd: () => {},
	reverseText: () => {},
	reverseLat: () => {},
	reverseLon: () => {},
	reverseBegin: () => {},
	reverseEnd: () => {},
	stopText: () => {},
	stopLat: () => {},
	stopLon: () => {},
	stopBegin: () => {},
	stopEnd: () => {}
	// handleTextInput: (event: ChangeEvent<HTMLInputElement> => {})
};

export const SearchContext = createContext<UseSearchContextType>(
	initialContextSettings
);

type ChildrenType = {
	children?: ReactElement | undefined;
};

export const SearchProvider = ({
	children,
	...initialSettings
}: ChildrenType & SearchDetails): ReactElement => {
	return (
		<SearchContext.Provider value={useSearchContext(initialSettings)}>
			{children}
		</SearchContext.Provider>
	);
};

type UseSearchHookType = {
	animationHandling: AnimationMapping;
	playText: () => void;
	playLat: () => void;
	playLon: () => void;
	playBegin: () => void;
	playEnd: () => void;
	reverseText: () => void;
	reverseLat: () => void;
	reverseLon: () => void;
	reverseBegin: () => void;
	reverseEnd: () => void;
	stopText: () => void;
	stopLat: () => void;
	stopLon: () => void;
	stopBegin: () => void;
	stopEnd: () => void;
};

export const useSearchAnimation = (): UseSearchHookType => {
	const {
		settings: { animationHandling },
		playText,
		playLat,
		playLon,
		playBegin,
		playEnd,
		reverseText,
		reverseLat,
		reverseLon,
		reverseBegin,
		reverseEnd,
		stopText,
		stopLat,
		stopLon,
		stopBegin,
		stopEnd
	} = useContext(SearchContext);
	return {
		animationHandling,
		playText,
		playLat,
		playLon,
		playBegin,
		playEnd,
		reverseText,
		reverseLat,
		reverseLon,
		reverseBegin,
		reverseEnd,
		stopText,
		stopLat,
		stopLon,
		stopBegin,
		stopEnd
	};
};

type UseSearchDataType = {
	text: string;
	handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearchData = (): UseSearchDataType => {
	const {
		settings: {
			data: { text, handleTextInput }
		}
	} = useContext(SearchContext);
	return { text, handleTextInput };
};
