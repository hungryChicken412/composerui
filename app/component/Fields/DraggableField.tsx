"use client";
import { useState } from "react";

export default function DraggableField({
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
	const [radius, setRadius] = useState(0);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(24);

	// Passed the event directly to handleChange for cleaner typing
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		// Debugging: Check your browser console to ensure this fires!
		console.log("Slider moved to:", newValue);

		setRadius(Number(newValue));

		if (onChange) {
			onChange(id || "", newValue);
		}
	};

	const ChangeRangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMax(Number(e.target.value));
	};

	const ChangeRangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMin(Number(e.target.value));
	};

	return (
		<div className="space-y-sm">
			<div className="flex justify-between items-center">
				<label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
					{name}
				</label>
				<span className="font-code-sm text-code-sm text-primary">
					{radius}
				</span>
			</div>
			<input
				className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
				max={max}
				min={min}
				onChange={handleChange}
				type="range"
				value={
					radius
				} /* <-- THE FIX: Changed from defaultValue="0" to value={radius} */
			/>
			<div className="flex justify-around items-center">
				<input
					className="w-full h-8 font-code-sm text-code-sm text-primary  "
					type="number"
					defaultValue="0"
					onChange={ChangeRangeMin}
				/>
				<input
					className="w-full h-8 text-end font-code-sm text-code-sm text-primary  "
					type="number"
					defaultValue="24"
					onChange={ChangeRangeMax}
				/>
			</div>
		</div>
	);
}
