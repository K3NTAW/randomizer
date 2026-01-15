import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

export default function ColorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Color Generator</h1>
          <p className="text-muted-foreground">
            Generate random colors and palettes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Color generator features are being developed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page will include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Random hex color generator</li>
              <li>RGB/HSL color generators</li>
              <li>Color palette generator</li>
              <li>Complementary color schemes</li>
              <li>Color name generator</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

