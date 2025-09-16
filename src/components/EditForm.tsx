import React from 'react';
import { ResumeData } from '../types/resume';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';
import VolunteerForm from './VolunteerForm';
import AwardsForm from './AwardsForm';
import ReferencesForm from './ReferencesForm';

interface EditFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'languages', label: 'Languages', icon: '🌍' },
  { id: 'volunteer', label: 'Volunteer', icon: '🤝' },
  { id: 'awards', label: 'Awards', icon: '🏆' },
  { id: 'references', label: 'References', icon: '📞' },
];

const EditForm: React.FC<EditFormProps> = ({ data, onChange, activeSection, onSectionChange }) => {
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm data={data} onChange={onChange} />;
      case 'experience':
        return <ExperienceForm data={data} onChange={onChange} />;
      case 'education':
        return <EducationForm data={data} onChange={onChange} />;
      case 'skills':
        return <SkillsForm data={data} onChange={onChange} />;
      case 'projects':
        return <ProjectsForm data={data} onChange={onChange} />;
      case 'certifications':
        return <CertificationsForm data={data} onChange={onChange} />;
      case 'languages':
        return <LanguagesForm data={data} onChange={onChange} />;
      case 'volunteer':
        return <VolunteerForm data={data} onChange={onChange} />;
      case 'awards':
        return <AwardsForm data={data} onChange={onChange} />;
      case 'references':
        return <ReferencesForm data={data} onChange={onChange} />;
      default:
        return <PersonalInfoForm data={data} onChange={onChange} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Section Navigation */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default EditForm;