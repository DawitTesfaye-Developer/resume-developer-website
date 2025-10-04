import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Reference } from '../types/resume';
import { Users, Plus, Edit2, Trash2, Mail, Phone, Building, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReferencesFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, onChange }) => {
  const referencesData = data.references || [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm<Reference>();

  const addReference = (reference: Reference) => {
    const newReference = {
      ...reference,
      id: Date.now().toString()
    };
    onChange({ references: [...referencesData, newReference] });
    reset();
    setIsAdding(false);
  };

  const updateReference = (reference: Reference) => {
    const updated = referencesData.map(ref => 
      ref.id === editingId 
        ? { ...reference, id: editingId }
        : ref
    );
    onChange({ references: updated });
    reset();
    setEditingId(null);
  };

  const deleteReference = (id: string) => {
    onChange({ references: referencesData.filter(ref => ref.id !== id) });
  };

  const startEdit = (reference: Reference) => {
    reset(reference);
    setEditingId(reference.id);
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
          <div className="bg-green-100 p-2 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">References</h2>
            <p className="text-gray-600">Add professional references</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reference</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AnimatePresence>
          {referencesData.map((reference) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900">{reference.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(reference)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteReference(reference.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{reference.position}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{reference.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{reference.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{reference.phone}</span>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  <strong>Relationship:</strong> {reference.relationship}
                </div>
              </div>
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
            className="border border-green-200 rounded-lg p-6 bg-green-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateReference : addReference)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className={labelClass}>Position/Title</label>
                  <input
                    type="text"
                    {...register('position', { required: true })}
                    className={inputClass}
                    placeholder="Senior Manager"
                  />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    type="text"
                    {...register('company', { required: true })}
                    className={inputClass}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Relationship</label>
                  <input
                    type="text"
                    {...register('relationship', { required: true })}
                    className={inputClass}
                    placeholder="Former Supervisor, Colleague, etc."
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className={inputClass}
                    placeholder="john.smith@company.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    {...register('phone', { required: true })}
                    className={inputClass}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {editingId ? 'Update Reference' : 'Add Reference'}
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

      {referencesData.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No references added yet</p>
          <p className="text-sm">Add professional references to strengthen your resume</p>
        </div>
      )}
    </div>
  );
};

export default ReferencesForm;