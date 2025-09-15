import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Settings, X, Check, Paintbrush, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { CustomTheme, BackgroundOption } from '../types/theme';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ isOpen, onClose }) => {
  const { 
    predefinedThemes, 
    backgroundOptions, 
    currentTheme, 
    currentBackground,
    customTheme,
    isCustomMode,
    applyTheme, 
    applyCustomTheme,
    setIsCustomMode
  } = useTheme();

  const [activeTab, setActiveTab] = useState<'themes' | 'colors' | 'backgrounds'>('themes');
  const [tempCustomTheme, setTempCustomTheme] = useState<CustomTheme>(
    customTheme || {
      colors: currentTheme.colors,
      background: currentBackground,
      headerStyle: 'gradient'
    }
  );

  const handleColorChange = (colorKey: keyof CustomTheme['colors'], value: string) => {
    setTempCustomTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const handleBackgroundChange = (background: BackgroundOption) => {
    setTempCustomTheme(prev => ({
      ...prev,
      background
    }));
  };

  const handleHeaderStyleChange = (style: 'solid' | 'gradient') => {
    setTempCustomTheme(prev => ({
      ...prev,
      headerStyle: style
    }));
  };

  const applyCustomChanges = () => {
    applyCustomTheme(tempCustomTheme);
    setIsCustomMode(true);
  };

  const resetToTheme = (themeId: string) => {
    const theme = predefinedThemes.find(t => t.id === themeId);
    if (theme) {
      applyTheme(theme);
      setTempCustomTheme({
        colors: theme.colors,
        background: backgroundOptions[0],
        headerStyle: 'gradient'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Theme Customizer</h2>
                <p className="text-gray-600">Personalize your resume appearance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'themes', name: 'Themes', icon: Palette },
              { id: 'colors', name: 'Colors', icon: Paintbrush },
              { id: 'backgrounds', name: 'Backgrounds', icon: ImageIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'themes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentTheme.id === theme.id && !isCustomMode
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => resetToTheme(theme.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                      {currentTheme.id === theme.id && !isCustomMode && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    
                    {/* Theme Preview */}
                    <div className="space-y-2">
                      <div 
                        className="h-8 rounded"
                        style={{ background: theme.gradients.header }}
                      />
                      <div className="flex space-x-2">
                        <div 
                          className="flex-1 h-4 rounded"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="flex-1 h-4 rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div 
                          className="flex-1 h-4 rounded"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(tempCustomTheme.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof CustomTheme['colors'], e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key as keyof CustomTheme['colors'], e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Header Style</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleHeaderStyleChange('solid')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        tempCustomTheme.headerStyle === 'solid'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => handleHeaderStyleChange('gradient')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        tempCustomTheme.headerStyle === 'gradient'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Gradient
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backgrounds' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {backgroundOptions.map((bg) => (
                  <motion.div
                    key={bg.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      tempCustomTheme.background.id === bg.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleBackgroundChange(bg)}
                  >
                    <div 
                      className="w-full h-16 rounded mb-2"
                      style={{ background: bg.preview }}
                    />
                    <p className="text-sm font-medium text-gray-900 text-center">{bg.name}</p>
                    {tempCustomTheme.background.id === bg.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-purple-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {isCustomMode ? 'Using custom theme' : `Using ${currentTheme.name} theme`}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  applyCustomChanges();
                  onClose();
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeCustomizer;