"use client";
import React, { useState, useEffect } from "react";

export default function PremiumTextField({
	defaultValues,
}: {
	defaultValues: any;
}) {
	// Standard Input State

	const label = defaultValues["{$LabelText_01}"];
	const variant = defaultValues["{$Variant_01}"];
	const adornment = defaultValues["{$Adornment_01}"];
	const themeColor = defaultValues["{$ThemeColor_01}"];
	const cornerRadius = defaultValues["{$CornerRadius_01}"];

	console.log(defaultValues);
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	// Internal Demo State for Errors & Shaking
	const [errorMessage, setErrorMessage] = useState("");
	const [isShaking, setIsShaking] = useState(false);

	const isFloating = isFocused || value.trim() !== "";
	const isError = errorMessage.trim() !== "";
	const inputType =
		adornment === "password" && !passwordVisible
			? "password"
			: adornment === "email"
				? "email"
				: "text";

	// Trigger shake animation when an error is generated
	useEffect(() => {
		if (errorMessage) {
			setIsShaking(true);
			const timer = setTimeout(() => setIsShaking(false), 250);
			return () => clearTimeout(timer);
		}
	}, [errorMessage]);

	// Demo toggle function
	const handleSimulateSubmit = () => {
		console.log("here");
		setErrorMessage((prev) => (prev === "" ? "Error Occured" : ""));
	};

	return (
		<div
			style={
				{
					"--theme": themeColor,
					"--radius": `${cornerRadius}px`,
				} as React.CSSProperties
			}
			className={`relative flex flex-col w-full group ${isShaking ? "animate-[shake_0.25s_ease-in-out]" : ""}`}
		>
			{/* Self-contained keyframes */}
			<style>{`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        20% { transform: translateX(15px); }
                        40% { transform: translateX(-15px); }
                        60% { transform: translateX(10px); }
                        80% { transform: translateX(-10px); }
                    }
                `}</style>

			<div
				className={`relative flex items-center min-h-[20px] h-[50px] rounded-[var(--radius)] transition-colors duration-200 box-border
                        ${variant === "soft" && !isFocused && !isError ? "" : ""}
                        ${variant === "filled" ? "bg-white/5" : ""}
                        ${variant === "outlined" ? "bg-transparent" : ""}
                    `}
				style={{
					backgroundColor:
						variant === "filled" ? themeColor : "transparent",
					borderColor: themeColor,
					borderWidth: variant === "soft" ? 0 : 1,
				}}
			>
				{/* Email Icon */}
				{adornment === "email" && (
					<div className="ml-4 w-5 h-5 text-neutral-400 flex items-center justify-center z-20">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
						</svg>
					</div>
				)}

				{/* Main Input */}
				<input
					type={inputType}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={`flex-1 min-h-[56px] py-3.5 bg-transparent outline-none text-white text-base z-10 w-full
                            ${adornment === "email" ? "pl-3" : "pl-4"}
                            ${adornment === "password" ? "pr-3" : "pr-4"}
                        `}
				/>

				{/* Floating Label */}
				<label
					className={`absolute text-base pointer-events-none origin-top-left transition-all duration-200 z-20
                            ${adornment === "email" ? "left-12" : "left-4"}
                            ${isFloating ? "-translate-y-6 scale-75" : "translate-y-0 scale-100"}
                            ${isError ? "text-red-500" : isFocused ? "text-[var(--theme)]" : "text-neutral-400"}
                        `}
				>
					{label}
				</label>

				{/* Fieldset Border Break */}
				<fieldset
					aria-hidden="true"
					className={`absolute inset-[-5px_0_0_0] m-0 px-2 pointer-events-none rounded-[var(--radius)] transition-all duration-200
                            ${(variant === "soft" || variant === "filled") && !isFocused && !isError ? "border-transparent" : "border border-white/20"}
                            ${isFocused && !isError ? "border-2 border-[var(--theme)]" : ""}
                            ${isError ? "border-2 border-red-500" : ""}
                        `}
				>
					<legend
						className={`block w-auto h-[11px] text-[12px] invisible whitespace-nowrap transition-[max-width] duration-200 p-0
                                ${adornment === "email" ? "ml-8" : ""}
                                ${isFloating ? "max-w-full px-1" : "max-w-[0.01px]"}
                            `}
					>
						<span>{label}</span>
					</legend>
				</fieldset>

				{/* Password Toggle Button */}
				{adornment === "password" && (
					<button
						type="button"
						onClick={() => setPasswordVisible(!passwordVisible)}
						className="mr-3 p-1 bg-transparent border-none cursor-pointer text-neutral-400 hover:text-white transition-colors z-20"
					>
						<svg
							viewBox="0 0 24 24"
							className="w-5 h-5"
							fill="currentColor"
						>
							{passwordVisible ? (
								<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
							) : (
								<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
							)}
						</svg>
					</button>
				)}
			</div>

			{/* Error Message */}
			<div
				className={`text-red-500 text-xs pl-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isError ? "h-4 opacity-100" : "h-0 opacity-0"}`}
			>
				{errorMessage}
			</div>

			<button
				className="w-full cursor-pointer bg-[#6200EE] hover:bg-[#5000c9] text-white font-medium py-3.5 rounded-lg transition-colors"
				onClick={handleSimulateSubmit}
			>
				{errorMessage ? "Clear Error" : "Trigger Error Demo"}
			</button>
		</div>
	);
}
