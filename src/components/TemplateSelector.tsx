import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Eye, Palette, Briefcase, Sparkles, Minus, Building } from 'lucide-react';
import { resumeTemplates, getTemplatesByCategory } from '../data/templates';
import { ResumeTemplate } from '../types/template';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  const [activeCategory, setActiveCategory] = useState<ResumeTemplate['category']>('modern');

  const categories = [
    { id: 'modern', name: 'Modern', icon: Sparkles, color: 'bg-blue-500' },
    { id: 'classic', name: 'Classic', icon: Building, color: 'bg-gray-600' },
    { id: 'creative', name: 'Creative', icon: Palette, color: 'bg-purple-500' },
    { id: 'minimal', name: 'Minimal', icon: Minus, color: 'bg-green-500' },
    { id: 'professional', name: 'Professional', icon: Briefcase, color: 'bg-indigo-600' }
  ] as const;

  const filteredTemplates = getTemplatesByCategory(activeCategory);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Choose Template</h2>
          <p className="text-gray-600">Select a professional template for your resume</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 ${category.color} rounded-lg`}
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {/* Template Preview */}
              <div 
                className="w-full h-32 rounded-lg mb-4 relative overflow-hidden"
                style={{ background: template.preview }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                  <div className="text-white text-xs font-medium bg-black bg-opacity-30 px-2 py-1 rounded">
                    {template.layout.replace('-', ' ').toUpperCase()}
                  </div>
                </div>
                
                {/* Mock content overlay */}
                <div className="absolute inset-4 bg-white bg-opacity-90 rounded p-2">
                  <div className="h-2 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-200 rounded mb-2"></div>
                  <div className="flex space-x-1 mb-1">
                    <div className="h-1 bg-gray-200 rounded flex-1"></div>
                    <div className="h-1 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="h-1 bg-gray-200 rounded mb-1"></div>
                  <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>

              {/* Template Info */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-1 rounded-full text-white ${
                  categories.find(c => c.id === template.category)?.color || 'bg-gray-500'
                }`}>
                  {template.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Template Count */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Showing {filteredTemplates.length} {activeCategory} templates
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;