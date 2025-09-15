import React, { useState } from 'react';
import { FileText, Download, Eye, Settings, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeCustomizer from './ThemeCustomizer';

interface HeaderProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onExportPDF: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentStep, onStepChange, onExportPDF }) => {
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);

  const steps = [
    { id: 0, name: 'Edit', icon: Settings },
    { id: 1, name: 'Preview', icon: Eye },
    { id: 2, name: 'Export', icon: Download }
  ];

  const isExportDisabled = currentStep === 0;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Generator</h1>
                <p className="text-sm text-gray-500">Create your professional resume</p>
              </div>
            </div>

            <nav className="flex items-center space-x-1">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => onStepChange(step.id)}
                    className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{step.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-600 rounded-lg"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsThemeCustomizerOpen(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Palette className="w-4 h-4" />
                <span>Themes</span>
              </button>

              <button
                onClick={onExportPDF}
                disabled={isExportDisabled}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg flex items-center space-x-2 ${
                  isExportDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <ThemeCustomizer 
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
      />
    </>
  );
};

export default Header;