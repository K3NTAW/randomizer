"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Play } from "lucide-react";
// @ts-ignore - dice-box doesn't have TypeScript definitions
import DiceBox from "@3d-dice/dice-box";

const DICE_TYPES = [
  { value: "d4", label: "d4" },
  { value: "d6", label: "d6" },
  { value: "d8", label: "d8" },
  { value: "d10", label: "d10" },
  { value: "d12", label: "d12" },
  { value: "d20", label: "d20" },
  { value: "d100", label: "d100" },
];

export function DiceRoller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<DiceBox | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [selectedDice, setSelectedDice] = useState("d20");
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [rollHistory, setRollHistory] = useState<Array<{ notation: string; result: number }>>([]);

  useEffect(() => {
    if (!containerRef.current || diceBoxRef.current) return;

    // Ensure the element has an ID for the selector
    const containerId = "dice-box-container";
    if (!containerRef.current.id) {
      containerRef.current.id = containerId;
    }

    console.log("Initializing dice box with container:", containerRef.current);

    try {
      const diceBox = new DiceBox(`#${containerId}`, {
        assetPath: "/assets/dice-box/",
        theme: "default",
        themeColor: "#ffffff",
        offscreen: false,
        scale: 10, // Start with a reasonable scale
      });

      console.log("DiceBox created, initializing...");

      diceBox
        .init()
        .then(() => {
          console.log("DiceBox initialized successfully");
          diceBoxRef.current = diceBox;
          setIsInitialized(true);

          // Handle roll completion - this will be set up when we roll
          diceBox.onRollComplete = (results: any) => {
            setIsRolling(false);
            // Calculate total from results
            let total = 0;
            if (Array.isArray(results)) {
              total = results.reduce((sum: number, die: any) => {
                return sum + (die.value || die.roll || 0);
              }, 0);
            } else if (results && typeof results === "object") {
              total = results.total || results.value || 0;
            }
            // The modifier is already included in the notation, so total should be correct
            setResult(total);
          };
        })
        .catch((error: unknown) => {
          console.error("Failed to initialize dice box:", error);
          setIsInitialized(false);
        });
    } catch (error) {
      console.error("Error creating DiceBox:", error);
      setIsInitialized(false);
    }

    return () => {
      if (diceBoxRef.current) {
        try {
          diceBoxRef.current.clear();
        } catch (error) {
          console.error("Error clearing dice box:", error);
        }
      }
    };
  }, []); // Only run once on mount

  const rollDice = async (diceType?: string, diceQuantity?: number, diceModifier?: number) => {
    if (!diceBoxRef.current || isRolling || !isInitialized) return;

    setIsRolling(true);
    setResult(null);

    // Use provided values or fall back to state
    const rollDiceType = diceType || selectedDice;
    const rollQuantity = diceQuantity !== undefined ? diceQuantity : quantity;
    const rollModifier = diceModifier !== undefined ? diceModifier : modifier;

    const notation = `${rollQuantity}${rollDiceType}${rollModifier !== 0 ? (rollModifier > 0 ? `+${rollModifier}` : rollModifier) : ""}`;
    const notationForHistory = notation;

    // Update callback to handle this specific roll's modifier
    if (diceBoxRef.current) {
      diceBoxRef.current.onRollComplete = (results: any) => {
        setIsRolling(false);
        // Calculate total from results
        let total = 0;
        if (Array.isArray(results)) {
          total = results.reduce((sum: number, die: any) => {
            return sum + (die.value || die.roll || 0);
          }, 0);
        } else if (results && typeof results === "object") {
          total = results.total || results.value || 0;
        }
        // The modifier is already in the notation, so total should include it
        setResult(total);
        setRollHistory((prev) => {
          const newHistory = [{ notation: notationForHistory, result: total }, ...prev.slice(0, 9)];
          return newHistory;
        });
      };
    }

    try {
      await diceBoxRef.current.roll(notation);
    } catch (error) {
      console.error("Dice roll error:", error);
      setIsRolling(false);
      // Fallback to simple random if dice-box fails
      const diceValue = parseInt(selectedDice.substring(1));
      let total = 0;
      for (let i = 0; i < quantity; i++) {
        total += Math.floor(Math.random() * diceValue) + 1;
      }
      total += modifier;
      setResult(total);
      setRollHistory((prev) => {
        const newHistory = [{ notation: notationForHistory, result: total }, ...prev.slice(0, 9)];
        return newHistory;
      });
    }
  };

  const quickRoll = (diceType: string) => {
    // Roll immediately with the clicked dice type, don't change the selected state
    rollDice(diceType, 1, 0);
  };

  // Update result in history when we get the actual result
  useEffect(() => {
    if (result !== null && rollHistory.length > 0 && rollHistory[0].result === 0) {
      setRollHistory((prev) => {
        const updated = [...prev];
        if (updated[0]) {
          updated[0].result = result;
        }
        return updated;
      });
    }
  }, [result, rollHistory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Dice Roller</h1>
          <p className="text-muted-foreground">
            Roll dice with beautiful 3D animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Dice Canvas */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>3D Dice Roll</CardTitle>
                <CardDescription>Watch your dice roll in 3D</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  id="dice-box-container"
                  ref={containerRef}
                  className="w-full h-[500px] bg-black rounded-lg overflow-hidden relative"
                  style={{ 
                    minHeight: "500px", 
                    width: "100%", 
                    position: "relative",
                    backgroundColor: "#000000"
                  }}
                >
                  {!isInitialized && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-white text-sm">Initializing dice...</p>
                      </div>
                    </div>
                  )}
                  {isInitialized && (
                    <div className="absolute top-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded z-10">
                      Ready to roll
                    </div>
                  )}
                </div>
                {result !== null && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Result</p>
                    <p className="text-4xl font-bold text-white">{result}</p>
                    {modifier !== 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        (Base: {result - modifier} {modifier > 0 ? "+" : ""}{modifier})
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Roll</CardTitle>
                <CardDescription>Roll common dice types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {DICE_TYPES.map((dice) => (
                    <Button
                      key={dice.value}
                      variant="outline"
                      onClick={() => quickRoll(dice.value)}
                      disabled={isRolling || !isInitialized}
                      className="w-full"
                    >
                      {dice.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Roll</CardTitle>
                <CardDescription>Configure your roll</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Dice Type</label>
                  <Select
                    value={selectedDice}
                    onValueChange={setSelectedDice}
                    disabled={isRolling || !isInitialized}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DICE_TYPES.map((dice) => (
                        <SelectItem key={dice.value} value={dice.value}>
                          {dice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    disabled={isRolling || !isInitialized}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Modifier</label>
                  <Input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                    disabled={isRolling || !isInitialized}
                  />
                </div>

                <Button
                  onClick={() => rollDice()}
                  disabled={isRolling || !isInitialized}
                  className="w-full"
                  size="lg"
                >
                  {isRolling ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                      Rolling...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Roll Dice
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {rollHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rolls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {rollHistory.map((roll, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded-md bg-muted"
                      >
                        <span className="text-sm font-mono">{roll.notation}</span>
                        <span className="text-sm font-bold">{roll.result || "..."}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
