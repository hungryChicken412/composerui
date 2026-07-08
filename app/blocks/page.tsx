import { ArrowRight, Image as ImageIcon } from "lucide-react";

import Navbar from "../component/navbar";
import Footer from "../component/footer";

export default async function BlockPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; category?: string }>;
}) {
	return (
		<>
			<Navbar />

			<main className="flex-grow w-full max-w-container-max mx-auto px-6 py-xl relative z-10 mb-2xl">
				<header className="mb-40 pt-32 max-w-5xl mx-auto text-center flex flex-col items-center">
					<h1 className="text-[80px] font-display-lg text-white mb-8 leading-[0.9] tracking-[-0.05em] font-extrabold">
						Production-Ready
						<br />
						<span className="text-gradient">App Blocks.</span>
					</h1>
					<p className="text-headline-sm font-body-lg text-on-surface-variant max-w-3xl font-light leading-relaxed">
						Bespoke designs, engineered for performance.
						High-fidelity layouts crafted to elevate your next
						ambitious project into a digital masterpiece.
					</p>
				</header>

				<div className="relative w-full flex flex-col gap-32 lg:gap-48 mt-20">
					<div className="relative z-20 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24 group">
						<div className="w-full lg:w-[45%] flex justify-center relative">
							<div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150 z-0"></div>
							<div className="phone-mockup-lg w-[380px] h-[780px] bg-surface relative floating z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-1000 ease-out">
								<div className="absolute inset-0 bg-[#09090b] flex flex-col">
									<div className="p-8 pt-16 flex-grow flex flex-col gap-6">
										<div className="h-16 bg-zinc-900 rounded-xl w-3/4"></div>
										<div className="h-40 bg-gradient-to-br from-emerald-900/50 to-zinc-900 rounded-2xl border border-emerald-500/20 backdrop-blur-md"></div>
										<div className="flex gap-4">
											<div className="h-20 w-20 bg-zinc-900 rounded-full border border-zinc-800"></div>
											<div className="h-20 w-20 bg-zinc-900 rounded-full border border-zinc-800"></div>
											<div className="h-20 w-20 bg-zinc-900 rounded-full border border-zinc-800"></div>
										</div>
										<div className="flex-grow bg-zinc-900/50 rounded-2xl mt-4 border border-zinc-800/50"></div>
									</div>
									<div className="h-24 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800"></div>
								</div>
							</div>
						</div>
						<div className="w-full lg:w-[55%] flex flex-col gap-8 z-20">
							<div className="flex items-center gap-4 mb-2">
								<span className="w-12 h-px bg-primary/50"></span>
								<span className="text-primary/70 uppercase tracking-[0.3em] text-[10px] font-bold">
									01 / Fintech
								</span>
							</div>
							<h2 className="text-[56px] font-display-lg text-white tracking-tighter leading-tight font-bold">
								Fintech Pro
							</h2>
							<p className="text-[20px] font-body-lg text-on-surface-variant font-light leading-relaxed max-w-xl">
								Deep obsidian interfaces with neon emerald
								accents. Engineered for modern banking
								applications requiring absolute precision and an
								aesthetic of unwavering trust.
							</p>
							<a
								className="shimmer-btn inline-flex items-center gap-4 text-white hover:text-primary mt-6 w-fit px-8 py-4 rounded-full group/btn"
								href="#"
							>
								<span className="text-label-xs tracking-[0.2em] uppercase font-semibold">
									Coming Soon
								</span>
								<ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1 w-4 h-4" />
							</a>
						</div>
					</div>

					<div className="relative z-20 w-full flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 group">
						<div className="w-full lg:w-[50%] flex flex-col gap-8 z-20 lg:pl-12 lg:text-right lg:items-end">
							<div className="flex items-center gap-4 mb-2 lg:flex-row-reverse">
								<span className="w-12 h-px bg-white/30"></span>
								<span className="text-white/50 uppercase tracking-[0.3em] text-[10px] font-bold">
									02 / Commerce
								</span>
							</div>
							<h2 className="text-[56px] font-display-lg text-white tracking-tighter leading-tight font-bold">
								Luxury Commerce
							</h2>
							<p className="text-[20px] font-body-lg text-on-surface-variant font-light leading-relaxed max-w-lg lg:text-right">
								Minimalist white-space, high-fashion
								presentation, and elegant typography designed to
								elevate premium brands.
							</p>
							<a
								className="shimmer-btn inline-flex items-center gap-4 text-white hover:text-white mt-6 w-fit px-8 py-4 rounded-full group/btn"
								href="#"
							>
								<span className="text-label-xs tracking-[0.2em] uppercase font-semibold">
									Coming Soong
								</span>
								<ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1 w-4 h-4" />
							</a>
						</div>
						<div className="w-full lg:w-[50%] flex justify-center relative">
							<div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full scale-150 z-0"></div>
							<div className="phone-mockup-lg w-[360px] h-[740px] bg-white relative floating-delayed z-10 transform rotate-2 group-hover:rotate-0 transition-transform duration-1000 ease-out border-zinc-800">
								<div className="absolute inset-0 bg-[#fcfcfc] flex flex-col">
									<div className="h-[380px] bg-zinc-100 flex items-center justify-center relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
										<ImageIcon
											size={64}
											strokeWidth={1}
											className="text-zinc-300 relative z-10"
										/>
									</div>
									<div className="p-8 flex-grow flex flex-col gap-5">
										<div className="h-8 bg-zinc-200 w-2/3 rounded-sm"></div>
										<div className="h-4 bg-zinc-100 w-1/3 rounded-sm"></div>
										<div className="mt-6 flex gap-3">
											<div className="h-10 w-10 bg-zinc-200 rounded-full border border-zinc-300"></div>
											<div className="h-10 w-10 bg-zinc-200 rounded-full border border-zinc-300"></div>
										</div>
										<div className="mt-auto h-16 bg-black w-full rounded-full flex items-center justify-center">
											<div className="h-2 w-12 bg-white/20 rounded-full"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="relative z-20 w-full flex justify-center mt-12 group">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-secondary-container/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>
						<article className=" rounded-[48px] p-12 lg:p-24 flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden w-full max-w-6xl">
							<div className="absolute top-12 left-12 z-20 flex items-center gap-4">
								<span className="w-8 h-px bg-secondary-fixed-dim/50"></span>
								<span className="text-secondary-fixed-dim/70 uppercase tracking-[0.3em] text-[10px] font-bold">
									03 / Social
								</span>
							</div>
							<div className="w-full lg:w-1/2 flex justify-center relative z-10 pt-12 lg:pt-0">
								<div className="phone-mockup-lg w-[340px] h-[700px] bg-surface relative floating shadow-[0_0_80px_rgba(111,0,190,0.2)]">
									<div className="absolute inset-0 bg-[#0c0c0e] flex flex-col">
										<div className="flex-grow flex flex-col gap-3 p-3 pt-14">
											<div className="h-[320px] bg-zinc-900 rounded-3xl relative overflow-hidden flex items-end p-5">
												<div className="w-full flex justify-between items-center bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/5">
													<div className="h-4 w-1/2 bg-zinc-700/50 rounded-full"></div>
													<div className="flex gap-2">
														<div className="h-8 w-8 bg-zinc-700/50 rounded-full backdrop-blur-md"></div>
													</div>
												</div>
											</div>
											<div className="h-[280px] bg-zinc-900 rounded-3xl"></div>
										</div>
										<div className="h-24 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center px-4 pb-4">
											<div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
											<div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
											<div className="h-12 w-12 bg-zinc-600 rounded-full border-2 border-zinc-900 shadow-lg shadow-zinc-900/50"></div>
											<div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
											<div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-1/2 flex flex-col gap-8 z-20">
								<h2 className="text-[48px] font-display-lg text-white tracking-tighter leading-tight font-bold">
									Social Stream
								</h2>
								<p className="text-[18px] font-body-lg text-on-surface-variant font-light leading-relaxed">
									Dynamic glassmorphic video feeds and rich
									interactive micro-interactions set against a
									deep, immersive void.
								</p>
								<a
									className="shimmer-btn inline-flex items-center gap-4 text-white hover:text-secondary-fixed-dim mt-4 w-fit px-8 py-4 rounded-full group/btn"
									href="#"
								>
									<span className="text-label-xs tracking-[0.2em] uppercase font-semibold">
										Coming Soon
									</span>
									<ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1 w-4 h-4" />
								</a>
							</div>
						</article>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}
