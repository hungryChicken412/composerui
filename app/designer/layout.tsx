// app/dashboard/layout.tsx
import React from "react";

export default function DashboardLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<div className="">
			{/* Main viewport area where nested pages render */}
			{children}
			{modal}
		</div>
	);
}
