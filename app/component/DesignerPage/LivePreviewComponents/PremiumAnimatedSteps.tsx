import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface AnimatedStepIndicatorPreviewProps {
	defaultValues: Record<string, any>;
}

export default function AnimatedStepIndicatorPreview({
	defaultValues,
}: AnimatedStepIndicatorPreviewProps) {
	// Dynamically map styling values
	const orientation = defaultValues["{$Orientation_01}"] || "Horizontal";
	const totalStepsConfig = defaultValues["{$TotalSteps_01}"] ?? 4;
	const currentStepConfig = defaultValues["{$CurrentStep_01}"] ?? 1;

	const activeColor = defaultValues["{$ActiveColor_01}"] || "#6200EE";
	const completedColor = defaultValues["{$CompletedColor_01}"] || "#4CAF50";
	const inactiveColor = defaultValues["{$InactiveColor_01}"] || "#E5E7EB";

	const labels = [
		defaultValues["{$Label1_01}"] || "Personal",
		defaultValues["{$Label2_01}"] || "Address",
		defaultValues["{$Label3_01}"] || "Payment",
		defaultValues["{$Label4_01}"] || "Confirm",
		defaultValues["{$Label5_01}"] || "Complete",
	];

	// Ensure bounds
	const totalSteps = Math.min(Math.max(totalStepsConfig, 2), 5);

	// Local state for smooth entrance animations on preview load
	const [currentStep, setCurrentStep] = useState(currentStepConfig);

	useEffect(() => {
		// Enforce bound limits if total steps decreases below current step
		const maxStep = Math.min(currentStepConfig, totalSteps);
		setCurrentStep(maxStep);
	}, [currentStepConfig, totalSteps]);

	const isHorizontal = orientation === "Horizontal";

	return (
		<div className="flex w-full items-center justify-center p-8 ">
			<div
				className={`flex w-full max-w-2xl ${
					isHorizontal
						? "flex-row items-center"
						: "flex-col items-start"
				}`}
			>
				{Array.from({ length: totalSteps }).map((_, i) => {
					const isCompleted = i < currentStep;
					const isActive = i === currentStep;
					const isLast = i === totalSteps - 1;

					// Determine Color state mapped from Jetpack Compose logic
					const circleColor = isCompleted
						? completedColor
						: isActive
							? activeColor
							: inactiveColor;

					// Inner Circle Component mapping
					const StepCircle = () => (
						<div
							className="relative flex items-center justify-center transition-colors duration-500 ease-in-out shrink-0"
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "9999px",
								backgroundColor: circleColor,
								border: `2px solid ${circleColor}80`, // Hex 80 is equivalent to Compose copy(alpha = 0.5f)
							}}
						>
							{isCompleted ? (
								<Check
									size={20} // matches Modifier.size(20.dp)
									color="#FFFFFF"
									className="animate-in fade-in zoom-in duration-300"
								/>
							) : (
								<span className="text-white text-sm font-bold">
									{i + 1}
								</span>
							)}
						</div>
					);

					if (isHorizontal) {
						return (
							<div
								key={i}
								className={`flex flex-row items-center ${
									!isLast ? "flex-1" : ""
								}`}
							>
								<StepCircle />

								{/* Progress Line mapping for Horizontal */}
								{!isLast && (
									<div
										className="flex-1 overflow-hidden relative mx-1" // mapped to Modifier.padding(horizontal = 4.dp)
										style={{
											height: "4px",
											borderRadius: "9999px",
											backgroundColor: inactiveColor,
										}}
									>
										<div
											className="absolute top-0 bottom-0 left-0 transition-all duration-500 ease-in-out"
											style={{
												width: isCompleted
													? "100%"
													: "0%",
												backgroundColor: isCompleted
													? completedColor
													: activeColor,
												borderRadius: "9999px",
											}}
										/>
									</div>
								)}
							</div>
						);
					} else {
						// Vertical Layout
						return (
							<div
								key={i}
								className="flex flex-row pb-2 w-full" // mapped to Modifier.padding(bottom = 8.dp)
							>
								<div
									className="flex flex-col items-center shrink-0"
									style={{ width: "32px" }}
								>
									<StepCircle />

									{/* Progress Line mapping for Vertical */}
									{!isLast && (
										<div
											className="relative overflow-hidden my-1" // mapped to Modifier.padding(vertical = 4.dp)
											style={{
												width: "4px",
												height: "40px",
												borderRadius: "9999px",
												backgroundColor: inactiveColor,
											}}
										>
											<div
												className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
												style={{
													height: isCompleted
														? "100%"
														: "0%",
													backgroundColor: isCompleted
														? completedColor
														: activeColor,
													borderRadius: "9999px",
												}}
											/>
										</div>
									)}
								</div>

								{/* Vertical Text Label mapping */}
								<div className="flex flex-col pl-3 pt-1">
									<span
										className={`text-[16px] transition-colors duration-500 ease-in-out ${
											isActive
												? "font-bold"
												: "font-medium"
										}`}
										style={{
											color: isActive
												? activeColor
												: "#1f2937", // mapped to MaterialTheme.colorScheme.onSurface
										}}
									>
										{labels[i]}
									</span>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
