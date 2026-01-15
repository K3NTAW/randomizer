"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hash, Copy, Check, RefreshCw } from "lucide-react";

type GeneratorType = "integer" | "float" | "range" | "weighted" | "unique";

interface GeneratedNumber {
  value: number;
  timestamp: number;
}

export function NumberGenerator() {
  const [generatorType, setGeneratorType] = useState<GeneratorType>("integer");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [decimals, setDecimals] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<GeneratedNumber[]>([]);
  const [copied, setCopied] = useState(false);
  
  // Weighted random settings
  const [weightedValues, setWeightedValues] = useState<Array<{ value: number; weight: number }>>([
    { value: 1, weight: 10 },
    { value: 2, weight: 20 },
    { value: 3, weight: 30 },
    { value: 4, weight: 25 },
    { value: 5, weight: 15 },
  ]);

  const generateInteger = () => {
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return nums;
  };

  const generateFloat = () => {
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      const num = Math.random() * (max - min) + min;
      nums.push(parseFloat(num.toFixed(decimals)));
    }
    return nums;
  };

  const generateRange = () => {
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.random() * (max - min) + min);
    }
    return nums;
  };

  const generateWeighted = () => {
    // Calculate total weight
    const totalWeight = weightedValues.reduce((sum, item) => sum + item.weight, 0);
    
    const nums: number[] = [];
    for (let i = 0; i < count; i++) {
      let random = Math.random() * totalWeight;
      for (const item of weightedValues) {
        random -= item.weight;
        if (random <= 0) {
          nums.push(item.value);
          break;
        }
      }
    }
    return nums;
  };

  const generateUnique = () => {
    if (max - min + 1 < count) {
      alert(`Cannot generate ${count} unique numbers from range ${min}-${max}. Maximum unique numbers: ${max - min + 1}`);
      return [];
    }

    const nums: number[] = [];
    const used = new Set<number>();
    
    while (nums.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!used.has(num)) {
        used.add(num);
        nums.push(num);
      }
    }
    
    return nums.sort((a, b) => a - b);
  };

  const handleGenerate = () => {
    let newResults: number[] = [];

    switch (generatorType) {
      case "integer":
        newResults = generateInteger();
        break;
      case "float":
        newResults = generateFloat();
        break;
      case "range":
        newResults = generateRange();
        break;
      case "weighted":
        newResults = generateWeighted();
        break;
      case "unique":
        newResults = generateUnique();
        break;
    }

    setResults(newResults);
    
    // Add to history
    const newHistory = newResults.map(value => ({
      value,
      timestamp: Date.now(),
    }));
    setHistory((prev) => [...newHistory, ...prev].slice(0, 50));
  };

  const copyToClipboard = () => {
    if (results.length === 0) return;
    
    const text = results.join(", ");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addWeightedValue = () => {
    setWeightedValues([...weightedValues, { value: 0, weight: 1 }]);
  };

  const updateWeightedValue = (index: number, field: "value" | "weight", newValue: number) => {
    const updated = [...weightedValues];
    updated[index] = { ...updated[index], [field]: newValue };
    setWeightedValues(updated);
  };

  const removeWeightedValue = (index: number) => {
    setWeightedValues(weightedValues.filter((_, i) => i !== index));
  };

  const total = results.reduce((sum, num) => sum + num, 0);
  const average = results.length > 0 ? total / results.length : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Hash className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Number Generator</h1>
          <p className="text-muted-foreground">
            Generate random numbers with various options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Generator Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generator Type</CardTitle>
                <CardDescription>Choose how you want to generate numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select value={generatorType} onValueChange={(value) => setGeneratorType(value as GeneratorType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="integer">Random Integer</SelectItem>
                      <SelectItem value="float">Random Float/Decimal</SelectItem>
                      <SelectItem value="range">Number Range</SelectItem>
                      <SelectItem value="weighted">Weighted Random</SelectItem>
                      <SelectItem value="unique">Unique Numbers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Common Settings */}
                {(generatorType === "integer" || generatorType === "float" || generatorType === "range" || generatorType === "unique") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Minimum</label>
                        <Input
                          type="number"
                          value={min}
                          onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Maximum</label>
                        <Input
                          type="number"
                          value={max}
                          onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Count</label>
                      <Input
                        type="number"
                        min="1"
                        max="1000"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>
                  </>
                )}

                {/* Float-specific settings */}
                {generatorType === "float" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Decimal Places</label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={decimals}
                      onChange={(e) => setDecimals(Math.max(0, Math.min(10, parseInt(e.target.value) || 2)))}
                    />
                  </div>
                )}

                {/* Weighted random settings */}
                {generatorType === "weighted" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Count</label>
                      <Input
                        type="number"
                        min="1"
                        max="1000"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Weighted Values</label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addWeightedValue}
                        >
                          Add Value
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {weightedValues.map((item, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Input
                              type="number"
                              placeholder="Value"
                              value={item.value}
                              onChange={(e) => updateWeightedValue(index, "value", parseFloat(e.target.value) || 0)}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Weight"
                              min="1"
                              value={item.weight}
                              onChange={(e) => updateWeightedValue(index, "weight", Math.max(1, parseFloat(e.target.value) || 1))}
                              className="flex-1"
                            />
                            {weightedValues.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeWeightedValue(index)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Numbers
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {results.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Results</CardTitle>
                      <CardDescription>{results.length} number{results.length !== 1 ? "s" : ""} generated</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
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
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {results.map((num, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-background rounded-md text-sm font-mono"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Sum:</span>{" "}
                        <span className="font-bold">{total.toFixed(decimals)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Average:</span>{" "}
                        <span className="font-bold">{average.toFixed(decimals)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Min:</span>{" "}
                        <span className="font-bold">{Math.min(...results)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max:</span>{" "}
                        <span className="font-bold">{Math.max(...results)}</span>
                      </div>
                    </div>
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
                <CardDescription>Recently generated numbers</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No history yet. Generate some numbers!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded-md bg-muted"
                      >
                        <span className="text-sm font-mono">{item.value}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
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

