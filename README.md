# 🎲 Randomizer

A beautiful, modern web application for all your randomization needs. Built with Next.js, TypeScript, shadcn/ui, and featuring 3D dice rolling animations using [@3d-dice/dice-box](https://github.com/3d-dice/dice-box).

## Features

- 🎯 **Dice Roller** - Roll standard dice (d4, d6, d8, d10, d12, d20, d100) with beautiful 3D animations
- 🔢 **Number Generator** - Generate random numbers with various options (coming soon)
- 📋 **List Randomizer** - Shuffle lists and pick random items (coming soon)
- 🎨 **Color Generator** - Generate random colors and palettes (coming soon)
- 🌙 **Dark Mode** - Beautiful black dark mode with smooth theme switching
- 📱 **Responsive** - Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Dice Animation**: [@3d-dice/dice-box](https://github.com/3d-dice/dice-box)
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd randomizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Dice Box Assets** (Automatic!):
The dice-box assets are automatically copied to `public/assets/dice-box/` after installation via the `postinstall` script. If you need to manually copy them:

```bash
# The assets are in node_modules/@3d-dice/dice-box/dist/assets
# Copy them to public/assets/dice-box/
cp -r node_modules/@3d-dice/dice-box/dist/assets public/assets/dice-box
```

Or run the copy script manually:
```bash
npm run copy-dice-assets
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
randomizer/
├── app/                    # Next.js app directory
│   ├── dice/              # Dice roller page
│   ├── numbers/           # Number generator page
│   ├── lists/             # List randomizer page
│   ├── colors/            # Color generator page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── dice/             # Dice roller component
│   ├── navigation/        # Navigation components
│   ├── providers/         # Context providers
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
└── public/
    └── assets/
        └── dice-box/      # Dice box assets (copy from node_modules)
```

## Dice Box Assets

The dice rolling animation uses [@3d-dice/dice-box](https://github.com/3d-dice/dice-box) which requires assets to be copied to your public folder. The assets are automatically copied from `node_modules/@3d-dice/dice-box/dist/assets` to `public/assets/dice-box/` during installation via the `postinstall` script.

## Building for Production

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
# randomizer
