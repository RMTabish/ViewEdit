import './App.css';
import React,{useState} from 'react';
const App: React.FC=()=> {
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
    <div className="App">

      <div>
        <input
        type="text"
        placeholder="Enter JSON URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleLoadData}>Load Data</button>
        
      </div>
      {data?(<div>

        <h1>Data Loaded!</h1>

      </div>
      ):(<p>No data Loaded, enter the url.</p>)}

    </div>

  );
}

export default App;
