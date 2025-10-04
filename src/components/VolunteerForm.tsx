import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { VolunteerExperience } from '../types/resume';
import { Heart, Plus, Edit2, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VolunteerFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({ data, onChange }) => {
  const volunteerData = data.volunteer || [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<VolunteerExperience>();
  const watchCurrent = watch('current');

  const addVolunteer = (volunteer: VolunteerExperience) => {
    const newVolunteer = {
      ...volunteer,
      id: Date.now().toString(),
      endDate: volunteer.current ? '' : volunteer.endDate
    };
    onChange({ volunteer: [...volunteerData, newVolunteer] });
    reset();
    setIsAdding(false);
  };

  const updateVolunteer = (volunteer: VolunteerExperience) => {
    const updated = volunteerData.map(vol => 
      vol.id === editingId 
        ? { ...volunteer, id: editingId, endDate: volunteer.current ? '' : volunteer.endDate }
        : vol
    );
    onChange({ volunteer: updated });
    reset();
    setEditingId(null);
  };

  const deleteVolunteer = (id: string) => {
    onChange({ volunteer: volunteerData.filter(vol => vol.id !== id) });
  };

  const startEdit = (volunteer: VolunteerExperience) => {
    reset(volunteer);
    setEditingId(volunteer.id);
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
          <div className="bg-red-100 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Volunteer Experience</h2>
            <p className="text-gray-600">Add your volunteer work and community involvement</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Volunteer Work</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {volunteerData.map((volunteer) => (
          <motion.div
            key={volunteer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{volunteer.position}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{volunteer.organization}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{volunteer.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {volunteer.startDate} - {volunteer.current ? 'Present' : volunteer.endDate}
                    </span>
                  </span>
                </div>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{volunteer.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(volunteer)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteVolunteer(volunteer.id)}
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
            className="border border-red-200 rounded-lg p-6 bg-red-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateVolunteer : addVolunteer)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Position/Role</label>
                  <input
                    type="text"
                    {...register('position', { required: true })}
                    className={inputClass}
                    placeholder="Volunteer Coordinator"
                  />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input
                    type="text"
                    {...register('organization', { required: true })}
                    className={inputClass}
                    placeholder="Local Food Bank"
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
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <label htmlFor="current" className="text-sm text-gray-700">
                        Currently volunteering here
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
                  placeholder="Describe your volunteer activities and impact..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  {editingId ? 'Update Volunteer Work' : 'Add Volunteer Work'}
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

export default VolunteerForm;