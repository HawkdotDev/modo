import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { ThemeColors, darkTheme, lightTheme } from '../types/timer';
import { StorageService } from '../services/storageService';

interface ThemeContextValue {
  colors: ThemeColors;
  isDark: boolean;
  setColors: (colors: ThemeColors) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => StorageService.getIsDark());
  const [colors, setColorsState] = useState<ThemeColors>(() => StorageService.getThemeColors());

  useEffect(() => {
    StorageService.setIsDark(isDark);
  }, [isDark]);

  useEffect(() => {
    StorageService.setThemeColors(colors);
  }, [colors]);

  const setColors = useCallback((newColors: ThemeColors) => {
    setColorsState(newColors);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      setColorsState(next ? darkTheme : lightTheme);
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    colors,
    isDark,
    setColors,
    toggleTheme
  }), [colors, isDark, setColors, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
