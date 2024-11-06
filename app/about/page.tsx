import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
	return (
		<div id="about" className={styles["about-container"]}>
			<h3>Made by Icarus</h3>
			<p>Link esterno GitHub</p>
			<p>Link esterno Linkedin</p>
		</div>
	);
}
