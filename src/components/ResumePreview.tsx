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
      className="shadow-2xl rounded-2xl overflow-hidden max-w-4xl mx-auto bg-white"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        background: currentBackground.type === 'color' 
          ? currentTheme.colors.background 
          : currentBackground.value 
      }}
    >
      {/* Header */}
      <div 
        className="text-white p-8 relative overflow-hidden"
        style={headerStyle}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12"></div>
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-3 tracking-tight">
            {fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-white text-opacity-95 text-lg">
            {data.personalInfo.email && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Mail className="w-5 h-5" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Phone className="w-5 h-5" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Globe className="w-5 h-5" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <User 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Professional Summary
              </h2>
            </div>
            <div 
              className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border-l-4"
              style={{ 
                borderLeftColor: currentTheme.colors.primary,
                backgroundColor: currentTheme.colors.surface
              }}
            >
              <p 
                className="text-lg leading-relaxed"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {data.personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Briefcase 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Work Experience
              </h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-3 top-6 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                    style={{ backgroundColor: currentTheme.colors.primary }}
                  />
                  
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-1"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {exp.position}
                      </h3>
                      <div 
                        className="text-lg font-semibold mb-2"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        {exp.company} • {exp.location}
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: currentTheme.colors.accent + '20',
                        color: currentTheme.colors.accent
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                  </div>
                  <p 
                    className="text-base leading-relaxed"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.secondary + '20' }}
              >
                <GraduationCap 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.secondary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Education
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.education.map((edu) => (
                <div 
                  key={edu.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {edu.degree} in {edu.field}
                  </h3>
                  <div 
                    className="font-semibold mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {edu.institution}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span 
                      className="flex items-center space-x-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </span>
                    <span 
                      className="flex items-center space-x-1"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </span>
                  </div>
                  {edu.gpa && (
                    <div 
                      className="mt-2 text-sm font-medium"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Code 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Skills & Expertise
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['Technical', 'Languages', 'Tools', 'Soft Skills', 'Other'].map((category) => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 
                      className="text-xl font-bold mb-4 pb-2 border-b"
                      style={{ 
                        color: currentTheme.colors.text,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span 
                              className="font-medium"
                              style={{ color: currentTheme.colors.text }}
                            >
                              {skill.name}
                            </span>
                            <div className="flex items-center space-x-1">
                              {renderStars(skill.level)}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Code 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {project.name}
                  </h3>
                  <p 
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full font-medium"
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
                  <div className="flex items-center space-x-4 text-sm">
                    {project.url && (
                      <a
                        href={project.url}
                        className="flex items-center space-x-1 hover:opacity-80 transition-opacity font-medium"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center space-x-1 hover:opacity-80 transition-opacity font-medium"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        <Github className="w-4 h-4" />
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Award 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Certifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-2"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {cert.name}
                  </h3>
                  <div 
                    className="font-semibold mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {cert.issuer}
                  </div>
                  <div 
                    className="flex items-center text-sm"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {cert.date}
                  </div>
                  {cert.credentialId && (
                    <p 
                      className="text-sm mt-2"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Globe 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Languages
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.languages.map((language) => (
                <div 
                  key={language.id} 
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div 
                    className="font-bold mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {language.name}
                  </div>
                  <div 
                    className="text-sm mb-2"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.accent + '20' }}
              >
                <Award 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.accent }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Awards & Recognition
              </h2>
            </div>
            <div className="space-y-4">
              {data.awards.map((award) => (
                <div 
                  key={award.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start space-x-4"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div 
                    className="p-2 rounded-full"
                    style={{ backgroundColor: currentTheme.colors.accent + '20' }}
                  >
                    <Award 
                      className="w-5 h-5"
                      style={{ color: currentTheme.colors.accent }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-bold mb-1"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {award.title}
                    </h3>
                    <div 
                      className="font-semibold mb-1"
                      style={{ color: currentTheme.colors.secondary }}
                    >
                      {award.issuer}
                    </div>
                    <div 
                      className="text-sm mb-2"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      {award.date}
                    </div>
                    {award.description && (
                      <p 
                        className="text-sm leading-relaxed"
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
          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.secondary + '20' }}
              >
                <Heart 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.secondary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Volunteer Experience
              </h2>
            </div>
            <div className="space-y-6">
              {data.volunteer.map((vol) => (
                <div 
                  key={vol.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {vol.position}
                    </h3>
                    <div 
                      className="flex items-center space-x-2 text-sm"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <Calendar className="w-4 h-4" />
                      {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                    </div>
                  </div>
                  <div 
                    className="font-semibold mb-3"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {vol.organization} • {vol.location}
                  </div>
                  <p 
                    className="leading-relaxed"
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
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: currentTheme.colors.primary + '20' }}
              >
                <Users 
                  className="w-6 h-6"
                  style={{ color: currentTheme.colors.primary }}
                />
              </div>
              <h2 
                className="text-3xl font-bold"
                style={{ color: currentTheme.colors.text }}
              >
                Professional References
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.references.map((ref) => (
                <div 
                  key={ref.id} 
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  style={{ 
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <h3 
                    className="font-bold text-lg mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {ref.name}
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {ref.position} at {ref.company}
                  </p>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {ref.relationship}
                  </p>
                  <div 
                    className="text-xs space-y-1"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <span>{ref.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
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
      className="shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto flex"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        background: currentBackground.type === 'color' 
          ? currentTheme.colors.background 
          : currentBackground.value 
      }}
    >
      {/* Left Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ background: currentTheme.gradients.header }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {fullName || 'Your Name'}
          </h1>
          <div className="space-y-2 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span className="text-xs">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span className="text-xs">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills in Sidebar */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-2">
              Skills
            </h3>
            <div className="space-y-3">
              {data.skills.slice(0, 8).map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{skill.name}</span>
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
            <h3 className="text-lg font-bold mb-3 border-b border-white border-opacity-30 pb-2">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-sm">
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
      <div className="flex-1 p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-6">
            <h2 
              className="text-xl font-bold mb-3 border-b-2 pb-2"
              style={{ 
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.primary
              }}
            >
              Professional Summary
            </h2>
            <p 
              className="text-sm leading-relaxed"
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
              className="text-xl font-bold mb-3 border-b-2 pb-2"
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
                  <div className="flex justify-between items-start mb-1">
                    <h3 
                      className="font-semibold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {exp.position}
                    </h3>
                    <span 
                      className="text-xs"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div 
                    className="text-sm font-medium mb-2"
                    style={{ color: currentTheme.colors.primary }}
                  >
                    {exp.company} • {exp.location}
                  </div>
                  <p 
                    className="text-sm leading-relaxed"
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
              className="text-xl font-bold mb-3 border-b-2 pb-2"
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
                    className="font-semibold mb-1"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {project.name}
                  </h3>
                  <p 
                    className="text-sm mb-2 leading-relaxed"
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