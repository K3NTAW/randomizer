import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dice1, Hash, List, Palette, Shuffle, Sparkles } from "lucide-react";

const features = [
  {
    title: "Dice Roller",
    description: "Roll standard dice (d4, d6, d8, d10, d12, d20, d100) with beautiful 3D animations",
    href: "/dice",
    icon: Dice1,
    color: "text-white",
  },
  {
    title: "Number Generator",
    description: "Generate random numbers, ranges, weighted numbers, and more",
    href: "/numbers",
    icon: Hash,
    color: "text-gray-300",
  },
  {
    title: "List Randomizer",
    description: "Shuffle lists, pick random items, and create weighted selections",
    href: "/lists",
    icon: List,
    color: "text-gray-400",
  },
  {
    title: "Color Generator",
    description: "Generate random colors, palettes, and color schemes",
    href: "/colors",
    icon: Palette,
    color: "text-gray-300",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-12 w-12 text-white" />
          <h1 className="text-5xl font-bold text-white">
            Randomizer
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your all-in-one tool for randomization. From dice rolls to color palettes,
          we&apos;ve got everything you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={feature.href}>
                  <Button className="w-full">Try it out</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shuffle className="h-5 w-5 text-white" />
            <CardTitle>More Features Coming Soon</CardTitle>
          </div>
          <CardDescription>
            We&apos;re constantly adding new randomizers. Check out our full feature list
            to see what&apos;s planned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Card randomizers, name generators, date/time randomizers, and much more
            are on the roadmap. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

