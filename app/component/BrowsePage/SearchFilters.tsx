// app/browse/SearchControls.tsx
"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchFilters({
	categories,
	initialQuery,
	initialCategory,
}: {
	categories: string[];
	initialQuery: string;
	initialCategory: string;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentQuery = searchParams.get("q") || "";
	const currentCategory = searchParams.get("category") || "All Components";
	const [localQuery, setLocalQuery] = useState(currentQuery);
	const debounceTime = 200;

	const updateUrl = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value && value !== "All Components" && value !== "") {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		// Updates the URL without triggering a full page reload
		router.replace(`?${params.toString()}`, { scroll: false });
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			// Only update URL if the local query is different from what's already in the URL
			if (localQuery !== currentQuery) {
				updateUrl("q", localQuery);
			}
		}, debounceTime);

		// Cleanup function: If the user types another letter before 300ms, cancel the previous timer!
		return () => clearTimeout(timeoutId);
	}, [localQuery, currentQuery]); // Run this effect whenever the user types

	return (
		<>
			<div className="w-full max-w-2xl mt-4 relative search-focus glass-card rounded-full flex items-center px-6 py-4 transition-all duration-300">
				<span className="material-symbols-outlined text-outline mr-4">
					<SearchIcon />
				</span>
				<input
					className="bg-transparent border-none text-on-surface placeholder-outline font-body-md text-body-md w-full focus:outline-none focus:ring-0 p-0"
					placeholder="Search components (e.g. 'Button', 'Card')..."
					type="text"
					defaultValue={initialQuery}
					onChange={(e) => setLocalQuery(e.target.value)}
				/>
				<button className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-1.5 rounded-full font-label-xs text-label-xs transition-colors border border-outline-variant/50 ml-2">
					Cmd + K
				</button>
			</div>

			<div className="flex flex-wrap justify-center gap-3 mt-6">
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => updateUrl("category", category)}
						className={`px-4 py-2 rounded-full font-label-xs text-label-xs transition-colors ${
							// 4. Compare against the LIVE URL state, not the server prop!
							currentCategory === category
								? "bg-primary/20 border border-primary/50 text-primary"
								: "glass-card hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</>
	);
}
