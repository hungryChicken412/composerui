export default function Footer() {
	return (
		<>
			<footer className="bg-[#070708] h-[200px] backdrop-blur-lg w-full py-xl border-t border-outline-variant/50 mt-auto relative z-10 ">
				<div className=" mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md ">
					<div className="flex items-center gap-sm">
						<img
							alt="Compose UI Logo"
							className="h-6 w-6 object-contain rounded opacity-80"
							src="next.svg"
						/>
						<span className="font-display-lg text-headline-sm font-bold text-on-surface">
							Compose UI
						</span>
						<span className="font-body-md text-body-md text-on-surface-variant ml-2 opacity-80">
							© 2026 Compose UI. Built for architects.
						</span>
					</div>
					<div className="flex gap-md">
						<a
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
							href="#"
						>
							Github
						</a>
						<a
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
							href="#"
						>
							Discord
						</a>
						<a
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
							href="#"
						>
							Twitter
						</a>
						<a
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
							href="#"
						>
							Terms
						</a>
						<a
							className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all opacity-80 hover:opacity-100"
							href="#"
						>
							Privacy
						</a>
					</div>
				</div>
			</footer>
		</>
	);
}
