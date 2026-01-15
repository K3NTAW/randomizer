import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navigation/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Randomizer - Free Online Randomization Tools | Dice, Numbers, Lists, Colors",
  description: "Free online randomizer tools for dice rolling, number generation, list shuffling, and color palettes. Perfect for games, decisions, and creative projects. 3D dice roller, weighted randomizers, and more!",
  keywords: [
    "randomizer",
    "dice roller",
    "random number generator",
    "list randomizer",
    "color generator",
    "random picker",
    "dice roll",
    "random selector",
    "shuffle list",
    "random color",
    "number generator",
    "weighted random",
    "3d dice",
    "online randomizer",
    "free randomizer",
    "random tool",
    "decision maker",
    "random choice",
    "dice simulator",
    "randomizer tool",
  ],
  authors: [{ name: "Randomizer" }],
  creator: "Randomizer",
  publisher: "Randomizer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://randomizer.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Randomizer - Free Online Randomization Tools",
    description: "Free online randomizer tools for dice rolling, number generation, list shuffling, and color palettes. Perfect for games, decisions, and creative projects.",
    siteName: "Randomizer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Randomizer - Free Online Randomization Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Randomizer - Free Online Randomization Tools",
    description: "Free online randomizer tools for dice rolling, number generation, list shuffling, and color palettes.",
    images: ["/og-image.png"],
    creator: "@randomizer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Randomizer",
              description: "Free online randomizer tools for dice rolling, number generation, list shuffling, and color palettes",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://randomizer.app",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "3D Dice Roller",
                "Number Generator",
                "List Randomizer",
                "Color Generator",
                "Weighted Random Selection",
                "Multiple Selection Modes",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "1000",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Randomizer",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://randomizer.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://randomizer.app"}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
