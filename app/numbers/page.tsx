import { NumberGenerator } from "@/components/numbers/number-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator - Free Online Tool | Randomizer",
  description: "Generate random numbers, integers, floats, weighted numbers, and unique sequences. Perfect for games, lotteries, statistics, and random selection.",
  keywords: [
    "random number generator",
    "number generator",
    "random integer",
    "random float",
    "weighted random",
    "unique numbers",
    "random sequence",
    "number picker",
  ],
  openGraph: {
    title: "Random Number Generator - Free Online Tool",
    description: "Generate random numbers, integers, floats, weighted numbers, and unique sequences.",
  },
};

export default function NumbersPage() {
  return <NumberGenerator />;
}
