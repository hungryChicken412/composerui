import React, { useState, useEffect } from "react";
// Import all icons to map them dynamically via string names
import * as LucideIcons from "lucide-react";

interface SegmentedControlPreviewProps {
	defaultValues: any;
}

export default function SegmentedControlPreview({
	defaultValues,
}: SegmentedControlPreviewProps) {
	// Dynamically map styling values
	const height = defaultValues["{$Height_01}"] ?? 48;
	const cornerRadius = defaultValues["{$CornerRadius_01}"] ?? 12;
	const trackColor = defaultValues["{$TrackColor_01}"] ?? "#E5E7EB";
	const pillColor = defaultValues["{$PillColor_01}"] ?? "#FFFFFF";
	const activeTextColor = defaultValues["{$ActiveTextColor_01}"] ?? "#6200EE";
	const inactiveTextColor =
		defaultValues["{$InactiveTextColor_01}"] ?? "#6B7280";

	const segmentCount = defaultValues["{$SegmentCount_01}"] ?? 3;

	// Map Custom Labels
	const labels = [
		defaultValues["{$Label1_01}"] || "Preview",
		defaultValues["{$Label2_01}"] || "Code",
		defaultValues["{$Label3_01}"] || "Split",
		defaultValues["{$Label4_01}"] || "Settings",
		defaultValues["{$Label5_01}"] || "Export",
	];

	// Map Custom Icon Strings (e.g. "Eye", "Code", "None")
	const iconNames = [
		defaultValues["{$Icon1_01}"] || "Eye",
		defaultValues["{$Icon2_01}"] || "Code",
		defaultValues["{$Icon3_01}"] || "LayoutGrid",
		defaultValues["{$Icon4_01}"] || "Settings",
		defaultValues["{$Icon5_01}"] || "Download",
	];

	// Helper function to resolve string names to actual Lucide React components
	const getIconComponent = (iconName: string) => {
		if (!iconName || iconName === "None") return null;
		// @ts-ignore - Indexing into LucideIcons dynamically
		const Icon = LucideIcons[iconName];
		return Icon ? Icon : null;
	};

	// Generate the dynamic array
	const items = Array.from({
		length: Math.min(Math.max(segmentCount, 2), 5),
	}).map((_, i) => ({
		label: labels[i],
		iconName: iconNames[i],
	}));

	const [selectedIndex, setSelectedIndex] = useState(0);

	// Ensure selection stays in bounds when segments are reduced
	useEffect(() => {
		if (selectedIndex >= items.length) {
			setSelectedIndex(items.length - 1);
		}
	}, [items.length, selectedIndex]);

	return (
		<div className="flex w-full items-center justify-center ">
			<div
				className="w-full max-w-2xl transition-all duration-300 "
				style={{
					height: `${height}px`,
					borderRadius: `${cornerRadius}px`,
					backgroundColor: trackColor,
					padding: "4px",
				}}
			>
				<div className="relative w-full h-full flex">
					{/* Sliding Pill Indicator */}
					<div
						className="absolute top-0 bottom-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out"
						style={{
							width: `calc(100% / ${items.length})`,
							transform: `translateX(calc(${selectedIndex} * 100%))`,
							backgroundColor: pillColor,
							borderRadius: `${Math.max(0, cornerRadius - 2)}px`,
						}}
					/>

					{/* Foreground Selectable Items */}
					<div className="relative flex w-full h-full z-10">
						{items.map((item, index) => {
							const isSelected = index === selectedIndex;
							const RenderedIcon = getIconComponent(
								item.iconName,
							);

							return (
								<button
									key={index}
									onClick={() => setSelectedIndex(index)}
									className="flex-1 flex h-full items-center justify-center cursor-pointer transition-colors duration-300 outline-none select-none"
									style={{
										color: isSelected
											? activeTextColor
											: inactiveTextColor,
										fontWeight: isSelected ? 700 : 500,
									}}
								>
									<div className="flex items-center justify-center flex-col p-2 pointer-events-none">
										{/* Only render icon if it exists and is not 'None' */}
										{RenderedIcon && (
											<RenderedIcon
												size={18}
												style={{
													marginRight: item.label
														? "6px"
														: "0px",
												}}
											/>
										)}
										<span className="text-sm truncate max-w-[100px]">
											{item.label}
										</span>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
