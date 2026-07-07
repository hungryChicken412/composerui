"use client";

import { useEffect } from "react";

export default function HelpModal({
	toggleModal,
}: {
	toggleModal: () => void;
}) {
	// Optional: Close on Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") toggleModal();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleModal]);

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
			onClick={toggleModal}
		>
			<div
				// Stop clicks inside the modal from closing it
				onClick={(e) => e.stopPropagation()}
				className="bg-[#121212] md:bg-surface-container-lowest h-[90%] border border-outline-variant/20 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col relative shadow-2xl text-on-surface"
			>
				{/* Header (Sticky) */}
				<div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-outline-variant/20 bg-surface-container-lowest rounded-t-2xl">
					<div>
						<h2 className="text-xl font-semibold tracking-tight">
							Help & Documentation
						</h2>
						<p className="text-sm text-outline mt-1">
							Learn how to navigate and use the workspace.
						</p>
					</div>
					<button
						onClick={toggleModal}
						className="p-2 rounded-full text-outline hover:text-white hover:bg-white/10 transition-colors"
						aria-label="Close"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				{/* Scrollable Content Area */}
				<div className="flex-1 overflow-y-auto p-6 space-y-8">
					{/* Getting Started Grid */}
					<section>
						<h3 className="text-sm font-medium text-outline uppercase tracking-wider mb-4">
							Workspace Guide
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<HelpCard
								title="Live Compose Preview"
								description="Interact with your components in real-time. The center device frame renders your current configuration instantly."
								icon={
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect
											x="5"
											y="2"
											width="14"
											height="20"
											rx="2"
											ry="2"
										></rect>
										<line
											x1="12"
											y1="18"
											x2="12.01"
											y2="18"
										></line>
									</svg>
								}
							/>
							<HelpCard
								title="Properties & Layers"
								description="Use the left sidebar to tweak component properties, adjust styling, and navigate your UI hierarchy."
								icon={
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<line
											x1="4"
											y1="21"
											x2="4"
											y2="14"
										></line>
										<line
											x1="4"
											y1="10"
											x2="4"
											y2="3"
										></line>
										<line
											x1="12"
											y1="21"
											x2="12"
											y2="12"
										></line>
										<line
											x1="12"
											y1="8"
											x2="12"
											y2="3"
										></line>
										<line
											x1="20"
											y1="21"
											x2="20"
											y2="16"
										></line>
										<line
											x1="20"
											y1="12"
											x2="20"
											y2="3"
										></line>
										<line
											x1="1"
											y1="14"
											x2="7"
											y2="14"
										></line>
										<line
											x1="9"
											y1="8"
											x2="15"
											y2="8"
										></line>
										<line
											x1="17"
											y1="16"
											x2="23"
											y2="16"
										></line>
									</svg>
								}
							/>
							<HelpCard
								title="Code Implementation"
								description="The right panel generates production-ready Kotlin/Compose code. Copy it directly into your Android project."
								icon={
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="16 18 22 12 16 6"></polyline>
										<polyline points="8 6 2 12 8 18"></polyline>
									</svg>
								}
							/>
							<HelpCard
								title="Blocks & Components"
								description="Switch between raw components and pre-built blocks using the top navigation tabs."
								icon={
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
										<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
										<line
											x1="12"
											y1="22.08"
											x2="12"
											y2="12"
										></line>
									</svg>
								}
							/>
						</div>
					</section>

					{/* Keyboard Shortcuts */}
					<section>
						<h3 className="text-sm font-medium text-outline uppercase tracking-wider mb-4">
							Keyboard Shortcuts
						</h3>
						<div className="bg-white/5 border border-outline-variant/10 rounded-xl overflow-hidden">
							<ShortcutRow
								label="Search Components"
								shortcut={["⌘", "K"]}
							/>
							<ShortcutRow
								label="Toggle Properties Panel"
								shortcut={["⌘", "M"]}
							/>
							<ShortcutRow
								label="Recenter Preview"
								shortcut={["⌘", "V"]}
							/>
							<ShortcutRow
								label="Press for Help"
								shortcut={["⌘", "H"]}
							/>

							<ShortcutRow
								label="Copy Code"
								shortcut={["⌘", "C"]}
								border={false}
							/>
						</div>
					</section>
				</div>

				{/* Footer */}
				<div className="p-6 border-t border-outline-variant/20 flex justify-between items-center bg-white/5 rounded-b-2xl">
					<span className="text-sm text-outline">
						Still need help?
					</span>
					<button className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors">
						Contact Support
					</button>
				</div>
			</div>
		</div>
	);
}

// Sub-components for cleaner code
function HelpCard({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="p-4 rounded-xl border border-outline-variant/10 bg-white/5 hover:bg-white/10 transition-colors flex gap-4">
			<div className="text-primary mt-1 flex-shrink-0">{icon}</div>
			<div>
				<h4 className="font-medium text-on-surface mb-1">{title}</h4>
				<p className="text-sm text-outline leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
}

function ShortcutRow({
	label,
	shortcut,
	border = true,
}: {
	label: string;
	shortcut: string[];
	border?: boolean;
}) {
	return (
		<div
			className={`flex justify-between items-center p-3 px-4 ${border ? "border-b border-outline-variant/10" : ""}`}
		>
			<span className="text-sm text-on-surface">{label}</span>
			<div className="flex gap-1.5">
				{shortcut.map((key, i) => (
					<span
						key={i}
						className="px-2 py-1 rounded bg-black/40 border border-outline-variant/20 text-xs font-mono text-outline min-w-[24px] text-center shadow-sm"
					>
						{key}
					</span>
				))}
			</div>
		</div>
	);
}
