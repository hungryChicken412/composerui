import fs from "fs";
import path from "path";
import DesignerPage from "./designerPage"; // Import your client component
import DesignerPageNotFound from "./designerPageNotFound";
import OnboardingDialogues from "../component/OnboardingDialogues";
import type { Metadata } from "next";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: { id?: string } | URLSearchParams;
}): Promise<Metadata> {
	// attempt to read db.json and provide contextual metadata when available
	try {
		const filePath = path.join(process.cwd(), "db.json");
		const fileContents = fs.readFileSync(filePath, "utf8");
		const db = JSON.parse(fileContents);
		const id = (searchParams as any)?.id;
		const item = db.components.find((c: any) => c.Id === id);
		if (item) {
			const title = `${item.Name || "Component"} — ComposerUI`;
			const description =
				item.Description ||
				`Implementation and preview for ${item.Name || "component"}.`;
			return {
				title,
				description,
				openGraph: {
					title,
					description,
					url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://composerui.com"}/designer?id=${id}`,
					images: ["/og-image.svg"],
				},
			};
		}
	} catch (e) {
		// ignore and fall back to default metadata
	}
	return {
		title: "Designer — ComposerUI",
		description:
			"Browse and preview Jetpack Compose components in ComposerUI.",
		openGraph: {
			title: "Designer — ComposerUI",
			description:
				"Browse and preview Jetpack Compose components in ComposerUI.",
			images: ["/og-image.svg"],
		},
	};
}

export default async function DesignerPag({
	searchParams,
}: {
	searchParams?: Promise<{ id?: string }>;
}) {
	// 1. Define the path to your db.json (assuming it's in the root of your project)
	const filePath = path.join(process.cwd(), "db.json");
	const searchParam = await searchParams;
	const itemID = searchParam?.id;

	// 2. Read the file synchronously on the server
	const fileContents = fs.readFileSync(filePath, "utf8");
	const db = JSON.parse(fileContents);

	// 3. Find the specific component you want to load (e.g., ID "209")
	const initialComponent = db.components.find((c: any) => c.Id === itemID);

	// If no component is found, you could return a 404 or an error state here
	if (!initialComponent) {
		return (
			<div>
				{" "}
				<DesignerPageNotFound />{" "}
			</div>
		);
	}

	// 4. Pass the fetched data directly into your interactive client component
	return (
		<>
			<OnboardingDialogues />
			<DesignerPage key={itemID} initialData={initialComponent} />
		</>
	);
}
