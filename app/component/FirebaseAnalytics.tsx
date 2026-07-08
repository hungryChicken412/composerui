"use client"; // This tells Next.js to only run this on the browser

import { useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

export default function FirebaseAnalytics() {
	useEffect(() => {
		// 1. Paste your config object here

		const firebaseConfig = {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
			messagingSenderId:
				process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
			measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
		};

		// 2. Prevent Next.js hot-reloads from initializing Firebase multiple times
		const app =
			getApps().length === 0
				? initializeApp(firebaseConfig)
				: getApps()[0];

		// 3. Initialize Analytics only if the browser supports it
		isSupported().then((supported) => {
			if (supported) {
				getAnalytics(app);
			}
		});
	}, []);

	return null; // This component doesn't render anything visually
}
