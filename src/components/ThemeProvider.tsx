import { createContext, useContext } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: "dark";
  setTheme: (theme: "dark") => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const value: ThemeProviderState = {
    theme: "dark",
    setTheme: () => {},
  };

  // Always set the root class to dark
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
