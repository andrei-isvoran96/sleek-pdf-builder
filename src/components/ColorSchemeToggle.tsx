import React from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColorScheme, ColorScheme } from "@/contexts/ColorSchemeContext";

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme, colorSchemes } = useColorScheme();

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
      <DropdownMenuContent align="end">
        {colorSchemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.id}
            onClick={() => setColorScheme(scheme.id)}
            className="cursor-pointer flex items-center gap-2"
          >
            <div 
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: scheme.primary }} 
            />
            {scheme.name}
            {colorScheme.id === scheme.id && (
              <span className="text-xs ml-auto">Active</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 