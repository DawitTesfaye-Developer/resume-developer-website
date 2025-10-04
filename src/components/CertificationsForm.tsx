import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Certification } from '../types/resume';
import { Award, Plus, Edit2, Trash2, Calendar, ExternalLink, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificationsFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const certificationsData = data.certifications || [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm<Certification>();

  const addCertification = (certification: Certification) => {
    const newCertification = {
      ...certification,
      id: Date.now().toString()
    };
    onChange({ certifications: [...certificationsData, newCertification] });
    reset();
    setIsAdding(false);
  };

  const updateCertification = (certification: Certification) => {
    const updated = certificationsData.map(cert => 
      cert.id === editingId 
        ? { ...certification, id: editingId }
        : cert
    );
    onChange({ certifications: updated });
    reset();
    setEditingId(null);
  };

  const deleteCertification = (id: string) => {
    onChange({ certifications: certificationsData.filter(cert => cert.id !== id) });
  };

  const startEdit = (certification: Certification) => {
    reset(certification);
    setEditingId(certification.id);
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
          <div className="bg-yellow-100 p-2 rounded-lg">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
            <p className="text-gray-600">Add your professional certifications</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {certificationsData.map((certification) => (
          <motion.div
            key={certification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{certification.name}</h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>{certification.issuer}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{certification.date}</span>
                  </span>
                  {certification.url && (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </a>
                  )}
                </div>
                {certification.credentialId && (
                  <p className="text-gray-700 mt-2 text-sm">ID: {certification.credentialId}</p>
                )}
                {certification.expiryDate && (
                  <p className="text-gray-700 mt-1 text-sm">Expires: {certification.expiryDate}</p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => startEdit(certification)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCertification(certification.id)}
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
            className="border border-yellow-200 rounded-lg p-6 bg-yellow-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateCertification : addCertification)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Certification Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label className={labelClass}>Issuing Organization</label>
                  <input
                    type="text"
                    {...register('issuer', { required: true })}
                    className={inputClass}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className={labelClass}>Issue Date</label>
                  <input
                    type="month"
                    {...register('date', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Expiry Date (Optional)</label>
                  <input
                    type="month"
                    {...register('expiryDate')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Credential ID (Optional)</label>
                  <input
                    type="text"
                    {...register('credentialId')}
                    className={inputClass}
                    placeholder="ABC123XYZ"
                  />
                </div>
                <div>
                  <label className={labelClass}>Credential URL (Optional)</label>
                  <input
                    type="url"
                    {...register('url')}
                    className={inputClass}
                    placeholder="https://credly.com/badges/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  {editingId ? 'Update Certification' : 'Add Certification'}
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

export default CertificationsForm;