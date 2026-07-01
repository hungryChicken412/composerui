import fs from "fs";
import path from "path";
import DesignerPage from "./designerPage"; // Import your client component
import DesignerPageNotFound from "./designerPageNotFound";
import OnboardingDialogues from "../component/OnboardingDialogues";

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
			<OnboardingDialogues/>
			<DesignerPage key={itemID} initialData={initialComponent} />
		</>
	);
}
