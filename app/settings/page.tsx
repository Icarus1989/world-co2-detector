import styles from "./page.module.css";

export default function Settings() {
	return (
		<div className={styles["settings-container"]}>
			<span>Languages List</span>
			<ul>
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ul>
		</div>
	);
}
