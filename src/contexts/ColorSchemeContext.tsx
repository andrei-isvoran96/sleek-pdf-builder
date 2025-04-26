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
  colorSchemes: ColorScheme[];
}

// Create context
const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

// Provider component
export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0]);

  const setColorScheme = (schemeId: string) => {
    const scheme = colorSchemes.find(s => s.id === schemeId);
    if (scheme) {
      setSelectedScheme(scheme);
      // Save to localStorage for persistence
      localStorage.setItem("color-scheme", schemeId);
    }
  };

  // Check for saved preference
  React.useEffect(() => {
    const savedScheme = localStorage.getItem("color-scheme");
    if (savedScheme) {
      setColorScheme(savedScheme);
    }
  }, []);

  const value = {
    colorScheme: selectedScheme,
    setColorScheme,
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