// components/ShortcutProvider.tsx
"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";

export default function GlobalHotkeys({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);

	useHotkeys("mod+k", (e) => {
		e.preventDefault(); // Prevents the default browser search bar from opening
		setIsSearchOpen((prev) => !prev);
	});

	useHotkeys("mod+/", (e) => {
		e.preventDefault();
		setIsHelpOpen((prev) => !prev);
	});

	// --- 2. Single Keys ---
	useHotkeys("esc", () => {
		setIsSearchOpen(false);
		setIsHelpOpen(false);
	});

	// --- 3. Sequences (Vim-style) ---
	// The user must press 'g' then 'h' within a 1-second window (default timeout)
	useHotkeys("g>h", () => router.push("/"));
	useHotkeys("g>p", () => router.push("/profile"));
	useHotkeys("g>s", () => router.push("/settings"));

	// Note: By default, react-hotkeys-hook ignores all of these shortcuts
	// if the user is currently typing inside an <input>, <textarea>, or <select>.

	return (
		<>
			{/* Render your Command Palette or Help Modals here globally, 
        so they can overlay the rest of your app.
      */}
			{isSearchOpen && (
				<div className="absolute inset-0 z-50">Search UI...</div>
			)}
			{isHelpOpen && (
				<div className="absolute inset-0 z-50">Help UI...</div>
			)}

			{children}
		</>
	);
}
