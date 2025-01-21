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
import {
	AnimationMapping,
	AnimatonStatus,
	DataComposition,
	TextData,
	CoordsData,
	DateData,
	LatSpecs,
	LonSpecs,
	DegreeSpec,
	MinuteSpec,
	SecondSpec
} from "../utilities/types/types";

type SearchDetails = {
	details: {
		data: DataComposition;
		// handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
		handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
		handleCoordsInput: (event: ChangeEvent<HTMLInputElement>) => void;
		handleDateInput: (event: ChangeEvent<HTMLInputElement>) => void;
	};
	animationHandling: AnimationMapping;
};

const enum reducerActionType {
	SET_QUERY,
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

const enum reducerActionAnimationType {
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

type ReducerAnimationAction = {
	type: reducerActionAnimationType;
};

const enum reducerActionTextType {
	SET_TEXT_QUERY
}

const enum reducerActionDateType {
	SET_DATE_QUERY
}

const enum reducerActionCoordsType {
	SET_COORD_QUERY
}

// <--- creare anche per Coords --->

type ReducerTextAction = {
	type: reducerActionTextType;
	payload: {
		label: string;
		data: TextData;
	};
};

type ReducerCoordsAction = {
	type: reducerActionCoordsType;
	payload: {
		label: string;
		data: DegreeSpec | MinuteSpec | SecondSpec | LatSpecs | LonSpecs;
	};
};

type ReducerDateAction = {
	type: reducerActionDateType;
	payload: {
		label: string;
		data: DateData;
	};
};

type ReducerAction = {
	type: reducerActionType;
	payload?: {
		label: string;
		data:
			| AnimatonStatus
			| TextData
			| DegreeSpec
			| MinuteSpec
			| SecondSpec
			| LatSpecs
			| LonSpecs
			| DateData;
	};
};

export const initialSettings: SearchDetails = {
	details: {
		data: {
			search: { text: "" },
			lat: { dir: null, degrees: null, minutes: null, seconds: null },
			lon: { dir: null, degrees: null, minutes: null, seconds: null },
			begin: { date: new Date(Date.now()) },
			end: { date: new Date(Date.now()) }
		},

		handleTextInput: (event: ChangeEvent<HTMLInputElement>) => {},
		handleCoordsInput: (event: ChangeEvent<HTMLInputElement>) => {},
		handleDateInput: (event: ChangeEvent<HTMLInputElement>) => {}
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
	action:
		| ReducerAction
		| ReducerAnimationAction
		| ReducerTextAction
		| ReducerDateAction
		| ReducerCoordsAction
): SearchDetails {
	if (action.type === reducerActionType.SET_QUERY) {
		// console.log(action.payload);
		if (action.payload !== undefined) {
			const label: string = action.payload.label;
			// ricalcolare name della label in base a label e tag
			// ricalcolare data
			const payLoadData:
				| AnimatonStatus
				| TextData
				| DateData
				| DegreeSpec
				| MinuteSpec
				| SecondSpec
				| LatSpecs
				| LonSpecs = action.payload.data;

			// console.log(payLoadData);
			if (
				label === "begin" ||
				label === "end" ||
				label === "search" ||
				label === "lat" ||
				label === "lon"
			) {
				const target = label;
				const tag = Object.keys(action.payload.data)[0];
				const payloadValue = Object.values(action.payload.data)[0];

				if (label === "lat" || label === "lon") {
					const otherTags: string[] = Object.keys(
						state["details"]["data"][label]
					).filter((elem) => elem !== tag);

					console.log(otherTags);

					const lastValue = state["details"]["data"][label];
					console.log(lastValue);

					const objsTags = otherTags.map((spec) => {
						if (spec === "dir") {
							console.log(spec);
							// const lastData = spec === "dir" ? lastValue?.dir : null;
							return { dir: lastValue["dir"] ? lastValue["dir"] : "N" };
						} else if (spec === "degrees") {
							return {
								degrees: lastValue["degrees"] ? lastValue["degrees"] : 0
							};
						} else if (spec === "minutes") {
							return {
								minutes: lastValue["minutes"] ? lastValue["minutes"] : 0
							};
						} else if (spec === "seconds") {
							return {
								seconds: lastValue["seconds"] ? lastValue["seconds"] : 0
							};
						} else {
							return {
								[spec]: 0
							};
						}
					});
					const result: { [x: string]: number | string | null } = {
						[tag]: payloadValue
					};

					for (let elem of objsTags) {
						for (const [key, value] of Object.entries(elem)) {
							result[key] = value;
						}
					}

					// <--- actual coord
					// other coord need to be set to exist a complete cooordinate
					// --->

					const notTarget: "lat" | "lon" = label === "lat" ? "lon" : "lat";

					const notTargetData = state["details"]["data"][notTarget];
					const notTargetTags = Object.keys(notTargetData);
					const notTargetObjsTags = notTargetTags.map((spec) => {
						if (spec === "dir") {
							console.log(spec);
							// const lastData = spec === "dir" ? lastValue?.dir : null;
							return { dir: notTargetData["dir"] ? notTargetData["dir"] : "W" };
						} else if (spec === "degrees") {
							return {
								degrees: notTargetData["degrees"] ? notTargetData["degrees"] : 0
							};
						} else if (spec === "minutes") {
							return {
								minutes: notTargetData["minutes"] ? notTargetData["minutes"] : 0
							};
						} else if (spec === "seconds") {
							return {
								seconds: notTargetData["seconds"] ? notTargetData["seconds"] : 0
							};
						} else {
							return {
								[spec]: 0
							};
						}
					});

					console.log(notTarget);

					const notTargetResult: { [x: string]: number | string | null } = {};

					for (let elem of notTargetObjsTags) {
						for (const [key, value] of Object.entries(elem)) {
							notTargetResult[key] = value;
						}
					}

					console.log(result);
					return {
						...state,
						details: {
							...state["details"],
							data: {
								...state["details"]["data"],
								[target]: {
									...state["details"]["data"][target],
									...result
								},
								[notTarget]: {
									...state["details"]["data"][notTarget],
									...notTargetResult
								}
							}
						}
					};
				} else if (label === "begin") {
					console.log("Begin");
					return {
						...state,
						details: {
							...state["details"],
							data: {
								...state["details"]["data"],
								[target]: {
									...state["details"]["data"]["begin"],
									...payLoadData
								}
								// [notTarget]: { coord: value }
							}
						}
					};
				} else if (label === "end") {
					console.log("End");
					return {
						...state,
						details: {
							...state["details"],
							data: {
								...state["details"]["data"],
								[target]: {
									...state["details"]["data"]["end"],
									...payLoadData
								}
								// [notTarget]: { coord: value }
							}
						}
					};
				}

				// text input semplice --->
				return {
					...state,
					details: {
						...state["details"],
						data: {
							...state["details"]["data"],
							[target]: {
								...state["details"]["data"][target],
								...payLoadData
							}
						}
					}
				};
			} else if (label === undefined) {
				return { ...state };
			}
		} else if (action.payload === undefined) {
			return { ...state };
		}
	} else if (action.type === reducerActionType.PLAY_TEXT) {
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
	} else if (action.type === undefined) {
		return { ...state };
	} else {
		throw new Error();
	}
	return { ...state };
}

const useSearchContext = (initState: SearchDetails) => {
	const [settings, dispatch] = useReducer(settingsReducer, initState);

	const handleTextInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const label = event.target.name.split("-")[0];
			const value = event.target.value;
			return dispatch({
				type: reducerActionTextType.SET_TEXT_QUERY,
				payload: { label: label, data: { text: value } }
			});
		},
		[]
	);

	const handleCoordsInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const sign = event.target.name.split("-")[0];
			const tag = event.target.name.split("-")[1];
			const value = event.target.value;

			if (value.length > 0) {
				if (event.target.type === "number") {
					const num: number = +value;
					const tempData: { [x: string]: number } = { [tag]: num };
					// const [pKey, pValue] = Object.entries(tempData);
					if (tag === "degrees") {
						return dispatch({
							type: reducerActionType.SET_QUERY,
							payload: {
								label: sign,
								data: { ["degrees"]: num }
							}
						});
					} else if (tag === "minutes") {
						return dispatch({
							type: reducerActionType.SET_QUERY,
							payload: {
								label: sign,
								data: { ["minutes"]: num }
							}
						});
					} else if (tag === "seconds") {
						return dispatch({
							type: reducerActionType.SET_QUERY,
							payload: {
								label: sign,
								data: { ["seconds"]: num }
							}
						});
					} else {
						return;
					}
				} else if (
					value === "N" ||
					value === "S" ||
					value === "E" ||
					value === "W"
				) {
					console.log(tag, value);

					return dispatch({
						type: reducerActionType.SET_QUERY,
						payload: {
							label: sign,
							data: { dir: value }
						}
					});
				}
			} else {
				return;
			}
		},
		[]
	);

	const handleDateInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			console.log("HandleDateInput");
			console.log(event.target);
			const label = event.target.name.split("-")[0];
			const value = event.target.value;
			const date: Date = new Date(value);
			console.log({ label: label, data: { date: date } });
			return dispatch({
				type: reducerActionType.SET_QUERY,
				payload: { label: label, data: { date: date } }
			});
		},
		[]
	);

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
		handleTextInput,
		handleCoordsInput,
		handleDateInput,
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
	stopEnd: () => {},
	// handleInput: () => {},
	handleTextInput: () => {},
	handleCoordsInput: () => {},
	handleDateInput: () => {}
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

// type SearchDetails = {
// 	details: {
// 		data: DataComposition;
// 		handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
// 	};
// 	animationHandling: AnimationMapping;
// };

type UseSearchHookType = {
	animationHandling: AnimationMapping;
	data: DataComposition;
	// handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleCoordsInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleDateInput: (event: ChangeEvent<HTMLInputElement>) => void;
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
		settings: {
			details: { data },
			animationHandling
		},
		// handleInput,
		handleTextInput,
		handleCoordsInput,
		handleDateInput,
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
		data,
		// handleInput,
		handleTextInput,
		handleCoordsInput,
		handleDateInput,
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
	data: DataComposition;
	// handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleCoordsInput: (event: ChangeEvent<HTMLInputElement>) => void;
	handleDateInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearchData = (): UseSearchDataType => {
	const {
		settings: {
			details: { data }
		},
		// handleInput,
		handleTextInput,
		handleCoordsInput,
		handleDateInput
	} = useContext(SearchContext);
	return {
		data: data,
		// handleInput: handleInput,
		handleTextInput: handleTextInput,
		handleCoordsInput: handleCoordsInput,
		handleDateInput: handleDateInput
	};
};
