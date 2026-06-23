import Modal from "../../../component/Modal";
// We import the exact same page component used in the standard /browse route
import BrowsePageContent from "@/app/browse/browseContentModal";

export default async function InterceptedBrowsePage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; category?: string }>;
}) {
	return (
		<Modal>
			{/* We pass the searchParams directly to your existing BrowsePage.
        Note: You may want to hide the <Navbar/> inside your BrowsePage 
        if it looks weird double-rendering inside the modal. 
      */}
			<div className="relative overflow-hidden rounded-2xl">
				<BrowsePageContent searchParams={searchParams} />
			</div>
		</Modal>
	);
}
