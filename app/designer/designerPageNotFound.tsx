"use client";

import LivePreview from "../component/DesignerPage/livePreview";
import CodePreview from "../component/DesignerPage/codePreview";
import SideNav from "../component/DesignerPage/SideNavMenu/sideNav";

import TopMenu from "../component/DesignerPage/TopMenu";

const files = {
	name: "MainActivity.kt",
	content: "Your Code Here",
};
function toggleModal() {
	//
}

export default function DesignerPageNotFound() {
	return (
		<>
			<TopMenu />
			<div
				className="flex w-full h-[calc(100vh-60px)] overflow-hidden opacity-40"
				style={{
					backgroundImage:
						"radial-gradient(circle at 50% 50%, rgb(128 131 255 / 8%) 0%, transparent 50%)",
					pointerEvents: "none",
				}}
			>
				<main className="flex-1 flex w-full overflow-hidden ">
					<SideNav
						menu={[]}
						updateProperty={() => {}}
						toggleModal={toggleModal}
					/>

					<LivePreview>
						<div> No Element Found </div>
					</LivePreview>
					<CodePreview kotlinFiles={[files]} />
				</main>
			</div>{" "}
		</>
	);
}
