import React, { useState, useEffect } from 'react';
import ApiKeyForm from './components/ApiKeyForm';
import MermaidGenerator from './components/MermaidGenerator';
import Background from './components/Background';

function App() {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('groqApiKey'));

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('groqApiKey', apiKey);
    }
  }, [apiKey]);

  const handleClearApiKey = () => {
    localStorage.removeItem('groqApiKey');
    setApiKey(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Background />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center">GROQ Mermaid Diagram Generator</h1>
        {!apiKey ? (
          <ApiKeyForm onSubmit={setApiKey} />
        ) : (
          <div className="mb-8">
            <p className="text-green-400 mb-2">API Key is set and stored locally.</p>
            <button
              onClick={handleClearApiKey}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Clear API Key
            </button>
          </div>
        )}
        {apiKey && <MermaidGenerator apiKey={apiKey} />}
      </div>
    </div>
  );
}

export default App;