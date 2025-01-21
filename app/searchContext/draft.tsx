// esportare in file a se state per types --->

// type FormData = {
// 	name: string;
// 	lat: string;
// 	lon: string;
// 	begin: string;
// 	end: string;
// };

// import type { FormData } from "@/app/utilities/types/types";

// handleInput: (event: ChangeEvent<HTMLInputElement>) => {
// const sign = event.target.name.split("-")[0];
// if (sign === "lat") {
// 	return {
// 		type: reducerActionType.SET_QUERY,
// 		payload: { coord: event.target.value }
// 	};
// } else if (sign === "lon") {
// 	return {
// 		type: reducerActionType.SET_QUERY,
// 		payload: { coord: event.target.value }
// 	};
// } else if (sign === "search") {
// 	return {
// 		type: reducerActionType.SET_QUERY,
// 		payload: { text: event.target.value }
// 	};
// } else if (sign === "begin" || sign === "end") {
// 	return {
// 		type: reducerActionType.SET_QUERY,
// 		payload: { date: new Date(event.target.value) }
// 	};
// }
// // return {
// // 	type: reducerActionType.SET_QUERY,
// // 	payload: { text: event.target.value }
// // };
// },

// 		if (target === "begin") {
// 			return {
// 				...state,
// 				details: {
// 					...state["details"],
// 					data: {
// 						...state["details"]["data"],
// 						[target]: { ...state["details"]["data"]["begin"], ...payLoadData }
// 						// [notTarget]: { coord: value }
// 					}
// 				}
// 			};
// 		} else if (target === "end") {
// 			return {
// 				...state,
// 				details: {
// 					...state["details"],
// 					data: {
// 						...state["details"]["data"],
// 						[target]: { ...state["details"]["data"]["end"], ...payLoadData }
// 						// [notTarget]: { coord: value }
// 					}
// 				}
// 			};
// 		}
// 		? 0
// 		: state["details"]["data"][notTarget]["coords"];

// else if (action.type === reducerActionTextType.SET_TEXT_QUERY) {
// 	if (action.payload !== undefined) {
// 		const label: string = action.payload.label;
// 		// ricalcolare name della label in base a label e tag
// 		// ricalcolare data
// 		const payLoadData: TextData = action.payload.data;

// 		const target = label;
// 		// const tag = Object.keys(action.payload.data)[0];
// 		// const payloadValue = Object.values(action.payload.data)[0];
// 		return {
// 			...state,
// 			details: {
// 				...state["details"],
// 				data: {
// 					...state["details"]["data"],
// 					[target]: { ...state["details"]["data"]["search"], ...payLoadData }
// 					// [notTarget]: { coord: value }
// 				}
// 			}
// 		};
// 	}
// } else if (action.type === reducerActionCoordsType.SET_COORD_QUERY) {
// 	// console.log("HERE");if (action.payload !== undefined) {
// 	const label: string = action.payload.label;
// 	// ricalcolare name della label in base a label e tag
// 	// ricalcolare data
// 	const payLoadData:
// 		| AnimatonStatus
// 		| TextData
// 		| DateData
// 		| DegreeSpec
// 		| MinuteSpec
// 		| SecondSpec
// 		| LatSpecs
// 		| LonSpecs = action.payload.data;

// 	console.log(payLoadData);
// 	if (
// 		label === "begin" ||
// 		label === "end" ||
// 		label === "search" ||
// 		label === "lat" ||
// 		label === "lon"
// 	) {
// 		const target = label;
// 		const tag = Object.keys(action.payload.data)[0];
// 		const payloadValue = Object.values(action.payload.data)[0];
// 		if (label === "lat" || label === "lon") {
// 			const otherTags: string[] = Object.keys(
// 				state["details"]["data"][label]
// 			).filter((elem) => elem !== tag);

// 			console.log(otherTags);

// 			const lastValue = state["details"]["data"][label];
// 			console.log(lastValue);

// 			const objsTags = otherTags.map((spec) => {
// 				if (spec === "dir") {
// 					console.log(spec);
// 					// const lastData = spec === "dir" ? lastValue?.dir : null;
// 					return { dir: lastValue["dir"] };
// 				}
// 				return {
// 					[spec]: 0
// 				};
// 			});
// 			const result: { [x: string]: number | string | null } = {
// 				[tag]: payloadValue
// 			};

// 			for (let elem of objsTags) {
// 				for (const [key, value] of Object.entries(elem)) {
// 					result[key] = value;
// 				}
// 			}

// 			// console.log(objsTags);
// 			// const result = { ...payLoadData, ...objsTags };
// 			console.log(result);
// 			return {
// 				...state,
// 				details: {
// 					...state["details"],
// 					data: {
// 						...state["details"]["data"],
// 						[target]: {
// 							...state["details"]["data"][target],
// 							...result
// 						}
// 						// [notTarget]: { coord: value }
// 					}
// 				}
// 			};
// 		}

// 		// 		? 0
// 		// 		: state["details"]["data"][notTarget]["coords"];
// 		return {
// 			...state,
// 			details: {
// 				...state["details"],
// 				data: {
// 					...state["details"]["data"],
// 					[target]: { ...state["details"]["data"][target], ...payLoadData }
// 					// [notTarget]: { coord: value }
// 				}
// 			}
// 		};
// 	} else if (label === undefined) {
// 		return { ...state };
// 	}

// 	// if (action.payload !== undefined) {
// 	// 	const label: string = action.payload.label;

// 	// 	console.log(label);
// 	// 	// ricalcolare name della label in base a label e tag
// 	// 	// ricalcolare data
// 	// 	const payLoadData:
// 	// 		| DegreeSpec
// 	// 		| MinuteSpec
// 	// 		| SecondSpec
// 	// 		| LatSpecs
// 	// 		| LonSpecs = action.payload.data;

// 	// 	const target = label;
// 	// 	const tag = Object.keys(payLoadData)[0];
// 	// 	const payloadValue = Object.values(payLoadData)[0];

// 	// 	console.log(tag);

// 	// 	// const notTarget = label === "lat" ? "lon" : "lat";
// 	// 	// const value =
// 	// 	// 	state["details"]["data"][notTarget]["coords"] === null
// 	// 	if (label === "lat" || label === "lon") {
// 	// 		const otherTags: string[] = Object.keys(
// 	// 			state["details"]["data"][label]
// 	// 		).filter((elem) => elem !== tag);

// 	// 		console.log(otherTags);

// 	// 		const lastValue = state["details"]["data"][label];
// 	// 		console.log(lastValue);

// 	// 		const objsTags = otherTags.map((spec) => {
// 	// 			if (spec === "dir") {
// 	// 				console.log(spec);
// 	// 				// const lastData = spec === "dir" ? lastValue?.dir : null;
// 	// 				return { dir: lastValue["dir"] };
// 	// 			}
// 	// 			return {
// 	// 				[spec]: 0
// 	// 			};
// 	// 		});
// 	// 		const result: { [x: string]: number | string | null } = {
// 	// 			[tag]: payloadValue
// 	// 		};

// 	// 		for (let elem of objsTags) {
// 	// 			for (const [key, value] of Object.entries(elem)) {
// 	// 				result[key] = value;
// 	// 			}
// 	// 		}

// 	// 		// console.log(objsTags);
// 	// 		// const result = { ...payLoadData, ...objsTags };
// 	// 		console.log(result);
// 	// 		// const targetData = state["details"]["data"][target];
// 	// 		if (target === "lat") {
// 	// 			return {
// 	// 				...state,
// 	// 				details: {
// 	// 					...state["details"],
// 	// 					data: {
// 	// 						...state["details"]["data"],
// 	// 						["lat"]: {
// 	// 							...state["details"]["data"]["lat"],
// 	// 							...result
// 	// 						}
// 	// 						// [notTarget]: { coord: value }
// 	// 					}
// 	// 				}
// 	// 			};
// 	// 		} else if (target === "lon") {
// 	// 			return {
// 	// 				...state,
// 	// 				details: {
// 	// 					...state["details"],
// 	// 					data: {
// 	// 						...state["details"]["data"],
// 	// 						["lon"]: {
// 	// 							...state["details"]["data"]["lon"],
// 	// 							...result
// 	// 						}
// 	// 						// [notTarget]: { coord: value }
// 	// 					}
// 	// 				}
// 	// 			};
// 	// 		}
// 	// 	}
// 	// }
// } else if (action.type === reducerActionDateType.SET_DATE_QUERY) {
// 	console.log(action.payload);
// 	if (action.payload !== undefined) {
// 		const label: string = action.payload.label;
// 		// ricalcolare name della label in base a label e tag
// 		// ricalcolare data
// 		const payLoadData: DateData = action.payload.data;

// 		console.log(payLoadData);

// 		const target = label;
// 		const tag = Object.keys(action.payload.data)[0];
// 		const payloadValue = Object.values(action.payload.data)[0];
// 		// console.log(state["details"]["data"][target]);
// 		if (target === "begin") {
// 			return {
// 				...state,
// 				details: {
// 					...state["details"],
// 					data: {
// 						...state["details"]["data"],
// 						[target]: { ...state["details"]["data"]["begin"], ...payLoadData }
// 						// [notTarget]: { coord: value }
// 					}
// 				}
// 			};
// 		} else if (target === "end") {
// 			return {
// 				...state,
// 				details: {
// 					...state["details"],
// 					data: {
// 						...state["details"]["data"],
// 						[target]: { ...state["details"]["data"]["end"], ...payLoadData }
// 						// [notTarget]: { coord: value }
// 					}
// 				}
// 			};
// 		}
// 	}
// }

// else if (action.type === "play_lat") {
// } else if (action.type === "play_lon") {
// } else if (action.type === "play_begin") {
// } else if (action.type === "play_end") {
// } else {
// }

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

// const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
// 	// console.log(event);
// 	const sign = event.target.name.split("-")[0];
// 	const tag = event.target.name.split("-")[1];
// 	const value = event.target.value;
// 	console.log(tag);

// 	function determinatePayload(indic: string, newValue: string) {
// 		if (indic == "lat" || indic === "lon") {
// 		}
// 	}
// 	if (sign === "lat" || sign === "lon") {
// 		if (value.length > 0) {
// 			if (event.target.type === "number") {
// 				const num: number = +value;
// 				const tempData: { [x: string]: number } = { [tag]: num };
// 				// const [pKey, pValue] = Object.entries(tempData);
// 				return dispatch({
// 					type: reducerActionType.SET_QUERY,
// 					payload: {
// 						label: sign,
// 						data: tempData
// 					}
// 				});
// 			} else if (
// 				value === "N" ||
// 				value === "S" ||
// 				value === "E" ||
// 				value === "W"
// 			) {
// 				return dispatch({
// 					type: reducerActionType.SET_QUERY,
// 					payload: {
// 						label: sign,
// 						data: { dir: value }
// 					}
// 				});
// 			}
// 		} else {
// 			return;
// 		}
// 	} else if (sign === "search") {
// 		return dispatch({
// 			type: reducerActionType.SET_QUERY,
// 			payload: { label: sign, data: { text: value } }
// 		});
// 	} else if (sign === "begin" || sign === "end" || tag === "date") {
// 		const date: Date = new Date(value);
// 		console.log(date);
// 		return dispatch({
// 			type: reducerActionType.SET_QUERY,
// 			payload: { label: sign, data: { date: date } }
// 		});
// 	} else {
// 		return;
// 	}
// }, []);

// const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
// 	// console.log(event);
// 	const sign = event.target.name.split("-")[0];
// 	const tag = event.target.name.split("-")[1];
// 	const value = event.target.value;
// 	console.log(tag);

// 	function determinatePayload(indic: string, newValue: string ) {
// 		if (indic == "lat" || indic === "lon") {

// 		}
// 	}
// 	if (sign === "lat" || sign === "lon") {
// 		if (value.length > 0) {
// 			if (event.target.type === "number") {
// 				const num: number = +value;
// 				const tempData: { [x: string]: number } = { [tag]: num };
// 				// const [pKey, pValue] = Object.entries(tempData);
// 				return dispatch({
// 					type: reducerActionType.SET_QUERY,
// 					payload: {
// 						label: sign,
// 						data: tempData
// 					}
// 				});
// 			} else if (
// 				value === "N" ||
// 				value === "S" ||
// 				value === "E" ||
// 				value === "W"
// 			) {
// 				return dispatch({
// 					type: reducerActionType.SET_QUERY,
// 					payload: {
// 						label: sign,
// 						data: { dir: value }
// 					}
// 				});
// 			}
// 		} else {
// 			return;
// 		}
// 	} else if (sign === "search") {
// 		return dispatch({
// 			type: reducerActionType.SET_QUERY,
// 			payload: { label: sign, data: { text: value } }
// 		});
// 	} else if (sign === "begin" || sign === "end" || tag === "date") {
// 		const date: Date = new Date(value);
// 		console.log(date);
// 		return dispatch({
// 			type: reducerActionType.SET_QUERY,
// 			payload: { label: sign, data: { date: date } }
// 		});
// 	} else {
// 		return;
// 	}
// }, []);
