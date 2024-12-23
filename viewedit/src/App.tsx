import './App.css';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [url, setUrl] = useState("");

  const handleLoadData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch the URL");
      const jsonData = await response.json();
      setData(jsonData);
      alert("Data loaded successfully!");
    } catch (error) {
      alert("Failed to load data. Please check the URL.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Load JSON Data</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter JSON URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLoadData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load
          </button>
        </div>
        {data ? (
          <div className="bg-green-100 p-4 rounded text-green-700">
            <h2 className="font-bold text-lg">Data Loaded!</h2>
            <p>{JSON.stringify(data, null, 2)}</p>
          </div>
        ) : (
          <p className="text-gray-600">No data loaded. Enter a URL above.</p>
        )}
      </div>
    </div>
  );
};

export default App;
