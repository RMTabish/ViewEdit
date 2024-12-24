import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Box, Button, Typography, List, ListItemButton, TextField } from "@mui/material";
import { useDataContext } from "../DataContext.tsx";
import ReactMarkdown from "react-markdown";

const MainWindow: React.FC = () => {
  const { data } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPage, setSelectedPage] = useState(data[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBodyText, setEditedBodyText] = useState(selectedPage.bodyText);

  // Sync selected page with the URL
  useEffect(() => {
    if (data) {
      const pageSlug = location.pathname.substring(1); // Extract slug from URL
      const matchingPage = data.find(
        (page: any) =>
          page.title.toLowerCase().replace(/\s+/g, "-") === pageSlug
      );

      if (matchingPage) {
        setSelectedPage(matchingPage);
        setEditedBodyText(matchingPage.bodyText);
      } else {
        // Redirect to the first page if URL is invalid
        const firstPageSlug = data[0].title.toLowerCase().replace(/\s+/g, "-");
        navigate(`/${firstPageSlug}`, { replace: true });
      }
    }
  }, [location.pathname, data, navigate]);

  const handlePageSelect = (page: { title: string; bodyText: string }) => {
    setSelectedPage(page);
    setEditedBodyText(page.bodyText);
    setIsEditing(false);
    const pageSlug = `/${page.title.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(pageSlug); // Update the URL
  };

  const handleEditToggle = () => {
    if (isEditing) {
      selectedPage.bodyText = editedBodyText; // Save changes
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleExport = () => {
    const jsonBlob = new Blob([JSON.stringify({ Pages: data }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: "grey.100",
          height: "100%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Menu
        </Typography>
        <List>
          {data.map((page, index) => (
            <ListItemButton
              key={index}
              selected={page.title === selectedPage.title}
              onClick={() => handlePageSelect(page)}
              sx={{
                borderRadius: 1,
                marginBottom: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
              }}
            >
              {page.title}
            </ListItemButton>
          ))}
        </List>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={9}
        sx={{
          height: "100%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            borderBottom: "1px solid #ddd",
            paddingBottom: 1,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {selectedPage.title}
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditToggle}
              sx={{ textTransform: "none", marginRight: 1 }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleExport}
              sx={{ textTransform: "none" }}
            >
              Export
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: 1,
            padding: 2,
            boxShadow: 1,
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={15}
              variant="outlined"
              value={editedBodyText}
              onChange={(e) => setEditedBodyText(e.target.value)}
              sx={{ border: "1px solid #ddd", borderRadius: 1, padding: 1 }}
            />
          ) : (
            <ReactMarkdown>{selectedPage.bodyText}</ReactMarkdown>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainWindow;
