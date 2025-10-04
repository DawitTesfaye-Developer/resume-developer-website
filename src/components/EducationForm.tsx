import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Education } from '../types/resume';
import { GraduationCap, Plus, Edit2, Trash2, Calendar, MapPin, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const educationData = data.education || [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm<Education>();

  const addEducation = (education: Education) => {
    const newEducation = {
      ...education,
      id: Date.now().toString()
    };
    onChange({ education: [...educationData, newEducation] });
    reset();
    setIsAdding(false);
  };

  const updateEducation = (education: Education) => {
    const updated = educationData.map(edu => 
      edu.id === editingId 
        ? { ...education, id: editingId }
        : edu
    );
    onChange({ education: updated });
    reset();
    setEditingId(null);
  };

  const deleteEducation = (id: string) => {
    onChange({ education: educationData.filter(edu => edu.id !== id) });
  };

  const startEdit = (education: Education) => {
    reset(education);
    setEditingId(education.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    reset();
    setEditingId(null);
    setIsAdding(false);
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            <p className="text-gray-600">Add your educational background</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {educationData.map((education) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{education.degree} in {education.field}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <School className="w-4 h-4" />
                    <span>{education.institution}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{education.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{education.startDate} - {education.endDate}</span>
                  </span>
                </div>
                {education.gpa && (
                  <p className="text-gray-700 mt-2 text-sm">GPA: {education.gpa}</p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(education)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteEducation(education.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-purple-200 rounded-lg p-6 bg-purple-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateEducation : addEducation)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Institution</label>
                  <input
                    type="text"
                    {...register('institution', { required: true })}
                    className={inputClass}
                    placeholder="University of California"
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    type="text"
                    {...register('degree', { required: true })}
                    className={inputClass}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label className={labelClass}>Field of Study</label>
                  <input
                    type="text"
                    {...register('field', { required: true })}
                    className={inputClass}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    {...register('location', { required: true })}
                    className={inputClass}
                    placeholder="Berkeley, CA"
                  />
                </div>
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="month"
                    {...register('startDate', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="month"
                    {...register('endDate', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>GPA (Optional)</label>
                  <input
                    type="text"
                    {...register('gpa')}
                    className={inputClass}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {editingId ? 'Update Education' : 'Add Education'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationForm;