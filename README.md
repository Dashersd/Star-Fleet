<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Star-Fleet Command

## 📖 Project Description

**Star-Fleet Command** is a highly interactive, futuristic web application designed to simulate the command center of a next-generation space exploration fleet. Blending stunning visual aesthetics with advanced web technologies, the platform serves as both a telemetry dashboard and an immersive exploration guide. 

Users are plunged into a premium glassmorphic, sci-fi interface featuring rich interactive elements like planetary orbital tracking, spacecraft vector analysis, and dynamic fleet battle simulations. Built with React 19, Framer Motion, and Tailwind CSS v4, the project pushes the boundaries of modern web design—delivering fluid animations, seamless layout transitions, and a captivating user experience that truly feels like commanding a starship.

## 🌟 Key Features

* **Dynamic Hero Layout**: Features a full-screen cinematic background video with a glassmorphic layout, seamless typography reveals, and shimmering interactive CTA buttons.
* **Spacecraft Asteroids Section (Vectors)**: Dynamic, visually stunning rendering of orbital trajectories and spacecraft data.
* **Alliance Section (Meet The Minds)**: An interactive roster layout designed to showcase the key personnel and minds behind the fleet.
* **Elegant Exploration Guide (About)**: Detailed mission tracking, spacecraft specifications, and interstellar guides.
* **Interactive Mini-Games & Visuals**: Includes advanced `SpaceBattle` and `SolarSystemOrbits` interactive components with custom sidebar navigation (`SidebarTabs`).
* **Fluid Animations**: Fully powered by `motion/react` (Framer Motion v12) for staggered text reveals, scroll-linked animations, hover states, and smooth layout transitions.
* **Glassmorphic UI**: Beautiful semi-transparent layers, backdrop blurs, and cyan/blue gradient borders tailored to a premium sci-fi aesthetic.

## 🛠 Tech Stack

### Core Framework
* **React 19** - Modern frontend UI library.
* **Vite 6** - Lightning-fast build tool and development server.
* **TypeScript** - Strict static typing for enterprise-grade reliability.

### Styling & Animation
* **Tailwind CSS v4 (`@tailwindcss/vite`)** - Next-generation utility-first CSS framework.
* **Motion / React (Framer Motion v12)** - The industry standard for declarative layout animations and SVG drawing effects.
* **Lucide React** - Beautiful, consistent, and lightweight vector iconography.

### Integrations
* **Google Gemini AI (`@google/genai`)** - Official SDK for deep integration with Google's Gemini large language models.
* **Express & Dotenv** - Backend utilities for local API routes or environment variable management.

---

## 🚀 Run Locally

**Prerequisites:**  Node.js (v20 or v22+ recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set your Environment Variables:**
   Set the `GEMINI_API_KEY` in `.env.local` to your Google Gemini API key.
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:3000`.*

---

## 📂 Component Architecture

* `/src/App.tsx` - Main layout orchestrator housing the Hero, Vectors, Alliance, and About sections.
* `/src/components/` - Home to all modular UI pieces:
  * `Header.tsx` & `StatsBox.tsx` - Glassmorphic navigational and metric components.
  * `SpaceBattle.tsx` & `SolarSystemOrbits.tsx` - Complex interactive data visualizations.
  * `VectorsSection.tsx`, `AllianceSection.tsx`, `AboutSection.tsx` - Core page sections.
* `/index.css` - Global Tailwind styles and custom theme layers.
