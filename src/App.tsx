import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import EditForm from './components/EditForm';
import ResumePreview from './components/ResumePreview';
import ResumePreview3D from './components/ResumePreview3D';
import { useResumeData } from './hooks/useResumeData';
import { useTemplate } from './hooks/useTemplate';
import { exportToPDF } from './utils/pdfExport';
import { Eye as Eye3D, FileText } from 'lucide-react';

function App() {
  const { resumeData, updateResumeData } = useResumeData();
  const { currentTemplate } = useTemplate();
  const [currentStep, setCurrentStep] = useState(0); // Start with edit to show templates
  const [previewMode, setPreviewMode] = useState<'2d' | '3d'>('2d');

  const handleExportPDF = async () => {
    try {
      const previewElement = document.getElementById('resume-preview');
      if (!previewElement) {
        alert('Please switch to 2D preview mode to export PDF');
        return;
      }
      await exportToPDF('resume-preview', 'my-resume.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0: // Edit
        return (
          <EditForm 
            data={resumeData} 
            onChange={updateResumeData}
          />
        );
      case 1: // Preview
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Template Info */}
              {currentTemplate && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ background: currentTemplate.preview }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Using {currentTemplate.name} template
                    </span>
                  </div>
                </div>
              )}

              {/* Preview Mode Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-lg p-1 shadow-lg flex">
                  <button
                    onClick={() => setPreviewMode('2d')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                      previewMode === '2d'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>2D Preview</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('3d')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                      previewMode === '3d'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye3D className="w-4 h-4" />
                    <span>3D Preview</span>
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {previewMode === '2d' ? (
                  <motion.div
                    key="2d"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResumePreview data={resumeData} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="3d"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-[800px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200"
                  >
                    <ResumePreview3D data={resumeData} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      case 2: // Export
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="mb-8">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Your Resume is Ready!
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Export your professionally designed resume as a PDF
                  </p>
                  {currentTemplate && (
                    <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: currentTemplate.preview }}
                      />
                      <span className="text-sm text-gray-600">
                        {currentTemplate.name} template
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleExportPDF}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Download PDF Resume
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    <p>Your resume will be saved as a high-quality PDF file</p>
                    <p className="mt-1 text-xs">Note: Switch to 2D preview mode for PDF export</p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Preview Before Download
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ResumePreview data={resumeData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onExportPDF={handleExportPDF}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;