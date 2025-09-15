import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Project } from '../types/resume';
import { FolderOpen, Plus, Edit2, Trash2, Globe, Github, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data = [], onChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<Project>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'technologies'
  });

  const addProject = (project: Project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      technologies: project.technologies || []
    };
    onChange([...data, newProject]);
    reset();
    setIsAdding(false);
  };

  const updateProject = (project: Project) => {
    const updated = data.map(proj => 
      proj.id === editingId 
        ? { ...project, id: editingId, technologies: project.technologies || [] }
        : proj
    );
    onChange(updated);
    reset();
    setEditingId(null);
  };

  const deleteProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const startEdit = (project: Project) => {
    reset({
      ...project,
      technologies: project.technologies || []
    });
    setEditingId(project.id);
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
          <div className="bg-cyan-100 p-2 rounded-lg">
            <FolderOpen className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-600">Showcase your personal and professional projects</p>
          </div>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AnimatePresence>
          {data.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-cyan-600 hover:text-cyan-800"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
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
            className="border border-cyan-200 rounded-lg p-6 bg-cyan-50"
          >
            <form onSubmit={handleSubmit(editingId ? updateProject : addProject)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Project Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="E-commerce Website"
                  />
                </div>
                <div>
                  <label className={labelClass}>Live URL (Optional)</label>
                  <input
                    type="url"
                    {...register('url')}
                    className={inputClass}
                    placeholder="https://myproject.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>GitHub Repository (Optional)</label>
                  <input
                    type="url"
                    {...register('github')}
                    className={inputClass}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  {...register('description', { required: true })}
                  rows={4}
                  className={inputClass}
                  placeholder="Describe your project, its features, and your role in developing it..."
                />
              </div>

              <div>
                <label className={labelClass}>Technologies Used</label>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <input
                        type="text"
                        {...register(`technologies.${index}` as const)}
                        className={inputClass}
                        placeholder="React, Node.js, MongoDB..."
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => append('')}
                    className="text-cyan-600 hover:text-cyan-800 text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Technology</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                >
                  {editingId ? 'Update Project' : 'Add Project'}
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

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No projects added yet</p>
          <p className="text-sm">Showcase your work by adding personal or professional projects</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;