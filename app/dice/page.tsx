import { DiceRoller } from "@/components/dice/dice-roller";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dice Roller - 3D Dice Rolling Simulator | Randomizer",
  description: "Roll dice online with beautiful 3D animations. Supports d4, d6, d8, d10, d12, d20, d100 and more. Perfect for D&D, board games, and any dice-based games.",
  keywords: [
    "dice roller",
    "3d dice",
    "dice simulator",
    "roll dice online",
    "d20 roller",
    "dnd dice",
    "dice roll",
    "virtual dice",
    "online dice",
    "dice game",
  ],
  openGraph: {
    title: "Dice Roller - 3D Dice Rolling Simulator",
    description: "Roll dice online with beautiful 3D animations. Supports all standard dice types.",
  },
};

export default function DicePage() {
  return <DiceRoller />;
}
