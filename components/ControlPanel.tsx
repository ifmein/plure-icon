import React from 'react';
import { IconPromptOptions } from '../types';
import { RefreshCw, Sparkles } from 'lucide-react';

interface ControlPanelProps {
  options: IconPromptOptions;
  setOptions: React.Dispatch<React.SetStateAction<IconPromptOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  options,
  setOptions,
  onGenerate,
  isLoading,
}) => {
  const handleChange = (key: keyof IconPromptOptions, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <input
            type="text"
            value={options.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            placeholder="e.g. Email Whitelist"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
          <input
            type="text"
            value={options.style}
            onChange={(e) => handleChange('style', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
          <input
            type="text"
            value={options.shape}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
            title="Shape is locked to Square for this template"
          />
        </div>

         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
          <input
            type="text"
            value={options.backgroundColor}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
          <textarea
            value={options.additionalDetails}
            onChange={(e) => handleChange('additionalDetails', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
            placeholder="Any specific colors or symbols?"
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 mt-4 py-3 px-4 text-white font-medium transition-all ${
            isLoading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Icon
            </>
          )}
        </button>
      </div>
    </div>
  );
};