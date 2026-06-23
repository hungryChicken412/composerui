import { ArrowRight, Loader2, Code } from "lucide-react";
import SearchFilters from "../component/BrowsePage/SearchFilters";
import Link from "next/link";
import Image from "next/image";
import { blurhashToBase64 } from "blurhash-base64";
import InbuiltElementsList from "../component/BrowsePage/InbuiltElements";
import Navbar from "../component/navbar";
import BrowsePage from "./browseContent";

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
