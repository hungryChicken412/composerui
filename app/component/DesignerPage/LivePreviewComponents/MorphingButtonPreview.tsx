import React from "react";
import { Check, Loader2 } from "lucide-react";

interface MorphingButtonProps {
	text?: string;
	buttonState?: "Idle" | "Loading" | "Success";
	backgroundColor?: string;
	successColor?: string;
	cornerRadiusIdle?: number;
	cornerRadiusResolved?: number;
	widthIdle?: number;
	widthResolved?: number;
	height?: number;
}

export default function MorphingButtonPreview({
	defaultValues,
}: {
	defaultValues: any;
}) {
	const text = defaultValues["{$Text_01}"];
	const buttonState = defaultValues["{$State_01}"];
	const backgroundColor = defaultValues["{$BgColor_01}"];
	const successColor = defaultValues["{$SuccessColor_01}"];
	const cornerRadiusIdle = defaultValues["{$RadiusIdle_01}"];
	const cornerRadiusResolved = defaultValues["{$RadiusResolved_01}"];
	const widthIdle = defaultValues["{$WidthIdle_01}"];
	const widthResolved = defaultValues["{$WidthResolved_01}"];
	const height = defaultValues["{$Height_01}"];

	const isIdle = buttonState === "Idle";
	const isSuccess = buttonState === "Success";
	const isLoading = buttonState === "Loading";

	// Calculate dynamic targets based on state
	const currentWidth = isIdle ? widthIdle : widthResolved;
	const currentRadius = isIdle ? cornerRadiusIdle : cornerRadiusResolved;
	const currentColor = isSuccess ? successColor : backgroundColor;

	return (
		<div className="flex w-full items-center justify-center p-8">
			<button
				className="relative flex items-center justify-center overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-500 shadow-md"
				style={{
					width: `${currentWidth}px`,
					height: `${height}px`,
					borderRadius: `${currentRadius}px`,
					backgroundColor: currentColor,
					cursor: isIdle ? "pointer" : "default",
				}}
				disabled={!isIdle}
			>
				<div className="absolute inset-0 flex items-center justify-center">
					{/* Idle State Text */}
					<span
						className={`text-white font-medium whitespace-nowrap transition-all duration-300 absolute ${
							isIdle
								? "opacity-100 scale-100"
								: "opacity-0 scale-90"
						}`}
					>
						{text}
					</span>

					{/* Loading State Spinner */}
					<Loader2
						className={`w-6 h-6 text-white animate-spin transition-all duration-300 absolute ${
							isLoading
								? "opacity-100 scale-100"
								: "opacity-0 scale-50"
						}`}
					/>

					{/* Success State Icon */}
					<Check
						className={`w-6 h-6 text-white transition-all duration-300 absolute ${
							isSuccess
								? "opacity-100 scale-100"
								: "opacity-0 scale-50"
						}`}
					/>
				</div>
			</button>
		</div>
	);
}
