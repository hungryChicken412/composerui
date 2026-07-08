import SearchFilters from "../component/BrowsePage/SearchFilters";

import InbuiltElementsList from "../component/BrowsePage/InbuiltElements";
const MOCK_COMPONENTS = [
	{
		id: "209",
		name: "Premium Text Field",
		category: "Inputs",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505296/text_rnxffj.webm",
		description:
			"An advanced text field with floating label, adornments, and error animations.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "211",
		name: "Morphing Button",
		category: "Buttons",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505295/morphingbutton_mnezly.webm",
		description:
			"An animated button that morphs its shape, color, and content across Idle, Loading, and Success states.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "212",
		name: "Skeleton Shimmer",
		category: "Loading",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505296/skeletonshimmer_pqwuxm.webm",
		description:
			"A sweeping animated gradient placeholder used to indicate content is loading.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "213",
		name: "Premium Switch",
		category: "Toggles",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505297/toggle_qgu6zg.webm",
		description:
			"An animated premium switch with integrated icons for states like dark/light mode.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "214",
		name: "Premium Accordion",
		category: "Data Display",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505295/premiumaccordian_ucy5zq.webm",
		description:
			"An animated, customizable accordion component that smoothly expands and collapses its content.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "215",
		name: "Segmented Control",
		category: "Toggles",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505297/segmenteddisplay_pijtym.webm",
		description:
			"An iOS-style segmented control that smoothly slides an active indicator between options.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "216",
		name: "Premium Animated Steps",
		category: "Navigation",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505295/progress_v6vlz7.webm",
		description:
			"An animated progress tracker supporting both horizontal and vertical orientations.",
		blurHash: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
	},
	{
		id: "217",
		name: "Animated OTP Input",
		category: "Inputs",
		imageUrl:
			"https://res.cloudinary.com/asi9l8oy/video/upload/v1783505296/otp_kobirx.webm",
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

export default async function browseContentModal({
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
		console.log(comp.imageUrl);
		return matchesSearch && matchesCategory;
	});

	return (
		<>
			<main className="flex-grow max-w-container-max mx-auto w-full px-6 py-12 flex flex-col gap-12">
				<section className="flex flex-col items-center text-center gap-6 mt-2xl">
					<h1
						style={{ fontWeight: "lighter" }}
						className="font-display-lg text-display-lg  text-on-surface tracking-tighter"
					>
						Explore the Library DesignerVersion
					</h1>
					<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
						Discover pre-built, high-performance Jetpack Compose
						components designed for modern technical interfaces.
					</p>

					<SearchFilters
						categories={CATEGORIES}
						initialCategory={CATEGORIES[0]}
						initialQuery={""}
					/>
				</section>

				<hr style={{ borderColor: "rgb(255,255,255, 0.2)" }} />

				<InbuiltElementsList filteredComponents={filteredComponents} />
			</main>
		</>
	);
}
