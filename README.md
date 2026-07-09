<p align="center">
  <h1 align="center">🎨 Composer UI</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Android-Kotlin-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android Kotlin" />
</p>

> **A visual designer and component library bridging web-based previews with native Android Kotlin implementations.**

Composer UI is a comprehensive front-end application built with Next.js that serves as an interactive design engine[cite: 1]. It allows developers and designers to browse, customize, and preview premium UI components on the web, while mapping those precise designs directly to production-ready native Kotlin code for Android[cite: 1].

---

## 🧠 System Architecture 

The application is structured into a modular Next.js directory system, separating the design interface from the component library:

* **Designer Workspace:** A dedicated environment (`/app/designer`) equipped with a top menu, side navigation, and interactive modal overlays[cite: 1].
* **Dual-Pane Previews:** Features split views for both live visual rendering (`livePreview.tsx`) and raw code generation (`codePreview.tsx`)[cite: 1].
* **Dynamic Property Fields:** Users customize components via modular field editors, including color selectors, draggable fields, segmented selects, icon selectors, and toggles (`/app/component/Fields`)[cite: 1].
* **Native Code Mapping:** The `/lib/components` directory houses the raw `.kt` (Kotlin) source files corresponding to the web UI, ready for direct Android integration[cite: 1].

---

## 🔥 Standout Features

* **Premium UI Library:** Includes custom-built components such as Morphing Buttons, Animated Step Indicators, Premium Accordions, OTP Input Fields, and Skeleton Shimmers[cite: 1].
* **Live Native Previews:** The system seamlessly pairs React-based preview components (e.g., `MorphingButtonPreview.tsx`) with their native Android counterparts (e.g., `MorphingButton.kt`)[cite: 1].
* **Global Hotkeys:** Engineered for power users, featuring a dedicated `GlobalHotkeys.tsx` component for rapid keyboard-driven design[cite: 1].
* **Analytics Ready:** Built-in `FirebaseAnalytics.tsx` integration to track component usage and engagement out of the box[cite: 1].

---

## ⚙️ Local Development Setup

Composer UI operates as a standard Node.js/Next.js environment.

### 1. Installation

* **Install Node Dependencies:**
  ```bash
  npm install
  # or
  yarn install
