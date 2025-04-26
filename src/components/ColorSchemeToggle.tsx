import React, { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { HexColorPicker } from "react-colorful";

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme, setCustomColor, colorSchemes } = useColorScheme();
  const [customColor, setCustomColorState] = useState(colorScheme.primary);

  const handleCustomColorChange = (color: string) => {
    setCustomColorState(color);
  };
  
  const handleCustomColorComplete = () => {
    setCustomColor(customColor);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette 
            className="h-[1.2rem] w-[1.2rem]"
            style={{ color: colorScheme.primary }}
          />
          <span className="sr-only">Toggle color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <p className="text-sm font-medium mb-2">Preset Colors</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className={`h-6 w-6 rounded-full cursor-pointer transition-all ${
                  colorScheme.id === scheme.id ? "ring-2 ring-offset-2 ring-offset-background" : ""
                }`}
                style={{ backgroundColor: scheme.primary }}
                title={scheme.name}
              />
            ))}
          </div>

          <DropdownMenuSeparator />
          
          <p className="text-sm font-medium mb-2 mt-2">Custom Color</p>
          <HexColorPicker 
            color={customColor} 
            onChange={handleCustomColorChange}
            onMouseUp={handleCustomColorComplete}
            onTouchEnd={handleCustomColorComplete}
            className="w-full mb-2"
          />
          <div className="flex items-center gap-2 mt-2">
            <div 
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: customColor }}
            />
            <div className="text-xs opacity-70">{customColor}</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto text-xs h-7"
              onClick={handleCustomColorComplete}
            >
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 