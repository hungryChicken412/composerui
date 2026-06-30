"use client";

import { blurhashToBase64 } from "blurhash-base64";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function InbuiltElementsList({
	filteredComponents,
	
}: {
	filteredComponents: any[];
	
}) {
	return (
		<>
			<section className="grid grid-cols-3 gap-8 mt-8">
				{filteredComponents.length > 0 ? (
					filteredComponents.map((comp, index) => (
						<div
							key={comp.id}
							className={`glass-card-luxury rounded-[24px] overflow-hidden flex flex-col group transition-all duration-500`}
						>
							<div className="h-64 image-glow-backdrop flex items-center justify-center p-8 border-b border-white/5 relative bg-surface-container-lowest/30">
								{/* hero for visual preview */}
								
								<Image
									src={comp.imageUrl}
									alt={comp.name}
									fill
									className={
										"duration-700 ease-in-out transition-all ease-in blur-2xl"
									}
									placeholder="blur"
									blurDataURL={blurhashToBase64(
										comp.blurHash,
									)}
									onLoad={(e) => {
										e.currentTarget.classList.remove(
											"blur-2xl",
											"scale-110",
										);
									}}
								/>
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
