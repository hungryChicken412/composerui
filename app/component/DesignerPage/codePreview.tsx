"use client";

import { Code, Copy, GripVertical } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";

function CodePreview({
	kotlinFiles,
}: {
	kotlinFiles: { name: string; content: string }[];
}) {
	function copyCodeToClipboard() {
		const codeToCopy = kotlinFiles[currentlyShowingFile]?.content || "";
		navigator.clipboard.writeText(codeToCopy).then(
			() => {
				console.log("Code copied to clipboard successfully!");
			},
			(err) => {
				console.error("Failed to copy code: ", err);
			},
		);
	}

	const [currentlyShowingFile, setCurrentlyShowingFile] = useState(0);

	const containerRef = useRef<HTMLElement>(null);
	const [isResizing, setIsResizing] = useState(false);
	const widthRef = useRef(384); // 384px is equivalent to your old 'w-96' class

	const startResizing = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		setIsResizing(true);
	}, []);

	const stopResizing = useCallback(() => {
		setIsResizing(false);
	}, []);

	const resize = useCallback(
		(e: MouseEvent) => {
			if (!isResizing || !containerRef.current) return;

			// Because the panel is on the far right, the width is simply the window width minus the mouse X position.
			let newWidth = window.innerWidth - e.clientX;

			// Clamp the width so they can't shrink it to nothing or cover the whole screen
			if (newWidth < 250) newWidth = 250;
			if (newWidth > 800) newWidth = 800;

			// Update the ref to store the value, and mutate the DOM directly!
			widthRef.current = newWidth;
			containerRef.current.style.width = `${newWidth}px`;
		},
		[isResizing],
	);

	// Attach window events ONLY when dragging starts
	useEffect(() => {
		if (isResizing) {
			window.addEventListener("mousemove", resize);
			window.addEventListener("mouseup", stopResizing);
			// Optional: Prevent text selection while dragging
			document.body.style.userSelect = "none";
		} else {
			window.removeEventListener("mousemove", resize);
			window.removeEventListener("mouseup", stopResizing);
			document.body.style.userSelect = "auto";
		}

		return () => {
			window.removeEventListener("mousemove", resize);
			window.removeEventListener("mouseup", stopResizing);
			document.body.style.userSelect = "auto";
		};
	}, [isResizing, resize, stopResizing]);

	return (
		<>
			<section
				ref={containerRef}
				style={{ width: `${widthRef.current}px` }}
				className="relative bg-surface-container-lowest border-l border-outline-variant/20 flex flex-col shrink-0 h-full overflow-hidden"
			>
				<div
					onMouseDown={startResizing}
					className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-primary/20 z-50 flex items-center justify-center transition-colors group/handle"
				>
					{/* A subtle grip icon that appears when hovering the edge */}
					<GripVertical
						size={12}
						className="text-outline opacity-0 group-hover/handle:opacity-100 transition-opacity"
					/>{" "}
				</div>
				<div className="p-md border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
					<div className="flex items-center gap-2">
						<Code size={18} className="text-primary" />
						<h2 className="font-label-xs text-label-xs text-on-surface uppercase tracking-wider">
							Implementation
						</h2>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto bg-[#0a0a0c] font-code-sm text-code-sm leading-relaxed">
					<div className=" flex justify-between items-center bg-surface-container-low py-0">
						<div className="flex w-full  bg-[#1a191b] h-[40px]">
							{kotlinFiles.map((file, idx) => (
								<button
									className={
										"w-max-content flex items-start justify-start p-2 mr-2 text-sm font-medium text-on-surface  hover:bg-gray-700 cursor-pointer transition-colors bg-" +
										(idx === currentlyShowingFile
											? "black"
											: "transparent")
									}
									key={idx}
									onClick={() => setCurrentlyShowingFile(idx)}
								>
									{file.name}
								</button>
							))}
						</div>
					</div>

					<pre
						className="custom-scrollbar h-fit p-md font-code-sm text-code-sm overflow-x-auto whitespace-pre text-on-surface m-0 leading-relaxed relative z-10 pb-2"
						tabIndex={0}
						aria-label="Kotlin code snippet for NotificationCard component"
					>
						<code className="block">
							<button
								className="bg-surface-variant hover:bg-surface-bright text-on-surface px-3 py-1.5 rounded text-xs font-medium flex items-center gap-2 transition-colors border border-outline-variant/30 absolute top-2 right-2  cursor-pointer group-hover:opacity-100 focus:opacity-100"
								onClick={copyCodeToClipboard}
							>
								<Copy size={16} />
							</button>
							{kotlinFiles[currentlyShowingFile]?.content}
						</code>
					</pre>
				</div>
			</section>
		</>
	);
}

export default React.memo(CodePreview);
