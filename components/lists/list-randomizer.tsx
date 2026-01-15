"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { List, Copy, Check, RefreshCw, Plus, Trash2, Shuffle } from "lucide-react";

type ListMode = "picker" | "shuffle" | "weighted" | "multiple";

interface ListItem {
  id: string;
  text: string;
  weight?: number;
}

interface SelectedItem {
  item: string;
  timestamp: number;
}

export function ListRandomizer() {
  const [listMode, setListMode] = useState<ListMode>("picker");
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", text: "Item 1", weight: 1 },
    { id: "2", text: "Item 2", weight: 1 },
    { id: "3", text: "Item 3", weight: 1 },
  ]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemWeight, setNewItemWeight] = useState(1);
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [shuffledList, setShuffledList] = useState<string[]>([]);
  const [history, setHistory] = useState<SelectedItem[]>([]);
  const [copied, setCopied] = useState(false);

  const addItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem: ListItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      weight: listMode === "weighted" ? newItemWeight : undefined,
    };
    
    setItems([...items, newItem]);
    setNewItemText("");
    setNewItemWeight(1);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: "text" | "weight", value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const pickRandomItem = () => {
    if (items.length === 0) return;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex].text;
  };

  const pickRandomItems = (count: number) => {
    if (items.length === 0) return [];
    if (count >= items.length) return items.map((item) => item.text);
    
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((item) => item.text);
  };

  const pickWeightedItem = () => {
    if (items.length === 0) return "";
    
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
      random -= item.weight || 1;
      if (random <= 0) {
        return item.text;
      }
    }
    
    return items[0].text;
  };

  const shuffleList = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.map((item) => item.text);
  };

  const handlePick = () => {
    if (items.length === 0) {
      alert("Please add at least one item to the list");
      return;
    }

    let results: string[] = [];

    switch (listMode) {
      case "picker":
        results = [pickRandomItem()];
        break;
      case "multiple":
        if (selectedCount > items.length) {
          alert(`Cannot select ${selectedCount} items from a list of ${items.length} items`);
          return;
        }
        results = pickRandomItems(selectedCount);
        break;
      case "weighted":
        results = [pickWeightedItem()];
        break;
      case "shuffle":
        results = shuffleList();
        break;
    }

    if (listMode === "shuffle") {
      setShuffledList(results);
    } else {
      setSelectedItems(results);
    }

    // Add to history
    const newHistory = results.map((item) => ({
      item,
      timestamp: Date.now(),
    }));
    setHistory((prev) => [...newHistory, ...prev].slice(0, 50));
  };

  const copyToClipboard = () => {
    const text = listMode === "shuffle" 
      ? shuffledList.join("\n")
      : selectedItems.join(", ");
    
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearList = () => {
    if (confirm("Are you sure you want to clear the entire list?")) {
      setItems([]);
      setSelectedItems([]);
      setShuffledList([]);
    }
  };

  const importList = (text: string) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    
    const newItems: ListItem[] = lines.map((line, index) => ({
      id: Date.now().toString() + index,
      text: line,
      weight: listMode === "weighted" ? 1 : undefined,
    }));
    
    setItems([...items, ...newItems]);
  };

  const exportList = () => {
    const text = items.map((item) => item.text).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <List className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">List Randomizer</h1>
          <p className="text-muted-foreground">
            Shuffle lists and pick random items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mode Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Randomizer Mode</CardTitle>
                <CardDescription>Choose how you want to randomize your list</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={listMode} onValueChange={(value) => setListMode(value as ListMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="picker">Random Item Picker</SelectItem>
                    <SelectItem value="multiple">Multiple Item Selection</SelectItem>
                    <SelectItem value="weighted">Weighted List Selection</SelectItem>
                    <SelectItem value="shuffle">List Shuffler</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* List Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>List Items</CardTitle>
                    <CardDescription>
                      {items.length} item{items.length !== 1 ? "s" : ""} in list
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportList}>
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearList}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Item */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter item text..."
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addItem()}
                    className="flex-1"
                  />
                  {listMode === "weighted" && (
                    <Input
                      type="number"
                      min="1"
                      placeholder="Weight"
                      value={newItemWeight}
                      onChange={(e) => setNewItemWeight(parseInt(e.target.value) || 1)}
                      className="w-24"
                    />
                  )}
                  <Button onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Import from text */}
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Import from text (one item per line)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <textarea
                      className="w-full p-2 rounded-md border bg-background text-sm"
                      rows={4}
                      placeholder="Paste items here, one per line..."
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          importList(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </details>

                {/* Item List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No items in list. Add some items to get started!
                    </p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-2 items-center p-2 rounded-md bg-muted"
                      >
                        <Input
                          value={item.text}
                          onChange={(e) => updateItem(item.id, "text", e.target.value)}
                          className="flex-1"
                        />
                        {listMode === "weighted" && (
                          <Input
                            type="number"
                            min="1"
                            value={item.weight || 1}
                            onChange={(e) => updateItem(item.id, "weight", parseInt(e.target.value) || 1)}
                            className="w-24"
                            placeholder="Weight"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selection Settings */}
            {listMode === "multiple" && (
              <Card>
                <CardHeader>
                  <CardTitle>Selection Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Number of items to select
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max={items.length}
                      value={selectedCount}
                      onChange={(e) => setSelectedCount(Math.max(1, Math.min(items.length, parseInt(e.target.value) || 1)))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum: {items.length} items
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generate Button */}
            <Button onClick={handlePick} className="w-full" size="lg" disabled={items.length === 0}>
              {listMode === "shuffle" ? (
                <>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle List
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Pick Random
                </>
              )}
            </Button>

            {/* Results */}
            {(selectedItems.length > 0 || shuffledList.length > 0) && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {listMode === "shuffle" ? "Shuffled List" : "Selected Items"}
                      </CardTitle>
                      <CardDescription>
                        {listMode === "shuffle"
                          ? `${shuffledList.length} items`
                          : `${selectedItems.length} item${selectedItems.length !== 1 ? "s" : ""} selected`}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
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
                  <div className="space-y-2">
                    {listMode === "shuffle" ? (
                      <ol className="list-decimal list-inside space-y-1">
                        {shuffledList.map((item, index) => (
                          <li key={index} className="p-2 bg-muted rounded-md">
                            {item}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedItems.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
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
                <CardDescription>Recently selected items</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No history yet. Pick some items!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 rounded-md bg-muted"
                      >
                        <span className="text-sm">{item.item}</span>
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

