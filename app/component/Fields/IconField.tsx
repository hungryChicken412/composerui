import React, { useState, useMemo, useRef, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Search, X, ChevronDown } from "lucide-react";

interface IconFieldProps {
	id: string;
	label: string;
	description?: string;
	value: string;
	onChange: (id: string, value: string) => void;
}

// A curated list of popular icons for the designer to choose from.
// You can expand this list with any valid Lucide icon name.
const POPULAR_ICONS = [
	"None",
	"Eye",
	"Code",
	"LayoutGrid",
	"Settings",
	"Download",
	"Home",
	"User",
	"Menu",
	"Search",
	"Bell",
	"Check",
	"ChevronRight",
	"ChevronDown",
	"ArrowRight",
	"Star",
	"Heart",
	"MessageCircle",
	"Phone",
	"Mail",
	"Camera",
	"Image",
	"Video",
	"Play",
	"Lock",
	"Unlock",
	"Shield",
	"Trash",
	"Edit",
	"Plus",
	"Minus",
];

export default function IconField({
	id,
	label,
	description,
	value,
	onChange,
}: IconFieldProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Filter icons based on search query
	const filteredIcons = useMemo(() => {
		return POPULAR_ICONS.filter((iconName) =>
			iconName.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery]);

	// Get the active icon component safely
	const [ActiveIcon, setActiveIcon] = useState<React.ElementType | null>(
		null,
	);

	const handleSelect = (iconName: string) => {
		onChange(id, iconName);
		setActiveIcon((LucideIcons as any)[iconName]);

		setIsOpen(false);
		setSearchQuery(""); // Reset search after selection
	};

	return (
		<div className="flex flex-col space-y-1.5 mb-4" ref={dropdownRef}>
			{/* Label & Description */}
			<label className="text-sm font-semibold text-gray-800 flex items-center justify-between">
				{label}
			</label>
			{description && (
				<p className="text-xs text-gray-500 leading-snug">
					{description}
				</p>
			)}

			{/* Custom Select Trigger */}
			<div className="relative mt-2">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:bg-gray-50"
				>
					<div className="flex items-center space-x-2">
						<div className="w-5 h-5 flex items-center justify-center text-gray-600">
							{ActiveIcon ? (
								<ActiveIcon size={16} />
							) : (
								<X size={16} />
							)}
						</div>
						<span className="text-gray-700 font-medium">
							Select Icon
						</span>
					</div>
					<ChevronDown size={16} className="text-gray-400" />
				</button>

				{/* Dropdown Menu */}
				{isOpen && (
					<div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
						{/* Search Bar */}
						<div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
							<div className="relative">
								<Search
									size={14}
									className="absolute left-2.5 top-2.5 text-gray-400"
								/>
								<input
									type="text"
									placeholder="Search icons..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
									autoFocus
								/>
							</div>
						</div>

						{/* Icon Grid */}
						<div className="max-h-60 overflow-y-auto p-2">
							{filteredIcons.length === 0 ? (
								<div className="p-3 text-center text-xs text-gray-500">
									No icons found.
								</div>
							) : (
								<div className="grid grid-cols-4 gap-1">
									{filteredIcons.map((iconName) => {
										const IconCmp =
											iconName !== "None"
												? (LucideIcons as any)[iconName]
												: null;

										const isSelected = value === iconName;

										return (
											<button
												key={iconName}
												onClick={() =>
													handleSelect(iconName)
												}
												title={iconName}
												className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
													isSelected
														? "bg-blue-50 text-blue-600 border border-blue-200"
														: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
												}`}
											>
												{IconCmp ? (
													<IconCmp size={20} />
												) : (
													<X
														size={20}
														className="text-red-400"
													/>
												)}
												{/* Optional: Show tiny text below icon, or keep it icon-only for a denser grid */}
												<span className="text-[10px] mt-1 truncate w-full text-center opacity-70">
													{iconName === "None"
														? "None"
														: iconName}
												</span>
											</button>
										);
									})}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
