"use client";

import {
	SlidersHorizontal,
	LayoutGrid,
	Layers,
	History,
	Folder,
	CircleHelp,
	Settings,
} from "lucide-react";
import { useState } from "react";
import React from "react";
import TextField from "../../Fields/TextField";
import SegmentedSelectField from "../../Fields/SegmentedSelectField";
import ColorSelectorField from "../../Fields/ColorSelectorField";
import DraggableField from "../../Fields/DraggableField";
import ToggleField from "../../Fields/ToggleField";
import IconField from "../../Fields/IconField";

const TOP_NAV_ITEMS = [
	{ icon: LayoutGrid, active: false },
	{ icon: SlidersHorizontal, active: true },
	{ icon: Layers, active: false },
	{ icon: History, active: false },
	{ icon: Folder, active: false },
];
// 1. Move the dictionary here so the sidebar knows how to render the strings
const COMPONENT_MAP: Record<string, React.ElementType> = {
	TextField: TextField,
	SegmentedSelectField: SegmentedSelectField,
	ColorField: ColorSelectorField, // Update these when you build them
	SliderField: DraggableField,
	ToggleField: ToggleField,
	IconField: IconField,
};

export default function SideMenuMain({
	menu,
	updateProperty,
}: {
	menu: any[];
	updateProperty: (id: string, value: string) => void;
}) {
	const [sidenavMenu, setsidenavMenu] = useState(0);

	return (
		<>
			<section className="w-80 bg-surface-container border-r border-outline-variant/20 flex flex-col h-full shrink-0 overflow-y-auto">
				<div className="p-md border-b border-outline-variant/10 sticky top-0 bg-surface-container/90 backdrop-blur z-10">
					<h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
						Modify Component
					</h2>
					<p className="font-label-xs text-label-xs text-on-surface-variant">
						Primary Edits
					</p>
				</div>
				<div className="p-md flex flex-col gap-lg">
					{menu.map((menuItem, idx) => {
						// 2. Look up the actual component function using the string
						const ComponentToRender =
							COMPONENT_MAP[menuItem.component];

						return (
							<div key={idx} className="space-y-sm">
								{/* 3. If it exists, render it normally like a standard JSX element! */}
								{ComponentToRender ? (
									<ComponentToRender
										id={menuItem.id}
										name={menuItem.name}
										defaultValue={menuItem.defaultValue}
										variants={menuItem.Options}
										onChange={updateProperty}
									/>
								) : (
									<div className="text-red-500 text-xs">
										Unknown component: {menuItem.component}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
}
