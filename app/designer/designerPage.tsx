"use client";

import {
	useState,
	useEffect,
	SetStateAction,
	useRef,
	useCallback,
} from "react";

import TextField from "../component/Fields/TextField";
import LivePreview from "../component/DesignerPage/livePreview";
import CodePreview from "../component/DesignerPage/codePreview";
import SideNav from "../component/DesignerPage/SideNavMenu/sideNav";
import { useHotkeys } from "react-hotkeys-hook";

import React from "react";

import TopMenu from "../component/DesignerPage/TopMenu";
import dynamic from "next/dynamic";
import SettingsModal from "../component/DesignerPage/SettingsModal";
import { useRouter } from "next/navigation";
import ShowCustomToast from "../component/DesignerPage/CustomToast";

const PremadeHTMLMockups: any = {
	PremiumTextField: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumTextField"),
	),
	PremiumMorphingButton: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/MorphingButtonPreview"),
	),
	SkeletonShimmer: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/SkeletonShimmerPreview"),
	),
	PremiumSwitch: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumSwitch"),
	),
	PremiumAccordian: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumAccordian"),
	),
	PremiumSegmentedControl: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumSegmentedControl"),
	),
	PremiumAnimatedSteps: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumAnimatedSteps"),
	),
	PremiumOTP: dynamic(
		() =>
			import("@/app/component/DesignerPage/LivePreviewComponents/PremiumOTPField"),
	),
};

const files = {
	name: "",
	content: "",
};
const REGEX = /\{\$[^}]+\}/g;

export default function DesignerPage({ initialData }: { initialData: any }) {
	/* #region Mock Data */
	const [componentData, _setComponentData] = useState(initialData);
	const ElementToDisplay = PremadeHTMLMockups[initialData.Component];

	const [kotlinFiles, setKotlinFiles] = useState([files]);

	const debounceTimer = useRef<NodeJS.Timeout | null>(null);
	const [defaultValues, setDefaultValues] = useState(() => {
		// Initialize from your jsonSchema default values once on mount
		const initial: Record<string, React.ReactNode> = {};
		const fields = initialData.Properties.JSONSchema.Styling
			.Fields as Record<string, any>;

		Object.keys(fields).forEach((key) => {
			initial[`{$${key.toString()}}`] = fields[key].DefaultValue;
		});
		return initial;
	});

	const [menu, _SetMenu] = useState(() => {
		const initial: any = [];
		const fields = componentData.Properties.JSONSchema.Styling
			.Fields as Record<string, any>;

		Object.keys(fields).forEach((key) => {
			initial.push({
				component: fields[key].Type, // <-- Store the string ONLY (e.g., "TextField")
				id: fields[key].Mapping,
				name: fields[key].Label,
				defaultValue: fields[key].DefaultValue,
				Options: fields[key].Options,
			});
		});

		return initial;
	});

	// 2. A ref to prevent React "stale closures" inside our timeout
	const dataRef = useRef(componentData);
	useEffect(() => {
		ShowCustomToast({
			label: `${componentData.Component}!`,
			info: `Loaded ${componentData.Component}!`,
		});

		dataRef.current = componentData;
		let KOTLINCODE = initialData.Properties.KOTLIN;

		KOTLINCODE = KOTLINCODE.replace(REGEX, (match: string) => {
			console.log(defaultValues[match], match);
			if (defaultValues[match] !== undefined) return defaultValues[match];
			else return "";
		});

		let fileArray: SetStateAction<{ name: string; content: string }[]> = [];

		KOTLINCODE.split("[FILESPLITTER]").forEach((file: string) => {
			// match file name using regex pattern //[FILENAME:filename.ext]
			const match = file.match(/\/\/\[FILENAME:(.+?)\]/);

			const fileName = match ? match[1].trim() : "UnknownFile.kt";

			fileArray.push({
				name: fileName,
				content: file.replace(/\/\/\[FILENAME:.+?\]/, "").trim(),
			});
		});

		setKotlinFiles(fileArray);
	}, [componentData]);

	const updateProperty = useCallback(
		(fieldKey: string, value: string | number) => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}

			const d = defaultValues;
			console.log(d[fieldKey], fieldKey);
			d[fieldKey] = value.toString();

			setDefaultValues(d);
			console.log(d);

			let updatedKotlin = dataRef.current.Properties.KOTLIN;
			console.log(updatedKotlin);

			debounceTimer.current = setTimeout(() => {
				updatedKotlin = updatedKotlin.replace(REGEX, (match: any) => {
					if (
						defaultValues[match] !== undefined &&
						match === fieldKey
					) {
						console.log(defaultValues[match], match);
						return defaultValues[match];
					} else {
						return defaultValues[match];
					}
				});

				let fileArray: { name: string; content: string }[] = [];

				updatedKotlin.split("[FILESPLITTER]").forEach((file: any) => {
					const match = file.match(/\/\/\s*\[FILENAME:\s*(.+?)\]/);
					const fileName = match ? match[1].trim() : "UnknownFile.kt";

					fileArray.push({
						name: fileName,
						content: file
							.replace(/\/\/\s*\[FILENAME:.+?\]/, "")
							.trim(),
					});
				});

				// Finally, update the UI state
				setKotlinFiles(fileArray);
			}, 400); // Wait 300ms after the last keystroke before running all this
		},
		[],
	);

	/* #endregion */

	const [settingsModal, setSettingsModal] = useState(false);
	function toggleModal() {
		setSettingsModal(!settingsModal);
	}

	const router = useRouter();

	useHotkeys("mod+h", (e) => {
		e.preventDefault();
		toggleModal();
	});
	useHotkeys("mod+s", (e) => {
		e.preventDefault();
		router.push("/browse");
	});

	return (
		<>
			<TopMenu />
			<div
				className="flex w-full h-[calc(100vh-60px)] overflow-hidden "
				style={{
					backgroundImage:
						"radial-gradient(circle at 50% 50%, rgb(128 131 255 / 8%) 0%, transparent 50%)",
				}}
			>
				<main className="flex-1 flex w-full overflow-hidden ">
					<SideNav
						menu={menu}
						updateProperty={updateProperty}
						toggleModal={toggleModal}
					/>
					<LivePreview>
						<ElementToDisplay defaultValues={defaultValues} />
					</LivePreview>
					<CodePreview
						kotlinFiles={kotlinFiles}
						hotkeysProvider={useHotkeys}
					/>
				</main>
			</div>{" "}
			{settingsModal && <SettingsModal toggleModal={toggleModal} />}
		</>
	);
}
