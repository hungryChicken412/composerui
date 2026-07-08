import Navbar from "../component/navbar";
import BrowsePage from "./browseContent";
export const metadata = {
	title: "Composer UI | Browse Components ",
	description:
		"This library contains a set of premium hand picked components for Jetpack Compose",
	openGraph: { images: ["/og-image.svg"] },
};

export default async function BrowsePageIndex({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; category?: string }>;
}) {
	return (
		<>
			<Navbar />
			<BrowsePage searchParams={searchParams} />
		</>
	);
}
