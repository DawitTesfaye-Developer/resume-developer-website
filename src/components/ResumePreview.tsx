import React from 'react';
import { ResumeData } from '../types/resume';
import { Template } from '../types/template';
import { Theme } from '../types/theme';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Calendar,
  Star,
  ExternalLink,
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Rocket,
  Award,
  Globe2,
  Heart,
  Trophy,
  Users
} from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  // Default theme colors
  const theme = {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6'
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          i < level ? 'fill-current text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderProgressBar = (level: number) => {
    const percentage = (level / 5) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
        <div
          className="h-2 sm:h-2.5 rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: theme.primary,
          }}
        />
      </div>
    );
  };

  const getSectionIcon = (section: string) => {
    const iconMap = {
      experience: Briefcase,
      education: GraduationCap,
      skills: Zap,
      projects: Rocket,
      certifications: Award,
      languages: Globe2,
      volunteer: Heart,
      awards: Trophy,
      references: Users,
    };
    return iconMap[section as keyof typeof iconMap] || User;
  };

  const renderSectionHeader = (title: string, icon: React.ComponentType<any>) => {
    const IconComponent = icon;
    return (
      <div className="flex items-center mb-4 sm:mb-6">
        <div 
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg mr-3 sm:mr-4"
          style={{ backgroundColor: theme.primary }}
        >
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h2 
          className="text-xl sm:text-2xl lg:text-3xl font-bold"
          style={{ color: theme.primary }}
        >
          {title}
        </h2>
      </div>
    );
  };

  return (
    <div id="resume-preview" className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto">
        {/* Header */}
        <div 
          className="relative p-6 sm:p-8 lg:p-12 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          }}
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full border-2 border-white transform -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-36 sm:h-36 rounded-full border-2 border-white transform translate-x-12 translate-y-12"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4">
              {`${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim() || 'Your Name'}
            </h1>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {data.personalInfo.email && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{data.personalInfo.website}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">LinkedIn</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">GitHub</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-12">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-8 sm:mb-12">
              {renderSectionHeader('Professional Summary', User)}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                  {data.personalInfo.summary}
                </p>
              </div>
            </div>
          )}

          {/* Two Column Layout for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-8 sm:space-y-12">
              {/* Experience */}
              {data.experience.length > 0 && (
                <div>
                  {renderSectionHeader('Experience', Briefcase)}
                  <div className="space-y-4 sm:space-y-6">
                    {data.experience.map((exp, index) => (
                      <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: theme.primary }}></div>
                        
                        <div className="ml-6 sm:ml-8 bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{exp.position}</h3>
                            <div className="flex items-center mt-1 sm:mt-0">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-500" />
                              <span className="text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm sm:text-base font-medium text-gray-600 mb-2 sm:mb-3">{exp.company}</p>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects.length > 0 && (
                <div>
                  {renderSectionHeader('Projects', Rocket)}
                  <div className="grid gap-4 sm:gap-6">
                    {data.projects.map((project, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{project.name}</h3>
                          <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                              >
                                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span>Live Demo</span>
                              </a>
                            )}
                            {project.github && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-600 hover:text-gray-800 text-xs sm:text-sm"
                              >
                                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span>Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex} 
                                className="px-2 py-1 text-xs sm:text-sm rounded-full border"
                                style={{ 
                                  borderColor: theme.primary,
                                  color: theme.primary,
                                  backgroundColor: `${theme.primary}10`
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8 sm:space-y-12">
              {/* Education */}
              {data.education.length > 0 && (
                <div>
                  {renderSectionHeader('Education', GraduationCap)}
                  <div className="space-y-4 sm:space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                          <span className="text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-600 mt-1 sm:mt-0">
                            {edu.endDate}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-600 mb-1">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && (
                <div>
                  {renderSectionHeader('Skills', Zap)}
                  <div className="grid gap-3 sm:gap-4">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800">{skill.name}</h3>
                          <div className="flex space-x-1">
                            {renderStars(skill.level)}
                          </div>
                        </div>
                        {renderProgressBar(skill.level)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional sections in cards */}
              {data.certifications.length > 0 && (
                <div>
                  {renderSectionHeader('Certifications', Award)}
                  <div className="space-y-3 sm:space-y-4">
                    {data.certifications.map((cert, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{cert.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{cert.issuer}</p>
                        {cert.date && (
                          <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.languages.length > 0 && (
                <div>
                  {renderSectionHeader('Languages', Globe2)}
                  <div className="grid gap-3 sm:gap-4">
                    {data.languages.map((lang, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800">{lang.name}</h3>
                          <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {lang.proficiency}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.volunteer.length > 0 && (
                <div>
                  {renderSectionHeader('Volunteer Experience', Heart)}
                  <div className="space-y-3 sm:space-y-4">
                    {data.volunteer.map((vol, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{vol.position}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{vol.organization}</p>
                        <p className="text-xs text-gray-500 mt-1">{vol.startDate} - {vol.current ? 'Present' : vol.endDate}</p>
                        {vol.description && (
                          <p className="text-xs sm:text-sm text-gray-700 mt-2">{vol.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.awards.length > 0 && (
                <div>
                  {renderSectionHeader('Awards', Trophy)}
                  <div className="space-y-3 sm:space-y-4">
                    {data.awards.map((award, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{award.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{award.issuer}</p>
                        {award.date && (
                          <p className="text-xs text-gray-500 mt-1">{award.date}</p>
                        )}
                        {award.description && (
                          <p className="text-xs sm:text-sm text-gray-700 mt-2">{award.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.references.length > 0 && (
                <div>
                  {renderSectionHeader('References', Users)}
                  <div className="space-y-3 sm:space-y-4">
                    {data.references.map((ref, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{ref.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{ref.position}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{ref.company}</p>
                        {ref.email && (
                          <p className="text-xs text-gray-500 mt-1">{ref.email}</p>
                        )}
                        {ref.phone && (
                          <p className="text-xs text-gray-500">{ref.phone}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ResumePreview;