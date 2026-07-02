import styles from "./MainPrimary.module.css";

export function MainPrimary({ children }: { children: React.ReactNode }) {
	return <main className={styles["mainContainer"]}>{children}</main>;
}
