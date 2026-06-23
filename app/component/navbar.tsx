import { Settings, SunIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	return (
		<>
			<header className="bg-surface/40 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-2xl shadow-black/40">
				<div className=" mx-auto px-lg flex justify-between items-center h-20">
					<div className="flex items-center gap-sm">
						<img
							alt="Compose UI Logo"
							className="h-8 w-8 object-contain rounded"
							src="next.svg"
						/>
						<span className="font-display-lg text-headline-sm font-bold tracking-tight text-on-surface">
							ComposerUI
						</span>
					</div>
					<nav className="hidden md:flex items-center gap-2xl">
						<Link
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300font-bold  border-primary pb-1"
							href="/browse"
						>
							Components
						</Link>
						<Link
							href="/blocks"
							className="font-body-md flex  items-center justify-between text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300font-bold  border-primary pb-1"
						>
							Blocks
							<span className="bg-primary/10 text-primary border ml-1 border-primary/20 text-[10px] leading-none px-1.5 py-0.5 rounded-full flex items-center">
								✨ New
							</span>
						</Link>
						<Link
							className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
							href=""
						>
							Documentation
						</Link>
						<Link
							className="font-body-md text-body-md text-on-surface-variant font-medium hover:text-primary transition-colors duration-300"
							href=""
						>
							Templates
						</Link>
					</nav>

					<div className="flex items-center gap-md">
						
						<button className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-xs text-label-xs hover:bg-primary-fixed transition-colors active:scale-95">
							Join Waitlist
						</button>
						<div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant/30 overflow-hidden ml-2 cursor-pointer active:scale-95 transition-transform">
							<img
								alt="User profile"
								className="w-full h-full object-cover"
								data-alt="A close-up studio portrait of a confident young professional woman with a minimalist aesthetic. Soft, high-key lighting illuminates her face against a pure, deep dark background. The mood is sophisticated and technical, reflecting a premium developer tool environment."
								src="next.svg"
							/>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
