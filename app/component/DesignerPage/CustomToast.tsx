import { CheckCircle2, X } from "lucide-react";
import { toast } from "react-toastify";

export const CustomToast = ({
	closeToast,
	title,
	message,
}: {
	title: String;
	message: String;
	closeToast: () => void;
}) => (
	<div className="flex flex-col gap-3 w-full max-w-sm bg-[#131316] border border-white/10 p-4 rounded-2xl shadow-2xl">
		<div className="flex items-start gap-3">
			{/* Themed Icon Container */}
			<div className="bg-[#c2a8f9]/15 text-[#c2a8f9] rounded-full h-10 w-10 flex items-center justify-center shrink-0 border border-[#c2a8f9]/10">
				<CheckCircle2 className="w-5 h-5" />
			</div>

			{/* Themed Typography */}
			<div className="flex-1 pt-1">
				<h4 className="font-semibold text-gray-100 text-sm mb-1">
					{title}
				</h4>
				<p className="text-sm text-gray-400 leading-relaxed">
					{message}
				</p>
			</div>

			{/* Optional dismiss X icon at top right */}
			<button
				onClick={closeToast}
				className="text-gray-500 hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-white/10"
			>
				<X className="w-4 h-4" />
			</button>
		</div>

		{/* Themed Buttons */}
		<div className="flex gap-2 mt-2 justify-end">
			<button
				className="px-4 py-2 hover:bg-white/5  cursor-pointer text-gray-400 hover:text-gray-200 rounded-xl text-sm font-medium transition-all active:scale-95"
				onClick={closeToast}
			>
				Dismiss
			</button>
		</div>
	</div>
);

export default function ShowCustomToast({
	label,
	info,
}: {
	label: String;
	info: String;
}) {
	toast(
		// 1. Pass a function so the library can inject its 'closeToast' method
		({ closeToast }) => (
			<CustomToast title={label} message={info} closeToast={closeToast} />
		),
		{
			position: "top-right",
			autoClose: 5000,

			// 2. Override the default container styles
			style: { background: "transparent", boxShadow: "none", padding: 0 },

			// 3. Hide the library's default close button (since your custom toast has one)
			closeButton: false,

			// Optional: Hide the colored progress bar at the bottom if you don't want it
			hideProgressBar: true,
		},
	);
}
