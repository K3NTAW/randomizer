"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedDiceProps {
  value: number;
  sides: number;
  isRolling: boolean;
  size?: "sm" | "md" | "lg";
}

export function AnimatedDice({ value, sides, isRolling, size = "md" }: AnimatedDiceProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [rollingValues, setRollingValues] = useState<number[]>([]);

  useEffect(() => {
    if (isRolling) {
      // Generate random values during roll animation
      const interval = setInterval(() => {
        setRollingValues(
          Array.from({ length: 6 }, () => Math.floor(Math.random() * sides) + 1)
        );
      }, 100);
      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
      setRollingValues([]);
    }
  }, [isRolling, value, sides]);

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-20 h-20 text-2xl",
    lg: "w-32 h-32 text-4xl",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 shadow-lg",
        sizeClasses[size],
        isRolling && "animate-spin"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isRolling ? (
          <div className="text-primary font-bold">
            {rollingValues[0] || "?"}
          </div>
        ) : (
          <div className="text-primary font-bold">{displayValue}</div>
        )}
      </div>
      {isRolling && (
        <div className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse" />
      )}
    </div>
  );
}

interface DiceDisplayProps {
  dice: Array<{ sides: number; value: number }>;
  isRolling: boolean;
}

export function DiceDisplay({ dice, isRolling }: DiceDisplayProps) {
  if (dice.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Click roll to start</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[400px] bg-muted rounded-lg p-8 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {dice.map((die, index) => (
          <AnimatedDice
            key={index}
            value={die.value}
            sides={die.sides}
            isRolling={isRolling}
            size={dice.length > 3 ? "sm" : "md"}
          />
        ))}
      </div>
    </div>
  );
}

