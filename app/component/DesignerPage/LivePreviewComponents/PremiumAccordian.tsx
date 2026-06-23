import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface PremiumAccordionPreviewProps {
	defaultValues: any;
}

export default function PremiumAccordionPreview({
	defaultValues,
}: PremiumAccordionPreviewProps) {
	// Map schema values
	const titleText =
		defaultValues["{$TitleText_01}"] || "What is Jetpack Compose?";
	const contentText =
		defaultValues["{$ContentText_01}"] ||
		"Jetpack Compose is Android’s modern toolkit for building native UI...";
	const defaultExpanded = defaultValues["{$ExpandedState_01}"] === "Expanded";
	const containerColor = defaultValues["{$ContainerColor_01}"] ?? "#F3F4F6";
	const cornerRadius = defaultValues["{$CornerRadius_01}"] ?? 12;

	// Internal state to make the preview toggleable interactively
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	// Sync local state if designer modifies default state
	useEffect(() => {
		setIsExpanded(defaultExpanded);
	}, [defaultExpanded]);

	return (
		<div className="flex w-full items-center justify-center p-8" >
			<div className="w-full max-w-md">
				{/* Equivalent to Compose Surface() */}
				<div
					className="w-full overflow-hidden border border-gray-200/50 shadow-sm cursor-pointer transition-colors duration-300 ease-in-out"
					style={{
						backgroundColor: containerColor,
						borderRadius: `${cornerRadius}px`,
					}}
					
				>
					{/* Header Row */}
					<div className="px-4 py-4 flex w-full items-center justify-between">
						<h3 className="text-base font-medium text-gray-800">
							{titleText}
						</h3>
						<ChevronDown
							className={`w-5 h-5 text-gray-600 transition-transform duration-300 ease-in-out ${
								isExpanded ? "rotate-180" : "rotate-0"
							}`}
						/>
					</div>

					{/* Equivalent to animateContentSize() using CSS Grid Transition */}
					<div
						className="grid transition-all duration-300 ease-in-out"
						style={{
							gridTemplateRows: isExpanded ? "1fr" : "0fr",
							opacity: isExpanded ? 1 : 0,
						}}
					>
						{/* Inner content wrapper required for Grid animation */}
						<div className="overflow-hidden">
							<div className="px-4 pb-4 pt-0">
								{/* Simulating Spacer(modifier = Modifier.height(12.dp)) equivalent */}
								<div className="w-full h-[2px]" />
								<p className="text-sm text-gray-600 leading-relaxed">
									{contentText}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
