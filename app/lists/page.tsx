import { ListRandomizer } from "@/components/lists/list-randomizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Randomizer - Shuffle Lists & Pick Random Items | Randomizer",
  description: "Shuffle lists, pick random items, create weighted selections, and manage custom lists. Perfect for decision making, team selection, and random choices.",
  keywords: [
    "list randomizer",
    "shuffle list",
    "random picker",
    "random selector",
    "list shuffler",
    "weighted list",
    "random choice",
    "decision maker",
  ],
  openGraph: {
    title: "List Randomizer - Shuffle Lists & Pick Random Items",
    description: "Shuffle lists, pick random items, create weighted selections, and manage custom lists.",
  },
};

export default function ListsPage() {
  return <ListRandomizer />;
}
