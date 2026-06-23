import {
	Signal,
	Wifi,
	BatteryFull,
	MessageSquare,
	SlidersHorizontal,
	ChevronDown,
	MousePointer2,
} from "lucide-react";

export default function Mobile() {
	return (
		<>
			<div className="relative z-10 mt-8 w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 xl:gap-12 opacity-0 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] delay-[400ms]">
				{/* --- LEFT COLUMN: Editor & Code --- */}
				<div className="flex flex-col gap-8 w-full max-w-[320px] xl:mt-8">
					{/* Properties Inspector */}
					<div className="w-full flex-col bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 rounded-2xl p-5 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.7)] glow-primary text-left">
						<div className="flex items-center gap-2 mb-4">
							<SlidersHorizontal
								size={16}
								className="text-primary"
							/>
							<span className="font-label-xs text-on-surface uppercase tracking-wider">
								Inspector
							</span>
						</div>

						{/* ANIMATED SELECT MENU */}
						<div className="mb-4">
							<div className="flex justify-between text-[11px] text-on-surface-variant mb-1.5">
								<span>Component</span>
							</div>
							<div className="flex items-center justify-between bg-surface-container border border-outline-variant/50 rounded-lg px-3 py-2 cursor-pointer transition-colors anim-select">
								<div className="relative w-24 h-5">
									<span className="absolute inset-0 text-[13px] text-on-surface anim-fade-out-fast">
										PrimaryButton
									</span>
									<span className="absolute inset-0 text-[13px] text-on-surface opacity-0 anim-fade-in-fast">
										GlowButton
									</span>
								</div>
								<ChevronDown
									size={14}
									className="text-on-surface-variant"
								/>
							</div>
						</div>

						{/* ANIMATED SLIDER */}
						<div className="mb-5 relative">
							<div className="flex justify-between text-[11px] text-on-surface-variant mb-2">
								<span>Corner Radius</span>
								<div className="relative w-10 h-4 text-right">
									<span className="absolute right-0 top-0 text-primary font-code-sm anim-fade-out-late">
										4.dp
									</span>
									<span className="absolute right-0 top-0 text-primary font-code-sm opacity-0 anim-fade-in-late">
										16.dp
									</span>
								</div>
							</div>
							<div className="w-full h-1.5 bg-surface-container-highest rounded-full relative">
								<div className="absolute left-0 top-0 h-full w-[12%] bg-primary rounded-full shadow-[0_0_8px_rgba(192,193,255,0.6)] anim-track"></div>
								<div
									className="absolute left-[12%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-on-primary rounded-full border-2 border-primary shadow-md anim-thumb"
									style={{
										transform:
											"translate(8px, 0px) !important",
									}}
								></div>
							</div>
						</div>
						<div className="absolute top-2 left-[55%] flex flex-col items-start pointer-events-none drop-shadow-xl z-50 animate-cursor-explore">
							<MousePointer2
								size={24}
								className="text-tertiary fill-tertiary -rotate-12"
							/>
							<div className="bg-tertiary text-on-tertiary font-label-xs px-2.5 py-1.5 rounded-md rounded-tl-none shadow-lg mt-1 ml-3 whitespace-nowrap">
								Sarah (Designer)
							</div>
						</div>

						<div>
							<div className="flex justify-between text-[11px] text-on-surface-variant mb-2">
								<span>Container Color</span>
							</div>
							<div className="flex gap-2">
								<div className="w-8 h-8 rounded-full bg-primary border-2 border-on-surface shadow-[0_0_10px_rgba(192,193,255,0.3)] cursor-pointer"></div>
								<div className="w-8 h-8 rounded-full bg-secondary opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
								<div className="w-8 h-8 rounded-full bg-error opacity-50 hover:opacity-100 transition-opacity cursor-pointer"></div>
							</div>
						</div>
					</div>

					{/* Code Preview */}
					<div className="w-full flex-col bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 rounded-xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] motion-safe:animate-[float_7s_ease-in-out_infinite_1s] glow-secondary text-left">
						<div className="flex items-center gap-2 mb-3 pb-2 border-b border-outline-variant/20">
							<div className="flex gap-1.5">
								<div className="w-2.5 h-2.5 rounded-full bg-error/80"></div>
								<div className="w-2.5 h-2.5 rounded-full bg-tertiary/80"></div>
								<div className="w-2.5 h-2.5 rounded-full bg-primary/80"></div>
							</div>
							<span className="font-code-sm text-[11px] text-on-surface-variant font-medium">
								Button.kt
							</span>
						</div>
						<pre className="font-code-sm text-[12px] leading-relaxed m-0 text-left overflow-hidden">
							<span className="text-token-keyword">
								@Composable
							</span>
							{"\n"}
							<span className="text-token-keyword">fun</span>{" "}
							<span className="text-token-function">
								GlowButton
							</span>
							() {"{\n"}
							{"  "}
							<span className="text-token-function">Button</span>(
							{"..."}){"\n"}
							{"}"}
						</pre>
					</div>
				</div>
				{/* --- END LEFT COLUMN --- */}

				{/* --- CENTER COLUMN: Mobile Phone Mockup --- */}
				<div
					className="relative w-[300px] h-[600px] shrink-0 bg-surface-container-low border-[8px] border-surface-container-highest rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col glow-primary motion-safe:animate-[float_6s_ease-in-out_infinite_0.5s]"
					aria-hidden="true"
				>
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-surface-container-highest rounded-b-2xl z-20"></div>

					<div className="flex-1 bg-surface-container-lowest/40 backdrop-blur-xl overflow-y-auto pt-10 px-4">
						<div className="flex justify-between items-center px-4 py-2 mb-8 text-left">
							<span className="text-[12px] font-bold text-on-surface">
								9:41
							</span>
							<div className="flex gap-1.5">
								<Signal size={14} />
								<Wifi size={14} />
								<BatteryFull size={14} />
							</div>
						</div>

						<div className="bg-surface-container/60 backdrop-blur-md rounded-2xl border border-outline-variant/30 p-md flex flex-col gap-md shadow-lg text-left">
							<div className="flex flex-col gap-1 mb-2">
								<h4 className="font-headline-sm text-[20px] text-on-surface">
									Notifications
								</h4>
								<p className="font-body-md text-[14px] text-on-surface-variant">
									Manage your alert preferences.
								</p>
							</div>
							<div className="flex items-center justify-between py-3 border-t border-outline-variant/20">
								<span className="font-body-md text-[14px] text-on-surface">
									Email Alerts
								</span>
								<div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer flex items-center shadow-[0_0_8px_rgba(192,193,255,0.3)]">
									<div className="w-4 h-4 bg-on-primary rounded-full absolute right-[2px]"></div>
								</div>
							</div>
							<div className="flex items-center justify-between py-3">
								<span className="font-body-md text-[14px] text-on-surface">
									Push Notifications
								</span>
								<div className="w-10 h-5 bg-surface-container-highest rounded-full relative cursor-pointer flex items-center border border-outline-variant/50">
									<div className="w-4 h-4 bg-surface-container-lowest rounded-full absolute left-[2px]"></div>
								</div>
							</div>
							<div className="mt-4">
								{/* ANIMATED BUTTON RADIUS (Syncs with the slider!) */}
								<button
									className="w-full bg-primary text-on-primary font-body-md text-[14px] py-2.5 rounded-md transition-all shadow-[0_0_15px_rgba(192,193,255,0.4)] anim-button-radius"
									tabIndex={-1}
								>
									Save Preferences
								</button>
							</div>
						</div>
						<div className="mt-6 space-y-4 opacity-40">
							<div className="h-20 bg-surface-container rounded-xl"></div>
							<div className="h-20 bg-surface-container rounded-xl"></div>
						</div>
					</div>
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-on-surface/20 rounded-full"></div>
				</div>
				{/* --- END CENTER COLUMN --- */}

				{/* --- RIGHT COLUMN: Simulated Live Chat --- */}
				<div className="flex flex-col gap-4 w-full max-w-[320px] xl:mt-8">
					<div className="opacity-0 animate-[fadeInUp_0.5s_ease-out_1.5s_forwards]">
						<div className="w-full bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 rounded-2xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] motion-safe:animate-[float_6.5s_ease-in-out_infinite_0.8s] glow-secondary text-left relative">
							<div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center border-[3px] border-background z-10 shadow-lg">
								<MessageSquare
									size={14}
									className="text-on-secondary-container fill-on-secondary-container"
								/>
							</div>
							<div className="flex items-center gap-3 mb-2">
								<div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-[11px] font-bold">
									AR
								</div>
								<div>
									<p className="font-body-md text-[13px] text-on-surface font-semibold leading-tight">
										Alex Rivera
									</p>
									<p className="font-label-xs text-[10px] text-on-surface-variant">
										Just now
									</p>
								</div>
							</div>
							<p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
								I mapped the slider directly to the{" "}
								<code className="text-secondary bg-secondary/10 px-1 py-0.5 rounded text-[11px] font-code-sm">
									RoundedCornerShape
								</code>
								. The UI reflects it instantly!
							</p>
						</div>
					</div>

					<div className="opacity-0 animate-[fadeInUp_0.5s_ease-out_3.5s_forwards] xl:ml-6">
						<div className="w-full bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 rounded-2xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] motion-safe:animate-[float_7.5s_ease-in-out_infinite_1.5s] text-left relative">
							<div className="absolute -left-[13px] -top-[35px] w-0.5 h-10 bg-outline-variant/30 hidden xl:block"></div>
							<div className="absolute -left-[13px] top-4 w-3 h-0.5 bg-outline-variant/30 hidden xl:block"></div>

							<div className="flex items-center gap-3 mb-2">
								<div className="w-7 h-7 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary text-[11px] font-bold">
									SD
								</div>
								<div>
									<p className="font-body-md text-[13px] text-on-surface font-semibold leading-tight">
										Sarah (Designer)
									</p>
									<p className="font-label-xs text-[10px] text-on-surface-variant">
										Typing...
									</p>
								</div>
							</div>
							<p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
								Looks perfect! The{" "}
								<code className="text-tertiary bg-tertiary/10 px-1 py-0.5 rounded text-[11px] font-code-sm">
									16.dp
								</code>{" "}
								radius matches our new Material 3 guidelines.
								Approving this PR.
							</p>
							<div className="mt-3 flex gap-2">
								<span className="bg-surface-container text-on-surface text-[11px] px-2 py-1 rounded-md border border-outline-variant/30 flex items-center gap-1">
									👍 2
								</span>
							</div>
						</div>
					</div>

					<div className="opacity-0 animate-[fadeInUp_0.5s_ease-out_5.5s_forwards]">
						<div className="w-full bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 rounded-2xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] motion-safe:animate-[float_6s_ease-in-out_infinite_2.2s] text-left relative mt-2">
							<div className="flex items-center gap-3 mb-2">
								<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary text-[11px] font-bold">
									DT
								</div>
								<div>
									<p className="font-body-md text-[13px] text-on-surface font-semibold leading-tight">
										David (Android Lead)
									</p>
									<p className="font-label-xs text-[10px] text-on-surface-variant">
										Typing...
									</p>
								</div>
							</div>
							<p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
								Awesome. I just pulled the latest Compose UI
								update into the main repo. Everything works
								flawlessly out-of-the-box. 🚀
							</p>
						</div>
					</div>
				</div>
				{/* --- END RIGHT COLUMN --- */}
			</div>
		</>
	);
}
