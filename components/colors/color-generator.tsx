"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Copy, Check, RefreshCw } from "lucide-react";

type ColorMode = "hex" | "rgb" | "hsl" | "palette" | "complementary" | "name";

interface ColorResult {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

interface ColorHistory {
  color: ColorResult;
  timestamp: number;
}

// Extended color names mapping with RGB values
const colorNames: Array<{ name: string; hex: string; rgb: { r: number; g: number; b: number } }> = [
  { name: "Red", hex: "#FF0000", rgb: { r: 255, g: 0, b: 0 } },
  { name: "Green", hex: "#00FF00", rgb: { r: 0, g: 255, b: 0 } },
  { name: "Blue", hex: "#0000FF", rgb: { r: 0, g: 0, b: 255 } },
  { name: "Yellow", hex: "#FFFF00", rgb: { r: 255, g: 255, b: 0 } },
  { name: "Magenta", hex: "#FF00FF", rgb: { r: 255, g: 0, b: 255 } },
  { name: "Cyan", hex: "#00FFFF", rgb: { r: 0, g: 255, b: 255 } },
  { name: "White", hex: "#FFFFFF", rgb: { r: 255, g: 255, b: 255 } },
  { name: "Black", hex: "#000000", rgb: { r: 0, g: 0, b: 0 } },
  { name: "Gray", hex: "#808080", rgb: { r: 128, g: 128, b: 128 } },
  { name: "Orange", hex: "#FFA500", rgb: { r: 255, g: 165, b: 0 } },
  { name: "Purple", hex: "#800080", rgb: { r: 128, g: 0, b: 128 } },
  { name: "Pink", hex: "#FFC0CB", rgb: { r: 255, g: 192, b: 203 } },
  { name: "Brown", hex: "#A52A2A", rgb: { r: 165, g: 42, b: 42 } },
  { name: "Navy", hex: "#000080", rgb: { r: 0, g: 0, b: 128 } },
  { name: "Lime", hex: "#00FF00", rgb: { r: 0, g: 255, b: 0 } },
  { name: "Teal", hex: "#008080", rgb: { r: 0, g: 128, b: 128 } },
  { name: "Maroon", hex: "#800000", rgb: { r: 128, g: 0, b: 0 } },
  { name: "Olive", hex: "#808000", rgb: { r: 128, g: 128, b: 0 } },
  { name: "Aqua", hex: "#00FFFF", rgb: { r: 0, g: 255, b: 255 } },
  { name: "Silver", hex: "#C0C0C0", rgb: { r: 192, g: 192, b: 192 } },
  { name: "Gold", hex: "#FFD700", rgb: { r: 255, g: 215, b: 0 } },
  { name: "Coral", hex: "#FF7F50", rgb: { r: 255, g: 127, b: 80 } },
  { name: "Salmon", hex: "#FA8072", rgb: { r: 250, g: 128, b: 114 } },
  { name: "Turquoise", hex: "#40E0D0", rgb: { r: 64, g: 224, b: 208 } },
  { name: "Violet", hex: "#EE82EE", rgb: { r: 238, g: 130, b: 238 } },
  { name: "Indigo", hex: "#4B0082", rgb: { r: 75, g: 0, b: 130 } },
  { name: "Beige", hex: "#F5F5DC", rgb: { r: 245, g: 245, b: 220 } },
  { name: "Khaki", hex: "#F0E68C", rgb: { r: 240, g: 230, b: 140 } },
  { name: "Lavender", hex: "#E6E6FA", rgb: { r: 230, g: 230, b: 250 } },
  { name: "Mint", hex: "#98FF98", rgb: { r: 152, g: 255, b: 152 } },
  { name: "Peach", hex: "#FFE5B4", rgb: { r: 255, g: 229, b: 180 } },
  { name: "Crimson", hex: "#DC143C", rgb: { r: 220, g: 20, b: 60 } },
  { name: "Tomato", hex: "#FF6347", rgb: { r: 255, g: 99, b: 71 } },
  { name: "Sky Blue", hex: "#87CEEB", rgb: { r: 135, g: 206, b: 235 } },
  { name: "Forest Green", hex: "#228B22", rgb: { r: 34, g: 139, b: 34 } },
  { name: "Royal Blue", hex: "#4169E1", rgb: { r: 65, g: 105, b: 225 } },
  { name: "Chocolate", hex: "#D2691E", rgb: { r: 210, g: 105, b: 30 } },
  { name: "Sienna", hex: "#A0522D", rgb: { r: 160, g: 82, b: 45 } },
  { name: "Tan", hex: "#D2B48C", rgb: { r: 210, g: 180, b: 140 } },
  { name: "Wheat", hex: "#F5DEB3", rgb: { r: 245, g: 222, b: 179 } },
  { name: "Peru", hex: "#CD853F", rgb: { r: 205, g: 133, b: 63 } },
  { name: "Sandy Brown", hex: "#F4A460", rgb: { r: 244, g: 164, b: 96 } },
];

// Calculate distance between two RGB colors
function colorDistance(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const rDiff = rgb1.r - rgb2.r;
  const gDiff = rgb1.g - rgb2.g;
  const bDiff = rgb1.b - rgb2.b;
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const compHsl = { h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l };
  const compRgb = hslToRgb(compHsl.h, compHsl.s, compHsl.l);
  return rgbToHex(compRgb.r, compRgb.g, compRgb.b);
}

function getColorName(hex: string): string {
  // First try exact match
  const normalized = hex.toUpperCase();
  const exactMatch = colorNames.find(c => c.hex.toUpperCase() === normalized);
  if (exactMatch) return exactMatch.name;
  
  // Find closest color by RGB distance
  const rgb = hexToRgb(hex);
  let closestColor = colorNames[0];
  let minDistance = colorDistance(rgb, colorNames[0].rgb);
  
  for (const color of colorNames) {
    const distance = colorDistance(rgb, color.rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }
  
  // If the distance is too large, return a descriptive name based on hue
  if (minDistance > 100) {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    if (hsl.l < 20) return "Very Dark";
    if (hsl.l > 80) return "Very Light";
    if (hsl.s < 20) return "Grayish";
    return closestColor.name;
  }
  
  return closestColor.name;
}

function generateRandomHex(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
}

function generateRandomRgb(): { r: number; g: number; b: number } {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

function generateRandomHsl(): { h: number; s: number; l: number } {
  return {
    h: Math.floor(Math.random() * 360),
    s: Math.floor(Math.random() * 100),
    l: Math.floor(Math.random() * 100),
  };
}

function createColorResult(hex: string, name?: string): ColorResult {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return {
    hex,
    rgb,
    hsl,
    name: name || getColorName(hex),
  };
}

export function ColorGenerator() {
  const [colorMode, setColorMode] = useState<ColorMode>("hex");
  const [paletteSize, setPaletteSize] = useState(5);
  const [currentColor, setCurrentColor] = useState<ColorResult | null>(null);
  const [palette, setPalette] = useState<ColorResult[]>([]);
  const [complementaryColors, setComplementaryColors] = useState<ColorResult[]>([]);
  const [history, setHistory] = useState<ColorHistory[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHex = () => {
    const hex = generateRandomHex();
    const color = createColorResult(hex);
    setCurrentColor(color);
    addToHistory(color);
  };

  const generateRgb = () => {
    const rgb = generateRandomRgb();
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const color = createColorResult(hex);
    setCurrentColor(color);
    addToHistory(color);
  };

  const generateHsl = () => {
    const hsl = generateRandomHsl();
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const color = createColorResult(hex);
    setCurrentColor(color);
    addToHistory(color);
  };

  const generatePalette = () => {
    const colors: ColorResult[] = [];
    const baseHue = Math.floor(Math.random() * 360);

    for (let i = 0; i < paletteSize; i++) {
      const hue = (baseHue + (i * 60)) % 360;
      const saturation = 50 + Math.floor(Math.random() * 30);
      const lightness = 40 + Math.floor(Math.random() * 30);
      const rgb = hslToRgb(hue, saturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      colors.push(createColorResult(hex));
    }

    setPalette(colors);
    if (colors.length > 0) {
      addToHistory(colors[0]);
    }
  };

  const generateComplementary = () => {
    const baseHex = generateRandomHex();
    const baseColor = createColorResult(baseHex);
    const compHex = getComplementaryColor(baseHex);
    const compColor = createColorResult(compHex);

    setComplementaryColors([baseColor, compColor]);
    setCurrentColor(baseColor);
    addToHistory(baseColor);
  };

  const generateColorName = () => {
    // Generate a color and show its approximate name
    const hex = generateRandomHex();
    const color = createColorResult(hex);
    setCurrentColor(color);
    addToHistory(color);
  };

  const handleGenerate = () => {
    switch (colorMode) {
      case "hex":
        generateHex();
        break;
      case "rgb":
        generateRgb();
        break;
      case "hsl":
        generateHsl();
        break;
      case "palette":
        generatePalette();
        break;
      case "complementary":
        generateComplementary();
        break;
      case "name":
        generateColorName();
        break;
    }
  };

  const addToHistory = (color: ColorResult) => {
    setHistory((prev) => [{ color, timestamp: Date.now() }, ...prev].slice(0, 50));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getContrastColor = (hex: string): string => {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Palette className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Color Generator</h1>
          <p className="text-muted-foreground">
            Generate random colors and palettes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Generator Type</CardTitle>
                <CardDescription>Choose how you want to generate colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={colorMode} onValueChange={(value) => setColorMode(value as ColorMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">Random Hex Color</SelectItem>
                    <SelectItem value="rgb">Random RGB Color</SelectItem>
                    <SelectItem value="hsl">Random HSL Color</SelectItem>
                    <SelectItem value="palette">Color Palette</SelectItem>
                    <SelectItem value="complementary">Complementary Colors</SelectItem>
                    <SelectItem value="name">Color Name Generator</SelectItem>
                  </SelectContent>
                </Select>

                {colorMode === "palette" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Palette Size</label>
                    <Input
                      type="number"
                      min="2"
                      max="12"
                      value={paletteSize}
                      onChange={(e) => setPaletteSize(Math.max(2, Math.min(12, parseInt(e.target.value) || 5)))}
                    />
                  </div>
                )}

                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Color{colorMode === "palette" ? "s" : ""}
                </Button>
              </CardContent>
            </Card>

            {/* Single Color Display */}
            {currentColor && colorMode !== "palette" && colorMode !== "complementary" && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Generated Color</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(currentColor.hex)}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color Preview */}
                  <div
                    className="w-full h-48 rounded-lg flex items-center justify-center text-2xl font-bold transition-all"
                    style={{
                      backgroundColor: currentColor.hex,
                      color: getContrastColor(currentColor.hex),
                    }}
                  >
                    {currentColor.name}
                  </div>

                  {/* Color Values */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">HEX</label>
                      <div className="flex gap-2">
                        <Input value={currentColor.hex} readOnly className="font-mono" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentColor.hex)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">RGB</label>
                      <div className="flex gap-2">
                        <Input
                          value={`rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">HSL</label>
                      <div className="flex gap-2">
                        <Input
                          value={`hsl(${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%)`}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`hsl(${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%)`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Palette Display */}
            {colorMode === "palette" && palette.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Color Palette</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(palette.map((c) => c.hex).join(", "))}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy All
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {palette.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="w-full h-24 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                          style={{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                          }}
                        >
                          {color.hex}
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="font-mono">{color.hex}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => copyToClipboard(color.hex)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Complementary Colors Display */}
            {colorMode === "complementary" && complementaryColors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Complementary Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {complementaryColors.map((color, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className="w-full h-32 rounded-lg flex items-center justify-center text-lg font-bold transition-all"
                          style={{
                            backgroundColor: color.hex,
                            color: getContrastColor(color.hex),
                          }}
                        >
                          {color.hex}
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="font-mono text-xs">{color.hex}</div>
                          <div className="font-mono text-xs">
                            RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => copyToClipboard(color.hex)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* History Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>Recently generated colors</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No history yet. Generate some colors!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted"
                      >
                        <div
                          className="w-8 h-8 rounded border border-border flex-shrink-0"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-mono truncate">{item.color.hex}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.color.hex)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

