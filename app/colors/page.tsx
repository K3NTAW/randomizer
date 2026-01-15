import { ColorGenerator } from "@/components/colors/color-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Generator - Random Colors & Palettes | Randomizer",
  description: "Generate random colors, hex codes, RGB values, HSL colors, color palettes, and complementary color schemes. Perfect for design, art, and creative projects.",
  keywords: [
    "color generator",
    "random color",
    "color palette",
    "hex color",
    "rgb generator",
    "hsl color",
    "complementary colors",
    "color picker",
    "random hex",
    "color scheme",
  ],
  openGraph: {
    title: "Color Generator - Random Colors & Palettes",
    description: "Generate random colors, hex codes, RGB values, HSL colors, and color palettes.",
  },
};

export default function ColorsPage() {
  return <ColorGenerator />;
}
