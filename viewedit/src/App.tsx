import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import MainWindow from "./pages/MainWindow.tsx";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { DataProvider, useDataContext } from "./DataContext.tsx";

const App: React.FC = () => {
  return (
    <Router basename="/ViewEdit">
      <DataProvider>
        <AppWithRoutes />
      </DataProvider>
    </Router>
  );
};

const AppWithRoutes: React.FC = () => {
  const { data, setData } = useDataContext();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleLoadData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch the URL");
      const jsonData = await response.json();
      setData(jsonData.Pages); // Save loaded data to context
      const firstPageSlug = jsonData.Pages[0].title.toLowerCase().replace(/\s+/g, "-");
      navigate(`/${firstPageSlug}`); // Redirect to the first page
    } catch (error) {
      alert("Failed to load data. Please check the URL.");
    }
  };

  return (
    <Box style={{ height: "100vh", width: "100vw" }}>
      {!data ? (
        // Show the data input form if no data is available
        <Box
          sx={{
            width: "400px",
            margin: "auto",
            padding: 4,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Enter JSON URL
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoadData}
          >
            Load Data
          </Button>
        </Box>
      ) : (
        // Render MainWindow when data is loaded
        <Routes>
          <Route path="/*" element={<MainWindow />} />
        </Routes>
      )}
    </Box>
  );
};

export default App;
