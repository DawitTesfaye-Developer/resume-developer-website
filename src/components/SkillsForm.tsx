import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Skill } from '../types/resume';
import { Code, Plus, Edit2, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm<Skill>();
  const watchLevel = watch('level');

  const addSkill = (skill: Skill) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
      level: parseInt(skill.level.toString())
    };
    onChange([...data, newSkill]);
    reset();
    setIsAdding(false);
  };

  const updateSkill = (skill: Skill) => {
    const updated = data.map(s => 
      s.id === editingId 
        ? { ...skill, id: editingId, level: parseInt(skill.level.toString()) }
        : s
    );
    onChange(updated);
    reset();
    setEditingId(null);
  };

  const deleteSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const startEdit = (skill: Skill) => {
    reset(skill);
    setEditingId(skill.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    reset();
    setEditingId(null);
    setIsAdding(false);
  };

  const setSkillLevel = (level: number) => {
    setValue('level', level);
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  const skillCategories = ['Technical', 'Languages', 'Tools', 'Soft Skills', 'Other'];

  const renderStars = (level: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setSkillLevel(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= level
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category] = data.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Code className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            <p className="text-gray-600">Add your technical and soft skills</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        )}
      </div>

      {/* Skills by Category */}
      {skillCategories.map((category) => {
        const categorySkills = groupedSkills[category];
        if (categorySkills.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => startEdit(skill)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    {renderStars(skill.level)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-indigo-200 rounded-lg p-6 bg-indigo-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateSkill : addSkill)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Skill Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="React, JavaScript, Leadership..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    {...register('category', { required: true })}
                    className={inputClass}
                  >
                    <option value="">Select a category</option>
                    {skillCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Proficiency Level</label>
                <div className="flex items-center space-x-4">
                  {renderStars(watchLevel || 1, true)}
                  <span className="text-sm text-gray-600">
                    {watchLevel === 1 && 'Beginner'}
                    {watchLevel === 2 && 'Basic'}
                    {watchLevel === 3 && 'Intermediate'}
                    {watchLevel === 4 && 'Advanced'}
                    {watchLevel === 5 && 'Expert'}
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
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  {editingId ? 'Update Skill' : 'Add Skill'}
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

export default SkillsForm;