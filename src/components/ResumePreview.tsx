import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Star, Award, Briefcase, GraduationCap, Code, User, Heart, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTemplate } from '../hooks/useTemplate';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { currentTheme, currentBackground } = useTheme();
  const { currentTemplate } = useTemplate();
  const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();

  const renderStars = (level: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= level
                ? 'fill-current'
                : 'text-gray-300'
            }`}
            style={{ color: star <= level ? currentTheme.colors.primary : undefined }}
          />
        ))}
      </div>
    );
  };

  const headerStyle = currentTheme.gradients.header.includes('gradient') 
    ? { background: currentTheme.gradients.header }
    : { backgroundColor: currentTheme.colors.primary };

  // Template-specific layouts
  const renderSingleColumnLayout = () => (
    <div 
      id="resume-preview" 
      className="shadow-2xl rounded-2xl overflow-hidden max-w-4xl mx-auto bg-white w-full"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        background: currentBackground.type === 'color' 
          ? currentTheme.colors.background 
          : currentBackground.value 
      }}
    >
      {/* Header */}
      <div 
        className="text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden"
        style={headerStyle}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-white transform translate-x-8 sm:translate-x-12 lg:translate-x-16 -translate-y-8 sm:-translate-y-12 lg:-translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 rounded-full bg-white transform -translate-x-6 sm:-translate-x-9 lg:-translate-x-12 translate-y-6 sm:translate-y-9 lg:translate-y-12"></div>
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3 tracking-tight">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 tracking-tight">
            {fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-6 text-white text-opacity-95 text-sm sm:text-base lg:text-lg">
            {data.personalInfo.email && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base hidden sm:inline">{data.personalInfo.website}</span>
                <span className="text-xs sm:hidden">Website</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">LinkedIn</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">GitHub</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <User 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Professional Summary
              </h2>
            </div>
            <div 
              className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl border-l-4"
              style={{ 
                borderLeftColor: currentTheme.colors.primary,
                backgroundColor: currentTheme.colors.surface
              }}
            >
              <p 
                className="text-sm sm:text-base lg:text-lg leading-relaxed"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {data.personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Briefcase 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Work Experience
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {data.experience.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="relative bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-2 sm:-left-3 top-4 sm:top-6 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-white shadow-lg"
                    style={{ backgroundColor: currentTheme.colors.primary }}
                  />
                  
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                    <div>
                      <h3 
                        className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {exp.position}
                      </h3>
                      <div 
                        className="text-sm sm:text-base lg:text-lg font-semibold mb-2"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        {exp.company} • {exp.location}
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-1 sm:space-x-2 bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 lg:mt-0"
                      style={{ 
                        backgroundColor: currentTheme.colors.accent + '20',
                        color: currentTheme.colors.accent
                      }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                  <p 
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.secondary + '20' }}
              >
                <GraduationCap 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.secondary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Education
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {data.education.map((edu) => (
                <div 
                  key={edu.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-2"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {edu.degree} in {edu.field}
                  </h3>
                  <div 
                    className="text-sm sm:text-base font-semibold mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {edu.institution}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
                    <span 
                      className="flex items-center space-x-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{edu.location}</span>
                    </span>
                    <span 
                      className="flex items-center space-x-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </span>
                  </div>
                  {edu.gpa && (
                    <div 
                      className="mt-2 text-xs sm:text-sm font-medium"
                      style={{ color: currentTheme.colors.accent }}
                    >
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Code 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Skills & Expertise
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {['Technical', 'Languages', 'Tools', 'Soft Skills', 'Other'].map((category) => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                    <h3 
                      className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 border-b"
                      style={{ 
                        color: currentTheme.colors.text,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      {category}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span 
                              className="text-sm sm:text-base font-medium"
                              style={{ color: currentTheme.colors.text }}
                            >
                              {skill.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              {renderStars(skill.level)}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div 
                              className="h-1.5 sm:h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${(skill.level / 5) * 100}%`,
                                backgroundColor: currentTheme.colors.primary
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Code 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {data.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {project.name}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary + '15',
                          color: currentTheme.colors.primary,
                          border: `1px solid ${currentTheme.colors.primary}30`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                    {project.url && (
                      <a
                        href={project.url}
                        className="flex items-center space-x-1 hover:opacity-80 transition-opacity font-medium"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center space-x-1 hover:opacity-80 transition-opacity font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional sections with modern styling... */}
        {data.certifications.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Award 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Certifications
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {data.certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-base sm:text-lg font-bold mb-2"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {cert.name}
                  </h3>
                  <div 
                    className="text-sm sm:text-base font-semibold mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {cert.issuer}
                  </div>
                  <div 
                    className="flex items-center text-xs sm:text-sm"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {cert.date}
                  </div>
                  {cert.credentialId && (
                    <p 
                      className="text-xs sm:text-sm mt-2"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages with modern design */}
        {data.languages.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Globe 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Languages
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {data.languages.map((language) => (
                <div 
                  key={language.id} 
                  className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100 text-center"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div 
                    className="text-sm sm:text-base font-bold mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {language.name}
                  </div>
                  <div 
                    className="text-xs sm:text-sm mb-2"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {language.proficiency}
                  </div>
                  <div className="flex justify-center">
                    {renderStars(language.level)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards with modern styling */}
        {data.awards.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Award 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Awards & Recognition
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {data.awards.map((award) => (
                <div 
                  key={award.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 flex items-start space-x-3 sm:space-x-4"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div 
                    className="p-1.5 sm:p-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: currentTheme.colors.accent + '20' }}
                  >
                    <Award 
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: currentTheme.colors.accent }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-base sm:text-lg font-bold mb-1"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {award.title}
                    </h3>
                    <div 
                      className="text-sm sm:text-base font-semibold mb-1"
                      style={{ color: currentTheme.colors.secondary }}
                    >
                      {award.issuer}
                    </div>
                    <div 
                      className="text-xs sm:text-sm mb-2"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      {award.date}
                    </div>
                    {award.description && (
                      <p 
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteer Experience */}
        {data.volunteer.length > 0 && (
          <section className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.secondary + '20' }}
              >
                <Heart 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.secondary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Volunteer Experience
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {data.volunteer.map((vol) => (
                <div 
                  key={vol.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                    <h3 
                      className="text-lg sm:text-xl font-bold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {vol.position}
                    </h3>
                    <div 
                      className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm mt-1 lg:mt-0"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                    </div>
                  </div>
                  <div 
                    className="text-sm sm:text-base font-semibold mb-3"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {vol.organization} • {vol.location}
                  </div>
                  <p 
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {vol.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div 
                className="p-1.5 sm:p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Users 
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Professional References
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {data.references.map((ref) => (
                <div 
                  key={ref.id} 
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="font-bold text-base sm:text-lg mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {ref.name}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {ref.position} at {ref.company}
                  </p>
                  <p 
                    className="text-xs sm:text-sm mb-3"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {ref.relationship}
                  </p>
                  <div 
                    className="text-xs space-y-1"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="break-all">{ref.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{ref.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderTwoColumnLayout = () => (
    <div 
      id="resume-preview" 
      className="shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto flex flex-col lg:flex-row w-full"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        background: currentBackground.type === 'color' 
          ? currentTheme.colors.background 
          : currentBackground.value 
      }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-full lg:w-1/3 p-4 sm:p-6 text-white"
        style={{ background: currentTheme.gradients.header }}
      >
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            {fullName || 'Your Name'}
          </h1>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="text-xs break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Phone className="w-3 h-3" />
                <span className="text-xs">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills in Sidebar */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-2">
              Skills
            </h3>
            <div className="space-y-3">
              {data.skills.slice(0, 8).map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs sm:text-sm">{skill.name}</span>
                    <span className="text-xs">{skill.level}/5</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                    <div 
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {data.education.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-2">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="text-xs opacity-90">{edu.institution}</div>
                  <div className="text-xs opacity-75">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-6">
            <h2 
              className="text-lg sm:text-xl font-bold mb-3 border-b-2 pb-2"
              style={{ 
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.primary
              }}
            >
              Professional Summary
            </h2>
            <p 
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg sm:text-xl font-bold mb-3 border-b-2 pb-2"
              style={{ 
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.primary
              }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 
                      className="text-sm sm:text-base font-semibold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {exp.position}
                    </h3>
                    <span 
                      className="text-xs mt-1 sm:mt-0"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div 
                    className="text-xs sm:text-sm font-medium mb-2"
                    style={{ color: currentTheme.colors.primary }}
                  >
                    {exp.company} • {exp.location}
                  </div>
                  <p 
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 
              className="text-lg sm:text-xl font-bold mb-3 border-b-2 pb-2"
              style={{ 
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.primary
              }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 
                    className="text-sm sm:text-base font-semibold mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {project.name}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm mb-2 leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary + '20',
                          color: currentTheme.colors.primary
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // Render based on template layout
  if (currentTemplate?.layout === 'two-column' || currentTemplate?.layout === 'sidebar') {
    return renderTwoColumnLayout();
  }

  return renderSingleColumnLayout();
};

export default ResumePreview;