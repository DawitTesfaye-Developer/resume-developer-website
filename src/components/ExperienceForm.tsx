import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Experience } from '../types/resume';
import { Briefcase, Plus, Edit2, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm<Experience>();
  const watchCurrent = watch('current');

  const addExperience = (experience: Experience) => {
    const newExperience = {
      ...experience,
      id: Date.now().toString(),
      endDate: experience.current ? '' : experience.endDate
    };
    onChange([...data, newExperience]);
    reset();
    setIsAdding(false);
  };

  const updateExperience = (experience: Experience) => {
    const updated = data.map(exp => 
      exp.id === editingId 
        ? { ...experience, id: editingId, endDate: experience.current ? '' : experience.endDate }
        : exp
    );
    onChange(updated);
    reset();
    setEditingId(null);
  };

  const deleteExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const startEdit = (experience: Experience) => {
    reset(experience);
    setEditingId(experience.id);
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
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Briefcase className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
            <p className="text-gray-600">Add your professional experience</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {data.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{experience.position}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{experience.company}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                    </span>
                  </span>
                </div>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{experience.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(experience)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteExperience(experience.id)}
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
            className="border border-blue-200 rounded-lg p-6 bg-blue-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateExperience : addExperience)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Position/Title</label>
                  <input
                    type="text"
                    {...register('position', { required: true })}
                    className={inputClass}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    type="text"
                    {...register('company', { required: true })}
                    className={inputClass}
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    {...register('location', { required: true })}
                    className={inputClass}
                    placeholder="San Francisco, CA"
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
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className={labelClass}>End Date</label>
                      <input
                        type="month"
                        {...register('endDate')}
                        disabled={watchCurrent}
                        className={`${inputClass} ${watchCurrent ? 'bg-gray-100' : ''}`}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <input
                        type="checkbox"
                        {...register('current')}
                        id="current"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="current" className="text-sm text-gray-700">
                        Currently working here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  {...register('description', { required: true })}
                  rows={4}
                  className={inputClass}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update Experience' : 'Add Experience'}
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

export default ExperienceForm;