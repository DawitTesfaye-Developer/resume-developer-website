import { useState, useEffect } from 'react';
import { ResumeTemplate } from '../types/template';
import { resumeTemplates, getTemplateById } from '../data/templates';

const TEMPLATE_STORAGE_KEY = 'resumeGeneratorTemplate';

export const useTemplate = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('modern-professional');

  useEffect(() => {
    const savedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (savedTemplate) {
      try {
        const templateId = JSON.parse(savedTemplate);
        if (getTemplateById(templateId)) {
          setSelectedTemplateId(templateId);
        }
      } catch (error) {
        console.error('Error loading saved template:', error);
      }
    }
  }, []);

  const selectTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(templateId));
    }
  };

  const getCurrentTemplate = (): ResumeTemplate | undefined => {
    return getTemplateById(selectedTemplateId);
  };

  return {
    selectedTemplateId,
    currentTemplate: getCurrentTemplate(),
    availableTemplates: resumeTemplates,
    selectTemplate
  };
};