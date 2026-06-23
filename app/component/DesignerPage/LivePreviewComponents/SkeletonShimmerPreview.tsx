// components/previews/SkeletonShimmerPreview.tsx
import React from "react";

export default function SkeletonShimmerPreview({
	defaultValues,
}: {
	defaultValues: any;
}) {
	// Reusable generic skeleton block that inherits the animated styling
	const width = defaultValues["{$Width_01}"];
	const height = defaultValues["{$Height_01}"];
	const cornerRadius = defaultValues["{$CornerRadius_01}"];
	const baseColor = defaultValues["{$BaseColor_01}"];
	const highlightColor = defaultValues["{$HighlightColor_01}"];
	const layoutVariant = defaultValues["{$LayoutVariant_01}"];

	const ShimmerBlock = ({
		w,
		h,
		r,
	}: {
		w?: number | string;
		h?: number | string;
		r?: number;
	}) => (
		<div
			className="relative overflow-hidden isolate"
			style={{
				width: w
					? typeof w === "number"
						? `${w}px`
						: w
					: `${width}px`,
				height: h
					? typeof h === "number"
						? `${h}px`
						: h
					: `${height}px`,
				borderRadius: `${r !== undefined ? r : cornerRadius}px`,
				backgroundColor: baseColor,
			}}
		>
			<div
				className="absolute inset-0 -translate-x-full animate-[shimmerSweep_1.5s_infinite_linear]"
				style={{
					backgroundImage: `linear-gradient(90deg, transparent 0%, ${highlightColor} 50%, transparent 100%)`,
				}}
			/>
		</div>
	);

	return (
		<div className="flex w-full items-center justify-center p-8 bg-white/5 rounded-xl border border-dashed border-gray-200">
			{/* Injecting the keyframe locally ensures it runs immediately 
        without needing a global CSS setup. 
      */}
			<style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

			{/* Render layout based on selected variant */}
			{layoutVariant === "Single" && <ShimmerBlock />}

			{layoutVariant === "Article" && (
				<div className="flex flex-col gap-4 w-full max-w-sm">
					<ShimmerBlock w="80%" />
					<ShimmerBlock w="100%" />
					<ShimmerBlock w="90%" />
					<ShimmerBlock w="60%" />
				</div>
			)}

			{layoutVariant === "Profile" && (
				<div className="flex items-center gap-4 w-full max-w-sm">
					<ShimmerBlock w={48} h={48} r={24} />
					<div className="flex flex-col gap-2">
						<ShimmerBlock w={120} h={16} />
						<ShimmerBlock w={80} h={12} />
					</div>
				</div>
			)}

			{layoutVariant === "Card" && (
				<div
					className="flex flex-col gap-4 w-full max-w-sm p-4 rounded-xl border border-gray-100 shadow-sm"
					style={{
						backgroundColor:
							baseColor === "#E5E7EB" ? "#FFFFFF" : "#1F2937",
					}}
				>
					<ShimmerBlock w="100%" h={150} />
					<ShimmerBlock w="70%" h={20} />
					<ShimmerBlock w="40%" h={16} />
				</div>
			)}
		</div>
	);
}
