import React from 'react';
import { useForm } from 'react-hook-form';
import { PersonalInfo } from '../types/resume';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface PersonalInfoFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const { register, watch } = useForm({
    defaultValues: data.personalInfo,
    mode: 'onChange'
  });

  const watchedData = watch();

  React.useEffect(() => {
    onChange({ personalInfo: watchedData as PersonalInfo });
  }, [watchedData, onChange]);

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";
  const iconClass = "w-5 h-5 text-gray-400";

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <User className={iconClass} />
              <span>First Name</span>
            </span>
          </label>
          <input
            type="text"
            {...register('firstName')}
            className={inputClass}
            placeholder="John"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <User className={iconClass} />
              <span>Last Name</span>
            </span>
          </label>
          <input
            type="text"
            {...register('lastName')}
            className={inputClass}
            placeholder="Doe"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <Mail className={iconClass} />
              <span>Email</span>
            </span>
          </label>
          <input
            type="email"
            {...register('email')}
            className={inputClass}
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <Phone className={iconClass} />
              <span>Phone</span>
            </span>
          </label>
          <input
            type="tel"
            {...register('phone')}
            className={inputClass}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <MapPin className={iconClass} />
              <span>Location</span>
            </span>
          </label>
          <input
            type="text"
            {...register('location')}
            className={inputClass}
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <Globe className={iconClass} />
              <span>Website</span>
            </span>
          </label>
          <input
            type="url"
            {...register('website')}
            className={inputClass}
            placeholder="https://johndoe.com"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <Linkedin className={iconClass} />
              <span>LinkedIn</span>
            </span>
          </label>
          <input
            type="url"
            {...register('linkedin')}
            className={inputClass}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center space-x-2">
              <Github className={iconClass} />
              <span>GitHub</span>
            </span>
          </label>
          <input
            type="url"
            {...register('github')}
            className={inputClass}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass}>
          <span className="flex items-center space-x-2">
            <User className={iconClass} />
            <span>Professional Summary</span>
          </span>
        </label>
        <textarea
          {...register('summary')}
          rows={4}
          className={inputClass}
          placeholder="Brief summary of your professional background and key achievements..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;