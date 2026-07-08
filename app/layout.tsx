import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { ToastContainer } from "react-toastify";
import FirebaseAnalytics from "./component/FirebaseAnalytics";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://composerui.com";
const ORG_NAME = process.env.NEXT_PUBLIC_ORG_NAME || "ComposerUI";
const ORG_PHONE = process.env.NEXT_PUBLIC_PHONE || "+1-000-000-0000";
const DEFAULT_OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE || "/og-image.svg";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body-md",
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-code-sm",
});

export const metadata: Metadata = {
	title: "ComposerUI | A Library of components for jetpack Compose Android Developers!",
	description:
		"ComposerUI is a library of components for jetpack Compose Android Developers! Providing reusable UI building blocks and previews.",
	metadataBase: new URL(SITE_URL),
	openGraph: {
		title: "ComposerUI | Jetpack Compose components",
		description:
			"ComposerUI provides a rich library of Jetpack Compose components and previews for Android developers.",
		url: SITE_URL,
		siteName: ORG_NAME,
		type: "website",
		images: [
			{
				url: DEFAULT_OG_IMAGE,
				width: 1200,
				height: 630,
				alt: "ComposerUI — Jetpack Compose components",
			},
		],
	},
	icons: {
		icon: "/iconn.ico",
		other: [{ rel: "icon", url: "/iconn.ico" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "ComposerUI",
		description:
			"A library of Jetpack Compose components with live previews and code samples.",
		images: [DEFAULT_OG_IMAGE],
	},
	alternates: {
		canonical: "/",
		// Add locale paths as needed, Next.js will use these for hreflang links
		languages: {},
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<head>
				<meta name="theme-color" content="#131315" />
				<link rel="canonical" href={SITE_URL} />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<meta name="format-detection" content="telephone=no" />
				

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify([
							{
								"@context": "https://schema.org",
								"@type": "WebSite",
								name: ORG_NAME,
								url: SITE_URL,
								potentialAction: {
									"@type": "SearchAction",
									target: `${SITE_URL}/browse?q={search_term_string}`,
									"query-input":
										"required name=search_term_string",
								},
							},
							{
								"@context": "https://schema.org",
								"@type": "Organization",
								name: ORG_NAME,
								url: SITE_URL,
								telephone: ORG_PHONE,
								logo: DEFAULT_OG_IMAGE,
								sameAs: [],
							},
						]),
					}}
				/>
			</head>
			<body className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
				<div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
					
					
					<FirebaseAnalytics/> 
					<main className="flex-1">{children}</main>
					<ToastContainer />
					<NextTopLoader />
				</div>
			</body>
		</html>
	);
}
