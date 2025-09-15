import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Language } from '../types/resume';
import { Globe, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm<Language>();
  const watchLevel = watch('level');
  const watchProficiency = watch('proficiency');

  const addLanguage = (language: Language) => {
    const newLanguage = {
      ...language,
      id: Date.now().toString(),
      level: parseInt(language.level.toString())
    };
    onChange([...data, newLanguage]);
    reset();
    setIsAdding(false);
  };

  const updateLanguage = (language: Language) => {
    const updated = data.map(lang => 
      lang.id === editingId 
        ? { ...language, id: editingId, level: parseInt(language.level.toString()) }
        : lang
    );
    onChange(updated);
    reset();
    setEditingId(null);
  };

  const deleteLanguage = (id: string) => {
    onChange(data.filter(lang => lang.id !== id));
  };

  const startEdit = (language: Language) => {
    reset(language);
    setEditingId(language.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    reset();
    setEditingId(null);
    setIsAdding(false);
  };

  const setLanguageLevel = (level: number) => {
    setValue('level', level);
    // Auto-set proficiency based on level
    const proficiencies = ['Basic', 'Basic', 'Intermediate', 'Advanced', 'Fluent'];
    setValue('proficiency', proficiencies[level - 1] as Language['proficiency']);
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  const renderStars = (level: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setLanguageLevel(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= level
                  ? 'text-blue-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
            <p className="text-gray-600">Add languages you speak</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <AnimatePresence>
          {data.map((language) => (
            <motion.div
              key={language.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{language.name}</h4>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => startEdit(language)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteLanguage(language.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{language.proficiency}</p>
              {renderStars(language.level)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-blue-200 rounded-lg p-6 bg-blue-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateLanguage : addLanguage)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Language</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="English, Spanish, French..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Proficiency Level</label>
                  <select
                    {...register('proficiency', { required: true })}
                    className={inputClass}
                  >
                    <option value="">Select proficiency</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Proficiency Rating</label>
                <div className="flex items-center space-x-4">
                  {renderStars(watchLevel || 1, true)}
                  <span className="text-sm text-gray-600">
                    {watchProficiency || 'Select level'}
                  </span>
                </div>
                <input
                  type="hidden"
                  {...register('level', { required: true, min: 1, max: 5 })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update Language' : 'Add Language'}
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

export default LanguagesForm;