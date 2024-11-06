"use client";

import { useRef } from "react";

import styles from "./DateInputTemplate.module.css";

export default function DateInputTemplate({
	fieldName,
	labels
}: {
	fieldName: string;
	labels: string[]; //lat lon | name
}) {
	const containerRef = useRef<HTMLInputElement | null>(null);
	return (
		<div
			ref={containerRef}
			id={`${fieldName}`}
			className={styles[`${fieldName}-field`]}
		></div>
	);
}
