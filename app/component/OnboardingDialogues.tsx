"use client";

import { useState, useEffect } from "react";

const onboardingSteps = [
	{
		title: "Welcome to ComposerUI!",
		description:
			"This interactive playground lets you customize Jetpack Compose components and see the code in real-time. Let's take a quick tour.",
		buttonText: "Get Started",
	},
	{
		title: "Customize Everything",
		description:
			"On the left, you'll find all the available controls to tweak the component's appearance and behavior. Play around with them and see what happens!",
		buttonText: "Next",
	},
	{
		title: "Live Preview & Code",
		description:
			"The center area shows a live preview of the component. To the right, you'll find the generated Kotlin code, ready to be copied into your project.",
		buttonText: "Finish Tour",
	},
];

export default function OnboardingDialogues() {
	const [step, setStep] = useState(0); // Start at 0, which is hidden
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Show the first step on initial mount
		const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
		if (!hasSeenOnboarding) {
			setStep(1);
			setIsVisible(true);
		}
	}, []);

	function updateOnboardingStep() {
		if (step < onboardingSteps.length) {
			setStep(step + 1);
		} else {
			// Last step, so hide the modal
			handleClose();
		}
	}

	function handleClose() {
		setIsVisible(false);
		localStorage.setItem("hasSeenOnboarding", "true");
		// Allow animation to finish before setting step to 0
		setTimeout(() => setStep(0), 300);
	}

	if (step === 0) {
		return null;
	}

	const currentStep = onboardingSteps[step - 1];

	return (
		<div
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`bg-surface-container-lowest border p-8 border-outline-variant/20 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto relative shadow-2xl transition-all duration-300 ${
					isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors z-50"
				>
					✕
				</button>
				<div className="flex flex-col justify-center items-start gap-4">
					<h2 className="text-headline-sm font-bold text-on-surface">
						{currentStep.title}
					</h2>
					<p className="text-body-lg text-on-surface-variant">
						{currentStep.description}
					</p>
					<div className="flex flex-row w-full justify-between items-center mt-4">
						<span className="text-on-surface-variant text-sm">
							{step}/{onboardingSteps.length}
						</span>
						<button
							onClick={updateOnboardingStep}
							className="bg-primary text-on-primary hover:bg-primary/90 py-2 px-4 rounded-full transition-colors font-bold text-sm"
						>
							{currentStep.buttonText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
