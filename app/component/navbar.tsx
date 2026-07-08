"use client";

import { Home, Menu, Settings, SunIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [nav, setNav] = useState(false);
	const navLinks = [
		{ href: "/browse", label: "Components" },
		{ href: "/blocks", label: "Blocks", badge: "✨ New" },
		{ href: "/documentation", label: "Documentation" },
		{ href: "/templates", label: "Templates" },
	];

	function handleChange() {
		setNav(!nav);
	}

	return (
		<>
			<header className="bg-surface/40 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-2xl shadow-black/40">
				<div className=" mx-auto px-lg flex justify-between items-center h-20">
					<Link href="/" className="flex items-center gap-sm">
						<img
							alt="Compose UI Logo"
							className="h-8 w-8 object-contain rounded"
							src="iconn.png"
						/>
						<span className="font-display-lg text-headline-sm font-bold tracking-tight text-on-surface">
							ComposerUI
						</span>
					</Link>
					<nav className="hidden md:flex items-center gap-2xl">
						{navLinks.map((link) => (
							<Link
								href={link.href}
								key={link.href}
								className="font-body-md flex  items-center justify-between text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300font-bold  border-primary pb-1"
							>
								{link.label}
								{link.badge && (
									<span className="bg-primary/10 text-primary border ml-1 border-primary/20 text-[10px] leading-none px-1.5 py-0.5 rounded-full flex items-center">
										{link.badge}
									</span>
								)}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-md">
						<button className="hidden md:block bg-primary text-on-primary px-4 py-2 rounded-full font-label-xs text-label-xs hover:bg-primary-fixed transition-colors active:scale-95">
							More Soon!
						</button>
						<button
							onClick={handleChange}
							className="md:hidden  px-4 py-2 rounded-full font-label-xs text-label-xs hover:bg-primary-fixed transition-colors active:scale-95"
						>
							<Menu />
						</button>
					</div>
				</div>
			</header>
			{/* Backdrop Overlay */}
			{nav && (
				<div
					className="fixed inset-0 top-20 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
					onClick={handleChange}
				/>
			)}

			{/* Mobile Menu */}
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black/95  z-50 md:hidden overflow-y-auto transition-all duration-300 ease-out ${
					nav
						? "opacity-100 translate-y-0 visible"
						: "opacity-0 -translate-y-2 invisible"
				}`}
			>
				<div className="p-8 pt-8 pb-8 space-y-6 h-full flex flex-col">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							onClick={handleChange}
							className="hover:text-primary transition-colors"
						>
							<Home className="w-6 h-6" />
						</Link>
						<button
							onClick={handleChange}
							className="hover:text-primary transition-colors text-lg font-light"
						>
							✕
						</button>
					</div>

					<div className="space-y-2 flex justify-start h-full flex-col">
						{navLinks.map((link) => (
							<Link
								href={link.href}
								key={link.href}
								onClick={handleChange}
								className="block font-display-lg text-4xl my-[20px] font-light text-on-surface hover:text-primary transition-colors duration-200 py-2"
							>
								<div className="flex justify-between items-center">
									<span
										className="font-display-lg text-display-lg  text-on-surface tracking-tighter"
										style={{ fontWeight: "lighter" }}
									>
										{link.label}
									</span>
									{link.badge && (
										<span className="bg-primary/10 text-primary border border-primary/20 text-[10px] px-1.5 py-0.5 rounded-full">
											{link.badge}
										</span>
									)}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
