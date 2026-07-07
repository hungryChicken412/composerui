"use client";

import {
	SlidersHorizontal,
	Layers,
	History,
	Folder,
	CircleHelp,
	Settings,
} from "lucide-react";
import { useState } from "react";
import React from "react";

import SideMenuMain from "./SideMenuMain";
import { useHotkeys } from "react-hotkeys-hook";

const TOP_NAV_ITEMS = [
	{ icon: SlidersHorizontal, active: true, id: 1 },
	/*{ icon: Layers, active: false, id: 2 },
	{ icon: History, active: false, id: 3 },
	{ icon: Folder, active: false, id: 4 }, */
];

function SideNav({
	menu,
	updateProperty,
	toggleModal,
}: {
	menu: any[];
	updateProperty: (id: string, value: string) => void;
	toggleModal: () => void;
}) {
	const [sidenavMenu, setsidenavMenu] = useState(1);

	useHotkeys("mod+M", (e) => {
		e.preventDefault();
		if (sidenavMenu == 1) {
			setsidenavMenu(9);
		} else {
			setsidenavMenu(1);
		}
		console.log(sidenavMenu);
		
	});


	function toggleMenu(id: number) {
		if (sidenavMenu == id) {
			setsidenavMenu(0);
		} else {
			setsidenavMenu(id);
		}
	}

	return (
		<>
			<nav className="bg-surface-container-lowest  w-20 py-lg border-r border-outline-variant/10 z-40 shrink-0 flex flex-col justify-between">
				<div className="flex-1 flex flex-col items-center gap-sm mt-4">
					{TOP_NAV_ITEMS.map((item, idx) => (
						<button
							key={idx}
							className={
								item.id == sidenavMenu
									? "flex flex-col items-center cursor-pointer justify-center bg-primary-container text-on-primary-container rounded-xl w-12 h-12 mb-4 active:scale-90 duration-150 shadow-lg shadow-primary/20"
									: "flex flex-col items-center justify-center cursor-pointer text-on-surface-variant w-12 h-12 mb-4 hover:bg-surface-variant rounded-xl transition-all active:scale-90 duration-150 group"
							}
							onClick={() => toggleMenu(item.id)}
						>
							<item.icon
								className={
									item.id == sidenavMenu
										? "group-hover:text-primary transition-colors"
										: ""
								}
							/>
						</button>
					))}
				</div>
				<div className="flex flex-col items-center gap-sm mt-auto mb-4">
					<button
						onClick={toggleModal}
						className="flex flex-col items-center justify-center cursor-pointer text-on-surface-variant w-12 h-12 hover:bg-surface-variant rounded-xl transition-all active:scale-90 duration-150 group"
					>
						<CircleHelp className="group-hover:text-primary transition-colors" />
					</button>
				</div>
			</nav>

			<div
				style={{
					display: sidenavMenu === 1 ? "block" : "none",
				}}
			>
				<SideMenuMain menu={menu} updateProperty={updateProperty} />
			</div>
		</>
	);
}

export default React.memo(SideNav);
