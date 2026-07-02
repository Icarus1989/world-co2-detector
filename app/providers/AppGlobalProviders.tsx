"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n.client";
import { AppDataProvider } from "./AppDataProvider";

export function AppGlobalProviders({ children }: { children: ReactNode }) {
	return (
		<I18nextProvider i18n={i18n}>
			<AppDataProvider>{children}</AppDataProvider>
		</I18nextProvider>
	);
}

// pulito manca ultimo check
