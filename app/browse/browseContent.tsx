import SearchFilters from "../component/BrowsePage/SearchFilters";

import InbuiltElementsList from "../component/BrowsePage/InbuiltElements";

const MOCK_COMPONENTS = [
	{
		id: "209",
		name: "Premium Text Field",
		category: "Inputs",
		imageUrl: "/images/video/text.webm",
		description:
			"An advanced text field with floating label, adornments, and error animations.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "211",
		name: "Morphing Button",
		category: "Buttons",
		imageUrl: "/images/video/morphingbutton.webm",
		description:
			"An animated button that morphs its shape, color, and content across Idle, Loading, and Success states.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "212",
		name: "Skeleton Shimmer",
		category: "Loading",
		imageUrl: "/images/video/skeletonshimmer.webm",
		description:
			"A sweeping animated gradient placeholder used to indicate content is loading.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "213",
		name: "Premium Switch",
		category: "Toggles",
		imageUrl: "/images/video/toggle.webm",
		description:
			"An animated premium switch with integrated icons for states like dark/light mode.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "214",
		name: "Premium Accordion",
		category: "Data Display",
		imageUrl: "/images/video/premiumaccordian.webm",
		description:
			"An animated, customizable accordion component that smoothly expands and collapses its content.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "215",
		name: "Segmented Control",
		category: "Toggles",
		imageUrl: "/images/video/segmenteddisplay.webm",
		description:
			"An iOS-style segmented control that smoothly slides an active indicator between options.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "216",
		name: "Premium Animated Steps",
		category: "Navigation",
		imageUrl: "/images/video/progress.webm",
		description:
			"An animated progress tracker supporting both horizontal and vertical orientations.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "217",
		name: "Animated OTP Input",
		category: "Inputs",
		imageUrl: "/images/video/otp.webm",
		description:
			"An animated OTP/PIN input field with dynamic focus borders and secure masking capabilities.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
];

const CATEGORIES = [
	"All Components",
	"Inputs",
	"Buttons",
	"Loading",
	"Toggles",
	"Data Display",
	"Navigation",
];

export default async function BrowsePageContent({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; category?: string }>;
}) {
	const resolveParams = await searchParams;
	const searchQuery = resolveParams.q || "";
	const selectedCategory = resolveParams.category || "All Components";

	const filteredComponents = MOCK_COMPONENTS.filter((comp) => {
		const matchesSearch =
			comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			comp.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === "All Components" ||
			comp.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	{
		/* const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All Components");

	const filteredComponents = useMemo(() => {
		return MOCK_COMPONENTS.filter((comp) => {
			const matchesSearch =
				comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				comp.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === "All Components" ||
				comp.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategory]); */
	}

	return (
		<>
			<main className="flex-grow max-w-container-max mx-auto w-full px-6 py-12 flex flex-col gap-12">
				<section className="flex flex-col items-center text-center gap-6 mt-2xl">
					<h1
						style={{ fontWeight: "lighter" }}
						className="font-display-lg text-display-lg  text-on-surface tracking-tighter"
					>
						Explore the Library
					</h1>
					<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
						Discover pre-built, high-performance Jetpack Compose
						components designed for modern technical interfaces.
					</p>
					{/* <div className="w-full max-w-2xl mt-4 relative search-focus glass-card rounded-full flex items-center px-6 py-4 transition-all duration-300">
					<span className="material-symbols-outlined text-outline mr-4">
						{" "}
						<SearchIcon />{" "}
					</span>
					<input
						className="bg-transparent border-none text-on-surface hero-outline font-body-md text-body-md w-full focus:outline-none focus:ring-0 p-0"
						hero="Search components (e.g. 'Button', 'Card')..."
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-1.5 rounded-full font-label-xs text-label-xs transition-colors border border-outline-variant/50 ml-2">
						Cmd + K
					</button>
				</div><div className="w-full max-w-2xl mt-4 relative search-focus glass-card rounded-full flex items-center px-6 py-4 transition-all duration-300">
					<span className="material-symbols-outlined text-outline mr-4">
						{" "}
						<SearchIcon />{" "}
					</span>
					<input
						className="bg-transparent border-none text-on-surface hero-outline font-body-md text-body-md w-full focus:outline-none focus:ring-0 p-0"
						hero="Search components (e.g. 'Button', 'Card')..."
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-1.5 rounded-full font-label-xs text-label-xs transition-colors border border-outline-variant/50 ml-2">
						Cmd + K
					</button>
				</div><div className="flex flex-wrap justify-center gap-3 mt-6">
					{CATEGORIES.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-full font-label-xs text-label-xs transition-colors ${
								selectedCategory === category
									? "bg-primary/20 border border-primary/50 text-primary"
									: "glass-card hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
							}`}
						>
							{category}
						</button>
					))}
				</div> */}
					<SearchFilters
						categories={CATEGORIES}
						initialCategory={CATEGORIES[0]}
						initialQuery={""}
					/>
				</section>

				<hr style={{ borderColor: "rgb(255,255,255, 0.2)" }} />

				{/* Search results in a bento grid */}
				<InbuiltElementsList filteredComponents={filteredComponents} />
				{/* End of search results bento grid */}
			</main>
		</>
	);
}
