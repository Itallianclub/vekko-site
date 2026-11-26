import type { Metadata } from "next";
import { APPLE_APP_ID } from "./config/app-links";
import { HomeExperience } from "./components/home/home-experience";

// Título, descrição e OpenGraph vêm do layout (app/layout.tsx).
export const metadata: Metadata = {
  // Smart App Banner do Safari no iOS.
  other: { "apple-itunes-app": `app-id=${APPLE_APP_ID}` },
};

export default function Home() {
  return <HomeExperience />;
}
