import React, { useState, useEffect } from 'react';
import { FiX, FiDownloadCloud, FiFileText, FiGrid, FiImage, FiPalette, FiColumns, FiCheckCircle, FiAlertTriangle, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ExportModal = ({ isOpen, onClose, dataTypeToExport = "Report" }) => {
  const [exportFormat, setExportFormat] = useState('pdf_detailed'); // 'pdf_detailed', 'pdf_compact', 'excel'
  const [pdfLogo, setPdfLogo] = useState(null);
  const [pdfColorTheme, setPdfColorTheme] = useState('dark'); // 'dark', 'light', 'custom'
  const [pdfCustomColor, setPdfCustomColor] = useState('#FF6600');
  const [selectedColumns, setSelectedColumns] = useState(['all']); // Example: ['all', 'col1', 'col2']
  const [excelDataType, setExcelDataType] = useState('raw'); // 'raw', 'aggregated'

  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedSize, setEstimatedSize] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [exportError, setExportError] = useState('');
  const [exportSuccess, setExportSuccess] = useState(false);

  // Dummy columns for selection example
  const DUMMY_COLUMNS = [
    { id: 'col1', name: 'Player Name' }, { id: 'col2', name: 'K/D Ratio' },
    { id: 'col3', name: 'Win Rate' }, { id: 'col4', name: 'Matches Played' },
    { id: 'col5', name: 'Headshot %' }
  ];

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Basic validation (e.g., file type, size)
      if (file.size > 2 * 1024 * 1024) { // Max 2MB
        alert("Logo size should be less than 2MB.");
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert("Please upload a PNG or JPG logo.");
        return;
      }
      setPdfLogo(file);
    }
  };

  const toggleColumnSelection = (columnId) => {
    if (columnId === 'all') {
      setSelectedColumns(prev => prev.includes('all') ? DUMMY_COLUMNS.map(c => c.id) : ['all']);
    } else {
      setSelectedColumns(prev => {
        const newSelection = prev.filter(c => c !== 'all');
        if (newSelection.includes(columnId)) {
          return newSelection.filter(c => c !== columnId);
        } else {
          return [...newSelection, columnId];
        }
      });
    }
  };

  useEffect(() => {
    // If 'all' is selected, ensure all individual columns are also considered selected for UI consistency
    if (selectedColumns.includes('all')) {
      // This effect is more for UI state if individual checkboxes depend on 'all'
    }
  }, [selectedColumns]);


  const handleStartExport = () => {
    setIsExporting(true);
    setProgress(0);
    setEstimatedSize('');
    setEstimatedTime('');
    setExportError('');
    setExportSuccess(false);

    // Simulate export process
    let currentProgress = 0;
    const targetProgress = 100;
    setEstimatedSize(`${(Math.random() * 5 + 0.5).toFixed(1)} MB`); // Random size
    setEstimatedTime(`${Math.floor(Math.random() * 10 + 3)} seconds`); // Random time

    const interval = setInterval(() => {
      currentProgress += Math.random() * 10 + 5; // Simulate variable progress speed
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        setProgress(targetProgress);
        clearInterval(interval);
        // Simulate potential error
        if (Math.random() < 0.15) { // 15% chance of error
          setExportError('Failed to generate report. Insufficient data or server error.');
          setIsExporting(false);
        } else {
          setExportSuccess(true);
          setIsExporting(false);
          // In a real app, trigger download here
          console.log(`Exporting ${dataTypeToExport} as ${exportFormat} with options:`, { pdfLogo, pdfColorTheme, selectedColumns, excelDataType });
        }
      }
      setProgress(currentProgress);
    }, 300);
  };

  const resetModalState = () => {
    setExportFormat('pdf_detailed');
    setPdfLogo(null);
    setPdfColorTheme('dark');
    setSelectedColumns(['all']);
    setExcelDataType('raw');
    setIsExporting(false);
    setProgress(0);
    setExportError('');
    setExportSuccess(false);
    onClose(); // Call the passed onClose handler
  }


  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exportModalTitle" // Will add an id to the title
          className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 id="exportModalTitle" className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <FiDownloadCloud className="mr-3 text-orange-500" /> Export {dataTypeToExport}
              </h2>
              <button onClick={resetModalState} aria-label="Close export modal" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                <FiX size={20} />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {!isExporting && !exportSuccess && !exportError && (
                <>
                  {/* Format Options */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'pdf_detailed', label: 'PDF (Detailed)', icon: FiFileText },
                        { id: 'pdf_compact', label: 'PDF (Compact)', icon: FiFileText },
                        { id: 'excel', label: 'Excel (.xlsx)', icon: FiGrid },
                      ].map(format => (
                        <button
                          key={format.id}
                          onClick={() => setExportFormat(format.id)}
                          className={`flex items-center py-2 px-4 rounded-lg border-2 transition-all duration-200
                            ${exportFormat === format.id
                              ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 text-gray-700 dark:text-gray-200'
                            }`}
                        >
                          <format.icon className="mr-2" /> {format.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PDF Specific Options */}
                  {exportFormat.startsWith('pdf') && (
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 bg-slate-50 dark:bg-gray-850">
                      <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 border-gray-300 dark:border-gray-600">PDF Customization</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Logo (Optional)</label>
                        <div className="flex items-center gap-3">
                           <input type="file" id="pdfLogo" onChange={handleLogoUpload} accept="image/png, image/jpeg" className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 dark:file:bg-orange-700/30 file:text-orange-600 dark:file:text-orange-300 hover:file:bg-orange-100 dark:hover:file:bg-orange-700/50 transition-colors cursor-pointer"/>
                           {pdfLogo && <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{pdfLogo.name}</span>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color Theme</label>
                        <div className="flex items-center gap-3">
                          {['dark', 'light', 'custom'].map(theme => (
                            <button key={theme} onClick={() => setPdfColorTheme(theme)} className={`py-1.5 px-3 rounded-md text-sm border ${pdfColorTheme === theme ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 hover:border-orange-400'}`}>
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </button>
                          ))}
                          {pdfColorTheme === 'custom' && (
                            <input type="color" value={pdfCustomColor} onChange={e => setPdfCustomColor(e.target.value)} className="w-10 h-8 rounded border-gray-300 dark:border-gray-600 cursor-pointer"/>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Column Selection (Common for PDF/Excel) */}
                   <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 bg-slate-50 dark:bg-gray-850">
                      <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 border-gray-300 dark:border-gray-600 flex items-center"><FiColumns className="mr-2"/> Select Columns</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-2">
                        <label key="all" className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer">
                            <input type="checkbox" checked={selectedColumns.includes('all')} onChange={() => toggleColumnSelection('all')} className="form-checkbox h-4 w-4 text-orange-600 rounded border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-600 focus:ring-orange-500"/>
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Select All</span>
                        </label>
                        {!selectedColumns.includes('all') && DUMMY_COLUMNS.map(col => (
                           <label key={col.id} className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer">
                             <input type="checkbox" checked={selectedColumns.includes(col.id)} onChange={() => toggleColumnSelection(col.id)} className="form-checkbox h-4 w-4 text-orange-600 rounded border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-600 focus:ring-orange-500"/>
                             <span className="text-sm text-gray-700 dark:text-gray-300 truncate" title={col.name}>{col.name}</span>
                           </label>
                        ))}
                      </div>
                    </div>


                  {/* Excel Specific Options */}
                  {exportFormat === 'excel' && (
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 bg-slate-50 dark:bg-gray-850">
                      <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 border-gray-300 dark:border-gray-600">Excel Options</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data Type</label>
                        <div className="flex items-center gap-3">
                           {['raw', 'aggregated'].map(type => (
                            <button key={type} onClick={() => setExcelDataType(type)} className={`py-1.5 px-3 rounded-md text-sm border ${excelDataType === type ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 hover:border-orange-400'}`}>
                              {type.charAt(0).toUpperCase() + type.slice(1)} Data
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Hidden columns selection could be added here if different from general column selection */}
                    </div>
                  )}
                </>
              )}

              {/* Progress Indicator */}
              {isExporting && (
                <div className="text-center py-8">
                  <FiLoader className="mx-auto text-orange-500 text-5xl animate-spin mb-4" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Exporting your {dataTypeToExport.toLowerCase()}...</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 my-3">
                    <div className="bg-orange-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Progress: {Math.round(progress)}%</p>
                  {estimatedSize && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Est. Size: {estimatedSize} | Est. Time: {estimatedTime}</p>}
                </div>
              )}

              {/* Success Message */}
              {exportSuccess && (
                <div className="text-center py-8">
                  <FiCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Export Successful!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your download should start automatically.</p>
                  {/* Download button for real implementation: <button className="mt-4 ...">Download File</button> */}
                </div>
              )}

              {/* Error Message */}
              {exportError && (
                 <div className="text-center py-8">
                  <FiAlertTriangle className="mx-auto text-red-500 text-6xl mb-4" />
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Export Failed</p>
                  <p className="text-sm text-red-500 dark:text-red-400 mt-1">{exportError}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Please try again or contact support if the issue persists.</p>
                </div>
              )}
            </div>

            {/* Footer / Action Button */}
            <div className="p-5 border-t border-gray-200 dark:border-gray-700 mt-auto">
              {!isExporting && !exportSuccess && !exportError && (
                <button
                  onClick={handleStartExport}
                  className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  <FiDownloadCloud className="mr-2" /> Start Export
                </button>
              )}
              {(exportSuccess || exportError) && (
                 <button
                  onClick={resetModalState}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;
