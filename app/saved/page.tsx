import styles from "./page.module.css";

export default function Saved() {
	return (
		<div className={styles["saved-container"]}>
			<span>Saved List</span>
			<ul>
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ul>
		</div>
	);
}
