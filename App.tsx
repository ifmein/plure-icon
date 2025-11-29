import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { ControlPanel } from './components/ControlPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { generateIconImage } from './services/geminiService';
import { IconPromptOptions, DEFAULT_OPTIONS } from './types';

function App() {
  const [options, setOptions] = useState<IconPromptOptions>(DEFAULT_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateIconImage(options);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-1.5 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">PureIcon AI</h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 flex gap-3 text-blue-800 text-sm">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Design Goal: Whitelist App</p>
                <p className="opacity-90 mt-1">
                  Preset to generate minimalist, solid-color icons. No gradients. Sharp corners.
                </p>
              </div>
            </div>
            
            <ControlPanel 
              options={options} 
              setOptions={setOptions} 
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-8">
            <ResultDisplay 
              imageUrl={imageUrl} 
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PureIcon AI. Generated icons are for demonstration purposes.
        </div>
      </footer>
    </div>
  );
}

export default App;