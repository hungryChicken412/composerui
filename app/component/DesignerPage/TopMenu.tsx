"use client";

import { Search, Sun, Moon, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function TopMenu() {
	return (
		<header className="w-full h-14 px-4 flex flex-row items-center justify-between transition-all ease-in bg-surface-container-lowest border-b border-outline-variant/20">
			<div className="flex items-center gap-6 w-[65%]">
				<Link href="/" className="flex items-center gap-2 group">
					<Image
						src="/hero.png"
						alt="ComposerUI Logo"
						height={24}
						width={24}
						className="group-hover:opacity-80 transition-opacity"
					/>
				</Link>

				{/* Replace your current Search <Link> block with this: */}
				<Link
					href="/browse"
					className="hidden md:flex flex-row items-center w-full bg-surface-container-low border border-outline-variant/30 rounded-full px-3 py-1.5 hover:border-primary/50 transition-colors cursor-text"
				>
					<Search className="w-4 h-4 text-outline mr-2" />

					{/* FIX: Changed from <input> to a <span> that looks like placeholder text */}
					<span className="text-outline text-sm w-full text-left">
						Search components...
					</span>

					<kbd className="bg-surface-container-high text-outline px-2 py-0.5 rounded text-[10px] font-medium border border-outline-variant/50 ml-2 whitespace-nowrap">
						⌘ K
					</kbd>
				</Link>
			</div>

			<div className="flex flex-row items-center w-[35%] justify-end gap-4">
				<nav className="hidden lg:flex flex-row items-center gap-6 text-sm font-medium text-outline">
					<a
						href="/browse"
						className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300font-bold  border-primary pb-1"
					>
						Components
					</a>
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
						href="/docs"
						className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300font-bold  border-primary pb-1"
					>
						Docs
					</Link>
				</nav>
				<div className="flex items-center gap-3 pr-4 border-r border-outline-variant/30">
					<Link
						href="https://github.com"
						target="_blank"
						className="text-outline hover:text-on-surface transition-colors"
					>
						<Code />

						<span className="sr-only">GitHub</span>
					</Link>
					<Link
						href="https://twitter.com"
						target="_blank"
						className="text-outline hover:text-on-surface transition-colors"
					>
						<Code />
						<span className="sr-only">Twitter</span>
					</Link>
				</div>

				<button className="bg-on-surface text-surface-container-lowest hover:bg-on-surface/90 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors">
					Join Waitlist
				</button>
			</div>
		</header>
	);
}

export default React.memo(TopMenu);
