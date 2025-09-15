import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Award } from '../types/resume';
import { Trophy, Plus, Edit2, Trash2, Calendar, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AwardsFormProps {
  data: Award[];
  onChange: (data: Award[]) => void;
}

const AwardsForm: React.FC<AwardsFormProps> = ({ data = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm<Award>();

  const addAward = (award: Award) => {
    const newAward = {
      ...award,
      id: Date.now().toString()
    };
    onChange([...data, newAward]);
    reset();
    setIsAdding(false);
  };

  const updateAward = (award: Award) => {
    const updated = data.map(a => 
      a.id === editingId 
        ? { ...award, id: editingId }
        : a
    );
    onChange(updated);
    reset();
    setEditingId(null);
  };

  const deleteAward = (id: string) => {
    onChange(data.filter(award => award.id !== id));
  };

  const startEdit = (award: Award) => {
    reset(award);
    setEditingId(award.id);
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
          <div className="bg-amber-100 p-2 rounded-lg">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Awards & Honors</h2>
            <p className="text-gray-600">Add your achievements and recognition</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Award</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {data.map((award) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{award.title}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{award.issuer}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{award.date}</span>
                  </span>
                </div>
                {award.description && (
                  <p className="text-gray-700 mt-3 text-sm leading-relaxed">{award.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(award)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAward(award.id)}
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
            className="border border-amber-200 rounded-lg p-6 bg-amber-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateAward : addAward)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Award Title</label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className={inputClass}
                    placeholder="Employee of the Year"
                  />
                </div>
                <div>
                  <label className={labelClass}>Issuing Organization</label>
                  <input
                    type="text"
                    {...register('issuer', { required: true })}
                    className={inputClass}
                    placeholder="Company Name / Organization"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Date Received</label>
                  <input
                    type="month"
                    {...register('date', { required: true })}
                    className={inputClass}
                  />
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Description (Optional)</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={inputClass}
                  placeholder="Brief description of the award and why you received it..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  {editingId ? 'Update Award' : 'Add Award'}
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

export default AwardsForm;