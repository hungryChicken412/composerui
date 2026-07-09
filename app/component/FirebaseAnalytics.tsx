"use client"; // This tells Next.js to only run this on the browser

import { useEffect } from "react";

// Declare global window properties for gtag
declare global {
	interface Window {
		dataLayer: any[];
	}
}
export default function FirebaseAnalytics() {
	useEffect(() => {
		const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

		if (!measurementId) {
			console.warn("Measurement ID not configured");
			return;
		}

		// Inject gtag script directly to bypass any GTM interference
		const script = document.createElement("script");
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		script.async = true;
		document.head.appendChild(script);

		// Initialize gtag after script loads
		window.dataLayer = window.dataLayer || [];
		function gtag(...args : any[]) {
			window.dataLayer.push(args);
		}
		gtag("js", new Date());
		gtag("config", measurementId);

		console.log("GA4 initialized with measurement ID:", measurementId);
	}, []);

	return null; // This component doesn't render anything visually
}
