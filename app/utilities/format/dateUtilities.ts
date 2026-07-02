export function toDateInput(date: Date) {
	return date.toISOString().slice(0, 10);
}

export function getSixMonthsRange() {
	const endDate = new Date();
	const startDate = new Date();

	startDate.setMonth(startDate.getMonth() - 6);

	return {
		startDate: toDateInput(startDate),
		endDate: toDateInput(endDate)
	};
}

// pulito manca ultimo check
