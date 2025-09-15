import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';
import AwardsForm from './AwardsForm';
import VolunteerForm from './VolunteerForm';
import ReferencesForm from './ReferencesForm';
import TemplateSelector from './TemplateSelector';
import { User, Briefcase, GraduationCap, Code, Eye, FolderOpen, Award, Globe, Trophy, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTemplate } from '../hooks/useTemplate';

interface EditFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const EditForm: React.FC<EditFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { selectedTemplateId, selectTemplate } = useTemplate();

  const tabs = [
    { 
      id: 0, 
      name: 'Template', 
      icon: Eye,
      component: (
        <TemplateSelector 
          selectedTemplate={selectedTemplateId}
          onTemplateSelect={selectTemplate}
        />
      )
    },
    { 
      id: 1, 
      name: 'Personal Info', 
      icon: User,
      component: (
        <PersonalInfoForm 
          data={data.personalInfo} 
          onChange={(personalInfo) => onChange({ personalInfo })}
        />
      )
    },
    { 
      id: 2, 
      name: 'Experience', 
      icon: Briefcase,
      component: (
        <ExperienceForm 
          data={data.experience} 
          onChange={(experience) => onChange({ experience })}
        />
      )
    },
    { 
      id: 3, 
      name: 'Education', 
      icon: GraduationCap,
      component: (
        <EducationForm 
          data={data.education} 
          onChange={(education) => onChange({ education })}
        />
      )
    },
    { 
      id: 4, 
      name: 'Skills', 
      icon: Code,
      component: (
        <SkillsForm 
          data={data.skills} 
          onChange={(skills) => onChange({ skills })}
        />
      )
    },
    { 
      id: 5, 
      name: 'Projects', 
      icon: FolderOpen,
      component: (
        <ProjectsForm 
          data={data.projects} 
          onChange={(projects) => onChange({ projects })}
        />
      )
    },
    { 
      id: 6, 
      name: 'Certifications', 
      icon: Award,
      component: (
        <CertificationsForm 
          data={data.certifications} 
          onChange={(certifications) => onChange({ certifications })}
        />
      )
    },
    { 
      id: 7, 
      name: 'Languages', 
      icon: Globe,
      component: (
        <LanguagesForm 
          data={data.languages} 
          onChange={(languages) => onChange({ languages })}
        />
      )
    },
    { 
      id: 8, 
      name: 'Awards', 
      icon: Trophy,
      component: (
        <AwardsForm 
          data={data.awards} 
          onChange={(awards) => onChange({ awards })}
        />
      )
    },
    { 
      id: 9, 
      name: 'Volunteer', 
      icon: Heart,
      component: (
        <VolunteerForm 
          data={data.volunteer} 
          onChange={(volunteer) => onChange({ volunteer })}
        />
      )
    },
    { 
      id: 10, 
      name: 'References', 
      icon: Users,
      component: (
        <ReferencesForm 
          data={data.references} 
          onChange={(references) => onChange({ references })}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFormTab"
                      className="absolute inset-0 bg-blue-600 rounded-lg"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab].component}
        </motion.div>
      </div>
    </div>
  );
};

export default EditForm;