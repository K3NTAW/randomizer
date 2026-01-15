import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dice1, 
  Hash, 
  List, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  TrendingUp,
  Shuffle,
  Layers,
  Wand2
} from "lucide-react";

const features = [
  {
    title: "Dice Roller",
    description: "Roll standard dice (d4, d6, d8, d10, d12, d20, d100) with beautiful 3D animations and physics",
    href: "/dice",
    icon: Dice1,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgGradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    borderGradient: "from-blue-500/50 to-cyan-500/50",
    stats: "3D Physics",
  },
  {
    title: "Number Generator",
    description: "Generate random numbers, ranges, weighted numbers, unique sequences, and more",
    href: "/numbers",
    icon: Hash,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bgGradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    borderGradient: "from-green-500/50 to-emerald-500/50",
    stats: "Multiple Modes",
  },
  {
    title: "List Randomizer",
    description: "Shuffle lists, pick random items, create weighted selections, and manage custom lists",
    href: "/lists",
    icon: Shuffle,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    borderGradient: "from-purple-500/50 to-pink-500/50",
    stats: "Smart Selection",
  },
  {
    title: "Color Generator",
    description: "Generate random colors, palettes, complementary schemes, and get color names",
    href: "/colors",
    icon: Palette,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    bgGradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    borderGradient: "from-orange-500/50 to-red-500/50",
    stats: "Color Palettes",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant results with smooth animations",
  },
  {
    icon: Layers,
    title: "Multiple Modes",
    description: "Choose from various randomization methods",
  },
  {
    icon: TrendingUp,
    title: "Always Improving",
    description: "New features added regularly",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full animate-pulse"></div>
                <Sparkles className="h-20 w-20 md:h-24 md:w-24 text-white relative z-10 animate-pulse" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white relative">
                Randomizer
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent blur-xl opacity-50"></div>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
              Your all-in-one tool for randomization
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10">
              From dice rolls to color palettes, we&apos;ve got everything you need for all your random selection needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dice">
                <Button size="lg" className="text-lg px-8 py-6 h-auto group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/numbers">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Randomization Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professional randomizers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="group relative overflow-hidden border-2 hover:border-opacity-100 border-opacity-20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-card/80 backdrop-blur-sm">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Border Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        <span>{feature.stats}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl mb-3 group-hover:text-white transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed group-hover:text-white/90 transition-colors">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`h-1.5 w-full bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wand2 className="h-6 w-6 text-white" />
                <CardTitle className="text-3xl">Why Choose Randomizer?</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Everything you need for perfect randomization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-6 rounded-xl bg-muted/50"
                    >
                      <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                        <BenefitIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-6 border-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4+</div>
              <div className="text-sm text-muted-foreground">Randomizer Types</div>
            </Card>
            <Card className="text-center p-6 border-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </Card>
            <Card className="text-center p-6 border-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free & Open</div>
            </Card>
            <Card className="text-center p-6 border-2 border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">⚡</div>
              <div className="text-sm text-muted-foreground">Lightning Fast</div>
            </Card>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">More Features Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                We&apos;re constantly adding new randomizers. Check out what&apos;s on the roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                  <div className="text-2xl mb-2">🃏</div>
                  <div className="text-sm font-medium mb-1">Card Randomizers</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="text-sm font-medium mb-1">Name Generators</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm font-medium mb-1">Date/Time</div>
                  <div className="text-xs text-muted-foreground">Coming soon</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-sm font-medium mb-1">And More...</div>
                  <div className="text-xs text-muted-foreground">Stay tuned!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
