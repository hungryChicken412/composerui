"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom"; // 1. Import the preload function




export default function WaveCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		preload("/hero.webp", { as: "image" });

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width = window.innerWidth;
		let height = canvas.parentElement?.offsetHeight || window.innerHeight;
		let mouseX = width / 2;
		let targetMouseX = width / 2;
		let animationFrameId: number;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (!prefersReducedMotion) {
			const handleMouseMove = (e: MouseEvent) => {
				const rect = canvas.getBoundingClientRect();
				targetMouseX = e.clientX - rect.left;
			};

			const handleMouseLeave = () => {
				targetMouseX = width / 2;
			};

			canvas.addEventListener("mousemove", handleMouseMove);
			canvas.addEventListener("mouseleave", handleMouseLeave);
		}

		let time = 0;

		const animate = () => {
			// Step 1: Clear the previous frame
			ctx.clearRect(0, 0, width, height);

			// Step 2: Draw the waves on top
			if (!prefersReducedMotion) {
				mouseX += (targetMouseX - mouseX) * 0.05;
			}

			const mouseInfluence = (mouseX / width - 0.5) * 2;

			const waves = [
				{
					amplitude: height * 0.1,
					frequency: 0.001,
					speed: 0.005,
					color: "rgba(0,0,0 , 0.42)",
					offset: 0,
					mouseMult: 0.5,
				},
				{
					amplitude: height * 0.15,
					frequency: 0.0015,
					speed: 0.003,
					color: "rgba(0,0,0, 0.25)",
					offset: 2,
					mouseMult: 1.0,
				},
				{
					amplitude: height * 0.08,
					frequency: 0.002,
					speed: 0.007,
					color: "rgba(0,0,0, 0.2)",
					offset: 4,
					mouseMult: 1.5,
				},
			];

			waves.forEach((wave) => {
				ctx.beginPath();
				ctx.moveTo(0, height);
				for (let x = 0; x <= width; x += 20) {
					let yOffset = 0;
					if (!prefersReducedMotion) {
						yOffset =
							mouseInfluence *
							wave.mouseMult *
							(height * 0.05) *
							Math.sin(x * 0.001);
					}
					const y =
						height * 0.5 +
						Math.sin(
							x * wave.frequency +
								time * wave.speed +
								wave.offset,
						) *
							wave.amplitude +
						yOffset;
					ctx.lineTo(x, y);
				}
				ctx.lineTo(width, height);
				ctx.lineTo(0, height);
				ctx.fillStyle = wave.color;
				ctx.fill();
			});

			// Continue the loop
			if (!prefersReducedMotion) {
				time++;
				animationFrameId = requestAnimationFrame(animate);
			} else {
				// Redraw a static frame if reduced motion is on
				time = 100;
			}
		};

		const resize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height =
				canvas.parentElement?.offsetHeight || window.innerHeight;
			if (prefersReducedMotion && width > 0) animate();
		};

		window.addEventListener("resize", resize);
		resize();

		// Begin animation after resize is complete
		animate();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
			<div
				className="absolute inset-0 w-full h-full bg-cover bg-center"
				style={{
					backgroundImage: "url('/hero.webp')", // Ensure the image is in the public/ folder
					maskImage:
						"linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 40%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 40%, transparent 100%)",
				}}
			></div>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full opacity-100"
				aria-hidden="true"
			/>
		</div>
	);
}
