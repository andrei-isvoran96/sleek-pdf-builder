import React, { createContext, useContext, useState, ReactNode } from "react";

export type ColorScheme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  badge: string;
};

// Available color schemes
export const colorSchemes: ColorScheme[] = [
  {
    id: "purple",
    name: "Purple",
    primary: "#7c3aed", // Violet-600
    secondary: "#a78bfa", // Violet-400
    accent: "#8b5cf6", // Violet-500
    badge: "bg-purple-50 text-purple-700"
  },
  {
    id: "blue",
    name: "Blue",
    primary: "#2563eb", // Blue-600
    secondary: "#60a5fa", // Blue-400
    accent: "#3b82f6", // Blue-500
    badge: "bg-blue-50 text-blue-700"
  },
  {
    id: "green",
    name: "Green",
    primary: "#16a34a", // Green-600
    secondary: "#4ade80", // Green-400
    accent: "#22c55e", // Green-500
    badge: "bg-green-50 text-green-700"
  },
  {
    id: "red",
    name: "Red",
    primary: "#dc2626", // Red-600
    secondary: "#f87171", // Red-400
    accent: "#ef4444", // Red-500
    badge: "bg-red-50 text-red-700"
  }
];

// Context type
interface ColorSchemeContextProps {
  colorScheme: ColorScheme;
  setColorScheme: (schemeId: string) => void;
  setCustomColor: (color: string) => void;
  colorSchemes: ColorScheme[];
}

// Create context
const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

// Helper function to generate secondary and accent variants from a primary color
const generateColorVariants = (primary: string): { secondary: string; accent: string } => {
  // Convert hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgb = hexToRgb(primary);
  
  // For secondary (lighter version), increase the values while keeping them under 255
  const secondaryRgb = {
    r: Math.min(rgb.r + 70, 255),
    g: Math.min(rgb.g + 70, 255),
    b: Math.min(rgb.b + 70, 255)
  };
  
  // For accent (slightly lighter than primary), increase the values slightly
  const accentRgb = {
    r: Math.min(rgb.r + 30, 255),
    g: Math.min(rgb.g + 30, 255),
    b: Math.min(rgb.b + 30, 255)
  };
  
  return {
    secondary: rgbToHex(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b),
    accent: rgbToHex(accentRgb.r, accentRgb.g, accentRgb.b)
  };
};

// Provider component
export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0]);

  const setColorScheme = (schemeId: string) => {
    const scheme = colorSchemes.find(s => s.id === schemeId);
    if (scheme) {
      setSelectedScheme(scheme);
      // Remove persistence
      // localStorage.setItem("color-scheme", schemeId);
      // localStorage.removeItem("custom-color");
    }
  };

  const setCustomColor = (color: string) => {
    const { secondary, accent } = generateColorVariants(color);
    const customScheme: ColorScheme = {
      id: "custom",
      name: "Custom",
      primary: color,
      secondary: secondary,
      accent: accent,
      badge: `bg-opacity-10 text-opacity-100`
    };
    setSelectedScheme(customScheme);
    // Remove persistence
    // localStorage.setItem("custom-color", color);
    // localStorage.removeItem("color-scheme");
  };

  const value = {
    colorScheme: selectedScheme,
    setColorScheme,
    setCustomColor,
    colorSchemes
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

// Custom hook to use the color scheme context
export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
}; 