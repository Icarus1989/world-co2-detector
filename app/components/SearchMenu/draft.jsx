// {/* <div className={styles["name-field"]}>
// 				<label htmlFor="name-input" className={styles["name-label"]}>
// 					<span className={styles["label-text"]}>Search for: </span>
// 					{/* Animazione testo City / Country / State */}
// 					{/* La parola City esploderà in un numero di stelle
// 					corrispondenti ai punti di generazione di ogni carattere
// 					della parola, vedi esempio p5, da qui di ricomporrà nella successiva
// 					parola Country e così via */}
// 					<input
// 						id="name-input"
// 						name="name-input"
// 						type="search"
// 						placeholder="Base City"
// 						className={styles["name-input"]}
// 					/>
// 				</label>
// 				<button>
// 					<svg
// 						className={styles["nav-icon"]}
// 						xmlns="http://www.w3.org/2000/svg"
// 						viewBox="0 0 24 24"
// 						width="24"
// 						height="24"
// 					>
// 						<path
// 							fill="none"
// 							stroke="rgba(230, 230, 230, 0.9)"
// 							strokeWidth="3px"
// 							d="M 10.437 17.435 C 15.839 17.435 19.246 11.589 16.545 6.911 C 13.844 2.233 7.092 2.233 4.391 6.911 C 2.838 9.6 3.292 12.743 5.056 14.891 C 6.097 16.158 7.991 17.429 10.438 17.431 M 22.522 23.382 L 14.67 16.517"
// 						/>
// 					</svg>
// 				</button>
// 			</div>
// 			<div className={styles["coords-field"]}>
// 				<span className={styles["label-text"]}>Coordinates: </span>
// 				<label htmlFor="lat">
// 					<input
// 						id="lat"
// 						type="text"
// 						// min="-90.0000000"
// 						// max="90.0000000"
// 						// step="0.0000001"
// 						inputMode="numeric"
// 						placeholder="0"
// 						pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
// 						className={styles["coords-input"]}
// 					/>
// 				</label>
// 				{/* Inserire tra i due Components lat e lon una rosa dei venti
// 				con animazione di linea che si allunga dell'est o dell'ovest
// 				in base alla label destra o sinistra selezionata*/}
// 				<label htmlFor="lon">
// 					<input
// 						id="lon"
// 						type="text"
// 						// min="-180.0000000"
// 						// max="180.0000000"
// 						// step="0.0000001"
// 						inputMode="numeric"
// 						placeholder="longitude..."
// 						pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
// 						className={styles["coords-input"]}
// 					/>
// 				</label>
// 				<button>
// 					<svg
// 						className={styles["nav-icon"]}
// 						xmlns="http://www.w3.org/2000/svg"
// 						viewBox="0 0 24 24"
// 						width="24"
// 						height="24"
// 					>
// 						<path
// 							fill="none"
// 							stroke="rgba(230, 230, 230, 0.9)"
// 							strokeWidth="3px"
// 							d="M 10.437 17.435 C 15.839 17.435 19.246 11.589 16.545 6.911 C 13.844 2.233 7.092 2.233 4.391 6.911 C 2.838 9.6 3.292 12.743 5.056 14.891 C 6.097 16.158 7.991 17.429 10.438 17.431 M 22.522 23.382 L 14.67 16.517"
// 						/>
// 					</svg>
// 				</button>
// 			</div>
// 			<div className={styles["time-field"]}>
// 				<label htmlFor="begin-date" className={styles["time-label"]}>
// 					<span className={styles["label-text"]}>g From: g</span>
// 					<input
// 						type="month"
// 						id="begin-date"
// 						value="2023-10"
// 						name="begin-date"
// 						// placeholder="--/--/----"
// 						// inputMode="numeric"
// 						min="1990-01"
// 						max="2024-11"
// 						// pattern="mm-yyyy"
// 						pattern="yyyy-mm"
// 						onFocus={(event) => {
// 							event.target.showPicker();
// 						}}
// 						// max="2024-10-23"
// 						className={styles["time-input"]}
// 					/>
// 				</label>
// 				{/* Creare Component Svg con disegno calendario da
// 				combinare a questi due input */}
// 				<label htmlFor="end-date" className={styles["time-label"]}>
// 					<span className={styles["label-text"]}>g To: g</span>
// 					<input
// 						type="month"
// 						id="end-date"
// 						value="2024-10"
// 						name="end-date"
// 						// inputMode="numeric"
// 						// placeholder="--/--/----"
// 						min="1990-01"
// 						max="2024-11"
// 						pattern="yyyy-mm"
// 						onFocus={(event) => {
// 							event.target.showPicker();
// 						}}
// 						// pattern="mm-yyyy"
// 						className={styles["time-input"]}
// 					/>
// 				</label>
// 			</div> */}

{
	/* <div className={styles["co2-field"]}>
				<span>
					CO<sub>2</sub>:{" "}
				</span>
				<span>1.0g/m</span>
			</div> */
}
{
	/* <motion.section
					className={styles["close-btn-section"]}
					variants={sectionVariants}
					// initial="hidden"
					// animate="visible"
					// exit="hidden"
				>
					<button onClick={handleOpenMenu} className={styles["close-btn"]}>
						X
					</button>
				</motion.section>

				<motion.section
					className={styles["menu-section"]}
					variants={sectionVariants}
					// initial="hidden"
					// animate="visible"
					// exit="hidden"
				>
					<AnimatePresence>
						{activeBtn.third ? (
							<DateInputComponent />
						) : (
							<button
								name="third"
								onClick={handleClick}
								className={styles["calendar-btn"]}
							>
								Period
							</button>
						)}
					</AnimatePresence>
				</motion.section>

				<motion.section
					className={styles["menu-section"]}
					variants={sectionVariants}
					// initial="hidden"
					// animate="visible"
					// exit="hidden"
				>
					<AnimatePresence>
						{activeBtn.second ? (
							<TextInputTemplate fieldName="coords" labels={["lat", "lon"]} />
						) : (
							<button
								name="second"
								onClick={handleClick}
								className={styles["coords-btn"]}
							>
								<WindRoseIcon />
							</button>
						)}
					</AnimatePresence>
				</motion.section>

				<motion.section
					className={styles["menu-section"]}
					variants={sectionVariants}
					// initial="hidden"
					// animate="visible"
					// exit="hidden"
				>
					<AnimatePresence>
						{activeBtn.first ? (
							<TextInputTemplate fieldName="name" labels={["name"]} />
						) : (
							<button
								name="first"
								onClick={handleClick}
								className={styles["search-btn"]}
							>
								<MagnifierIcon />
							</button>
						)}
					</AnimatePresence>
				</motion.section> */
}

// function SearchSectionComponent({
// 	id,
// 	active,
// 	activeBtn,
// 	handleClick,
// 	setActiveBtn,
// 	setSections
// }: {
// 	id: string;
// 	active: boolean;
// 	activeBtn: ActiveSearch;
// 	handleClick: any;
// 	setActiveBtn: Dispatch<SetStateAction<ActiveSearch>>;
// 	setSections: Dispatch<SetStateAction<ReactNode[]>>;
// }) {
// 	// console.log("change search");
// 	const [activeSection, setActiveSection] = useState(active);

// 	useEffect(() => {
// 		setActiveSection(active);
// 	}, [active]);

// 	// console.log(activeSection);

// 	const ref = useRef(null);

// 	return (
// 		<AnimatePresence>
// 			{active ? (
// 				<TextInputTemplate fieldName="name" labels={["name"]} />
// 			) : (
// 				<button
// 					name="first"
// 					onClick={(event: React.MouseEvent) => {
// 						// handleClick(event.currentTarget);
// 						const btn: HTMLButtonElement | null =
// 							event.currentTarget.closest("button") || null;
// 						const btnName: string = btn?.name || "";

// 						const btns = Array.from(Object.keys(activeBtn));
// 						const [disabledOne, disabledTwo] = btns.filter(
// 							(elem) => elem !== btnName
// 						);
// 						setActiveBtn((prevValue) => {
// 							if (btn?.name) {
// 								return {
// 									...prevValue,
// 									[btnName]: true,
// 									[disabledOne]: false,
// 									[disabledTwo]: false
// 								};
// 							}
// 							return { ...prevValue };
// 						});
// 						// setActiveBtn
// 						setSections((prevSections: ReactNode[]) => {
// 							// const activeSection = prevSections.filter((elem: ReactNode) => {
// 							// 	console.log(elem);
// 							// 	if (elem) {
// 							// 		return elem["props"];
// 							// 	}
// 							// });
// 							console.log(activeSection);
// 							// return []
// 							return [...prevSections];
// 						});
// 					}}
// 					className={styles["search-btn"]}
// 				>
// 					<MagnifierIcon />
// 				</button>
// 			)}
// 		</AnimatePresence>
// 	);
// }

// function CoordsSectionComponent({
// 	id,
// 	active,
// 	handleClick
// }: {
// 	id: string;
// 	active: boolean;
// 	handleClick: any;
// }) {
// 	// console.log("change coords");
// 	const [activeSection, setActiveSection] = useState(active);

// 	useEffect(() => {
// 		setActiveSection(active);
// 	}, [active]);

// 	// console.log(activeSection);

// 	const ref = useRef(null);

// 	return (
// 		// <MotionSectionComponent
// 		// 	id="coords"
// 		// 	active={active}
// 		// 	handleClick={handleClick}
// 		// >

// 		<AnimatePresence>
// 			{active ? (
// 				<TextInputTemplate fieldName="coords" labels={["lat", "lon"]} />
// 			) : (
// 				<button
// 					name="second"
// 					onClick={(event: MouseEvent<HTMLButtonElement>) => {
// 						handleClick(event);
// 					}}
// 					className={styles["coords-btn"]}
// 				>
// 					<WindRoseIcon />
// 				</button>
// 			)}
// 		</AnimatePresence>
// 		// </MotionSectionComponent>
// 	);
// }

// function CalendarSectionComponent({
// 	id,
// 	active,
// 	handleClick
// }: {
// 	id: string;
// 	active: boolean;
// 	handleClick: any;
// }) {
// 	// console.log("change calendar");

// 	const [activeSection, setActiveSection] = useState(active);

// 	useEffect(() => {
// 		setActiveSection(active);
// 	}, [active]);

// 	// console.log(activeSection);

// 	const ref = useRef(null);

// 	return (
// 		<AnimatePresence>
// 			{activeSection ? (
// 				<DateInputComponent />
// 			) : (
// 				<button
// 					name="third"
// 					onClick={(event: MouseEvent<HTMLButtonElement>) => {
// 						handleClick(event);
// 					}}
// 					className={styles["calendar-btn"]}
// 				>
// 					Period
// 				</button>
// 			)}
// 		</AnimatePresence>
// 	);
// }
