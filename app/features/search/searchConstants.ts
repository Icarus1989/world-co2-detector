export const countryOptions = [
	{
		code: "IT",
		labelKey: "countries.IT",
		latitude: 41.8719,
		longitude: 12.5674
	},
	{
		code: "FR",
		labelKey: "countries.FR",
		latitude: 46.2276,
		longitude: 2.2137
	},
	{
		code: "NL",
		labelKey: "countries.NL",
		latitude: 52.1326,
		longitude: 5.2913
	},
	{
		code: "DE",
		labelKey: "countries.DE",
		latitude: 51.1657,
		longitude: 10.4515
	},
	{
		code: "BR",
		labelKey: "countries.BR",
		latitude: -14.235,
		longitude: -51.9253
	},
	{
		code: "GB",
		labelKey: "countries.GB",
		latitude: 55.3781,
		longitude: -3.436
	},
	{
		code: "JP",
		labelKey: "countries.JP",
		latitude: 36.2048,
		longitude: 138.2529
	},
	{
		code: "ES",
		labelKey: "countries.ES",
		latitude: 40.4637,
		longitude: -3.7492
	},
	{
		code: "CN",
		labelKey: "countries.CN",
		latitude: 35.8617,
		longitude: 104.1954
	},
	{
		code: "BE",
		labelKey: "countries.BE",
		latitude: 50.5039,
		longitude: 4.4699
	}
] as const;

export function findCountryOptions(countryCode: string) {
	return countryOptions.find((singleCountry) => {
		return singleCountry.code === countryCode.toUpperCase();
	});
}
