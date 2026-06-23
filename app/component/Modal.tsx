"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();

	// FIX: If the URL changes away from /browse (e.g., to /designer),
	// force the modal to instantly unmount.
	if (pathname !== "/browse") {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
			onClick={() => router.back()}
		>
			<div
				// Stop clicks inside the modal from closing it
				onClick={(e) => e.stopPropagation()}
				className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
			>
				<button
					onClick={() => router.back()}
					className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors z-50"
				>
					✕
				</button>
				{children}
			</div>
		</div>
	);
}
