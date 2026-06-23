import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface PremiumSwitchPreviewProps {
	defaultValues: any;
}

export default function PremiumSwitchPreview({
	defaultValues,
}: PremiumSwitchPreviewProps) {
	// Map schema values
	const propChecked = defaultValues["{$CheckedState_01}"] ?? true;
	const width = defaultValues["{$Width_01}"] ?? 64;
	const height = defaultValues["{$Height_01}"] ?? 32;
	const checkedColor = defaultValues["{$CheckedColor_01}"] ?? "#4B6CB7";
	const uncheckedColor = defaultValues["{$UncheckedColor_01}"] ?? "#E0E0E0";
	const thumbColor = defaultValues["{$ThumbColor_01}"] ?? "#ffffff";

	// Internal state to make the preview interactive
	const [isChecked, setIsChecked] = useState(propChecked);

	// Sync state if default values change in the designer panel
	useEffect(() => {
		setIsChecked(propChecked);
	}, [propChecked]);

	// Dynamic calculation logic (matching Compose calculations)
	const trackColor = isChecked ? checkedColor : uncheckedColor;
	const thumbOffset = isChecked ? width - height : 0;

	const trackIconSize = height * 0.5;
	const thumbIconSize = height * 0.6;

	return (
		<div className="flex w-full items-center justify-center p-8">
			<button
				onClick={() => setIsChecked(!isChecked)}
				className="relative flex items-center overflow-hidden transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
				style={{
					width: `${width}px`,
					height: `${height}px`,
					borderRadius: `${height / 2}px`,
					backgroundColor: trackColor,
				}}
				aria-pressed={isChecked}
			>
				{/* Track Background Icons */}
				<div
					className="absolute w-full flex justify-between items-center z-0"
					style={{ padding: `0 ${height / 4}px` }}
				>
					<Moon
						size={trackIconSize}
						color={
							!isChecked ? "#9CA3AF" : "rgba(255, 255, 255, 0.5)"
						} // Gray or semi-transparent white
						className="transition-colors duration-300"
					/>
					<Sun
						size={trackIconSize}
						color={
							isChecked ? "#FFFFFF" : "rgba(156, 163, 175, 0.5)"
						}
						className="transition-colors duration-300"
					/>
				</div>

				{/* Thumb Container (Animates horizontally) */}
				<div
					className="absolute top-0 bottom-0 z-10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
					style={{
						width: `${height}px`,
						transform: `translateX(${thumbOffset}px)`,
					}}
				>
					{/* Emulates Modifier.padding(2.dp) in compose */}
					<div className="w-full h-full p-[2px]">
						{/* Actual Thumb Background */}
						<div
							className="w-full h-full rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
							style={{ backgroundColor: thumbColor }}
						>
							{isChecked ? (
								<Sun
									size={thumbIconSize}
									color={checkedColor}
								/>
							) : (
								<Moon size={thumbIconSize} color="#9CA3AF" /> // Fallback gray for unselected icon
							)}
						</div>
					</div>
				</div>
			</button>
		</div>
	);
}
