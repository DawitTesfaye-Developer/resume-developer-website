import { ResumeTemplate } from '../types/template';

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, modern design perfect for tech and business professionals',
    category: 'modern',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    layout: 'single-column',
    features: ['Clean typography', 'Skill bars', 'Modern icons', 'Professional layout']
  },
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    description: 'Traditional, elegant design for senior executives and managers',
    category: 'classic',
    preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    layout: 'single-column',
    features: ['Traditional layout', 'Elegant typography', 'Conservative design', 'Executive focus']
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Bold, creative layout perfect for designers and creative professionals',
    category: 'creative',
    preview: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    layout: 'two-column',
    features: ['Creative layout', 'Bold colors', 'Visual elements', 'Portfolio focus']
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-clean, minimal design focusing on content over decoration',
    category: 'minimal',
    preview: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    layout: 'single-column',
    features: ['Minimal design', 'Focus on content', 'Clean lines', 'Subtle accents']
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Modern tech-focused design with clean lines and tech aesthetics',
    category: 'modern',
    preview: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
    layout: 'sidebar',
    features: ['Tech aesthetic', 'Sidebar layout', 'Modern icons', 'Skill visualization']
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    description: 'Professional corporate design in classic blue theme',
    category: 'professional',
    preview: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    layout: 'header-focus',
    features: ['Corporate style', 'Professional blue', 'Header emphasis', 'Business focused']
  },
  {
    id: 'creative-purple',
    name: 'Creative Purple',
    description: 'Vibrant purple theme for creative and marketing professionals',
    category: 'creative',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    layout: 'two-column',
    features: ['Purple theme', 'Creative layout', 'Visual hierarchy', 'Modern design']
  },
  {
    id: 'elegant-green',
    name: 'Elegant Green',
    description: 'Sophisticated green design for environmental and consulting roles',
    category: 'professional',
    preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    layout: 'single-column',
    features: ['Green theme', 'Elegant design', 'Professional layout', 'Sophisticated']
  },
  {
    id: 'startup-orange',
    name: 'Startup Orange',
    description: 'Dynamic orange theme perfect for startup and entrepreneurial roles',
    category: 'modern',
    preview: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    layout: 'sidebar',
    features: ['Orange theme', 'Dynamic design', 'Startup vibe', 'Modern layout']
  },
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    description: 'Traditional academic design for researchers and educators',
    category: 'classic',
    preview: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
    layout: 'single-column',
    features: ['Academic style', 'Traditional layout', 'Research focused', 'Scholar design']
  },
  {
    id: 'finance-gold',
    name: 'Finance Gold',
    description: 'Luxurious gold theme for finance and banking professionals',
    category: 'professional',
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    layout: 'header-focus',
    features: ['Gold accents', 'Finance focused', 'Luxurious design', 'Professional']
  },
  {
    id: 'healthcare-teal',
    name: 'Healthcare Teal',
    description: 'Calming teal design for healthcare and medical professionals',
    category: 'professional',
    preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    layout: 'two-column',
    features: ['Teal theme', 'Healthcare focused', 'Calming design', 'Medical professional']
  }
];

export const getTemplatesByCategory = (category: ResumeTemplate['category']) => {
  return resumeTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return resumeTemplates.find(template => template.id === id);
};