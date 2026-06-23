"use client";

import { useState, useEffect, SetStateAction, useRef } from "react";
import {
	LayoutGrid,
	SlidersHorizontal,
	Layers,
	File,
	History,
	Folder,
	Menu,
} from "lucide-react";
import TextField from "../component/Fields/TextField";
import LivePreview from "../component/DesignerPage/livePreview";
import CodePreview from "../component/DesignerPage/codePreview";
import SideNav from "../component/DesignerPage/SideNavMenu/sideNav";
import PremiumTextField from "../component/DesignerPage/LivePreviewComponents/PremiumTextField";
import React from "react";
import SegmentedSelectField from "../component/Fields/SegmentedSelectField";
import TopMenu from "../component/DesignerPage/TopMenu";

const TOP_NAV_ITEMS = [
	{ icon: LayoutGrid, active: false },
	{ icon: SlidersHorizontal, active: true },
	{ icon: Layers, active: false },
	{ icon: History, active: false },
	{ icon: Folder, active: false },
];
const componentDictionary: Record<string, React.ReactNode> = {
	TextField: <TextField />,
	SegmentedSelectField: <SegmentedSelectField />,
	ColorField: <TextField />,
	SliderField: <TextField />,
};

const files = {
	name: "MainActivity.kt",
	content: "Your Code Here",
};
function toggleModal() {
	//
}

export default function DesignerPageNotFound() {
	return (
		<>
			<TopMenu />
			<div
				className="flex w-full h-[calc(100vh-60px)] overflow-hidden opacity-40"
				style={{
					backgroundImage:
						"radial-gradient(circle at 50% 50%, rgb(128 131 255 / 8%) 0%, transparent 50%)",
					pointerEvents: "none",
				}}
			>
				<main className="flex-1 flex w-full overflow-hidden ">
					<SideNav
						menu={[]}
						updateProperty={() => {}}
						toggleModal={toggleModal}
					/>

					<LivePreview>
						<div> No Element Found </div>
					</LivePreview>
					<CodePreview kotlinFiles={[files]} />
				</main>
			</div>{" "}
		</>
	);
}
