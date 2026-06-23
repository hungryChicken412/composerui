"use client";
import { useState } from "react";

export default function ColorSelectorField({
	id,
	name,
	variants,
	onChange,
}: {
	id?: string;
	name?: string;
	variants?: string[];
	onChange?: (id: string, value: string) => void;
}) {
	// State to track the currently selected effect. Null means none are selected.
	const [activeEffect, setActiveEffect] = useState(null);

	const effects = variants || [];

	const handleToggle = (effectName: any) => {
		// If the clicked effect is already active, turn it off. Otherwise, turn it on.
		if (activeEffect === effectName) {
			setActiveEffect(null);
		} else {
			setActiveEffect(effectName);
		}
	};

	return (
		<div className="space-y-md pt-sm border-t border-outline-variant/10">
			{effects.map((effectName) => {
				const isActive = activeEffect === effectName;
				// Disable this button if another effect is currently active
				const isDisabled =
					activeEffect !== null && activeEffect !== effectName;

				return (
					<div
						key={effectName}
						className={`flex items-center justify-between transition-opacity ${isDisabled ? "opacity-50" : "opacity-100"}`}
					>
						<span className="font-body-md text-body-md text-on-surface text-sm">
							{effectName}
						</span>
						<button
							onClick={() => handleToggle(effectName)}
							disabled={isDisabled}
							aria-pressed={isActive}
							className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container 
                                ${isActive ? "bg-primary" : "bg-surface-variant"} 
                                ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                            `}
						>
							<span
								className={`absolute top-1 w-4 h-4 rounded-full transition-transform 
                                    ${isActive ? "right-1 bg-surface-container-lowest" : "left-1 bg-outline"}
                                `}
							></span>
						</button>
					</div>
				);
			})}
		</div>
	);
}
