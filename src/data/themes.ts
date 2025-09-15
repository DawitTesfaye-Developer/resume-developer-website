import { Theme, BackgroundOption } from '../types/theme';

export const predefinedThemes: Theme[] = [
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#ffffff',
      surface: '#f8fafc',
      border: '#e5e7eb'
    },
    gradients: {
      header: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }
  },
  {
    id: 'emerald-fresh',
    name: 'Emerald Fresh',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#ffffff',
      surface: '#f0fdf4',
      border: '#d1fae5'
    },
    gradients: {
      header: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
    }
  },
  {
    id: 'purple-modern',
    name: 'Purple Modern',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#ffffff',
      surface: '#faf5ff',
      border: '#e9d5ff'
    },
    gradients: {
      header: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)'
    }
  },
  {
    id: 'rose-elegant',
    name: 'Rose Elegant',
    colors: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      accent: '#fb7185',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#ffffff',
      surface: '#fff1f2',
      border: '#fecdd3'
    },
    gradients: {
      header: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)'
    }
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    colors: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      accent: '#60a5fa',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      background: '#111827',
      surface: '#1f2937',
      border: '#374151'
    },
    gradients: {
      header: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)'
    }
  },
  {
    id: 'orange-creative',
    name: 'Orange Creative',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#ffffff',
      surface: '#fff7ed',
      border: '#fed7aa'
    },
    gradients: {
      header: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
    }
  }
];

export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'white',
    name: 'Clean White',
    type: 'color',
    value: '#ffffff',
    preview: '#ffffff'
  },
  {
    id: 'light-gray',
    name: 'Light Gray',
    type: 'color',
    value: '#f8fafc',
    preview: '#f8fafc'
  },
  {
    id: 'warm-white',
    name: 'Warm White',
    type: 'color',
    value: '#fefcf3',
    preview: '#fefcf3'
  },
  {
    id: 'gradient-blue',
    name: 'Blue Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    preview: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
  },
  {
    id: 'gradient-green',
    name: 'Green Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    preview: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
  },
  {
    id: 'gradient-purple',
    name: 'Purple Gradient',
    type: 'gradient',
    value: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    preview: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)'
  },
  {
    id: 'subtle-pattern',
    name: 'Subtle Pattern',
    type: 'image',
    value: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    preview: '#f8fafc'
  },
  {
    id: 'geometric-pattern',
    name: 'Geometric Pattern',
    type: 'image',
    value: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23e2e8f0" fill-opacity="0.3" fill-rule="evenodd"%3E%3Cpath d="m0 40l40-40h-40v40zm40 0v-40h-40l40 40z"/%3E%3C/g%3E%3C/svg%3E")',
    preview: '#f1f5f9'
  }
];