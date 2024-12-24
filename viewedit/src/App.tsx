import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import MainWindow from "./pages/MainWindow.tsx";

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleLoadData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch the URL");
      const jsonData = await response.json();
      setData(jsonData.Pages); // Pass the `Pages` array
      setIsDataLoaded(true);
    } catch (error) {
      alert("Failed to load data. Please check the URL.");
    }
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {!isDataLoaded ? (
        <Box
          sx={{
            width: "400px", // Adjust the width as needed
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
        <MainWindow data={data} />
      )}
    </Box>
  );
};

export default App;
