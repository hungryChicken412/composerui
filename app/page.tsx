import type { Metadata } from "next";
import { ArrowRight, User, MessageSquare, Copy } from "lucide-react";

import { Code, ArrowDown } from "lucide-react";
import WaveCanvas from "./wavecanvas";
import { SlidersHorizontal } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "./component/navbar";
import Footer from "./component/footer";

const Mobile = dynamic(() => import("./component/DesignerPage/mobile"), {
	ssr: true, // Prevents server-side rendering for this heavy client component
	loading: () => (
		// This creates a glowing placeholder box that perfectly matches
		// the size of your phone mockup while it loads in the background
		<div className="w-[300px] h-[600px] bg-surface-container-low border-[8px] border-surface-container-highest rounded-[3rem] animate-pulse glow-primary mt-xl mx-auto hidden xl:block"></div>
	),
});

export const metadata: Metadata = {
	title: "Compose UI - Engineered for Beauty. Built for Composers.",
	description:
		"A designer-grade component architecture for Jetpack Compose. Craft premium Android experiences with re-usable, elegantly structured code.",
	openGraph: {
		title: "Compose UI - Engineered for Beauty",
		description:
			"A designer-grade component architecture for Jetpack Compose. Craft premium Android experiences with re-usable, elegantly structured code.",
		type: "website",
		siteName: "Compose UI",
	},
	twitter: {
		card: "summary_large_image",
		title: "Compose UI - Engineered for Beauty",
		description:
			"A designer-grade component architecture for Jetpack Compose.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function LandingPage() {
	return (
		<main className="flex-grow w-full pt-2xl bg-[#070708]">
			<Navbar />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: "Compose UI",
						operatingSystem: "Android",
						applicationCategory: "DeveloperApplication",
						description:
							"A designer-grade component architecture for Jetpack Compose.",
						offers: {
							"@type": "Offer",
							price: "0",
							priceCurrency: "USD",
						},
					}),
				}}
			/>
			{/* Hero Section */}
			<section
				aria-labelledby="hero-heading"
				className="w-full relative py-2xl md:py-[120px] flex flex-col items-center text-center overflow-hidden bg-gradient-to-b from-surface-container-lowest to-background"
			>
				<WaveCanvas />

				<div className="px-lg max-w-container-max mx-auto relative z-10 flex flex-col items-center">
					<h1
						id="hero-heading"
						className="font-display-lg text-display-lg max-w-4xl text-on-surface tracking-tight mb-md opacity-0 animate-fade-in-up"
						style={{ fontWeight: "lighter" }}
					>
						Engineered for Beauty.
						<br />
						<span className="text-primary">
							Built for Composers.
						</span>
					</h1>
					<p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px] mb-xl opacity-0 animate-fade-in-up delay-100">
						A designer-grade component architecture for Jetpack
						Compose. Craft premium Android experiences with
						re-usable, elegantly structured code.
					</p>
					<div className="flex flex-col sm:flex-row items-center gap-md opacity-0 animate-fade-in-up delay-200">
						<div className="relative w-full sm:w-auto">
							<div
								className="absolute inset-0 bg-primary/40 blur-xl rounded-lg transition-all duration-300 group-hover:bg-primary/60"
								aria-hidden="true"
							></div>
							<button className="relative bg-primary text-on-primary font-body-md text-body-md px-6 py-3 rounded-lg hover:bg-primary-container hover:scale-105 transition-all duration-300 shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(192,193,255,0.6)] group">
								Explore Components
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform"
									aria-hidden="true"
								/>
							</button>
						</div>
						<button className="bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 text-on-surface font-body-md text-body-md px-6 py-3 rounded-lg hover:bg-surface-container-high transition-colors w-full sm:w-auto">
							View Documentation
						</button>
					</div>

					{/* --- NEW: WORKFLOW PIPELINE FLOWCHART --- */}
					<div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-12 mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] delay-300 w-full max-w-4xl mx-auto relative z-20">
						{/* Step 1 */}
						<div className="flex items-center gap-3 bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 px-5 py-2.5 rounded-full shadow-lg">
							<SlidersHorizontal
								size={16}
								className="text-primary"
							/>
							<span className="font-body-md text-[13px] text-on-surface font-medium whitespace-nowrap">
								1. Configure UI
							</span>
						</div>

						<ArrowRight
							size={18}
							className="hidden md:block text-outline-variant/60"
						/>
						<ArrowDown
							size={18}
							className="block md:hidden text-outline-variant/60"
						/>

						{/* Step 2 */}
						<div className="flex items-center gap-3 bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 px-5 py-2.5 rounded-full shadow-lg">
							<Code size={16} className="text-secondary" />
							<span className="font-body-md text-[13px] text-on-surface font-medium whitespace-nowrap">
								2. Copy Compose Code
							</span>
						</div>

						<ArrowRight
							size={18}
							className="hidden md:block text-outline-variant/60"
						/>
						<ArrowDown
							size={18}
							className="block md:hidden text-outline-variant/60"
						/>

						{/* Step 3 (Explicitly managing expectations) */}
						<div className="flex items-center gap-3 bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 px-5 py-2.5 rounded-full shadow-lg">
							<MessageSquare
								size={16}
								className="text-tertiary"
							/>
							<span className="font-body-md text-[13px] text-on-surface font-medium whitespace-nowrap">
								3. Paste in your Project
							</span>
						</div>
					</div>
					{/* --- END FLOWCHART --- */}

					{/* MASTER WRAPPER: 3-Column Layout */}
					<Mobile />
				</div>
			</section>
			{/* Bento Grid Features Section */}
			<section
				id="features"
				aria-labelledby="features-heading"
				className="w-full px-lg max-w-container-max mx-auto py-xl"
			>
				<h2 id="features-heading" className="sr-only">
					Core Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg">
					{/* Bento 1 */}
					<article className="col-span-1 md:col-span-8 bg-surface-container/60 backdrop-blur-md rounded-xl border border-outline-variant/30 p-lg flex flex-col justify-between glow-primary relative overflow-hidden group transition-all duration-300 card-hover-glow">
						<div
							className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
							aria-hidden="true"
						></div>
						<div className="z-10 mb-xl">
							<h3 className="font-headline-md text-headline-md text-on-surface mb-2">
								Designer-Grade Defaults
							</h3>
							<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
								Every component is meticulously crafted to meet
								modern design standards out-of-the-box. Soft
								shadows, fluid animations, and perfect
								typography.
							</p>
						</div>
						<div
							className="z-10 bg-surface/80 backdrop-blur-sm rounded-lg border border-outline-variant/50 p-md max-w-sm ml-auto shadow-2xl shadow-black/50 transform rotate-1 group-hover:rotate-0 transition-transform duration-300"
							aria-hidden="true"
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
									<User size={20} />
								</div>
								<div>
									<p className="font-body-md text-body-md text-on-surface font-semibold leading-tight">
										Alex Rivera
									</p>
									<p className="font-label-xs text-label-xs text-on-surface-variant">
										2 mins ago
									</p>
								</div>
							</div>
							<p className="font-body-md text-body-md text-on-surface-variant mb-4">
								Just pushed the new design system updates to the
								main branch. Let me know what you think!
							</p>
							<div className="flex gap-2">
								<button
									tabIndex={-1}
									className="bg-surface-container-high text-on-surface font-label-xs text-label-xs px-3 py-1.5 rounded hover:bg-surface-container-highest transition-colors"
								>
									Reply
								</button>
								<button
									tabIndex={-1}
									className="bg-primary text-on-primary font-label-xs text-label-xs px-3 py-1.5 rounded hover:bg-primary-container transition-colors shadow-[0_0_10px_rgba(192,193,255,0.3)]"
								>
									Approve
								</button>
							</div>
						</div>
					</article>

					{/* Bento 2 */}
					<article className="col-span-1 md:col-span-4 bg-surface-container/60 backdrop-blur-md rounded-xl border border-outline-variant/30 p-lg flex flex-col glow-secondary group transition-all duration-300 card-hover-glow">
						<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
							Robust Architecture
						</h3>
						<p className="font-body-md text-body-md text-on-surface-variant mb-auto">
							Not a black-box library. Take ownership of the code
							and adapt it to your specific architectural needs.
						</p>
						<div
							className="mt-md bg-surface-container-lowest/80 backdrop-blur-sm rounded border border-outline-variant/50 p-sm font-code-sm text-code-sm text-outline-variant overflow-hidden group-hover:border-primary/50 transition-colors"
							aria-hidden="true"
						>
							<span className="text-token-keyword">val</span>{" "}
							spacing = LocalSpacing.current
							<br />
							<span className="text-token-function">
								Modifier
							</span>
							<span>.</span>
							<span className="text-token-function">padding</span>
							(spacing.md)
						</div>
					</article>

					{/* Bento 3 */}
					<article className="col-span-1 md:col-span-4 bg-surface-container/60 backdrop-blur-md rounded-xl border border-outline-variant/30 p-lg flex flex-col group transition-all duration-300 card-hover-glow">
						<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
							Dark Mode First
						</h3>
						<p className="font-body-md text-body-md text-on-surface-variant mb-auto">
							Beautifully inverted color palettes and elevation
							overlays designed specifically for OLED displays.
						</p>
						<div
							className="mt-md flex items-center justify-between bg-surface/80 backdrop-blur-sm rounded-lg p-3 border border-outline-variant/50"
							aria-hidden="true"
						>
							<span className="font-body-md text-body-md text-on-surface">
								Dark Theme
							</span>
							<div className="w-10 h-5 bg-primary rounded-full relative flex items-center shadow-[0_0_8px_rgba(192,193,255,0.4)]">
								<div className="w-4 h-4 bg-on-primary rounded-full absolute right-[2px]"></div>
							</div>
						</div>
					</article>

					{/* Bento 4 (Fixed Mobile Alignment) */}
					<article className="col-span-1 md:col-span-8 bg-surface-container/60 backdrop-blur-md rounded-xl border border-outline-variant/30 p-lg flex flex-col md:flex-row items-center gap-lg group overflow-hidden relative transition-all duration-300 card-hover-glow">
						<div
							className="absolute inset-0 bg-gradient-to-tl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
							aria-hidden="true"
						></div>
						<div className="flex-1 z-10 text-center md:text-left flex flex-col items-center md:items-start">
							<h3 className="font-headline-md text-headline-md text-on-surface mb-2">
								Fluid Interactions
							</h3>
							<p className="font-body-lg text-body-lg text-on-surface-variant">
								Spring-based animations and carefully tuned
								physics for every state change.
							</p>
						</div>
						<div
							className="z-10 bg-surface/80 backdrop-blur-sm rounded-xl border border-outline-variant/50 p-4 shadow-xl transform group-hover:scale-105 transition-transform duration-500 w-full md:w-auto"
							aria-hidden="true"
						>
							<div className="w-full md:w-48 h-2 bg-surface-container-high rounded-full overflow-hidden mb-2">
								<div className="w-2/3 h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(221,183,255,0.5)]"></div>
							</div>
							<div className="flex justify-between font-label-xs text-label-xs text-on-surface-variant">
								<span>Progress</span>
								<span>66%</span>
							</div>
						</div>
					</article>
				</div>
			</section>
			{/* Component Showcase */}
			<section className="w-full px-lg max-w-container-max mx-auto py-2xl">
				<div className="flex flex-col mb-xl text-center md:text-left">
					<h2 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">
						The IDE Experience
					</h2>
					<p className="font-body-lg text-body-lg text-on-surface-variant">
						Preview components in a high-fidelity environment before
						integrating.
					</p>
				</div>
				<div className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant/30 overflow-hidden shadow-2xl shadow-black/40">
					<div className="code-block-bg p-lg flex flex-col relative overflow-hidden group">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(#1e1e23/0.1),transparent_70%)] pointer-events-none"></div>
						<button
							aria-label="Copy Code"
							className="absolute top-4 right-4 text-outline-variant hover:text-on-primary transition-colors bg-surface-container-high/50 p-2 rounded-md opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-outline-variant/20 z-10"
						>
							<Copy size={16} />
						</button>
						<div className="flex items-center gap-2 mb-6 border-b border-outline-variant/20 pb-3 relative z-10">
							<div className="flex gap-1.5 mr-4">
								<div className="w-3 h-3 rounded-full bg-error/80 border border-error"></div>
								<div className="w-3 h-3 rounded-full bg-tertiary/80 border border-tertiary"></div>
								<div className="w-3 h-3 rounded-full bg-primary/80 border border-primary"></div>
							</div>
							<span className="font-code-sm text-code-sm text-on-surface-variant font-medium">
								NotificationCard.kt
							</span>
						</div>
						<pre
							className="custom-scrollbar font-code-sm text-code-sm overflow-x-auto whitespace-pre text-on-surface m-0 leading-relaxed relative z-10 pb-2"
							tabIndex={0}
							aria-label="Kotlin code snippet for NotificationCard component"
						>
							<code className="block">
								<span className="text-token-keyword">
									@Composable
								</span>
								{"\n"}
								<span className="text-token-keyword">
									fun
								</span>{" "}
								<span className="text-token-function">
									NotificationCard
								</span>
								() {"{\n"}
								{"    "}
								<span className="text-token-function">
									Card
								</span>
								({"\n"}
								{"        "}modifier = Modifier.
								<span className="text-token-function">
									fillMaxWidth
								</span>
								(),{"\n"}
								{"        "}elevation = CardDefaults.
								<span className="text-token-function">
									cardElevation
								</span>
								({"\n"}
								{"            "}defaultElevation ={" "}
								<span className="text-token-property">
									8.dp
								</span>
								{"\n"}
								{"        "}),{"\n"}
								{"        "}colors = CardDefaults.
								<span className="text-token-function">
									cardColors
								</span>
								({"\n"}
								{"            "}containerColor =
								MaterialTheme.colorScheme.surfaceContainerLowest
								{"\n"}
								{"        "}),{"\n"}
								{"        "}shape = RoundedCornerShape(
								<span className="text-token-property">
									16.dp
								</span>
								){"\n"}
								{"    "}) {"{\n"}
								{"        "}
								<span className="text-token-function">
									Column
								</span>
								({"\n"}
								{"            "}modifier = Modifier.
								<span className="text-token-function">
									padding
								</span>
								(
								<span className="text-token-property">
									24.dp
								</span>
								){"\n"}
								{"        "}) {"{\n"}
								{"            "}
								<span className="text-token-function">
									Text
								</span>
								({"\n"}
								{"                "}text ={" "}
								<span className="text-token-string">
									"Notifications"
								</span>
								,{"\n"}
								{"                "}style =
								MaterialTheme.typography.headlineSmall{"\n"}
								{"            "}){"\n"}
								{"            "}
								<span className="text-token-function">
									Spacer
								</span>
								(modifier = Modifier.
								<span className="text-token-function">
									height
								</span>
								(
								<span className="text-token-property">
									8.dp
								</span>
								)){"\n"}
								{"            "}
								<span className="text-token-function">
									Text
								</span>
								({"\n"}
								{"                "}text ={" "}
								<span className="text-token-string">
									"Manage your alert preferences."
								</span>
								,{"\n"}
								{"                "}style =
								MaterialTheme.typography.bodyMedium,{"\n"}
								{"                "}color =
								MaterialTheme.colorScheme.onSurfaceVariant
								{"\n"}
								{"            "}){"\n"}
								{"            "}
								<span className="text-token-comment">
									// ... Sophisticated Switch Logic ...
								</span>
								{"\n"}
								{"        }\n"}
								{"    }\n"}
								{"}"}
							</code>
						</pre>
					</div>
				</div>
			</section>{" "}
			<Footer />
		</main>
	);
}
