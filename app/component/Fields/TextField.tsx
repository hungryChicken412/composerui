"use client";

import {
	Signal,
	Wifi,
	BatteryFull,
	MessageSquare,
	SlidersHorizontal,
	ChevronDown,
	Menu,
	MousePointer2,
} from "lucide-react";

export default function TextField({
	id,
	name,
	onChange,
}: {
	id?: string;
	name?: string;
	onChange?: (id: string, value: string) => void;
}) {
	return (
		<>
			<label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider block">
				{name || "Text Field"}
			</label>
			<input
				type="text"
				id={id}
				onChange={(e) => onChange && onChange(id || "", e.target.value)}
				className="border border-gray-300 rounded px-2 py-1"
			/>
		</>
	);
}
