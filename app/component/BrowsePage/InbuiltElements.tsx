"use client";

import { blurhashToBase64 } from "blurhash-base64";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LucideClockFading } from "lucide-react";

export default function InbuiltElementsList({
	filteredComponents,
}: {
	filteredComponents: any[];
}) {
	return (
		<>
			<section className="grid  md:grid-cols-2 grid-cols-1  lg:grid-cols-3 gap-8 mt-8 ">
				{filteredComponents.length > 0 ? (
					filteredComponents.map((comp, index) => (
						<div
							key={comp.id}
							className={`glass-card-luxury rounded-[24px] overflow-hidden flex flex-col group w-max-[400px] m-auto transition-all duration-500`}
						>
							<div
								className="h-64 image-glow-backdrop flex items-center justify-center p-8 border-b border-white/5 relative bg-surface-container-lowest/30
							group
							"
							>
								{/* hero for visual preview */}
								<video
									src={`${comp.imageUrl}#t=1`}
									muted
									playsInline
									loop
									preload="metadata"
									className="w-full h-full object-cover"
									onMouseEnter={(event) => {
										event.currentTarget
											.play()
											.catch(() => undefined);
										console.log("herer");

										event.currentTarget.playbackRate = 4;
									}}
									onMouseLeave={(event) => {
										event.currentTarget.pause();
										event.currentTarget.currentTime = 2;
										event.currentTarget.playbackRate = 1;
									}}
								>
									{" "}
								</video>
								<span className="absolute top-[20%] right-[16%] opacity-50 group-hover:opacity-100 transition-all">
									{" "}
									<LucideClockFading />{" "}
								</span>
							</div>
							<div className="p-8 flex flex-col gap-8 flex-grow">
								<div>
									<h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tighter">
										{comp.name}
									</h3>
									<p className="text-on-surface-variant text-sm mt-2">
										{comp.description}
									</p>
								</div>
								<div className="mt-auto flex justify-end items-center">
									<Link
										className="font-headline-sm text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 transition-all duration-300 group-hover:translate-x-1"
										href={`/designer?id=${comp.id}`}
									>
										Implement <ArrowRight size={14} />
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-span-full py-12 text-center text-on-surface-variant">
						No components found matching your criteria.
					</div>
				)}
			</section>
		</>
	);
}
