"use client";

import { Smartphone, ZoomOut, ZoomIn } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "react-toastify";
import ShowCustomToast, { CustomToast } from "./CustomToast";

export default function LivePreview({
	children,
}: {
	children: React.ReactNode;
}) {
	/* #region Zooming and Dragging*/
	const [zoom, setZoom] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
	const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
	const handleResetZoom = () => {
		setZoom(1);
		ShowCustomToast({
			label: "Recentered!",
			info: "Recentered the preview!",
		});
	};

	const containerRef = useRef<HTMLDivElement>(null);
	const position = useRef({ x: 0, y: 0 });

	useHotkeys("mod+V", (e) => {
		e.preventDefault();
		handleResetZoom();
	});

	useEffect(() => {
		if (zoom <= 1) {
			position.current = { x: 0, y: 0 };
			if (containerRef.current) {
				containerRef.current.style.transform = `scale(${zoom}) translate(0px, 0px)`;
			}
		} else {
			if (containerRef.current) {
				containerRef.current.style.transform = `scale(${zoom}) translate(${position.current.x}px, ${position.current.y}px)`;
			}
		}
	}, [zoom]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (zoom <= 1) return;
		e.preventDefault();
		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.current.x * zoom,
			y: e.clientY - position.current.y * zoom,
		});
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		e.preventDefault();
		position.current = {
			x: (e.clientX - dragStart.x) / zoom,
			y: (e.clientY - dragStart.y) / zoom,
		};

		// ADDED THIS: Manually update the DOM instantly without waiting for React
		if (containerRef.current) {
			containerRef.current.style.transform = `scale(${zoom}) translate(${position.current.x}px, ${position.current.y}px)`;
		}
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	return (
		<>
			<section
				className="flex-1 bg-surface-dim mesh-gradient flex flex-col items-center justify-center relative overflow-hidden"
				onMouseMove={handleMouseMove}
				onMouseUp={handleDragEnd}
				onMouseLeave={handleDragEnd}
			>
				<div className="absolute top-md right-md flex gap-sm z-10 glass-panel rounded-full px-2 py-1">
					<button
						onClick={handleZoomIn}
						className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary rounded-full transition-colors"
					>
						<ZoomIn size={18} />
					</button>
					<button
						onClick={handleZoomOut}
						className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary rounded-full transition-colors"
					>
						<ZoomOut size={18} />
					</button>
					<div className="w-px h-4 bg-outline-variant/30 my-auto mx-1"></div>
					<button
						onClick={handleResetZoom}
						className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary rounded-full transition-colors"
					>
						<Smartphone size={18} />
					</button>
				</div>

				<div
					ref={containerRef} // ADDED THIS: Attach the ref so React knows which div to move
					onMouseDown={handleMouseDown}
					className="relative w-[267px] h-[542px] mt-8 bg-surface-container-lowest rounded-[40px] border-[8px] border-surface-container-highest shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col items-center justify-center group"
					style={{
						transform: `scale(${zoom}) translate(${position.current.x}px, ${position.current.y}px)`,
						willChange: isDragging ? "transform" : "auto",
						transition: isDragging
							? "none"
							: "transform 0.2s ease-in-out",
						cursor:
							zoom > 1
								? isDragging
									? "grabbing"
									: "grab"
								: "default",
					}}
				>
					<div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-black rounded-full z-20"></div>

					<div className="w-full h-full bg-[#0a0a0c] p-2 flex flex-col items-center justify-center relative relative">
						<div className="absolute inset-0 opacity-20"></div>

						{children}
					</div>
				</div>
				<div className="mt-xl mb-lg font-label-xs text-label-xs text-on-surface-variant tracking-widest uppercase opacity-50 text-center">
					Preview, <br></br> actual results might slightly differ
				</div>
			</section>
		</>
	);
}
