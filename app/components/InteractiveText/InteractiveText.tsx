"use client";

import styles from "./InteractiveText.module.css";

export default function InteractiveText() {
	return (
		<div className={styles["form-container"]}>
			<div className={styles["co2-field"]}>
				<span>
					CO<sub>2</sub>:{" "}
				</span>
				<span>1.0g/m</span>
			</div>
			<div className={styles["name-field"]}>
				<label htmlFor="name-input" className={styles["name-label"]}>
					<span className={styles["label-text"]}>Search for: </span>
					{/* Animazione testo City / Country / State */}
					{/* La parola City esploderà in un numero di stelle
					corrispondenti ai punti di generazione di ogni carattere
					della parola, vedi esempio p5, da qui di ricomporrà nella successiva
					parola Country e così via */}
					<input
						id="name-input"
						name="name-input"
						type="search"
						placeholder="Base City"
						className={styles["name-input"]}
					/>
				</label>
				<button>
					<svg
						className={styles["nav-icon"]}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							fill="none"
							stroke="rgba(230, 230, 230, 0.9)"
							strokeWidth="3px"
							d="M 10.437 17.435 C 15.839 17.435 19.246 11.589 16.545 6.911 C 13.844 2.233 7.092 2.233 4.391 6.911 C 2.838 9.6 3.292 12.743 5.056 14.891 C 6.097 16.158 7.991 17.429 10.438 17.431 M 22.522 23.382 L 14.67 16.517"
						/>
					</svg>
				</button>
			</div>
			<div className={styles["coords-field"]}>
				<span className={styles["label-text"]}>Coordinates: </span>
				<label htmlFor="lat">
					<input
						id="lat"
						type="text"
						// min="-90.0000000"
						// max="90.0000000"
						// step="0.0000001"
						inputMode="numeric"
						placeholder="0"
						pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
						className={styles["coords-input"]}
					/>
				</label>
				{/* Inserire tra i due Components lat e lon una rosa dei venti
				con animazione di linea che si allunga dell'est o dell'ovest 
				in base alla label destra o sinistra selezionata*/}
				<label htmlFor="lon">
					<input
						id="lon"
						type="text"
						// min="-180.0000000"
						// max="180.0000000"
						// step="0.0000001"
						inputMode="numeric"
						placeholder="longitude..."
						pattern="\^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
						className={styles["coords-input"]}
					/>
				</label>
				<button>
					<svg
						className={styles["nav-icon"]}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							fill="none"
							stroke="rgba(230, 230, 230, 0.9)"
							strokeWidth="3px"
							d="M 10.437 17.435 C 15.839 17.435 19.246 11.589 16.545 6.911 C 13.844 2.233 7.092 2.233 4.391 6.911 C 2.838 9.6 3.292 12.743 5.056 14.891 C 6.097 16.158 7.991 17.429 10.438 17.431 M 22.522 23.382 L 14.67 16.517"
						/>
					</svg>
				</button>
			</div>
			<div className={styles["time-field"]}>
				<label htmlFor="begin-date" className={styles["time-label"]}>
					<span className={styles["label-text"]}>From:</span>
					<input
						type="month"
						id="begin-date"
						value="2023-10"
						name="begin-date"
						// placeholder="--/--/----"
						// inputMode="numeric"
						min="1990-01"
						max="2024-11"
						// pattern="mm-yyyy"
						pattern="yyyy-mm"
						onFocus={(event) => {
							event.target.showPicker();
						}}
						// max="2024-10-23"
						className={styles["time-input"]}
					/>
				</label>
				{/* Creare Component Svg con disegno calendario da 
				combinare a questi due input */}
				<label htmlFor="end-date" className={styles["time-label"]}>
					<span className={styles["label-text"]}>To:</span>
					<input
						type="month"
						id="end-date"
						value="2024-10"
						name="end-date"
						// inputMode="numeric"
						// placeholder="--/--/----"
						min="1990-01"
						max="2024-11"
						pattern="yyyy-mm"
						onFocus={(event) => {
							event.target.showPicker();
						}}
						// pattern="mm-yyyy"
						className={styles["time-input"]}
					/>
				</label>
			</div>
		</div>
	);
}
