import React from 'react';
import { Download, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'whitelist-app-icon.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview</h2>
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 min-h-[400px] relative overflow-hidden group">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-none"></div>
            <div className="text-sm text-gray-500">Creating your masterpiece...</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 text-red-500 px-4 text-center">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : imageUrl ? (
          <div className="relative">
            {/* Displaying the generated image as a square icon */}
            <img 
              src={imageUrl} 
              alt="Generated Icon" 
              className="w-64 h-64 object-contain shadow-xl"
            />
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Configure settings and click generate to see preview
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleDownload}
          disabled={!imageUrl || isLoading}
          className={`flex items-center gap-2 px-4 py-2 border font-medium text-sm transition-colors ${
            imageUrl && !isLoading
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
      </div>
    </div>
  );
};