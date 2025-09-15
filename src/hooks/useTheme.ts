import { useState, useEffect } from 'react';
import { Theme, CustomTheme, BackgroundOption } from '../types/theme';
import { predefinedThemes, backgroundOptions } from '../data/themes';

const THEME_STORAGE_KEY = 'resumeGeneratorTheme';

export const useTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(predefinedThemes[0]);
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.isCustom) {
          setCustomTheme(parsed.customTheme);
          setIsCustomMode(true);
        } else {
          const theme = predefinedThemes.find(t => t.id === parsed.themeId);
          if (theme) {
            setSelectedTheme(theme);
          }
        }
      } catch (error) {
        console.error('Error loading saved theme:', error);
      }
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setIsCustomMode(false);
    setCustomTheme(null);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({
      isCustom: false,
      themeId: theme.id
    }));
  };

  const applyCustomTheme = (custom: CustomTheme) => {
    setCustomTheme(custom);
    setIsCustomMode(true);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({
      isCustom: true,
      customTheme: custom
    }));
  };

  const getCurrentTheme = (): Theme => {
    if (isCustomMode && customTheme) {
      return {
        id: 'custom',
        name: 'Custom',
        colors: customTheme.colors,
        gradients: {
          header: customTheme.headerStyle === 'gradient' 
            ? `linear-gradient(135deg, ${customTheme.colors.primary} 0%, ${customTheme.colors.secondary} 100%)`
            : customTheme.colors.primary,
          background: customTheme.background.value
        }
      };
    }
    return selectedTheme;
  };

  const getCurrentBackground = (): BackgroundOption => {
    if (isCustomMode && customTheme) {
      return customTheme.background;
    }
    return backgroundOptions[0]; // Default white background
  };

  return {
    selectedTheme,
    customTheme,
    isCustomMode,
    currentTheme: getCurrentTheme(),
    currentBackground: getCurrentBackground(),
    predefinedThemes,
    backgroundOptions,
    applyTheme,
    applyCustomTheme,
    setIsCustomMode
  };
};