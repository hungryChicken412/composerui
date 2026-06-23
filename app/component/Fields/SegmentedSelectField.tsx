"use client";

import { useState } from "react";

export default function SegmentedSelectField({
	id = "segmented-field", // Added a fallback id
	name,
	variants = [],
	onChange,
}: {
	id?: string;
	name?: string;
	variants?: string[];
	onChange?: (id: string, value: string) => void;
}) {
	// 1. Add state to track the currently selected variant (defaults to the first item)
	const [activeVariant, setActiveVariant] = useState(variants[0] || "");

	// 2. Simplify the handler to accept the clicked variant string
	function updateSegment(variant: string) {
		// Update the UI state
		setActiveVariant(variant);

		// Safely call the prop function with correct casing and arguments
		if (onChange) {
			onChange(id, variant);
		}
	}

	return (
		<div className="space-y-sm">
			<label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider block">
				{name || "Segmented Select Field"}
			</label>
			<div className="flex justify-start w-full border border-primary rounded-sm">
				{variants.map((variant) => (
					<button
						key={variant}
						// 3. Wrap the handler in an arrow function to pass the string, NOT the event object
						onClick={() => updateSegment(variant)}
						className={`px-3 py-2 w-full font-body-md text-body-md transition-colors text-center text-sm cursor-pointer ${
							// 4. Compare against the active state instead of idx === 0
							activeVariant === variant
								? "bg-surface-variant rounded-sm border-primary text-primary hover:bg-surface-bright"
								: "bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-variant"
						}`}
					>
						{variant}
					</button>
				))}
			</div>
		</div>
	);
}
