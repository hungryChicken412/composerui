import fs from "fs";
import path from "path";
import DesignerPage from "./designerPage"; // Import your client component
import DesignerPageNotFound from "./designerPageNotFound";
import OnboardingDialogues from "../component/OnboardingDialogues";

export const metadata = {
	title: "Designer — ComposerUI",
	description: "Browse and preview Jetpack Compose components in ComposerUI.",
	openGraph: {
		title: "Designer — ComposerUI",
		description:
			"Browse and preview Jetpack Compose components in ComposerUI.",
		images: ["/og-image.jpg"],
	},
};
export default async function DesignerPag({
	searchParams,
}: {
	searchParams?: Promise<{ id?: string }>;
}) {
	const filePath = path.join(process.cwd(), "db.json");
	const searchParam = await searchParams;
	const itemID = searchParam?.id;
	const fileContents = fs.readFileSync(filePath, "utf8");
	const db = JSON.parse(fileContents);

	const initialComponent = db.components.find((c: any) => c.Id === itemID);

	if (!initialComponent) {
		return (
			<div>
				<DesignerPageNotFound />{" "}
			</div>
		);
	}

	return (
		<>
			<OnboardingDialogues />
			<DesignerPage key={itemID} initialData={initialComponent} />
		</>
	);
}
