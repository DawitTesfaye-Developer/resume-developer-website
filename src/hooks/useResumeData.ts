import { useState, useEffect } from 'react';
import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resumeGeneratorData';

const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  volunteer: [],
  references: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
  }, []);

  const updateResumeData = (newData: Partial<ResumeData>) => {
    const updatedData = { ...resumeData, ...newData };
    setResumeData(updatedData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    resumeData,
    updateResumeData,
    resetResumeData
  };
};