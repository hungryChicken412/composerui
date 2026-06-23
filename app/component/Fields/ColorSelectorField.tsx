"use client";

import { useState } from "react";

export default function ColorSelectorField({
	id = "color-field", // Added a fallback ID
	name,
	variants = [],
	onChange,
}: {
	id?: string;
	name?: string;
	variants?: string[];
	onChange?: (id: string, value: string) => void;
}) {
	// 1. Add state to track the currently selected color
	const [activeColor, setActiveColor] = useState(variants[0] || "");

	// 2. Create a handler to update state and fire the prop function
	const handleColorChange = (color: string) => {
		setActiveColor(color);
		if (onChange) {
			onChange(id, color);
		}
	};

	return (
		<div className="space-y-sm">
			<label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider block">
				{name || "Theme Color"}
			</label>
			<div className="flex gap-md">
				{variants.map((color) => (
					<button
						// 3. Use the color string as the key (better practice than array index)
						key={color}
						style={{ backgroundColor: color }}
						// 4. Attach the onClick event to catch the value
						onClick={() => handleColorChange(color)}
						className={`w-8 h-8 rounded-full transition-transform ${
							// 5. Compare against the state instead of idx === 0
							activeColor === color
								? "ring-2 ring-offset-2 ring-offset-surface-container ring-primary scale-110"
								: "hover:scale-110"
						}`}
					></button>
				))}
			</div>
		</div>
	);
}
