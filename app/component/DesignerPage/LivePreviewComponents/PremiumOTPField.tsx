import React, { useState } from "react";

interface OtpInputFieldPreviewProps {
	defaultValues: any;
}

export default function OtpInputFieldPreview({
	defaultValues,
}: OtpInputFieldPreviewProps) {
	// Dynamically map styling values
	const otpCount = parseInt(defaultValues["{$OtpCount_01}"] ?? "6", 10);
	const shouldMask = defaultValues["{$MaskState_01}"] === "Masked";
	const boxWidth = defaultValues["{$BoxWidth_01}"] ?? 48;
	const boxHeight = defaultValues["{$BoxHeight_01}"] ?? 56;
	const cornerRadius = defaultValues["{$CornerRadius_01}"] ?? 12;
	const primaryColor = defaultValues["{$PrimaryColor_01}"] ?? "#6200EE";
	const containerColor = defaultValues["{$ContainerColor_01}"] ?? "#F3F4F6";

	const [otp, setOtp] = useState("");
	const [isInputFocused, setIsInputFocused] = useState(false);

	// Handle input change (allow only numbers and restrict to the exact count)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(/\D/g, ""); // Strip non-numeric
		if (val.length <= otpCount) {
			setOtp(val);
		}
	};

	return (
		<div className="flex w-full items-center justify-center p-8">
			{/* Relative wrapper holding both the invisible input and the visual boxes */}
			<div className="relative inline-block cursor-text">
				{/* Invisible native input (mimics Compose BasicTextField overlay) */}
				<input
					type="text"
					inputMode="numeric"
					autoComplete="one-time-code"
					value={otp}
					onChange={handleChange}
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setIsInputFocused(false)}
					className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text"
					aria-label="OTP input"
				/>

				{/* Foreground visual boxes mapped to Compose Row(spacedBy(8.dp)) */}
				<div className="flex gap-2 relative z-0 pointer-events-none">
					{Array.from({ length: otpCount }).map((_, index) => {
						// 1:1 match to Compose focus check: "val isFocused = text.length == index"
						const isBoxFocused =
							isInputFocused && otp.length === index;

						let char = "";
						if (index < otp.length) {
							char = shouldMask ? "•" : otp[index];
						}

						return (
							<div
								key={index}
								className="flex items-center justify-center transition-colors duration-300 ease-in-out box-border overflow-hidden"
								style={{
									width: `${boxWidth}px`,
									height: `${boxHeight}px`,
									borderRadius: `${cornerRadius}px`,
									backgroundColor: containerColor,
									border: isBoxFocused
										? `2px solid ${primaryColor}`
										: `0px solid transparent`,
								}}
							>
								{/* Equivalent to MaterialTheme.typography.headlineMedium */}
								<span
									className={`text-2xl font-bold transition-colors ${
										char === ""
											? "text-gray-400"
											: "text-gray-900"
									}`}
									style={{
										// Fix alignment for bullets vertically
										lineHeight:
											char === "•" ? "1" : "normal",
										transform:
											char === "•"
												? "translateY(2px)"
												: "none",
									}}
								>
									{char}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
